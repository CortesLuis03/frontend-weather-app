import React, { useState, useEffect } from "react";
import "./App.css";
import {
  CitySelector,
  GoogleMaps,
  SearchHistory,
  WeatherInfo,
} from "./components";
import { Layout, Card, Row, Col, Empty } from "antd";
const { Content } = Layout;
const urlSaveHistory = "http://127.0.0.1:8000/api/weather/history/save";

function App() {
  const [center, setCenter] = useState();
  const [zoom, setZoom] = useState();
  const [currentInfo, setCurrentInfo] = useState();

  useEffect(() => {
    const success = (pos) => {
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setZoom(10);
    };
    const error = () => {
      setCenter({ lat: 1, lng: 180 });
      setZoom(1);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const changePosition = (lat, lng, zoom) => {
    setCenter({ lat: lat, lng: lng });
    setZoom(zoom);
  };

  const onSelectCity = (dataWeather) => {
    changePosition(dataWeather.lat, dataWeather.lon, 7);
    setCurrentInfo(dataWeather);
  };

  const onSelectItemHistory = (dataPosition) => {
    changePosition(dataPosition.lat, dataPosition.lng, 7);
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${dataPosition.lat}&lon=${dataPosition.lng}&units=metric&exclude=hourly,minutely,daily&appid=76c373757ebc6f563ca89ca92d58bcba`
    )
      .then((res) => res.json())
      .then((data) => {
        saveHistory(dataPosition.city, data.current.dt);
        setCurrentInfo(data);
      });
    console.log(dataPosition);
  };

  const saveHistory = (city_id, timestamp) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city_id: city_id, timestamp: timestamp }),
    };

    fetch(urlSaveHistory, requestOptions).then((response) => response.json());
  };

  return (
    <>
      <Content
        style={{
          boxShadow: " inset 0px 10px 24px -15px rgba(0,0,0,0.22)",
          padding: 15,
          minHeight: '97vh'
        }}
      >
        <Row gutter={[6, 6]}>
          <Col xs={24} sm={24} md={12}>
            <Card>
              <CitySelector
                dataWeather={(value) => onSelectCity(value)}
                dataHistory={(city_id, timestamp) =>
                  saveHistory(city_id, timestamp)
                }
              ></CitySelector>
            </Card>
            <Card
              title={"Search History"}
              style={{
                marginTop: 6,
                minHeight: 339,
                maxHeight: 339,
                overflow: "auto",
              }}
            >
              <SearchHistory
                dataPosition={(data) => onSelectItemHistory(data)}
              ></SearchHistory>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12}>
            {currentInfo ? (
              <WeatherInfo currentInfo={currentInfo}></WeatherInfo>
            ) : (
              <Card>
                <Empty />
              </Card>
            )}
          </Col>
          <Col xs={24} sm={24}>
            <Card>
              {currentInfo ? (
                <GoogleMaps center={center} zoom={zoom}></GoogleMaps>
              ) : (
                <Empty />
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
}

export default App;
