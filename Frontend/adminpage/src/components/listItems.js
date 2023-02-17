import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import StoreIcon from '@mui/icons-material/Store';
import { Link } from "react-router-dom";
import getPayloadFromToken from "../getPayloadFromToken";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/admin">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="메인 페이지" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/paylist">
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="결제 관리" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/userlist">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="유저 관리" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/productlist">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="상품 관리" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/employeelist">
      <ListItemIcon>
        <BadgeIcon />
      </ListItemIcon>
      <ListItemText primary="직원 관리" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/branchlist">
      <ListItemIcon>
        <StoreIcon />
      </ListItemIcon>
      <ListItemText primary="지점 관리" />
    </ListItemButton>
  </React.Fragment>
);

const accesstoken = localStorage.getItem("accesstoken");
const handleLogout = () => {
  localStorage.removeItem("accesstoken");
  window.location.reload();
};

const decodedPayload = getPayloadFromToken(accesstoken);
const obj = JSON.stringify(decodedPayload, ["roles"], 1);
let loginCheck = false;
if (obj !== null) {
  const parsedObj = JSON.parse(obj);
  if (parsedObj && parsedObj.hasOwnProperty("roles")) {
    const adminCheck = parsedObj["roles"][0];
    if(adminCheck === "ROLE_ADMIN"){
      loginCheck = true;
    }else{
      loginCheck = false;
    } 
  }
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Account
    </ListSubheader>
    {loginCheck ? (
      <ListItemButton onClick={handleLogout} component={Link} to="/admin/login">
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="로그아웃" />
      </ListItemButton>
    ) : (
      <ListItemButton component={Link} to="/admin/login">
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary="로그인" />
      </ListItemButton>
    )}
  </React.Fragment>
);
