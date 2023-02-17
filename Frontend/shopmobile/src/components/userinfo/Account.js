import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Card, Container } from "@mui/material";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HOST from "../../Host";
import { useState, useEffect } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserSecession = async () => {
  // TODO Delete
  const accessToken = localStorage.getItem("accesstoken");
  // console.log("삭제완료");

  const navigate = useNavigate();
  const API_URI = `${HOST}/user`;
  await axios
    .delete(API_URI, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {
      console.log("삭제완료");
      localStorage.removeItem("accesstoken");
      navigate("/app");
    })
    .catch(function (err) {
      console.log(err);
      alert("오류발생")
    });
};

export default function Account() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setbirthDate] = useState("");

  const useConfirm = (message = "", onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };

  const confirmDelete = useConfirm(
    "정말 탈퇴하시겠습니까?",
    UserSecession,
    () => console.log("Cancelled")
  );

  const API_URI = `${HOST}/user`;

  useEffect(() => {
    (async () => {
      const accesstoken = localStorage.getItem("accesstoken");

      try {
        const { data } = await axios.get(API_URI, {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        });
        setUserId(data.loginId);
        setName(data.name);
        setPhone(data.phone);
        setGender(data.gender);
        setEmail(data.email);
        setbirthDate(data.birthDate);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          flexGrow: 1,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            mt: 2,
            border: 1,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 35,
            backgroundColor: "#64b5f6",
          }}
        >
          내 정보 수정
        </Card>
        <Grid container spacing={2} sx={{ mt: 1, mb: 1}}>
          <Grid item xs={4}>
            <Item sx={{fontWeight:'bold'}}>아이디</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{userId}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{fontWeight:'bold'}}>패스워드</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>●●●●●●●●●●●●</Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{fontWeight:'bold'}}>이름</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{name}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{fontWeight:'bold'}}>휴대전화</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{phone ? phone : "."}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{fontWeight:'bold'}}>성별</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{gender}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{fontWeight:'bold'}}>생년월일</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{birthDate}</Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{fontWeight:'bold'}}>이메일</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>{email ? email : "."}</Item>
          </Grid>
        </Grid>
        <Grid container sx={{ mt: 2, mb: 2 }}>
          <Grid item xs>
            <Link onClick={confirmDelete} variant="body2">회원 탈퇴</Link>
          </Grid>
          <Grid item>
            <Link href="/app/pwdchange" variant="body2">
              회원 정보 변경
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
