import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HOST from "../../Host";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import getPayloadFromToken from "../../getPayloadFromToken";

const API_URI = `${HOST}/admin/report/sale`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Orders() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  const [payload, setPayload] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    axios
      .get(API_URI, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
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
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>최근 판매 Report</Typography>
      <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>판매일</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell>지역</TableCell>
            <TableCell align="right">키오스크ID</TableCell>
            <TableCell align="right">판매금액</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(-5).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell align="right">{row.kiosk}</TableCell>
              <TableCell align="right">{`${row.sales}원`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleOpen}>
        전체 내역 보기
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, overflow: "auto", maxHeight: 500 }}>
          <Typography variant="h5" sx={{mb:2, color:'blue'}}>전체 판매 Report</Typography>
          <Table size="small" sx={{ mb: 2, width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>판매일</TableCell>
                <TableCell>카테고리</TableCell>
                <TableCell>지역</TableCell>
                <TableCell align="right">키오스크ID</TableCell>
                <TableCell align="right">판매금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell align="right">{row.kiosk}</TableCell>
                  <TableCell align="right">{`${row.sales}원`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
