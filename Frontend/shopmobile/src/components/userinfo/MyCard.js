import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import HOST from "../../Host";



export default function CardInfo() {
  // const navigate = useNavigate();

  const cardImage = (data) => {
    if (data === "현대") {
      return "/app/images/hyundai.png";
    } else if (data === "ibk") {
      return "/app/images/ibk.png";
    } else if (data === "하나") {
      return "/app/images//hana.png";
    } else if (data === "신한") {
      return "/app/images/shinhan.png";
    } else if (data === "우리") {
      return "/app/images/woori.png";
    } else {
      return "/app/images/samsung.png";
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

      setCards(data)
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
      setDefaultCardId(data.defaultCardId)
      // console.log('asdasdasda',data.defaultCardId)
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  

  
  // 유저 정보에서 card id 뽑아서 저장
  const [mainCard, setMainCard] = useState();
  useEffect(() => {
    setMainCard(cards.find(object => object.cardId === defaultCardId));
  });


  // 카드 목록 등록 함수
  const renderCards = () => {
    return cards.map((card, index) => {
      return (
        <Grid item margin={1} key={index}>
          <Button
            sx={{ width: "100%", height: "100%", p: 0 }}
            onClick={async () => {
                await axios.patch(`${HOST}/user/card/${card.cardId}/main`, null ,{
                  headers: {
                    Authorization: `Bearer ${accesstoken}`,
                  },
                });
                setDefaultCardId(card.cardId)
                setMainCard(cards.find(object => object.cardId === card.cardId))
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
