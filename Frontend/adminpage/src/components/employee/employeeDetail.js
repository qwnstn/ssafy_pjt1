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

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState(employee.name || "이름 호출 실패");
  const [position, setPosition] = useState(employee.position || "직급 호출 실패");
  const [part, setPart] = useState(employee.part || "담당 호출 실패");
  const [staffLoginId, setStaffLoginId] = useState(employee.staffLoginId || "직원로그인ID 호출 실패");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const fetchData = async () => {
      try {
        const result = await axios.get(`${HOST}/admin/employees/${employeeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setEmployee(result.data);
        setName(result.data.name);
        setPosition(result.data.position);
        setPart(result.data.part);
        setStaffLoginId(result.data.staffLoginId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [employeeId]);

  const handleModifyEmployee = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const data = { name, position, part, staffLoginId };
      await axios.patch(`${HOST}/admin/employees/${employeeId}`, data, {
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

  const EmployeeDelete = async (data) => {
    // TODO Delete
    const employeeId = data;
    const accessToken = localStorage.getItem("accesstoken");
    const API_URI = `${HOST}/admin/employees/${employeeId}`;
    await axios
      .delete(API_URI, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        console.log("삭제완료");
        navigate("/admin/employeelist");
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
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    {employee.name || "이름 호출 실패"}
                  </Typography>
                  <Typography>
                    직원ID : {employee.id || "직원ID 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, my: 1 }}>
                    직급 : {employee.position || "직급 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, mb: 1 }}>
                    역할 : {employee.part || "담당 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, mb: 1 }}>
                    직원로그인ID : {employee.staffLoginId || "직원로그인ID 호출 실패"}
                  </Typography>
                </Paper>
                <Button
                  sx={{ mt: 1, mr: 1, fontWeight: "bold" }}
                  variant="contained"
                  onClick={handleOpen}
                >
                  직원정보수정
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
                      직원정보수정
                    </Typography>
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
                      id="position"
                      label="직급"
                      value={position}
                      variant="standard"
                      onChange={(event) => setPosition(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="part"
                      label="역할"
                      value={part}
                      variant="standard"
                      onChange={(event) => setPart(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="staffLoginId"
                      label="직원로그인ID"
                      value={staffLoginId}
                      variant="standard"
                      onChange={(event) => setStaffLoginId(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <Button
                      sx={{ mt: 1, ml: 8 }}
                      variant="contained"
                      onClick={handleModifyEmployee}
                    >
                      수정
                    </Button>
                  </Box>
                </Modal>
                <Button
                  onClick={() => EmployeeDelete(employeeId)}
                  sx={{ mt: 1, fontWeight: "bold" }}
                  variant="contained"
                >
                  직원 삭제
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EmployeeDetail;
