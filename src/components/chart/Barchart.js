import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function BarChartComponent() {
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/api/chart/bar-chart-data`
      );
      setChartData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            padding: "4px",
            backgroundColor: "#0f172a",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          <p
            style={{ textTransform: "capitalize" }}
          >{`User: ${payload[0].payload.username}`}</p>
          <p>{`Posts: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart
        data={chartData}
        margin={{ right: 30, top: 30, bottom: 20, left: -10 }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="username" />
        <YAxis />
        <Tooltip content={<CustomToolTip />} />
        <Legend />
        <Bar dataKey="posts" fill="#00032a" name="Number of Posts" />
        <Bar
          type="monotone"
          dataKey="posts"
          stroke="#2563eb"
          fill="#2563eb"
          name="Username"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
