import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../FetchApi/api";
import { Line, Bar } from "react-chartjs-2";

const Chart = ({ country, data: { confirmed, recovered, deaths } }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchedAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchedAPI();
  }, []);

  const lineChart = () => {
    const labels = [];
    const infectedData = [];
    const deathsData = [];
    dailyData.forEach((data) => {
      labels.push(data.date);
      infectedData.push(data.confirmed);
      deathsData.push(data.deaths);
    });
    return (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "infected",
              borderColor: "#3333ff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255,0,0,0.5)",
              fill: true,
            },
          ],
        }}
      />
    );
  };

  const barChart = () => {
    return (
      <Bar
        data={{
          labels: ["Infected", "Recovered", "Deaths"],
          datasets: [
            {
              label: "People",
              backgroundColor: [
                "rgba(0,0,255, 0.5)",
                "rgba(0,255, 0, 0.5)",
                "rgba(255,0,0, 0.5)",
              ],
              data: [confirmed.value, recovered.value, deaths.value],
            },
          ],
        }}
        options={{
          legent: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    );
  };

  return (
    <div className="style.container">
      {dailyData.length && !country ? lineChart() : null}
      {dailyData.length && country ? barChart() : null}
    </div>
  );
};
export default Chart;
