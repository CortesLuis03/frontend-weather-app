import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Col, Row, Segmented, Select } from "antd";

const render = (status) => {
  return <h1>{status}asd</h1>;
};

function GoogleMap({ center, zoom, layer, dataWeather }) {
  const ref = useRef();
  const { current } = dataWeather
  const { temp, humidity, feels_like } = current
  const colorTemp = (temp >= 28) ? 'red' : ((temp >= 19 && temp < 28) ? 'orange' : 'blue');
  const contentInfoMarker = `<div>
  Humidity: <span style="color: blue">${humidity}%</span><br>
  Temperature: <span style="color: ${colorTemp}">${temp}°</span><br>
  Thermal Sensation: <span style="color: ${colorTemp}">${feels_like}°</span>
  </div>`;

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    const marker = new google.maps.Marker({
      position: center,
      map: map,
    });

    const infoMarker = new window.google.maps.InfoWindow({
      map: map,
      content: contentInfoMarker,
      anchor: marker
    });

    marker.addListener("click", () => {
      infoMarker.setAnchor(marker)
      infoMarker.setContent(contentInfoMarker)
      map.setCenter(marker.getPosition())
    });

    var layerMap = new google.maps.ImageMapType({
      getTileUrl: function (center, zoom) {
        return `https://tile.openweathermap.org/map/${layer}/${zoom}/${center.x}/${center.y}.png?appid=76c373757ebc6f563ca89ca92d58bcba`;
      },
      tileSize: new google.maps.Size(256, 256),
      maxZoom: 9,
      minZoom: 0,
      name: "layerMap",
    });

    map.overlayMapTypes.insertAt(0, layerMap);
  });

  return <div ref={ref} id="map" />;
}

export function GoogleMaps({ center, zoom, dataWeather }) {
  const [layer, setLayer] = useState("temp_new");
  const layers = [
    { label: "Temperature", value: "temp_new" },
    { label: "Clouds", value: "clouds_new" },
    { label: "Precipitation", value: "precipitation_new" },
    { label: "Wind speed", value: "wind_new" },
  ];
  return (
    <>
      <Wrapper
        apiKey={"AIzaSyB-_v-gH9xZ7He4GMKUbUQnkKshr1ujr08"}
        render={render}
      >
        <Row style={{ marginBottom: 0 }}>
          <Col xs={24} sm={0}>
            <Select
              defaultValue={layer}
              size={"small"}
              options={layers}
              onChange={setLayer}
              style={{margin: 10}}
            />
          </Col>
          <Col xs={0} sm={24}>
            <Segmented
              size="small"
              options={layers}
              value={layer}
              onChange={setLayer}
              style={{margin: 10}}
            />
          </Col>
          <Col span={24}>
            <GoogleMap
              center={center}
              zoom={zoom}
              layer={layer}
              dataWeather={dataWeather}
            />
          </Col>
        </Row>
      </Wrapper>
    </>
  );
}
