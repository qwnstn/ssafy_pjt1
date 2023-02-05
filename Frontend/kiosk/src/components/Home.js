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


// 웹소켓의 통신이 오면 rfid read 페이지로 넘어간뒤, 

// 비회원 결제 버튼을 누르면 rfid read 페이지로 넘어간뒤, itemlist 페이지로 넘어가는 기능


export default function KioskMain() {
  const navigate = useNavigate();

  // 키오스크 아이디는 무슨 기준으로 정하는가?
  const kioskId = 1


  const [value, setValue] = useState(`${kioskId}/${Date.now()}`);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(`${kioskId}/${Date.now()}`);
    }, 59000);
    // 59초
    return () => clearInterval(interval);
  }, []);

  // const [socket, setSocket] = useState(null);
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const ws = new WebSocket("ws://192.168.40.111:8888");

  //   ws.onopen = () => {
  //     console.log("WebSocket connection established.");
  //   };

  //   ws.onmessage = (event) => {
  //     setMessages((prevMessages) => [...prevMessages, event.data]);
  //   };

  //   setSocket(ws);

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  // const sendMessage = (event) => {
  //   event.preventDefault();
  //   socket.send(message);
  //   setMessage("");
  // };

  useEffect(() => {
    sessionStorage.removeItem("user");
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        sessionStorage.setItem("user", "user");
        navigate("/kiosk/rfidread");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

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
          {/* <div>
            <h1>WebSocket Chat</h1>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
            <form onSubmit={sendMessage}>
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div> */}
        </Box>
      </Card>
    </Box>
  );
}
