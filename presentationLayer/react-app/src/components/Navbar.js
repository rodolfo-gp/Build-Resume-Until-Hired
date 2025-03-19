import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isloggedin, setLoggedin] = useState(false);
  useEffect(()=>{
    setEmail(localStorage.getItem("email"))
    setPassword(localStorage.getItem("password"))
    setLoggedin(email != null && password != null && email != "" && password != "")
  },[isloggedin, email, password])

   
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/Login">Login Page</Link></li>
        <li><Link to="/Signup">Signup Page</Link></li>
        <li><Link to="/Homepage">Homepage</Link></li>
        <li><Link to="/Cover_Letter">Cover Letter</Link></li>
        <li><Link to="/Resume">Resume</Link></li>
        {isloggedin && <li><Link to="/View">View Saved</Link></li>}
      </ul>
    </nav>
  );
}

export default Navbar;