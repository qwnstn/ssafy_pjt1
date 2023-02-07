import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HOST from "../../Host";
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
const API_URI = `${HOST}/admin/employees`;

export default function EmployeeList() {
  const navigate = useNavigate();

  function EmployeeDetail(employeeId) {
    navigate(`/admin/employeedetail/${employeeId}`);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 직원 목록 list axios통신
  const [rows, setRows] = useState([]);
  const [payload, setPayload] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    axios
      .get(API_URI, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setRows(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
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

  const handleAddEmployee = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const branchId = document.getElementById("branchId").value;
      const name = document.getElementById("name").value;
      const position = document.getElementById("position").value;
      const part = document.getElementById("part").value;
      const staffLoginId = document.getElementById("staffLoginId").value;
      const data = { branchId, name, position, part, staffLoginId };
      await axios.post(API_URI, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Typography
                    component="h2"
                    variant="h5"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    직원 리스트
                  </Typography>
                  <TableContainer
                    sx={{
                      border: 1,
                      borderColor: "lightgray",
                      borderRadius: 3,
                      minHeight: 567,
                      maxHeight: 567,
                    }}
                  >
                    <Table size="small">
                      <TableHead>
                        <TableRow
                          sx={{
                            backgroundColor: "#90caf9",
                            borderBottom: 1,
                          }}
                        >
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            직원ID
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            직원로그인ID
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            직원이름
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            직급
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            담당
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            onClick={() => EmployeeDetail(row.id)}
                            key={row.id}
                          >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.staffLoginId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.position}</TableCell>
                            <TableCell>{row.part}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Button
                  onClick={handleOpen}
                  sx={{ mt: 1, fontWeight: "bold" }}
                  variant="contained"
                >
                  직원 추가
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
                      직원 추가
                    </Typography>
                    <TextField
                      required
                      id="branchId"
                      label="지점아이디"
                      variant="standard"
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="name"
                      label="직원이름"
                      variant="standard"
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="position"
                      label="직급"
                      variant="standard"
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="part"
                      label="역할"
                      variant="standard"
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="staffLoginId"
                      label="직원로그인ID"
                      variant="standard"
                      sx={{ mb: 5 }}
                    />
                    <Button
                      sx={{ mt: 1, ml: 8 }}
                      variant="contained"
                      onClick={() => {
                        handleAddEmployee();
                      }}
                    >
                      추가
                    </Button>
                  </Box>
                </Modal>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
