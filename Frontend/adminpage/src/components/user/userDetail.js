import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Grid,
  Paper,
  Toolbar,
  CssBaseline,
  Button,
  Modal,
  TextField,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Card,
} from "@mui/material";
import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import HOST from "../../Host";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getPayloadFromToken from "../../getPayloadFromToken";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 260,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const mdTheme = createTheme();

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [userid, setUserId] = useState(user.loginId || "아이디 호출 실패");
  const [password, setPassword] = useState(
    user.password || "패스워드 호출 실패"
  );
  const [name, setName] = useState(user.name || "이름 호출 실패");
  const [gender, setGender] = useState(user.gender || "성별 호출 실패");
  const [birthdate, setBirthdate] = useState(
    user.birthDate || "생년월일 호출 실패"
  );
  const [phone, setPhone] = useState(user.phone || "핸드폰 호출 실패");
  const [email, setEmail] = useState(user.email || "이메일 호출 실패");
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const fetchData = async () => {
      try {
        const result = await axios.get(`${HOST}/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(result.data.cards);
        setUser(result.data);
        setUserId(result.data.loginId);
        setPassword(result.data.password);
        setName(result.data.name);
        setGender(result.data.gender);
        setBirthdate(result.data.birthDate);
        setCards(result.data.cards);
        setPhone(result.data.phone);
        setEmail(result.data.email);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId]);

  const handleModifyUser = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const adSelect = false;
      const data = {
        userid,
        password,
        gender,
        birthdate,
        name,
        phone,
        email,
        adSelect,
      };
      await axios.patch(`${HOST}/admin/users/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const UserDelete = async (data) => {
    // TODO Delete
    const userId = data;
    const accessToken = localStorage.getItem("accesstoken");
    const API_URI = `${HOST}/admin/users/${userId}`;
    await axios
      .delete(API_URI, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        console.log("삭제완료");
        navigate("/admin/userlist");
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const [payload, setPayload] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const decodedPayload = getPayloadFromToken(accessToken);
    setPayload(decodedPayload);
  }, []);
  const obj = JSON.stringify(payload, ["roles"], 1);
  if (obj !== null) {
    const parsedObj = JSON.parse(obj);
    if (parsedObj && parsedObj.hasOwnProperty("roles")) {
      const adminCheck = parsedObj["roles"][0];
      if (adminCheck === "ROLE_ADMIN") {
        console.log("AdminLogin");
      } else {
        navigate("/admin/login");
      }
    } else {
      navigate("/admin/login");
    }
  } else {
    navigate("/admin/login");
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", ml: 30 }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: "#f1ffff",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 4 }}>
                    회원 상세 정보
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    [ {user.name || "이름 호출 실패"} ]
                  </Typography>
                  <Typography sx={{ flex: 1, mb: 1 }}>
                    로그인ID : {user.loginId || "아이디 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, mb: 1 }}>
                    성별 : {user.gender || "성별 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, mb: 1 }}>
                    생년월일 : {user.birthDate || "생년월일 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, mb: 1 }}>
                    핸드폰 : {user.phone || "핸드폰 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1 }}>
                    이메일 : {user.email || "이메일을 입력하지 않았습니다."}
                  </Typography>
                  <Card
                    sx={{
                      border: 1,
                      borderRadius: 3,
                      borderColor: "#90caf9",
                      mt: 2,
                    }}
                  >
                    <Table>
                      <TableHead>
                        <Typography
                          component="h2"
                          variant="h5"
                          color="primary"
                          gutterBottom
                          sx={{ fontWeight: "bold", margin: 1 }}
                        >
                          등록 카드 목록
                        </Typography>
                      </TableHead>
                      <TableBody>
                        {cards.map((card, index) => (
                          <TableRow key={index}>
                            <TableCell>{card}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </Paper>
                <Button
                  sx={{ mt: 1, mr: 1, fontWeight: "bold" }}
                  variant="contained"
                  onClick={handleOpen}
                >
                  회원수정
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ mb: 2 }}
                    >
                      회원 수정
                    </Typography>
                    <TextField
                      required
                      id="userid"
                      label="아이디"
                      value={userid}
                      variant="standard"
                      onChange={(event) => setUserId(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      id="password"
                      label="비밀번호"
                      type="password"
                      variant="standard"
                      onChange={(event) => setPassword(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="name"
                      label="이름"
                      value={name}
                      variant="standard"
                      onChange={(event) => setName(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="gender"
                      label="성별"
                      value={gender}
                      variant="standard"
                      onChange={(event) => setGender(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="birthdate"
                      label="생년월일"
                      value={birthdate}
                      variant="standard"
                      onChange={(event) => setBirthdate(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="phone"
                      label="핸드폰"
                      value={phone}
                      variant="standard"
                      onChange={(event) => setPhone(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <Button
                      sx={{ mt: 1, ml: 8 }}
                      variant="contained"
                      onClick={handleModifyUser}
                    >
                      수정
                    </Button>
                  </Box>
                </Modal>
                <Button
                  onClick={() => UserDelete(userId)}
                  sx={{ mt: 1, fontWeight: "bold" }}
                  variant="contained"
                >
                  회원탈퇴
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserDetail;
