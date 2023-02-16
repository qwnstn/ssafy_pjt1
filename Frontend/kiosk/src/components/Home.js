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
import QrReader from "modern-react-qr-reader";

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

    socket.onerror = (error) => {
      console.error(`WebSocket error: ${error}`);
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

const handleScan = async (kioskInput) => {
  if (kioskInput) {
    const kioskInputObject = JSON.parse(kioskInput);
    const token = kioskInputObject.token;
    const datetime = kioskInputObject.time;
    console.log(kioskInputObject);
    try {
      const res = await axios.post("http://localhost:8888/api/kiosk/qr", {
        token: token,
        datetime: datetime,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
};

export default function KioskMain() {
  const navigate = useNavigate();
  const [kioskId, setKioskId] = useState();
  const [value, setValue] = useState("");
  const messages = useWebSocket("ws://localhost:3333");

  const handleError = (err) => {
    console.error(err);
  };

  function QRMake(kioskId) {
    const newTest = {
      kioskId: kioskId,
      time: Date.now(),
    };
    const test1 = JSON.stringify(newTest);
    setValue(test1);
  }

  // 키오스크 아이디는 Python과 통신으로 받아옴
  useEffect(() => {
    (async () => {
      console.log("통신");
      const { data } = await axios.get("http://localhost:8888/api/kiosk");
      const kiosk = data["kioskId"];
      console.log(kiosk);
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
  }, [kioskId, messages, navigate]);

  useEffect(() => {
    sessionStorage.removeItem("data");
    sessionStorage.removeItem("user");
    if (messages[0] === "next") {
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
              
              textAlign: "center",
              backgroundColor: "#ff8c8c",
              fontWeight: "bold",
            }}
          >
            <CardMedia
              component="img"
              alt="kioskmain"
              height="94"
              image="/kiosk/images/hishop.png"
            />
          </Card>
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            sx={{ mb: 5 }}
          >
            <Grid item xs={10} sx={{ mt: 5 }}>
              <CssBaseline />
              <Card sx={{ border: 1, padding: 1, mt: 3, borderRadius: 3 }}>
                <CardMedia
                  component="img"
                  alt="kioskmain"
                  height="600"
                  image="/kiosk/images/kioskmain.png"
                />
              </Card>
            </Grid>
          </Grid>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid sx={{ m: 1 }}>
              <Card sx={{ padding: 1 }}>
                <QRCode value={value} size={200} />
              </Card>
            </Grid>
            <Grid item xs={4} sx={{ m: 1 }}>
              <Card sx={{ padding: 1 }}>
                <QrReader
                  delay={2000}
                  onError={handleError}
                  onScan={handleScan}
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
