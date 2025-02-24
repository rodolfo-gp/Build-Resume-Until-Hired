import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Header from './components/Header';
import Footer from './components/Footer';

import Homepage from "./pages/Homepage";
import Loginpage from './pages/Loginpage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
