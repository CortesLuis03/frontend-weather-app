import React, { useEffect, useState } from "react";
import { WEATHER_KEY } from "../../../config/api";
import { defaultData } from "../defaultData";
import { Select, Row, Col } from "antd";

import saveHistory from "../../services/apiServices";

const urlCountries = "http://127.0.0.1:8000/api/country/list";
const urlCities = "http://127.0.0.1:8000/api/city/perCountry/";

export const CitySelector = ({ dataSelector }) => {
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState<string>("");

  const onChangeCity = (value: string) => {
    const valueData = value.split("|");
    const lat = Number(valueData[0]);
    const lng = Number(valueData[1]);
    const city_id = Number(valueData[2]);
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,minutely,daily&appid=${WEATHER_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const info = { center: { lat: lat, lng: lng }, data: data };
        dataSelector(info);
        saveHistory(city_id, data.current.dt);
        setCity(valueData[3]);
      });
  };

  const onChangeCountry = (value: string) => {
    fetch(urlCities + value)
      .then((res) => res.json())
      .then((data) => {
        setCityList(
          data.map((item: any) => {
            return {
              value: `${item.lat}|${item.lng}|${item.id}|${item.name}`,
              label: item.name,
            };
          })
        );
        setCity("Select a City");
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
            setCity("Select a City");
            console.log(defaultData);
            dataSelector(defaultData);
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
