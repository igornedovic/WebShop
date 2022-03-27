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
import { Product } from "./models/Product";
import { User } from "./models/User";
import { OrderItem } from "./models/OrderItem";
import Profile from "./components/user/Profile";
import Catalog from "./components/user/Catalog";
import MyCart from "./components/user/MyCart";
import MyOrders from "./components/user/MyOrders";
import ContactAdmin from "./components/user/ContactAdmin";

export const ManufacturerContext = createContext<Manufacturer[]>([]);
export const ProductTypeContext = createContext<ProductType[]>([]);

function App() {
  const classes = useStyles();

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Customer specific state
  const [items, setItems] = useState<OrderItem[]>([]);


  const appendManufacturers = (m: Manufacturer) => {
    setManufacturers([...manufacturers, m]);
  };

  const appendProductTypes = (pt: ProductType) => {
    setProductTypes([...productTypes, pt]);
  };

  const cancelProductToEdit = () => {
    setProductToEdit(null);
  };

  const storeOnlineUser = (u: User) => {
    setUser(u);
  }

  const addToCart = (item: OrderItem | null) => {
    if (item)
    {
      let newItems: OrderItem[] = [...items];
      newItems.push(item);
      setItems(newItems);
    }
  }

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
            <Route path="login" element={<Login storeOnlineUser={storeOnlineUser}/>} />
            <Route path="register" element={<CreateAccount />} />
            <Route path="home" element={<Home />}>
              <Route path="admin" element={<MainAdmin />}>
                <Route
                  index
                  element={
                    <AuxiliaryElements
                      appendManufacturers={appendManufacturers}
                      appendProductTypes={appendProductTypes}
                    />
                  }
                />
                <Route
                  path="auxiliary"
                  element={
                    <AuxiliaryElements
                      appendManufacturers={appendManufacturers}
                      appendProductTypes={appendProductTypes}
                    />
                  }
                />
                <Route
                  path="manageProducts"
                  element={
                    <ManageProducts
                      productToEdit={productToEdit}
                      cancelProductToEdit={cancelProductToEdit}
                    />
                  }
                />
                <Route
                  path="viewProducts"
                  element={<ViewProducts onEditProduct={setProductToEdit} />}
                />
                <Route path="manageOrders" element={<ManageOrders />} />
              </Route>
              <Route path="user" element={<MainUser />}>
                <Route index element={<Profile user={user} />} />
                <Route path="profile" element={<Profile user={user} />} />
                <Route path="catalog" element={<Catalog addToCart={addToCart}/>} />
                <Route path="myCart" element={<MyCart />} />
                <Route path="myOrders" element={<MyOrders />} />
                <Route path="contact" element={<ContactAdmin />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </ManufacturerContext.Provider>
      </ProductTypeContext.Provider>
    </Container>
  );
}

export default App;
