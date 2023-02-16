import { Card, Image, Progress } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

export function WeatherInfo({ currentInfo }) {
  const [weatherImageSrc, setWeatherImageSrc] = useState("");

  useEffect(() => {
    setWeatherImageSrc(
      `http://openweathermap.org/img/wn/${currentInfo?.current?.weather[0]?.icon}@2x.png`
    );
  });
  return (
    <>
      <Card title="Weather Info">
        <Card.Grid className="ant-card-grid-header">
          <Meta
            avatar={<Image src={weatherImageSrc} preview={false} />}
            title={currentInfo?.current?.weather[0]?.main}
            description={
              <Paragraph type="secondary" style={{ fontSize: 18 }}>
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
                width={50}
                style={{ padding: 5 }}
              />
            }
            title={"Humidity"}
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
                width={50}
                style={{ padding: 5 }}
              />
            }
            title={"Thermal sensation"}
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
                width={50}
                style={{ padding: 5 }}
              />
            }
            title={"Wind Speed"}
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
                width={50}
                style={{ padding: 5 }}
              />
            }
            title={"Visibility"}
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
    </>
  );
}
