export const defaultWeather = {
    lat: 1,
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

export const defaultData = {
    center: {
        lat: 1,
        lng: 180
    },
    zoom: 1,
    data: defaultWeather
}