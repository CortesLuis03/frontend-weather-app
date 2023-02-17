import React, { useEffect, useState } from "react";
import { defaultData } from "../defaultData";
import { Card, Empty, Image } from "antd";
import Meta from "antd/es/card/Meta";
import CountUp from "react-countup";
import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export function WeatherInfo({ currentInfo = defaultData }) {
  const {
    data: {
      current: { weather, feels_like, humidity, temp, visibility, wind_speed },
    },
  } = currentInfo ? currentInfo : defaultData;
  const { icon, main, description } = weather[0];
  const [weatherImageSrc, setWeatherImageSrc] = useState("");

  useEffect(() => {
    setWeatherImageSrc(`http://openweathermap.org/img/wn/${icon}@2x.png`);
  });
  return (
    <>
      {main != "NaN" ? (
        <Card
          bordered={false}
          className="card-stadistics"
          style={{
            minHeight: 536,
          }}
        >
          <Card.Grid className="ant-card-grid-header">
            <Meta
              avatar={<Image src={weatherImageSrc} preview={false} />}
              title={main}
              description={
                <Paragraph type="secondary" style={{ fontSize: 14 }}>
                  {description} | Temperature:
                  <CountUp
                    end={temp}
                    duration={1}
                    suffix={"°"}
                    prefix={" "}
                    decimals={2}
                  />
                </Paragraph>
              }
              style={{ textTransform: "capitalize" }}
            />
          </Card.Grid>
          <Card.Grid>
            <Meta
              avatar={
                <Image
                  preview={false}
                  src={"src/assets/humidity.png"}
                  width={40}
                  style={{ padding: 5 }}
                />
              }
              title={<Text>Humidity</Text>}
              description={
                <Text>
                  <CountUp end={humidity} duration={1} suffix={" %"} />
                </Text>
              }
            />
          </Card.Grid>
          <Card.Grid>
            <Meta
              avatar={
                <Image
                  preview={false}
                  src={"src/assets/thermal.png"}
                  width={40}
                  style={{ padding: 5 }}
                />
              }
              title={
                <Text>
                  Thermal <br></br>Sensation
                </Text>
              }
              description={
                <Text>
                  <CountUp
                    end={feels_like}
                    duration={1}
                    suffix={"°"}
                    decimals={2}
                  />
                </Text>
              }
            />
          </Card.Grid>
          <Card.Grid>
            <Meta
              avatar={
                <Image
                  preview={false}
                  src={"src/assets/wind.png"}
                  width={40}
                  style={{ padding: 5 }}
                />
              }
              title={<Text>Wind Speed</Text>}
              description={
                <Text>
                  <CountUp
                    end={wind_speed}
                    duration={1}
                    suffix={" km/h"}
                    decimals={2}
                  />
                </Text>
              }
            />
          </Card.Grid>
          <Card.Grid>
            <Meta
              avatar={
                <Image
                  preview={false}
                  src={"src/assets/visibility.png"}
                  width={40}
                  style={{ padding: 5 }}
                />
              }
              title={<Text>Visibility</Text>}
              description={
                <Text>
                  <CountUp
                    end={visibility / 1000}
                    duration={1}
                    suffix={" km"}
                  />
                </Text>
              }
            />
          </Card.Grid>
        </Card>
      ) : (
        <Card
          bordered={false}
          style={{
            minHeight: 414,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "none",
          }}
        >
          <Empty />
        </Card>
      )}
    </>
  );
}
