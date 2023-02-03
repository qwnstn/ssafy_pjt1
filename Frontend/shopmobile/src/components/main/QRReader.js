import React from "react";
import QrReader from "modern-react-qr-reader";
import { Box, Card } from "@mui/material";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import HOST from "../../Host";
import { useNavigate } from "react-router-dom";


const QRReader = (props) => {
  const navigate = useNavigate();

  
  // 값 받아와야함
  const userId = "userId"; 

  // 값을 받으면 유저 정보, 시간, 키오스크 정보를 axios로 보냄
  const API_URI = `${HOST}/iot/qr`
  const handleScan = (kioskInput) => {
    if (kioskInput) {
      const kioskInputList = kioskInput.split('/')
      const kioskTime = kioskInputList[1]
      const kioskId = kioskInputList[0]
      const timeCheck = Date.now() - kioskTime

      console.log('kioskInputList', kioskInputList)
      console.log('kioskTime', kioskTime)
      console.log('kioskId', kioskId)
      console.log('timeCheck', timeCheck)

      if (timeCheck < 70000 ) {
        axios
          .post(API_URI, {
            userId: userId,
            kioskId: kioskId,
            datetime: Date.now(),
          })
          .then((res) => {
            // 성공시 모달창으로 확인 메세지 표시 후 메인 페이지로
            alert("QR코드가 성공적으로 촬영되었습니다");
            navigate('/app')
          })
          .catch((error) => {
            console.error(error);
            alert("다시 찍어주세요");

          });
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
      <Grid container spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={10} mt={15}>
          <CssBaseline />
          <Card sx={{ border: 1, padding: 1 }}>
            <QrReader
              delay={500}
              facingMode={"environment"}
              onError={handleError}
              onScan={handleScan}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QRReader;
