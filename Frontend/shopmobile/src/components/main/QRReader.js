import React, { useState } from "react";
import QrReader from "modern-react-qr-reader";
import { Box, Card, Button } from "@mui/material";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import HOST from "../../Host";
import { useNavigate } from "react-router-dom";

const QRReader = () => {
  const navigate = useNavigate();

  // 화면 전환 버튼
  const [cameraMode, setCameraMode] = useState("environment");
  const accesstoken = localStorage.getItem("accesstoken");

  // qr값을 받으면 유저 정보, 시간, 키오스크 정보를 axios로 보냄
  const API_URI = `${HOST}/user/qr`;
  const handleScan = async (kioskInput) => {
    console.log(kioskInput);
    if (kioskInput) {
      const kioskInputObject = JSON.parse(kioskInput);
      const kioskId = kioskInputObject["kioskId"];
      console.log(kioskInputObject);
      try {
        const res = await axios.post(
          API_URI,
          {
            kioskId: kioskId,
            datetime: Date.now(),
          },
          {
            headers: {
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );
        console.log(res);
        // alert("QR code was successfully captured");
        navigate("/app");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Card
        sx={{
          fontSize: 33,
          padding: 2,
          textAlign: "center",
          backgroundColor: "#64b5f6",
          fontWeight: "bold",
        }}
      >
        QR Scan
      </Card>
      <Grid container spacing={1}>
        <Grid item xs={1} />
        <Grid item xs={10} mt={3}>
          <CssBaseline />
          <Card sx={{ border: 1, padding: 1 }}>
            <QrReader
              delay={2000}
              // 기본적으로 후방카메라인 user모드가 되도록 설정
              facingMode={cameraMode}
              onError={handleError}
              onScan={handleScan}
            />
            <Button
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onClick={() =>
                setCameraMode(
                  cameraMode === "environment" ? "user" : "environment"
                )
              }
            >
              화면 전환
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QRReader;
