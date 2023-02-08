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

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [name, setName] = useState(product.name || "이름 호출 실패");
  const [price, setPrice] = useState(product.price || "가격 호출 실패");
  const [rfid, setRfid] = useState(product.rfid || "RFID 호출 실패");
  const [barcode, setBarcode] = useState(product.barcode || "바코드 호출 실패");
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const fetchData = async () => {
      try {
        const result = await axios.get(`${HOST}/admin/product/${productId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setProduct(result.data);
        setName(result.data.name);
        setPrice(result.data.price);
        setRfid(result.data.rfid);
        setBarcode(result.data.barcode);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [productId]);

  const handleModifyProduct = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const data = { name, price, rfid, barcode };
      await axios.patch(`${HOST}/admin/product/${productId}`, data, {
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

  const productDelete = async (data) => {
    // TODO Delete
    const productId = data;
    const accessToken = localStorage.getItem("accesstoken");
    const API_URI = `${HOST}/admin/product/${productId}`;
    await axios
      .delete(API_URI, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        console.log("삭제완료");
        navigate("/admin/productlist");
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
                  <Typography variant="h5" sx={{ mb: 3 }}>
                    상품ID : {productId}
                  </Typography>
                  <Typography component="p" variant="h4">
                    품명 : {product.name || "이름 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, my: 1 }}>
                    가격 : {product.price || "가격 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, mb: 1 }}>
                    RFID : {product.rfid || "RFID 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, mb: 1 }}>
                    Barcode : {product.barcode || "바코드 호출 실패"}
                  </Typography>
                </Paper>
                <Button
                  sx={{ mt: 1, mr: 1, fontWeight: "bold" }}
                  variant="contained"
                  onClick={handleOpen}
                >
                  상품 수정
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
                      상품 수정
                    </Typography>
                    <TextField
                      required
                      id="name"
                      label="제품명"
                      value={name}
                      variant="standard"
                      onChange={(event) => setName(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="price"
                      label="가격"
                      value={price}
                      variant="standard"
                      onChange={(event) => setPrice(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="rfid"
                      label="RFID코드"
                      value={rfid}
                      variant="standard"
                      onChange={(event) => setRfid(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="barcode"
                      label="바코드"
                      value={barcode}
                      variant="standard"
                      onChange={(event) => setBarcode(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <Button
                      sx={{ mt: 1, ml: 8 }}
                      variant="contained"
                      onClick={handleModifyProduct}
                    >
                      수정
                    </Button>
                  </Box>
                </Modal>
                <Button
                  onClick={() => productDelete(productId)}
                  sx={{ mt: 1, fontWeight: "bold" }}
                  variant="contained"
                >
                  상품 삭제
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductDetail;
