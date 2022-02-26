import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { useStyles } from "./styles/Style";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import MainAdmin from "./components/admin/MainAdmin";
import MainUser from "./components/user/MainUser";
import AuxiliaryElements from "./components/admin/AuxiliaryElements";
import ManageProducts from "./components/admin/ManageProducts";
import ViewProducts from "./components/admin/ViewProducts";
import ManageOrders from "./components/admin/ManageOrders";

function App() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<CreateAccount />} />
        <Route path="home" element={<Home />}>
          <Route path="admin" element={<MainAdmin />}>
            <Route index element={<AuxiliaryElements />} />
            <Route path="auxiliary" element={<AuxiliaryElements />} />
            <Route path="manageProducts" element={<ManageProducts />} />
            <Route path="viewProducts" element={<ViewProducts />} />
            <Route path="manageOrders" element={<ManageOrders />} />
          </Route>
          <Route path="user" element={<MainUser />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Container>
  );
}

export default App;
