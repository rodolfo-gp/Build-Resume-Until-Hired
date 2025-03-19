import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {


  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/Login">Login Page</Link></li>
        <li><Link to="/Signup">Signup Page</Link></li>
        <li><Link to="/Homepage">Homepage</Link></li>
        <li><Link to="/Cover_Letter">Cover Letter</Link></li>
        <li><Link to="/Resume">Resume</Link></li>
        <li><Link to="/Output">Generation Output</Link></li>
        <li><Link to="/View">View Saved</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;