import React, {useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import HOST from "../Host";

// 결제하기 버튼 하단에 추가필요

export default function CardInfo() {
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

  const accesstoken = localStorage.getItem("accesstoken");

  // 카드 목록 리스트 - 카드정보 통신을 통해 값을 받아와야함
  const [cards, setCards] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${HOST}/user/card`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      setCards(data);
      // console.log('카드 목록',data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 메인 카드 pk
  const [defaultCardId, setDefaultCardId] = useState();
  // console.log('메인카드번호',defaultCardId)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${HOST}/user`, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      setDefaultCardId(data.defaultCardId);
      // console.log('asdasdasda',data.defaultCardId)
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 유저 정보에서 card id 뽑아서 저장
  const [mainCard, setMainCard] = useState();
  useEffect(() => {
    setMainCard(cards.find((object) => object.cardId === defaultCardId));
  });

  // 카드 목록 등록 함수
  const renderCards = () => {
    return cards.map((card, index) => {
      return (
        <Grid item margin={1} key={index}>
          <Button
            sx={{ width: "100%", height: "100%", p: 0 }}
            onClick={console.log('클릭')}
          >
            <CardMedia component="img" image={cardImage(card["name"])} />
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
              image={mainCard.length > 0 ? cardImage(mainCard[2]) : null}
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
          <div style={{ overflowY: "scroll", height: "90%", flexShrink: 0 }}>
            {renderCards()}
          </div>
        </Card>
      </Box>
    </Box>
  );
}
