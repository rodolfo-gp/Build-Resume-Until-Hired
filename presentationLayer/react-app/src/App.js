import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
