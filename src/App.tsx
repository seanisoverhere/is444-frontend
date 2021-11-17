import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from "./pages/login";
<<<<<<< HEAD
import Home from "./pages/home"
import Product from "./pages/product";

=======
import Home from "./pages/home";
import Test from "./pages/test";
>>>>>>> main

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
<<<<<<< HEAD
      <Route path="/product" element={<Product />} />
=======
      <Route path="/test" element={<Test />} />
>>>>>>> main
    </Routes>
  );
}

export default App;
