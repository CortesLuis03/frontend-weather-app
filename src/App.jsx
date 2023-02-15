import {
  useState,
  useRef,
  useEffect
} from "react";
import "./App.css";
import { CitySelector } from "./components";
import { Wrapper } from "@googlemaps/react-wrapper";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const render = (status) => {
  return <h1>{status}asd</h1>;
};

function GoogleMap({ center, zoom }) {
  const ref = useRef();
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    new google.maps.Marker({
      position: center,
      map: map,
    });
  });

  return <div ref={ref} id="map" />;
}

function App() {
  const [center, setCenter] = useState();
  const [zoom, setZoom] = useState();

  useEffect(() => {
    const success = (pos) => {
      setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setZoom(12);
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

  const onSelect = (dataWeather) => {
    console.log(dataWeather.lat);
    changePosition(dataWeather.lat, dataWeather.lon, 7);
  };

  return (
    <div className="App">
      <CitySelector dataWeather={(value) => onSelect(value)}></CitySelector>
      <Wrapper
        apiKey={"AIzaSyB-_v-gH9xZ7He4GMKUbUQnkKshr1ujr08"}
        render={render}
      >
        <GoogleMap center={center} zoom={zoom} />
      </Wrapper>
    </div>
  );
}

export default App;
