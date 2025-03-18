import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Form.css";

function Loginpage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	/** This is how we send user login information to the flask backend
	 *  TODO: Change the url to be the actual URL required for the backend
	 */
	const URL = "https://api.bru-h.xyz/Login";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata(event) {
		event.preventDefault();

		const response = await fetch(URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				email: username,
				password: password,
			}),
		});

		const message = await response.text();

		if (response.status === 201) {
			alert("Login Successful!");
			navigate("/Homepage");
		} else {
			alert("Login Failed: " + message);
		}
	}

	return (
		<form onSubmit={(event) => senddata(event)} className="form-container">
			<h3>Login</h3>
			<div className="field-container">
				<input
					required={true}
					type="text"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
					placeholder="Enter username..."
				/>
			</div>
			<div className="field-container">
				<input
					required={true}
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder="Enter password..."
				/>
			</div>

			<div className="button-container">
				<button
					className="signup"
					type="button"
					onClick={() => navigate("/Signup")}
				>
					Sign up
				</button>
				<button
					className="guest"
					type="button"
					onClick={() => navigate("/Homepage")}
				>
					Continue as Guest
				</button>
				<button className="submit" type="submit">
					Log in
				</button>
			</div>
		</form>
	);
}

export default Loginpage;
