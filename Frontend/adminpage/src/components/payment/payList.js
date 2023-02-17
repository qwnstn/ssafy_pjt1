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
const API_URI = `${HOST}/admin/pays`;

export default function PayList() {
  const navigate = useNavigate();
  const convertDate = (date) => {
    return date.split("T")[0];
  };

  function PayDetail(buyId, userName) {
    navigate(`/admin/paydetail/${buyId}`, { userName });
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
                    결제 목록
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
                            결제ID
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            결제카드
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            결제가격
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            결제날짜
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            결제자
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            onClick={() => PayDetail(row.id, row.userName)}
                            key={row.id}
                          >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.payName}</TableCell>
                            <TableCell>{row.buyTotal}원</TableCell>
                            <TableCell>{convertDate(row.buyDate)}</TableCell>
                            <TableCell>{row.userName}</TableCell>
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
