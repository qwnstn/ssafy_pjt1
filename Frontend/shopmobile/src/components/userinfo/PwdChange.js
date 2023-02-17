import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import HOST from "../../Host";
import { useNavigate } from "react-router";

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const PwdChange = () => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  });

  const theme = createTheme();
  const [phoneError, setPhoneError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pwdChangeError, setPwdChangeError] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const movePage = useNavigate();

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
        setPhone(data.phone);
        setEmail(data.email);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  const onhandlePatch = async (data) => {
    const jsonData = {
      password: data.password,
      phone: data.phone,
      email: data.email,
      adSelect: true,
    };

    const accesstoken = localStorage.getItem("accesstoken");
    // patch
    const API_URI = `${HOST}/user`;
    await axios
      .patch(API_URI, jsonData, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
          "Content-Type": "application/json",
        },
      })
      .then(function () {
        console.log("성공");
        movePage("/app/userinfo");
      })
      .catch(function (err) {
        console.log(err.response.status);
        setPwdChangeError(
          "회원정보변경에 실패하셨습니다. 다시한번 확인해주세요"
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      password: data.get("password"),
      rePassword: data.get("rePassword"),
      phone: data
        .get("phone")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`),
      email: data.get("mail"),
      adSelect: true,
    };
    const { password, rePassword, phone } = joinData;

    let flag = true;
    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setPasswordState(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      flag = false;
    } else setPasswordState("");

    // 비밀번호 같은지 체크
    if (password !== rePassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      flag = false;
    } else setPasswordError("");

    // 핸드폰 유효성 검사
    const phoneRegex = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("핸드폰 번호를 확인해주세요");
      flag = false;
    } else setPhoneError("");

    console.log(flag);
    if (flag) {
      onhandlePatch(joinData);
    }
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src="./images/logo.png" variant="square" sx={{ mb: 2 }} />
            <Typography component="h1" variant="h5">
              회원 정보 변경
            </Typography>
            <Boxs
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <FormControl>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                      error={passwordState !== "" || false}
                    />
                  </Grid>
                  <FormHelperTexts>{passwordState}</FormHelperTexts>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      label="비밀번호 재입력"
                      error={passwordError !== "" || false}
                    />
                  </Grid>
                  <FormHelperTexts>{passwordError}</FormHelperTexts>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      inputProps={{ maxLength: 11 }}
                      id="phone"
                      label="휴대폰(-없이 11자리)"
                      name="phone"
                      value={phone}
                      autoComplete="new-phone"
                      error={phoneError !== "" || false}
                    />
                  </Grid>
                  <FormHelperTexts>{phoneError}</FormHelperTexts>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="mail"
                      label="이메일"
                      type="email"
                      id="mail"
                      value={email}
                      autoComplete="new-email"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                >
                  회원정보변경
                </Button>
              </FormControl>
              <FormHelperTexts>{pwdChangeError}</FormHelperTexts>
            </Boxs>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default PwdChange;
