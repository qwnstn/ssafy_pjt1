import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";
import axios from "axios";
import HOST from "../../Host";
import { useNavigate } from "react-router-dom";

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const AddCard = () => {
  const navigate = useNavigate();

  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  });

  const [checked, setChecked] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardCompany, setCardCompany] = useState("");
  const [error, setError] = useState({
    cardNumber: false,
    cardExpiration: false,
    cardCVC: false,
  });

  const theme = createTheme();

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  const handleSubmit = (e) => {
    let accesstoken = localStorage.getItem("accesstoken");
    e.preventDefault();
    // 개인정보 수집 및 이용 동의 체크
    if (!checked) alert("개인정보 수집 및 이용에 동의해주세요.");
    else {
      if (
        cardNumber.length !== 16 ||
        cardExpiration.length !== 4 ||
        cardCVC.length !== 3 ||
        cardCompany === ""
      ) {
        setError({
          cardNumber: cardNumber === "",
          cardExpiration: cardExpiration === "",
          cardCVC: cardCVC === "",
        });
        alert("카드정보를 다시 입력해주세요.");
      } else {
        // Make API call to register card
        const API_URI = `${HOST}/user/card/`;
        // 카드 번호 형식에 맞게 변형
        let cardNo = cardNumber;
        cardNo = cardNo.match(/.{1,4}/g).join("-");
        // 카드 유효기간 맞는지 확인
        const currentYear = new Date().getFullYear().toString().substr(-2);
        const currentMonth = new Date().getMonth() + 1;
        if (
          cardExpiration.match(/^\d{2}(0[1-9]|1[0-2])$/) &&
          cardExpiration.substr(0, 2) >= currentYear &&
          parseInt(cardExpiration.substr(0, 2)) +
            parseInt(cardExpiration.substr(2)) >=
            parseInt(currentYear) + currentMonth
        ) {
          axios
            .post(
              API_URI,
              {
                cardNo: cardNo,
                name: cardCompany,
                validDate: cardExpiration,
                cvc: cardCVC,
              },
              {
                headers: {
                  Authorization: `Bearer ${accesstoken}`,
                },
              }
            )
            .then((res) => {
              alert("카드 등록이 완료되었습니다");
              navigate("/app/mycard");
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          setError({ ...error, cardExpiration: true });
        }
      }
    }
  };

  const handleCardNumber = (e) => {
    const cardNum = e.target.value;
    if (/[^0-9]/g.test(cardNum)) {
      setError({ ...error, cardNumber: true });
    } else {
      setError({ ...error, cardNumber: false });
      setCardNumber(cardNum);
    }
  };

  const handleCardExpiration = (e) => {
    const cardExp = e.target.value;
    if (/[^0-9]/g.test(cardExp)) {
      setError({ ...error, cardExpiration: true });
    } else {
      setError({ ...error, cardExpiration: false });
      setCardExpiration(cardExp);
    }
  };

  const handleCardCVC = (e) => {
    const cardCVC = e.target.value;
    if (/[^0-9]/g.test(cardCVC)) {
      setError({ ...error, cardCVC: true });
    } else {
      setError({ ...error, cardCVC: false });
      setCardCVC(cardCVC);
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
              카드등록
            </Typography>
            <Boxs component="form" noValidate sx={{ mt: 3 }}>
              <FormControl>
                <Grid container spacing={2}>
                  <Container>
                    <Boxs onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            error={error.cardNumber}
                            required
                            fullWidth
                            id="cardNumber"
                            label="카드번호"
                            value={cardNumber}
                            onChange={handleCardNumber}
                            inputProps={{ maxLength: 16 }}
                          />
                          {error.cardNumber && (
                            <FormHelperText error>
                              올바른 값을 입력해주세요.
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            error={error.cardExpiration}
                            required
                            fullWidth
                            id="cardExpiration"
                            label="유효기간(YYMM)"
                            value={cardExpiration}
                            onChange={handleCardExpiration}
                            inputProps={{ maxLength: 4 }}
                          />
                          {error.cardExpiration && (
                            <FormHelperText error>
                              올바른 값을 입력해주세요.
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            error={error.cardExpiration}
                            required
                            fullWidth
                            id="cardCVC"
                            label="카드 CVC"
                            value={cardCVC}
                            onChange={handleCardCVC}
                            inputProps={{ maxLength: 3 }}
                          />
                          {error.cardExpiration && (
                            <FormHelperText error>
                              올바른 값을 입력해주세요.
                            </FormHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <FormLabel>카드회사</FormLabel>
                            <Select
                              value={cardCompany}
                              onChange={(e) => setCardCompany(e.target.value)}
                            >
                              <MenuItem value="신한">신한</MenuItem>
                              <MenuItem value="현대">현대</MenuItem>
                              <MenuItem value="ibk">ibk</MenuItem>
                              <MenuItem value="하나">하나</MenuItem>
                              <MenuItem value="우리">우리</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Boxs>
                  </Container>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleAgree} color="primary" />
                      }
                      label="개인정보 수집 및 이용에 동의합니다.(필수)"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ height: "50px" }}
                  onClick={handleSubmit}
                >
                  카드등록
                </Button>
              </FormControl>
            </Boxs>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default AddCard;
