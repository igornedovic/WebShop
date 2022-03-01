import React, { useState, useEffect, createContext } from "react";
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
import { Manufacturer } from "./models/Manufacturer";
import { ProductType } from "./models/ProductType";
import { GetAllManufacturers } from "./services/Api";
import { GetAllProductTypes } from "./services/Api";

export const ManufacturerContext = createContext<Manufacturer[]>([]);
export const ProductTypeContext = createContext<ProductType[]>([]);

function App() {
  const classes = useStyles();

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const getData = async () => {
    const manufacturers: Manufacturer[] = await GetAllManufacturers();
    const productTypes: ProductType[] = await GetAllProductTypes();

    setManufacturers(manufacturers);
    setProductTypes(productTypes);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container className={classes.container}>
      <ProductTypeContext.Provider value={productTypes}>
        <ManufacturerContext.Provider value={manufacturers}>
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
        </ManufacturerContext.Provider>
      </ProductTypeContext.Provider>
    </Container>
  );
}

export default App;
