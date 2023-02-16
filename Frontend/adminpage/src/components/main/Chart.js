import * as React from "react";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import HOST from "../../Host";
import getPayloadFromToken from "../../getPayloadFromToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

function countByCategory(data) {
  const count = {};
  data.forEach((item) => {
    if (item.category in count) {
      count[item.category]++;
    } else {
      count[item.category] = 1;
    }
  });
  return count;
}

const API_URI = `${HOST}/admin/report/sale`;

export default function Chart() {
  const [chartData, setChartData] = useState([]);
  const [payload, setPayload] = useState({});
  const navigate = useNavigate();

  const handleChartData = (data) => {
    const count = countByCategory(data);
    const chartData = Object.keys(count).map((category) => ({
      name: category,
      count: count[category],
    }));
    setChartData(chartData);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    axios
      .get(API_URI, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        handleChartData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    const decodedPayload = getPayloadFromToken(accessToken);
    setPayload(decodedPayload);
  }, []);

  const obj = JSON.stringify(payload, ["roles"], 1);
  if (obj !== null) {
    const parsedObj = JSON.parse(obj);
    if (parsedObj && parsedObj.hasOwnProperty("roles")) {
      const adminCheck = parsedObj["roles"][0];
      if (adminCheck === "ROLE_ADMIN") {
        console.log("AdminLogin");
      } else {
        navigate("/admin/login");
      }
    } else {
      navigate("/admin/login");
    }
  } else {
    navigate("/admin/login");
  }

  return (
    <React.Fragment>
      <div>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          카테고리 별 판매 수
        </Typography>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 50, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
}
