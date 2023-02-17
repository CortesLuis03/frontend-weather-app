import React, { useState, useMemo } from "react";
import "./App.css";
import {
  CitySelector,
  GoogleMaps,
  SearchHistory,
  WeatherInfo,
} from "./components";
import { Layout, Card, Row, Col, Empty, Tabs, Divider } from "antd";
import { WEATHER_KEY } from "../config/api";
import saveHistory from "./services/apiServices";

const { Content } = Layout;

function App() {
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState();

  const items = [
    {
      key: "1",
      label: `Weather Info`,
      children: <WeatherInfo currentInfo={currentWeatherInfo}></WeatherInfo>,
    },
    {
      key: "2",
      label: `Search History`,
      children: (
        <SearchHistory
          dataPosition={(data) => onSelectItemHistory(data)}
        ></SearchHistory>
      ),
    },
  ];

  const tabsItems = useMemo(() => items, [items]);

  const changePosition = (lat, lng, zoom, dataWeather) => {
    setCurrentWeatherInfo({
      center: {
        lat: lat,
        lng: lng,
      },
      zoom: zoom,
      data: dataWeather,
    });
  };

  const onSelectItemHistory = ({ city, lat, lng }) => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,minutely,daily&appid=${WEATHER_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentWeatherInfo({
          center: {
            lat: lat,
            lng: lng,
          },
          zoom: 10,
          data: data,
        });
        saveHistory(city, data.current.dt);
      });
  };

  return (
    <>
      <Content>
        <Row gutter={[45, 45]}>
          <Col xs={{ order: 2, span: 24 }} md={{ order: 1, span: 12 }}>
            <Card className="card-map card-shadow">
              {currentWeatherInfo ? (
                <GoogleMaps dataWeather={currentWeatherInfo}></GoogleMaps>
              ) : (
                <Empty />
              )}
            </Card>
          </Col>
          <Col xs={{ order: 1, span: 24 }} md={{ order: 2, span: 12 }}>
            <Card className="card-shadow">
              <CitySelector
                dataSelector={({ center, data }) => {
                  changePosition(center.lat, center.lng, 7, data);
                }}
              ></CitySelector>
            </Card>
            <Divider style={{ border: "none" }}></Divider>
            <Card className="info-tabs card-shadow">
              <Tabs items={tabsItems} animated></Tabs>
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  );
}

export default App;
