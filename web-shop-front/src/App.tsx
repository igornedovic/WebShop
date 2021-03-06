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
import { GetAllOrders } from "./services/Api";
import { Product } from "./models/Product";
import { User } from "./models/User";
import { Order } from "./models/Order";
import { OrderItem } from "./models/OrderItem";
import Profile from "./components/user/Profile";
import Catalog from "./components/user/Catalog";
import MyCart from "./components/user/MyCart";
import MyOrders from "./components/user/MyOrders";

export const ManufacturerContext = createContext<Manufacturer[]>([]);
export const ProductTypeContext = createContext<ProductType[]>([]);

function App() {
  const classes = useStyles();

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // Customer specific state
  const [items, setItems] = useState<OrderItem[]>([]);
  const [orderItemsNumber, setOrderItemsNumber] = useState<number>(0);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

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
  };

  const addToCart = (item: OrderItem | null) => {
    if (item) {
      let newItems: OrderItem[] = [...items];
      newItems.push(item);
      setItems(newItems);
    }
  };

  const increaseOrderItemsNumber = () => {
    setOrderItemsNumber(orderItemsNumber + 1);
  };

  const cancelOrder = (cancel: boolean) => {
    if (cancel) setItems([]);
  };

  const removeOrderItem = (productID: number) => {
    let orderToRemove: any = items.find((o) => o.product.id === productID);
    let items2: OrderItem[] = [...items];
    items2.splice(items2.indexOf(orderToRemove), 1);
    setItems(items2);
  };

  const changeOrderItem = (productID: number | null, quantity: number) => {
    if (quantity && productID) {
      let items2: OrderItem[] = [...items];
      let index = items2.findIndex((x) => x.product.id === productID);
      items2[index].quantity = quantity;
      items2[index].orderItemPrice = quantity * items2[index].product.price;
      setItems(items2);
      console.log(items);
    }
  };

  const addOrder = (order: Order) => {
    let customerOrders2: any = [...customerOrders];
    customerOrders2.push(order);
    setCustomerOrders(customerOrders2);
  };

  const getData = async () => {
    const manufacturers: Manufacturer[] = await GetAllManufacturers();
    const productTypes: ProductType[] = await GetAllProductTypes();
    const orders: Order[] = await GetAllOrders();

    setManufacturers(manufacturers);
    setProductTypes(productTypes);
    setOrders(orders);
  };

  useEffect(() => {
    getData();

    if (typeof localStorage !== "undefined" && localStorage.getItem("login")) {
      const data = JSON.parse(localStorage.getItem("login")!);
      const localStorageUser = JSON.parse(data?.user);
      const token = data?.token;

      const storedUser = new User(
        localStorageUser.firstName,
        localStorageUser.lastName,
        localStorageUser.phone,
        localStorageUser.email,
        localStorageUser.username,
        localStorageUser.password,
        localStorageUser.isAdmin,
        localStorageUser.role,
        localStorageUser.image,
        localStorageUser.userId,
        token
      );

      setUser(storedUser);
    }
  }, []);

  return (
    <Container className={classes.container}>
      <ProductTypeContext.Provider value={productTypes}>
        <ManufacturerContext.Provider value={manufacturers}>
          <Routes>
            <Route
              path="prijava"
              element={<Login storeOnlineUser={storeOnlineUser} />}
            />
            <Route path="registracija" element={<CreateAccount />} />
            <Route path="pocetna" element={<Home />}>
              <Route path="admin" element={<MainAdmin />}>
                <Route
                  index
                  element={
                    <AuxiliaryElements
                      user={user}
                      appendManufacturers={appendManufacturers}
                      appendProductTypes={appendProductTypes}
                    />
                  }
                />
                <Route
                  path="pomocna"
                  element={
                    <AuxiliaryElements
                      user={user}
                      appendManufacturers={appendManufacturers}
                      appendProductTypes={appendProductTypes}
                    />
                  }
                />
                <Route
                  path="proizvodi"
                  element={
                    <ManageProducts
                      user={user}
                      productToEdit={productToEdit}
                      cancelProductToEdit={cancelProductToEdit}
                    />
                  }
                />
                <Route
                  path="pregledProizvoda"
                  element={
                    <ViewProducts
                      user={user}
                      onEditProduct={setProductToEdit}
                    />
                  }
                />
                <Route
                  path="porudzbine"
                  element={<ManageOrders user={user} orders={orders} />}
                />
              </Route>
              <Route
                path="korisnik"
                element={<MainUser user={user} orders={items} />}
              >
                <Route
                  index
                  element={
                    <Catalog
                      orderItemsNumber={orderItemsNumber}
                      addToCart={addToCart}
                      increaseOrderItemsNumber={increaseOrderItemsNumber}
                    />
                  }
                />
                <Route path="profil" element={<Profile user={user} />} />
                <Route
                  path="katalog"
                  element={
                    <Catalog
                      orderItemsNumber={orderItemsNumber}
                      addToCart={addToCart}
                      increaseOrderItemsNumber={increaseOrderItemsNumber}
                    />
                  }
                />
                <Route
                  path="korpa"
                  element={
                    <MyCart
                      user={user}
                      items={items}
                      onCancelOrder={cancelOrder}
                      onRemoveOrderItem={removeOrderItem}
                      onCreatedOrder={addOrder}
                      onChangeOrderItem={changeOrderItem}
                    />
                  }
                />
                <Route
                  path="porudzbine"
                  element={<MyOrders user={user} orders={customerOrders} />}
                />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/prijava" />} />
          </Routes>
        </ManufacturerContext.Provider>
      </ProductTypeContext.Provider>
    </Container>
  );
}

export default App;
