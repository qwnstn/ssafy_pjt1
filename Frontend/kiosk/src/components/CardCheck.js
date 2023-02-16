import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Grid, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CardInfo() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [defaultCardId, setDefaultCardId] = useState([]);
  const [mainCard, setMainCard] = useState();
  const [cardId, setCardId] = useState();

  useEffect(() => {
    // 세션 데이터
    const data = sessionStorage.getItem("data");
    let session;

    if (typeof data === "string") {
      try {
        session = JSON.parse(data);
        setCards(sessionStorage.getItem("data") ? session["cardList"] : null);
        setDefaultCardId(
          sessionStorage.getItem("data") ? session["defaultCardId"] : null
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [defaultCardId]);

  useEffect(() => {
    const card = cards.find((object) => object.cardId === defaultCardId);
    if (card) {
      setCardId(card.cardNo);
      setMainCard(card);
    }
  }, [cards, defaultCardId]);

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

  const API_URI = "http://localhost:8888/api/pay/member";
  const ResultPayment = async (data) => {
    const cardId = {
      cardId: data.cardId,
    };
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
              setCardId(card.cardNo);
            }}
          >
            <CardMedia component="img" image={cardImage(card["cardName"])} />
            <Typography
              sx={{
                color: "black",
                position: "absolute",
                bottom: 40,
                left: 100,
                fontWeight: "bold",
                fontSize: 28,
              }}
            >
              {card["cardNo"]}
            </Typography>
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
          sx={{borderRadius:3}}
        >
          <CardHeader
            title="결제 카드"
            style={{ textAlign: "center", borderBottom: 1 }}
            sx={{backgroundColor:'#ff8c8c'}}
          />
          <Grid item margin={1}>
            <CardMedia
              component="img"
              image={mainCard ? cardImage(mainCard["cardName"]) : null}
              style={{ width: "100%", height: "auto" }}
            />
            <Typography
              sx={{
                color: "black",
                position: "absolute",
                top: 265,
                left: 244,
                fontWeight: "bold",
                fontSize: 28,
              }}
            >
              {cardId}
            </Typography>
          </Grid>
        </Card>

        <Card
          style={{
            border: 1,
            width: "90%",
            textAlign: "center",
            maxWidth: "500px",
          }}
          sx={{borderRadius:3}}
        >
          <CardHeader
            title="바꿀 카드를 선택하세요"
            style={{
              textAlign: "center",
              borderBottom: 1,
              wordWrap: "break-word",
            }}
            sx={{backgroundColor:"#90caf9"}}
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
