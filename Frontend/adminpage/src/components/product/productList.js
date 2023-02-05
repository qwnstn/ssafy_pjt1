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

// Generate Order Data
function createData(id, productId, name, price, rfid, barcode, image) {
  return { id, productId, name, price, rfid, barcode, image };
}

const rows = [
  createData(0, 4234, "꺼깔콘", 3000, "3124875", null, "img.jpg"),
  createData(1, 5137, "바밤바", 3000, null, "8803154372", "img.jpg"),
  createData(2, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(3, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(4, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(5, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(6, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(7, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(8, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(9, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(10, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(11, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(12, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(13, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(14, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(15, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(16, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(17, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(18, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(19, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(20, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
  createData(21, 4124, "커카콜라", 3110, "3116875", null, "img.jpg"),
];

const mdTheme = createTheme();
const API_URI = `${HOST}/admin/product`;

export default function ProductList() {
  const navigate = useNavigate();

  function ProductDetail(productId) {
    navigate(`/admin/productdetail/${productId}`);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // 상품 목록 list axios통신
  // const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(API_URI)
  //     .then((res) => {
  //       setRows(res.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const handleAddProduct = async () => {
    try {
      const productName = document.getElementById("name").value;
      const productPrice = document.getElementById("price").value;
      const productRfid = document.getElementById("rfid").value;
      const productBarcode = document.getElementById("barcode").value;

      const response = await axios.post(API_URI, {
        name: productName,
        price: productPrice,
        rfid: productRfid,
        barcode: productBarcode,
      });

      console.log(response.data);
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
                    variant="h6"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: "bold" }}
                  >
                    상품 목록
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
                            상품ID
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            이름
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            가격
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            RFID
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            Barcode
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold", fontSize: 18 }}>
                            Image
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow
                            onClick={() => ProductDetail(row.productId)}
                            key={row.id}
                          >
                            <TableCell>{row.productId}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.price}원</TableCell>
                            <TableCell>{row.rfid}</TableCell>
                            <TableCell>{row.barcode}</TableCell>
                            <TableCell>{row.image}</TableCell>
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
                  상품 추가
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
                      상품 추가
                    </Typography>
                    <TextField
                      required
                      id="name"
                      label="제품명"
                      defaultValue="제품명"
                      variant="standard"
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="price"
                      label="가격"
                      defaultValue="가격"
                      variant="standard"
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="rfid"
                      label="RFID코드"
                      defaultValue="RFID코드"
                      variant="standard"
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="barcode"
                      label="바코드"
                      defaultValue="바코드"
                      variant="standard"
                      sx={{ mb: 1 }}
                    />
                    <Button
                      sx={{ mt: 1, ml: 8 }}
                      variant="contained"
                      onClick={handleAddProduct}
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
