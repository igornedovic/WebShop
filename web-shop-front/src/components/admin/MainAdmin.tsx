import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from "../../models/User";
import { Manufacturer } from "../../models/Manufacturer";
import { ProductType } from "../../models/ProductType";
import { Product } from "../../models/Product";
import { Order } from "../../models/Order";

interface Props {
  user: User;
}

function MainAdmin(props: Props) {
  return (
    <div>
      <h1>This is MainAdmin</h1>
    </div>
  );
}

export default MainAdmin;
