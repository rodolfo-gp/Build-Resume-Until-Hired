import { Link } from "react-router-dom";
import "../styles/Navbar.css";


function Navbar() {


  return (
    <div className="header-container">
      <nav className="navbar">

        <ul>
          <img src="/images/bruh_logo.png" alt="Logo" />
          <li><Link to="/Login">Login Page</Link></li>
          <li><Link to="/Signup">Signup Page</Link></li>
          <li><Link to="/Homepage">Homepage</Link></li>
          <li><Link to="/Cover_Letter">Cover Letter</Link></li>
          <li><Link to="/Resume">Resume</Link></li>
          <li><Link to="/Output">Generation Output</Link></li>
          <li><Link to="/View">View Saved</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;