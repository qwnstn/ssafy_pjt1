import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/main/Dashboard";
import Nav from "./components/Nav";
import ProductList from "./components/product/productList";
import ProductDetail from "./components/product/productDetail";
import AdminLogin from "./components/AdminLogin";
import UserList from "./components/user/userList";
import UserDetail from "./components/user/userDetail";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route
          path="/admin/productdetail/:productId"
          element={<ProductDetail />}
        />
        <Route path="/admin/userlist" element={<UserList />} />
        <Route
          path="/admin/userdetail/:userId"
          element={<UserDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
