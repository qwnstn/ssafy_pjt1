import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import Modal from "@mui/material/Modal";
// import ReactRouterPrompt from "react-router-prompt";

const columns = [
  { id: "name", label: "품명", minWidth: 140 },
  { id: "price", label: "단가", minWidth: 50 },
  {
    id: "cnt",
    label: "수량",
    minWidth: 70,
    align: "right",
  },
  {
    id: "fullprice",
    label: "총액",
    minWidth: 70,
    align: "right",
  },
];

const lstStyle = {
  fontSize: "24px",
};

function UserTrue() {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => navigate("/kiosk/cardcheck")}
      sx={{
        position: "absolute",
        right: 0,
        fontSize: 30,
        fontWeight: "bold",
        margin: 1,
      }}
    >
      결제하기
    </Button>
  );
}

function UserFalse() {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      onClick={() => navigate("/kiosk/cardpayment")}
      sx={{
        position: "absolute",
        right: 0,
        fontSize: 30,
        fontWeight: "bold",
        margin: 1,
      }}
    >
      비회원결제
    </Button>
  );
}

export default function ItemList() {
  // const [historyLength, setHistoryLength] = useState(window.history.length);
  // const [showPrompt, setShowPrompt] = useState(false);

  // useEffect(() => {
  //   const handlePopstate = () => {
  //     if (window.history.length < historyLength) {
  //       setShowPrompt(true);
  //     }
  //     setHistoryLength(window.history.length);
  //   };

  //   window.addEventListener("popstate", handlePopstate);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopstate);
  //   };
  // }, [historyLength]);

  // <ReactRouterPrompt when={showPrompt}>
  //   {({ isActive, onConfirm, onCancel }) => (
  //     <Modal show={isActive}>
  //       <div>
  //         <p>Do you really want to leave?</p>
  //         <button onClick={onCancel}>Cancel</button>
  //         <button
  //           onClick={() => {
  //             setShowPrompt(false);
  //             onConfirm();
  //           }}
  //         >
  //           Ok
  //         </button>
  //       </div>
  //     </Modal>
  //   )}
  // </ReactRouterPrompt>;

  var paymentAll = 0;
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");
  const [rows, setRows] = useState([]);

  const ReadRFID = () => {
    sessionStorage.removeItem("data");
    navigate("/kiosk/rfidread");
  };

  // 품명, 단가, 수량을 받고, 총액은 계산해서 넣기
  useEffect(() => {
    const data = sessionStorage.getItem("data");
    const jsondata = JSON.parse(data);
    const itemList = jsondata.itemList;
    const result = [];

    itemList.forEach((item) => {
      const existingItem = result.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.cnt += 1;
        existingItem.fullprice += item.price;
      } else {
        result.push({
          name: item.name,
          price: item.price,
          cnt: 1,
          fullprice: item.price,
        });
      }
    });

    setRows(result);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: 720, maxHeight: 1200 }}>
        <Card
          sx={{
            fontSize: 40,
            padding: 1,
            textAlign: "center",
            backgroundColor: "#ff8c8c",
            fontWeight: "bold",
            width: "97vw",
          }}
        >
          장바구니
        </Card>
        <Card sx={{ border: 1, width: "99vw" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ minHeight: `81vh`, maxHeight: `70vh` }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={lstStyle}
                        sx={{ backgroundColor: "#90caf9", fontWeight: "bold" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    paymentAll = row.fullprice + paymentAll;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={lstStyle}
                              sx={{ fontWeight: "bold" }}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Box sx={{ borderTop: 1 }}>
              <Typography
                sx={{
                  fontSize: 33,
                  fontWeight: "bold",
                  color: "red",
                  textAlign: "center",
                }}
              >
                다음 상품은 바코드로 결제해주세요
              </Typography>
            </Box> */}
            <CardActions sx={{ borderTop: 1 }}>
              <Typography sx={{ fontSize: 35, fontWeight: "bold", margin: 1 }}>
                총 결제금액
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  right: "6%",
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {paymentAll}원
              </Typography>
            </CardActions>
          </Paper>
          <Button
            color="error"
            sx={{ fontSize: 30, margin: 1 }}
            variant="contained"
            onClick={() => navigate("/kiosk")}
          >
            결제취소
          </Button>
          <Button
            variant="outlined"
            sx={{ fontSize: 30, margin: 1 }}
            onClick={ReadRFID}
          >
            물품 다시찍기
          </Button>
          {user === "user" ? UserTrue() : UserFalse()}
        </Card>
      </Box>
    </Box>
  );
}
