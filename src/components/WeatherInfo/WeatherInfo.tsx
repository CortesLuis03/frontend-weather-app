import { Card, Empty, Image, Progress } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export function WeatherInfo({ currentInfo }) {
  const [weatherImageSrc, setWeatherImageSrc] = useState("");

  useEffect(() => {
    setWeatherImageSrc(
      `http://openweathermap.org/img/wn/${currentInfo?.current?.weather[0]?.icon}@2x.png`
    );
  });
  return (
    <>
      {" "}
      {currentInfo ? (
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
              title={currentInfo?.current?.weather[0]?.main}
              description={
                <Paragraph type="secondary" style={{ fontSize: 14 }}>
                  {currentInfo?.current?.weather[0]?.description} | Temperature:
                  <CountUp
                    end={currentInfo?.current?.temp}
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
                  <CountUp
                    end={currentInfo?.current?.humidity}
                    duration={1}
                    suffix={" %"}
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
                    end={currentInfo?.current?.feels_like}
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
                    end={currentInfo?.current?.wind_speed}
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
                    end={currentInfo?.current?.visibility / 1000}
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
