import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Transaction History",
      data: [12, 19, 3, 5, 2, 3],
      fill: true,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const History: React.FC<{}> = () => {
  return (
    <>
      <div className="header">
        <h1 className="title">Line Chart</h1>
        <div className="links">
          <a
            className="btn btn-gh"
            href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js"
          >
            Github Source
          </a>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default History;
