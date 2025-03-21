import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { email, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  let logged = email;

  function logouthandler() {
    logout();
    localStorage.setItem("email", "");
    localStorage.setItem("password", "");
    localStorage.removeItem("doc_body");
    localStorage.removeItem("doc_title");
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false); // will close the menu when the screen is large enough
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="header-container">
      <img src="/images/bruh_logo.png" alt="Logo" />

      {/* Show hamburger button only on small screens */}
      {isMobile && (
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      )}

      <nav className={`navbar ${isMobile && isOpen ? "active" : ""}`}>
        <ul>
          {!logged ? (
            <li><Link to="/Login">Login Page</Link></li>
          ) : (
            <li><Link onClick={logouthandler} to="/Login">Logout</Link></li>
          )}
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