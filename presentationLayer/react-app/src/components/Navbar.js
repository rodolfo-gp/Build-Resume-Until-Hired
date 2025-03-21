import { React, useState } from "react";

import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useUser } from "../context/UserContext"; // Import the custom hook

function Navbar() {
	const { email, logout } = useUser();
	const [menuOpen, setMenuOpen] = useState(false);

	let logged = email;

	function logouthandler() {
    closeMenu();
		logout();
		localStorage.setItem("email", "");
		localStorage.setItem("password", "");
		localStorage.removeItem("doc_body");
		localStorage.removeItem("doc_title");
	}

  const closeMenu = () => setMenuOpen(false);

	return (
		<div className="header-container">
			<img src="/images/bruh_logo.png" alt="Logo" />

      <button className = "hamburger" onClick = {() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

			<nav className= {`navbar ${menuOpen ? "open" : ""}`}>
				<ul>
					{!logged ? (
						<li>
							<Link onClick={closeMenu} to="/Login">Login Page</Link>
						</li>
					) : (
						<li>
							<Link onClick={() => logouthandler()} to="/Login">
								Logout
							</Link>
						</li>
					)}
					{!logged && (
						<li>
							<Link onClick={closeMenu} to="/Signup">Signup Page</Link>
						</li>
					)}
					<li>
						<Link onClick={closeMenu} to="/Homepage">Homepage</Link>
					</li>
					<li>
						<Link onClick={closeMenu} to="/Cover_Letter">Cover Letter</Link>
					</li>
					<li>
						<Link onClick={closeMenu} to="/Resume">Resume</Link>
					</li>
					<li>
						<Link onClick={closeMenu} to="/Output">Generation Output</Link>
					</li>
					<li>
						<Link onClick={closeMenu} to="/View">View Saved</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Navbar;
