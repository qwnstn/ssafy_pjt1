import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 결제하기 버튼 하단에 추가필요

// 세션 데이터
const session = JSON.parse(sessionStorage.getItem("data"));

// 카드 목록 리스트 - 세션을 통해 값을 받아와야함
const cards = sessionStorage.getItem("data") ? session["cardList"] : null
// console.log(session)

// 메인 카드 번호 세션에서 값 받기
const defaultCardId = sessionStorage.getItem("data") ? session["defaultCardId"] : null;

export default function CardInfo() {
  const navigate = useNavigate();
  // 유저 정보에서 card id 뽑아서 저장
  // 버튼 누를 시 계속 바뀌고 결제 버튼 시 값 보내기
  // console.log('m', mainCard)
  // console.log('c', cards)
  // cards.find((object) => object.cardId === defaultCardId)
  const [mainCard, setMainCard] = useState(
    cards.find((object) => object.cardId === defaultCardId)
  );

  const cardImage = (data) => {
    if (data === "현대") {
      return "/kiosk/images/hyundai.png";
    } else if (data === "ibk") {
      return "/kiosk/images/ibk.png";
    } else if (data === "하나") {
      return "/kiosk/images//hana.png";
    } else if (data === "신한") {
      return "/kiosk/images/shinhan.png";
    } else if (data === "우리") {
      return "/kiosk/images/woori.png";
    } else {
      return "/kiosk/images/samsung.png";
    }
  };

  const API_URI = "http://192.168.30.114:8000/api/pay/member"
  const ResultPayment = async (data) => {
    const cardId = {
      cardId: data.cardId
    }
    console.log(cardId);
    axios
      .post(API_URI, cardId)
      .then(() => {
        console.log("결제완료");
        navigate("/kiosk/resultpayment");
      })
      .catch((error) => {
        console.error(error);
      });

  };

  // 카드 목록 등록 함수
  const renderCards = () => {
    return cards.map((card, index) => {
      return (
        <Grid item margin={1} key={index}>
          <Button
            sx={{ width: "100%", height: "100%", p: 0 }}
            onClick={() => {
              // console.log("클릭");
              setMainCard(card);
            }}
          >
            <CardMedia component="img" image={cardImage(card["cardName"])} />
          </Button>
        </Grid>
      );
    });
  };

  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Card
          style={{
            border: 1,
            width: "90%",
            textAlign: "center",
            flexShrink: 0,
            maxWidth: "500px",
          }}
        >
          <CardHeader
            title="결제 카드"
            style={{ textAlign: "center", borderBottom: 1 }}
          />
          <Grid item margin={1}>
            <CardMedia
              component="img"
              image={mainCard ? cardImage(mainCard["cardName"]) : null}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Card>

        <Card
          style={{
            border: 1,
            width: "90%",
            textAlign: "center",
            maxWidth: "500px",
          }}
        >
          <CardHeader
            title="바꿀 카드를 선택하세요"
            style={{
              textAlign: "center",
              borderBottom: 1,
              wordWrap: "break-word",
            }}
          />
          <div
            style={{
              overflowY: "scroll",
              height: "92%",
              flexShrink: 0,
              marginBottom: 10,
              maxHeight: "60vh",
            }}
          >
            {renderCards()}
          </div>
        </Card>
        <div style={{ position: "absolute", bottom: 10, marginTop: 20 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/kiosk/itemlist")}
            sx={{
              fontSize: 30,
              fontWeight: "bold",
              mr: 3,
            }}
          >
            뒤로가기
          </Button>
          <Button
            variant="contained"
            onClick={() => ResultPayment(mainCard)}
            sx={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            결제하기
          </Button>
        </div>
      </Box>
    </Box>
  );
}
