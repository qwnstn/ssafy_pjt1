import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/admin">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="메인 페이지" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="결제 관리" />
    </ListItemButton>
    <ListItemButton>
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
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="통계" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Account
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="로그아웃" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="로그인" />
    </ListItemButton>
  </React.Fragment>
);
