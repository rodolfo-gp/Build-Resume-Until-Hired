import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

// Additional Components
import Header from './components/Header';
import Footer from './components/Footer';

// Importing Pages
import Homepage from "./pages/Homepage";
import Loginpage from './pages/Loginpage';
import CoverLetter from './pages/Cover_Letter';
import Resume from './pages/Resume';
import SignupPage from "./pages/SignupPage";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/Login" element={<Loginpage/>}/>
        <Route path = "/Signup" element ={<SignupPage/>}/>
        <Route path="/Homepage" element={<Homepage />} />
        <Route path="/Cover_Letter" element={<CoverLetter />}/>
        <Route path="/Resume" element={<Resume />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
