const saveHistory = (city_id: number, timestamp: number) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ city_id: city_id, timestamp: timestamp }),
  };

  fetch("http://127.0.0.1:8000/api/weather/history/save", requestOptions).then(
    (response) => response.json()
  );
};

export default saveHistory;
