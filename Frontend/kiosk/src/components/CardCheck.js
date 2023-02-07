import React, { useState } from "react";
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
      return null;
    }
  };

  // 카드 목록 리스트 - 카드정보 통신을 통해 값을 받아와야함
  const cards = [
    ["1", "1234-5678-9234-2345", "신한", "0124"],
    ["2", "1234-5678-9234-2345", "현대", "0124"],
    ["3", "1234-5678-9234-2345", "ibk", "0124"],
    ["4", "1234-5678-9234-2345", "하나", "0124"],
    ["5", "1234-5678-9234-2345", "우리", "0124"],
  ];

  const API_URI = `${HOST}/card`;
  // const HOST = 'https://himart.shop/api'


  // accesstoken을 키오스크가 어떻게 가지고있지?
  // useEffect(() => {
  //   (async () => {
  //     let accesstoken = localStorage.getItem("accesstoken");

  //     const { data } = await axios.get(API_URI, {
  //       headers: {
  //         Authorization: `Bearer ${accesstoken}`,
  //       },
  //     });
  //     console.log(data);

  //   });
  // });



  const [mainCard, setMainCard] = useState([     "4",     "1234-5678-9234-2345",     "하나",     "0124",  ]);
  // 유저 정보에서 card id 뽑아서 카드 목록과 비교 후 저장

  // 카드 목록 등록 함수
  const renderCards = () => {
    return cards.map((card, index) => {
      return (
        <Grid item margin={1} key={index}>
          <Button
            sx={{ width: "100%", height: "100%", p: 0 }}
            onClick={() => {
              setMainCard(card);
            }}
          >
            <CardMedia component="img" image={cardImage(card[2])} />
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
