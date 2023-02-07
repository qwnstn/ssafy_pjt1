import * as React from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Grid,
  Paper,
  Toolbar,
  CssBaseline,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
} from "@mui/material";
import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import HOST from "../../Host";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import getPayloadFromToken from "../../getPayloadFromToken";

const mdTheme = createTheme();

const PayDetail = () => {
  const { buyId } = useParams();
  const [pays, setPays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const fetchData = async () => {
      try {
        const result = await axios.get(`${HOST}/admin/pays/${buyId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPays(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [buyId]);

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
                  <Typography
                    component="h2"
                    variant="h5"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    결제 상세
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
                            번호
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            쿠폰여부
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            상품ID
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            가격
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            제품명
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pays.map((row) => (
                          <TableRow
                            key={row.id}
                          >
                            <TableCell>{row.count + 1}</TableCell>
                            <TableCell>{row.couponName}</TableCell>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.productName}</TableCell>
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
};

export default PayDetail;
