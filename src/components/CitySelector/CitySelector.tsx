import React, { useEffect, useState } from "react";

const urlCountries = "http://127.0.0.1:8000/api/country/list";
const urlCities = "http://127.0.0.1:8000/api/city/perCountry/";

export const CitySelector = ({dataWeather}) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectCountry, setSelectCountry] = useState(false);

  const countryHandle = (e) => {
    console.log(e.target.value);
    setSelectCountry(true);
    fetch(urlCities + e.target.value)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      });
  };

  const cityHandle = (e) => {
    // console.log(e.target.value);
    const coordinates = e.target.value.split('|');
    console.log(coordinates);
    // setSelectCountry(true);
    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates[0]}&lon=${coordinates[1]}&units=metric&appid=76c373757ebc6f563ca89ca92d58bcba`)
      .then((res) => res.json())
      .then((data) => {
        dataWeather(data);
      });
  };

  useEffect(() => {
    fetch(urlCountries)
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  return (
    <div>
      CitySelector
      <select onChange={countryHandle}>
          <option>
                Select Country
          </option>
        {countries.map((country) => {
          return (
            <option key={country["id"]} value={country["id"]}>
              {country["name"]}
            </option>
          );
        })}
      </select>
      {selectCountry ? (
        <select onChange={cityHandle}>
          <option>
                Select City
          </option>
          {cities.map((city) => {
            return (
              <option key={city["id"]} value={city["lat"]+'|'+city["lng"]}>
                {city["name"]}
              </option>
            );
          })}
        </select>
      ) : (
        <h2>Cargando...</h2>
      )}
    </div>
  );
}
