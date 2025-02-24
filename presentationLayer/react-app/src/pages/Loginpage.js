import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";

import "../styles/Loginpage.css";

function Loginpage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	/** This is how we send user login information to the flask backend
	 *  TODO: Change the url to be the actual URL required for the backend
	 */
	const url = "http://127.0.0.1:5000/submit";
	const handleSubmit = async (event) => {
		event.preventDefault();

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
		<form onSubmit={handleSubmit} className="loginpage-container">
			<div className = "username-container">
                <input
                    type = "text"
                    value = {username}
                    onChange = {(event) => setUsername(event)}
                    placeholder = "Enter username..."
                />
            </div>
            <div className = "password-container">
                <input
                    type = "password"
                    value = {password}
                    onChange={(event) => setPassword(event)}
                    placeholder="Enter password..."
                />
            </div>

			<button className="submit button" type="submit">
				Submit
			</button>
			<button className="guest button" onClick ={() => window.location.href = "/Homepage"}>
                Continue as Guest
            </button>
		</form>
	);
}

export default Loginpage;
