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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HOST from "../../Host";
import getPayloadFromToken from "../../getPayloadFromToken";

const mdTheme = createTheme();
const API_URI = `${HOST}/admin/users`;

export default function UserList() {
  const navigate = useNavigate();

  function UserDetail(userId) {
    navigate(`/admin/userdetail/${userId}`);
  }

  // 상품 목록 list axios통신
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
                    유저 목록
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
                        <TableRow>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            아이디
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            이름
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            성별
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            생년월일
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            핸드폰번호
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            onClick={() => UserDetail(row.id)}
                            key={row.id}
                          >
                            <TableCell>{row.loginId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.gender}</TableCell>
                            <TableCell>{row.birthDate}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
