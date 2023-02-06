import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import HOST from "../../Host";



export default function CardInfo() {
  // const navigate = useNavigate();

  const cardImage = (date) => {
    if (date === "현대") {
      return "/app/images/hyundai.png";
    } else if (date === "ibk") {
      return "/app/images/ibk.png";
    } else if (date === "하나") {
      return "/app/images//hana.png";
    } else if (date === "신한") {
      return "/app/images/shinhan.png";
    } else if (date === "우리") {
      return "/app/images/woori.png";
    } else {
      return "/app/images/samsung.png";
    }
  };

  // 카드 목록 리스트 - 카드정보 통신을 통해 값을 받아와야함
  const [cards, setCards] = useState([]);

  
  const API_URI = `${HOST}/user/card`;
  
  useEffect(() => {
    (async () => {
      let accesstoken = localStorage.getItem("accesstoken");
      const { data } = await axios.get(API_URI, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      setCards(data)
      // console.log(data);
    })();
  }, []);
  


  // 메인 카드 pk
  const [defaultCardId, setDefaultCardId] = useState([]);
  
  const API_URI_2 = `${HOST}/user`;
  
  useEffect(() => {
    (async () => {
      let accesstoken = localStorage.getItem("accesstoken");
      const { data } = await axios.get(API_URI_2, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      setDefaultCardId(data.defaultCardId)
    })();
  }, []);
  
  // 유저 정보에서 card id 뽑아서 저장
  const mainCard = cards.find(object => object.cardId === defaultCardId);


  // setMainCard(main.cardId) 

  // 카드 목록 등록 함수
  const renderCards = () => {
    return cards.map((card, index) => {
      return (
        <Grid item margin={1} key={index}>
          <Button
            sx={{ width: "100%", height: "100%", p: 0 }}
            onClick={() => {
              // console.log(card);
              // 메인 카드 교체 axios 통신
              // const API_URI_3 = `${HOST}/user/card/${card.cardId}/main`;
              // useEffect(() => {
              //   (async () => {
              //     let accesstoken = localStorage.getItem("accesstoken");
              //     const { data } = await axios.patch(API_URI_3, {
              //       cardId: "2"
              //     }, {
              //       headers: {
              //         Authorization: `Bearer ${accesstoken}`,
              //       },
              //     });
              //     setDefaultCardId(data.defaultCardId)
              //   })();
              // }, []);
            }}
          >
            <CardMedia component="img" image={cardImage(card['name'])} />
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
            title="메인 카드"
            style={{ textAlign: "center", borderBottom: 1 }}
          />
          <Grid item margin={1}>
            <CardMedia
              component="img"
              image={mainCard ? cardImage(mainCard['name']) : null}
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Card>

        <Card
          style={{
            width: "90%",
            textAlign: "center",
            maxWidth: "500px",
            paddingBottom: cards.length ? 70 : 0,
            marginBottom: 70
          }}
        >
          <CardHeader
            title="내 카드 목록"
            style={{
              textAlign: "center",
              borderBottom: 1,
              wordWrap: "break-word",
            }}
          />
          <div style={{ overflowY: "scroll", height: "100%", flexShrink: 0, scrollbarWidth: "none" }}>
            {renderCards()}
            <Button
              id="addCard"
              onClick={() => {
                window.location.href = "/app/addcard";
              }}
            >
              <CardMedia
                sx={{ borderStyle: "dashed", borderRadius: 3, color: "gray" }}
                component="img"
                image="/app/images/addCard.png"
              />
            </Button>
          </div>
        </Card>
      </Box>
    </Box>
  );
}
