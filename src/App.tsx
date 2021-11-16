import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from "./pages/login";
import Home from "./pages/home"
import Product from "./pages/product";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/product" element={<Product />} />
    </Routes>
  );
}

export default App;
