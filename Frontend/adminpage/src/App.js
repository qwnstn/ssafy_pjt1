import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Nav from "./components/Nav";
import ProductList from "./components/product/productList";
import ProductDetail from "./components/product/productDetail";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route
          path="/admin/productdetail/:productId"
          element={<ProductDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
