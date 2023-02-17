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

const BranchDetail = () => {
  const { branchId } = useParams();
  const [branch, setBranch] = useState({});
  const [id, setId] = useState(branch.staffId || "이름 호출 실패");
  const [branchName, setBranchName] = useState(branch.branchName || "직급 호출 실패");
  const [region, setRegion] = useState(branch.region || "담당 호출 실패");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    const fetchData = async () => {
      try {
        const result = await axios.get(`${HOST}/admin/branch/${branchId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBranch(result.data);
        setId(result.data.id);
        setBranchName(result.data.branchName);
        setRegion(result.data.region);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [branchId]);

  const handleModifyBranch = async () => {
    const accessToken = localStorage.getItem("accesstoken");
    try {
      const data = { id, branchName, region };
      await axios.patch(`${HOST}/admin/branch/${branchId}`, data, {
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

  const BranchDelete = async (data) => {
    // TODO Delete
    const branchId = data;
    const accessToken = localStorage.getItem("accesstoken");
    const API_URI = `${HOST}/admin/branch/${branchId}`;
    await axios
      .delete(API_URI, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        console.log("삭제완료");
        navigate("/admin/branchlist");
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
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    {branch.branchName || "지점 호출 실패"}
                  </Typography>
                  <Typography>
                    주소 : {branch.region || "주소 호출 실패"}
                  </Typography>
                  <Typography sx={{ flex: 1, my: 1 }}>
                    지점ID : {branch.id || "지점ID 호출 실패"}
                  </Typography>
                </Paper>
                <Button
                  sx={{ mt: 1, mr: 1, fontWeight: "bold" }}
                  variant="contained"
                  onClick={handleOpen}
                >
                  지점정보수정
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
                      지점정보수정
                    </Typography>
                    <TextField
                      required
                      id="id"
                      label="지점ID"
                      value={id}
                      variant="standard"
                      onChange={(event) => setId(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="position"
                      label="지점"
                      value={branchName}
                      variant="standard"
                      onChange={(event) => setBranchName(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      required
                      id="part"
                      label="주소"  
                      value={region}
                      variant="standard"
                      onChange={(event) => setRegion(event.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <Button
                      sx={{ mt: 1, ml: 8 }}
                      variant="contained"
                      onClick={handleModifyBranch}
                    >
                      수정
                    </Button>
                  </Box>
                </Modal>
                <Button
                  onClick={() => BranchDelete(branchId)}
                  sx={{ mt: 1, fontWeight: "bold" }}
                  variant="contained"
                >
                  지점 삭제
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BranchDetail;
