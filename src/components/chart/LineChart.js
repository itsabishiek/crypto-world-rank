import millify from "millify";
import React from "react";
import { Line } from "react-chartjs-2";
import "./LineChart.css";

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#21b6b7",
        borderColor: "#21b6b7",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div style={{ marginBottom: 30 }}>
      <div className="chart-header">
        <h2 className="chart-title">{coinName} Price Chart</h2>

        <div className="price-container">
          <h4 className="price-change">
            Change:{" "}
            <span style={{ color: "#21b6b7" }}>
              {coinHistory?.data?.change}%
            </span>
          </h4>
          <h4 className="current-price">
            Current {coinName} Price:{" "}
            <span style={{ color: "#21b6b7" }}>$ {millify(currentPrice)}</span>
          </h4>
        </div>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
