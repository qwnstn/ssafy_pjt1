import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const style = {
  width: "100%",
  bgcolor: "background.paper",
};


export default function ListDividers() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    navigate("/app", {replace: true});
  }

  return (
    <Box>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image="/app/images/logo.png"
          alt="shopmobile"
        />
        {/* <Avatar sx={{ mb: 1, ml: 2 }} /> */}
      </Card>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button component={Link} to="/app/account">
          <ListItemText primary="계정 관리" />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to="/app/mycard">
          <ListItemText primary="카드 관리" />
        </ListItem>
        <ListItem button component={Link} to="/app/payment">
          <ListItemText primary="결제 관리" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="로그아웃" onClick={logout}/>
        </ListItem>
      </List>
    </Box>
  );
}
