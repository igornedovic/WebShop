import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { useStyles } from "./styles/Style";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
