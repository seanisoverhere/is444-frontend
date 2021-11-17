import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from "./pages/login";
import Home from "./pages/home";
import Test from "./pages/test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
