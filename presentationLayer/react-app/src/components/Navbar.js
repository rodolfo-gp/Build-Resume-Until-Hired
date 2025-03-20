import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useUser } from '../context/UserContext';  // Import the custom hook

function Navbar() {
  const {email, logout} = useUser();

  let logged = (email)

  function logouthandler(){
    logout()
    localStorage.setItem("email", "")
    localStorage.setItem("password", "")
    localStorage.removeItem("doc_body")
    localStorage.removeItem("doc_title")
  }

  return (
    <div className="header-container">
      <img src="/images/bruh_logo.png" alt="Logo" />
      <nav className="navbar">
        <ul>
          {!logged ? (<li><Link to="/Login">Login Page</Link></li>):(<li><Link onClick={()=>logouthandler()} to="/Login">Logout</Link></li>)}
          {!logged && <li><Link to="/Signup">Signup Page</Link></li>}
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