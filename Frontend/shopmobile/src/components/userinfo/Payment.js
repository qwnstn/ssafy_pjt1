import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import axios from "axios";
import HOST from "../../Host";
import { useState, useEffect } from "react";

export default function Payment() {
  const navigate = useNavigate();

  function PaymentDetail(purchaseId) {
    navigate(`/app/paymentdetail/${purchaseId}`);
  }

  const convertDate = (date) => {
    return date.split("T")[1];
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const accesstoken = localStorage.getItem("accesstoken");
      const API_URI = `${HOST}/user/purchase`;
      await axios
        .get(API_URI, {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        })
        .then((response) => {
          setRows(response.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid />
        <Grid item xs={12}>
          <Card
            sx={{
              fontSize: 33,
              padding: 2,
              textAlign: "center",
              backgroundColor: "#64b5f6",
              fontWeight: "bold",
            }}
          >
            결제내역
          </Card>
          <Paper style={{ height: "84vh", width: "100%" }}>
            <TableContainer
              sx={{
                border: 1,
                borderColor: "lightgray",
                maxHeight: 706
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
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20}}>
                      결제카드
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20}} align="right">
                      총금액
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20}} align="right">
                      결제날짜
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      onClick={() => PaymentDetail(row.id)}
                      key={row.id}
                    >
                      <TableCell sx={{fontWeight: 'bold', fontSize: 18}}>{row.payName}</TableCell>
                      <TableCell sx={{fontWeight: 'bold', fontSize: 18}} align="right">{row.buyTotal}원</TableCell>
                      <TableCell sx={{fontWeight: 'bold', fontSize: 18}} align="right">{convertDate(row.buyDate)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
