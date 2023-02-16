import React, { useState, useEffect } from "react";
import "./App.css";
import { CitySelector, GoogleMaps, SearchHistory, WeatherInfo } from "./components";
import { Layout, Card, Row, Col, Empty } from "antd";
const { Content } = Layout;

function App() {
  const [center, setCenter] = useState();
  const [zoom, setZoom] = useState();
  const [currentInfo, setCurrentInfo] = useState();

  

  const geolocationAccess = useEffect(() => {
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
    setCurrentInfo(dataWeather)
  };

  return (
    <>
      <Content
        style={{
          backgroundImage: "url('src/assets/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          boxShadow: " inset 0px 10px 24px -15px rgba(0,0,0,0.22)",
          padding: 15,
        }}
      >
        <Row gutter={[6, 6]}>
          <Col xs={24} sm={24} md={12}>
            <Card>
              <CitySelector
                dataWeather={(value) => onSelectCity(value)}
              ></CitySelector>
            </Card>
            <Card style={{marginTop: 6}}>
              <SearchHistory></SearchHistory>
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
