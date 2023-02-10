import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Card, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HOST from "../../Host";

export default function Payment() {
  const { purchaseId } = useParams();
  const [pays, setPays] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const fetchData = async () => {
      try {
        const result = await axios.get(`${HOST}/user/purchase/${purchaseId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    // console.log(result.data);
        setPays(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [purchaseId]);

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
            결제상세내역
          </Card>
          <Paper style={{ height: "84vh", width: "100%" }}>
            <TableContainer
              sx={{
                border: 1,
                borderColor: "lightgray",
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
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20 }}>
                      제품명
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20 }} align="right">
                      개수
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: 20 }} align="right">
                      단가
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pays.map((pay) => (
                    <TableRow>
                      <TableCell sx={{fontWeight: 'bold', fontSize: 18}}>{pay.productName}</TableCell>
                      <TableCell sx={{fontWeight: 'bold', fontSize: 18}} align="right">{pay.count}</TableCell>
                      <TableCell sx={{fontWeight: 'bold', fontSize: 18}} align="right">{pay.price}원</TableCell>
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
