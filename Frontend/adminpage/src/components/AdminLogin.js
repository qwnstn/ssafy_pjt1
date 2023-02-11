import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import axios from "axios";
import { FormControl } from "@mui/material";
import HOST from "../Host";
import { useNavigate } from "react-router-dom";
import getPayloadFromToken from "../getPayloadFromToken";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const theme = createTheme();

const SignIn = () => {
  const [userIdError, setUserIdError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [loginError, setLoginError] = useState("");
  const movePage = useNavigate();

  const onhandlePost = async (data) => {
    const { userid, password } = data;

    const formData = new FormData();
    formData.append("username", userid);
    formData.append("password", password);
    // console.log(formData);

    // post
    const API_URI = `${HOST}/login`;
    console.log(API_URI);
    await axios
      .post(API_URI, formData)
      .then((response) => {
        localStorage.setItem("accesstoken", response.headers["accesstoken"]);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.headers["accesstoken"]}`;

        const decodedPayload = getPayloadFromToken(response.headers["accesstoken"]);
        const obj = JSON.stringify(decodedPayload, ["roles"], 1);
        console.log(obj);
        if (obj !== null) {
          const parsedObj = JSON.parse(obj);
          if (parsedObj && parsedObj.hasOwnProperty("roles")) {
            const adminCheck = parsedObj["roles"][0];
            if (adminCheck === "ROLE_ADMIN") {
              movePage("/admin");
              window.location.reload();
            } else {
              setLoginError("관리자 로그인 실패");
            }
          }
          setLoginError("관리자 로그인 실패");
        }
        setLoginError("관리자 로그인 실패");
      })
      .catch(function (err) {
        console.log(err);
        setLoginError("관리자 로그인 실패");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      userid: data.get("userid"),
      password: data.get("password"),
    };
    const { userid, password } = joinData;

    let flag = true;
    // 아이디 입력 체크
    const idRegax = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,15}$/;
    if (!idRegax.test(userid)) {
      setUserIdError("아이디를 입력해주세요");
      flag = false;
    } else setUserIdError("");

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setPasswordState("비밀번호를 제대로 입력해주세요!");
      flag = false;
    } else setPasswordState("");

    if (flag) {
      onhandlePost(joinData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 5,
          }}
        >
          <Avatar
            src="./images/logo.png"
            variant="square"
            sx={{ my: 2, mt: 15 }}
          />
          <Typography component="h1" variant="h5">
            관리자 로그인
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="userid"
                    name="userid"
                    label="아이디"
                    error={userIdError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{userIdError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호"
                    error={passwordState !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
              </Grid>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              로그인
            </Button>
            <FormHelperTexts>{loginError}</FormHelperTexts>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
