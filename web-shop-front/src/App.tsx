import React from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { useStyles } from "./styles/Style";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login  from "./components/Login";
import CreateAccount  from "./components/CreateAccount";

function App() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<CreateAccount/>} />
          <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
