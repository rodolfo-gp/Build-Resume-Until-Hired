import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useUser } from "../context/UserContext";



function Navbar() {
  const { email, password, login, logout } = useUser();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(logged)
    }, [email]);

  return (
    <div className="header-container">
      <img src="/images/bruh_logo.png" alt="Logo" />
      <nav className="navbar">
        <ul>
          {logged ? (<li><Link to="/Homepage">Login Page</Link></li>) : (<li><Link to="/Login">Login Page</Link></li>)}
          {logged ? (<li><Link to="/Homepage">Signup Page</Link></li>) : (<li><Link to="/Signup">Signup Page</Link></li>)}
          <li><Link to="/Homepage">Homepage</Link></li>
          <li><Link to="/Cover_Letter">Cover Letter</Link></li>
          <li><Link to="/Resume">Resume</Link></li>
          <li><Link to="/Output">Generation Output</Link></li>
          <li><Link to="/View">View Saved</Link></li>
          {logged && <li><button onClick={logout()}>Logout</button></li>}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;