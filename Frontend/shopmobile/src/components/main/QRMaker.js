import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Box, Button, Card } from "@mui/material";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import HOST from "../../Host";
import axios from "axios";

function QRMaker() {
  const accesstoken = localStorage.getItem("accesstoken");
  const [value, setValue] = useState([]);
  const [countdown, setCountdown] = useState(59);
  const ref = React.useRef(null);

  function QRMake(token, time) {
    const newTest = {
      token: token,
      time: time,
    };
    const test1 = JSON.stringify(newTest);
    setValue(test1);
  }

  function getTime() {
    axios
      .get(`${HOST}/iot/time`)
      .then(function (response) {
        console.log(response.data, "성공");
        QRMake(accesstoken, response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    if (countdown === 0) {
      axios
      .get(`${HOST}/iot/time`)
      .then(function (response) {
        console.log(response.data, "성공");
        QRMake(accesstoken, response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
      setCountdown(59);
    } else {
      const intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [countdown, accesstoken]);

  // 키오스크 아이디는 Python과 통신으로 받아옴
  useEffect(() => {
    (async () => {
      await axios
        .get(`${HOST}/iot/time`)
        .then(function (response) {
          console.log(response.data, "성공");
          QRMake(accesstoken, response.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = () => {
    getTime();
    setCountdown(59);
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Card
        sx={{
          fontSize: 33,
          padding: 2,
          textAlign: "center",
          backgroundColor: "#64b5f6",
          fontWeight: "bold",
        }}
      >
        QR생성
      </Card>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={1} />
        <Grid item xs={10} mt={3}>
          <CssBaseline />
          <Card sx={{ border: 1, padding: 1, maxWidth: 400, maxHeight: 500 }}>
            <div>
              <QRCode value={value} size="100%" />
            </div>
            <Card sx={{ textAlign: "center", mb: 1 }}>
              <Button
                onClick={handleButtonClick}
                sx={{ width: "100%", fontWeight: "bold" }}
              >
                QR 재생성
              </Button>
            </Card>
            <Card sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}>
              자동 재생성까지 {countdown}초
            </Card>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default QRMaker;
