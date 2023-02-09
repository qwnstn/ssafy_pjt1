import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 웹소켓의 통신이 오면 rfid read 페이지로 넘어간뒤,

// 비회원 결제 버튼을 누르면 rfid read 페이지로 넘어간뒤, itemlist 페이지로 넘어가는 기능
const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection opened:", url);
    };

    socket.onmessage = (event) => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          setMessages((prevMessages) => [...prevMessages, reader.result]);
        };
        reader.readAsText(event.data);
      } else {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed:", url);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return messages;
};

export default function KioskMain() {
  const navigate = useNavigate();
  const [kioskId, setKioskId] = useState();
  const [value, setValue] = useState("");
  const messages = useWebSocket("ws://192.168.30.202:8080");

  function QRMake(kioskId) {
    const newTest = {
      token: kioskId,
      time: Date.now(),
    };
    const test1 = JSON.stringify(newTest);
    setValue(test1);
  }

  // 키오스크 아이디는 Python과 통신으로 받아옴
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://192.168.30.114:8000/api/kiosk");
      const kiosk = data["kioskId"];
      QRMake(kiosk);
      setKioskId(kiosk);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      QRMake(kioskId);
    }, 59000);
    // 59초
    return () => clearInterval(interval);
  }, [kioskId]);

  useEffect(() => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("data");
    if (messages[0] === 'next') {
      sessionStorage.setItem("user", "user");
      navigate("/kiosk/rfidread");
    }
  }, [messages, navigate]);

  return (
    <Box>
      <Card sx={{ maxWidth: 720, minHeight: 1280 }}>
        <Box sx={{ pb: 7 }}>
          <Card
            sx={{
              fontSize: 40,
              padding: 2,
              textAlign: "center",
              backgroundColor: "#ff8c8c",
              fontWeight: "bold",
            }}
          >
            하이쇼핑
          </Card>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={10} sx={{ mt: 5 }}>
              <CssBaseline />
              <Card sx={{ border: 1, padding: 1, mt: 3 }}>
                <CardMedia
                  component="img"
                  alt="howtowuse"
                  height="600"
                  image="/kiosk/images/howtouse.jpg"
                />
              </Card>
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={50}>
              <Card sx={{ my: 5, padding: 1 }}>
                <QRCode value={value} size={200} />
              </Card>
              {messages}
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            sx={{ mt: 5, fontSize: 22, fontWeight: "bold", color: "blue" }}
          >
            회원결제를 위해 바코드에 QR을 찍거나 앱으로 QR스캔하세요
          </Grid>
          <Grid container sx={{ mt: 2, mb: 2 }}>
            <Grid item xs />
            <Grid item>
              <Button
                sx={{ fontSize: 20, mr: 2 }}
                variant="contained"
                onClick={() => navigate("/kiosk/rfidread")}
              >
                비회원결제
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}
