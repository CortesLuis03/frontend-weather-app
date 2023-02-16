import React, { useEffect, useState } from "react";
import { Select, Row, Col } from "antd";

const urlCountries = "http://127.0.0.1:8000/api/country/list";
const urlCities = "http://127.0.0.1:8000/api/city/perCountry/";

export const CitySelector = ({ dataWeather }) => {
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState<string>("");

  const cleanData = {
    lat: 0,
    lon: 180,
    current: {
      temp: 0,
      feels_like: 0,
      pressure: 0,
      humidity: 0,
      dew_point: 0,
      uvi: 0,
      clouds: 0,
      visibility: 0,
      wind_speed: 0,
      wind_deg: 0,
      weather: [
        {
          main: "NaN",
          description: "NaN",
          icon: "03d",
        },
      ],
    },
  };

  const onChangeCity = (value: string) => {
    const coordinates = value.split("|");
    setCity(value);
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&exclude=hourly,minutely,daily&appid=76c373757ebc6f563ca89ca92d58bcba`
    )
      .then((res) => res.json())
      .then((data) => {
        dataWeather(data);
      });
  };

  const onChangeCountry = (value: string) => {
    fetch(urlCities + value)
      .then((res) => res.json())
      .then((data) => {
        setCityList(
          data.map((item: any) => {
            return { value: `${item.lat}|${item.lng}`, label: item.name };
          })
        );
        setCity("");
      });
  };

  useEffect(() => {
    fetch(urlCountries)
      .then((res) => res.json())
      .then((data) => {
        setCountryList(
          data.map((item: any) => {
            return { value: item.id, label: item.name };
          })
        );
      });
  }, []);

  return (
    <Row gutter={[12, 12]}>
      <Col span={12}>
        <Select
          size="large"
          showSearch
          allowClear
          onClear={() => {
            setCity("");
            dataWeather(cleanData);
          }}
          placeholder="Select a country"
          style={{ width: "100%" }}
          onChange={onChangeCountry}
          options={countryList}
          filterOption={(input, option: any) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
        />
      </Col>
      <Col span={12}>
        <Select
          size="large"
          showSearch
          placeholder="Select a City"
          style={{ width: "100%" }}
          onChange={onChangeCity}
          options={cityList}
          value={city}
          filterOption={(input, option: any) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </Col>
    </Row>
  );
};
