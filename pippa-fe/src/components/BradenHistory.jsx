import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SERVER_URL } from "../constants.js";

const data2 = [
  {
    datetime: "03/03/2022 12:02:22",
    braden: 12,
  },
  {
    datetime: "03/03/2022 12:02:22",
    braden: 5,
  },
  {
    datetime: "03/03/2022 12:02:22",
    braden: 10,
  },
  {
    datetime: "03/03/2022 12:02:22",
    braden: 15,
  },
  {
    datetime: "03/03/2022 12:02:22",
    braden: 20,
  },
  {
    datetime: "03/03/2022 12:02:22",
    braden: 10,
  },
  {
    datetime: "03/03/2022 12:02:22",
    braden: 15,
  },
];

export default function BradenHistory(props) {
  const [bradenData, setBradenData] = useState([]);

  useEffect(() => {
    fetch(
      `${SERVER_URL}skin-assessment/patient/bscore-total/${props.patientID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBradenData(data);
        {
          console.log(bradenData);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={bradenData}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" />
        <YAxis type="number" domain={[0, 25]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="braden"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
