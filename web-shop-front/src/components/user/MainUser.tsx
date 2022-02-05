import React, { createContext, useState } from "react";
import { Grid } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStyles } from "../../styles/Style";
import { User } from "../../models/User";

interface Props {
  user: User;
}

function MainUser(props: Props) {
  return (
    <div>
      <h1>This is MainUser</h1>
    </div>
  );
}

export default MainUser;
