import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/main/Dashboard";
import Nav from "./components/Nav";
import ProductList from "./components/product/productList";
import ProductDetail from "./components/product/productDetail";
import AdminLogin from "./components/AdminLogin";
import UserList from "./components/user/userList";
import UserDetail from "./components/user/userDetail";
import PayList from "./components/payment/payList";
import PayDetail from "./components/payment/payDetail";
import EmployeeList from "./components/employee/employeeList";
import EmployeeDetail from "./components/employee/employeeDetail";
import BranchList from "./components/branch/branchList";
import BranchDetail from "./components/branch/branchDetail";

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
        <Route path="/admin/paylist" element={<PayList />} />
        <Route
          path="/admin/paydetail/:buyId"
          element={<PayDetail />}
        />
        <Route path="/admin/employeelist" element={<EmployeeList />} />
        <Route
          path="/admin/employeedetail/:employeeId"
          element={<EmployeeDetail />}
        />
        <Route path="/admin/branchlist" element={<BranchList />} />
        <Route
          path="/admin/branchdetail/:branchId"
          element={<BranchDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
