import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import "../styles/Form.css";

function Loginpage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	/** This is how we send user login information to the flask backend
	 *  TODO: Change the url to be the actual URL required for the backend
	 */
	const url = "http://127.0.0.1:5000/submit";
	const handleSubmit = async (event) => {
		event.preventDefault();

		if(!username.trim() || !password.trim()){
			alert("Please fill in all fields");
			return;
		}

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});
	};

	

	return (
		<form onSubmit={handleSubmit} className="form-container">
			<h3>Login</h3>
			<div className = "username-container">
                <input
                    type = "text"
                    value = {username}
                    onChange = {(event) => setUsername(event.target.value)}
                    placeholder = "Enter username..."
                />
            </div>
            <div className = "password-container">
                <input
                    type = "password"
                    value = {password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password..."
                />
            </div>

			<button className="signup" type="button" onClick={() => navigate("/Signup")}>
				Sign up
			</button>
			<button className="guest" type="button" onClick ={() => navigate("/Homepage")}>
                Continue as Guest
            </button>
			<button className="submit" type="submit">
				Log in
			</button>

		</form>
	);	
}

export default Loginpage;
