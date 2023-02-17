import React, { useEffect, useState } from "react";
import { Card, Skeleton, Timeline, Typography } from "antd";
const { Link } = Typography;

const urlHistory = "http://127.0.0.1:8000/api/weather/history";

export function SearchHistory({ dataPosition }) {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetch(urlHistory)
        .then((res) => res.json())
        .then((data) => {
          setHistoryData(
            data.map((item: any) => {
              const date = new Date(item.timestamp_history * 1000);
              const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const hr =
                date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
              const min =
                date.getMinutes() < 10
                  ? "0" + date.getMinutes()
                  : date.getMinutes();
              const dateFormat = `${days[date.getDay()]}, ${date.getDate()} ${
                months[date.getMonth()]
              } ${hr}:${min}`;

              const positiondata = {
                lat: item.city.lat,
                lng: item.city.lng,
                city: item.city_id,
              };

              return {
                children: (
                  <Link
                    onClick={() => dataPosition(positiondata)}
                    style={{ maxHeight: 277 }}
                  >
                    {item.city.name}, {item.city.country.name}
                  </Link>
                ),
                label: dateFormat,
              };
            })
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }, 1500);
  });
  return (
    <>
      <Card
        className="card-history"
        bordered={false}
        style={{
          minHeight: 530,
          maxHeight: 530,
          boxShadow: "none",
        }}
      >
        {!loading && historyData.length != 0 ? (
          <Timeline items={historyData} mode={"right"} reverse />
        ) : (
          <Skeleton active />
        )}
      </Card>
    </>
  );
}
