import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from '../../models/User';

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
