import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";

const theme = createTheme();

export default function ResultPayment() {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const itemList = Nav();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setRedirect(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (itemList.length > 0) {
      sessionStorage.setItem("data", itemList);
      console.log(itemList);
      console.log(typeof itemList);
      setRedirect(true);
    } else {
      console.log("itemlist가 비어있음");
    }
  }, [itemList]);

  if (redirect) {
    navigate(countdown > 0 ? "/kiosk/itemlist" : "/kiosk");
  }

  useEffect(() => {
    (async () => {
      console.log("통신");
      await axios
        .get("http://localhost:8888/api/kiosk/rfid")
        .then((res) => {
          console.log("성공");
        })
        .catch((error) => {
          console.log("RFID 리더 요청 에러");
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          sx={{
            height: "100vh",
            width: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src="/kiosk/images/logo.png"
            sx={{ mb: 3 }}
            variant="square"
          />
          <Typography component="h1" variant="h3" sx={{ my: 1 }}>
            태그를
          </Typography>
          <Typography component="h1" variant="h3" sx={{ mb: 3 }}>
            인식시켜주십시오
            <LinearProgress sx={{ mt: 3 }} />
          </Typography>
          <Typography sx={{ color: "blue", fontSize: 20 }}>
            {countdown}초뒤 메인으로 돌아갑니다.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
