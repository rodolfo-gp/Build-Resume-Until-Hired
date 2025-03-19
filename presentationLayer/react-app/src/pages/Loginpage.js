import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";

import "../styles/LoginSignup.css";

function Loginpage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [showPassword, setShowPassword] = useState(false);



	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	}

	const URL = "https://api.bru-h.xyz/login";


	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata(event) {
		event.preventDefault();

		await fetch(URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				email: email,
				password: password,
			}),
			keepalive: true,
		})
			.then((response) => {
				let result = response.json();
				if (response.status >= 200 && response.status < 300) {
					localStorage.setItem("email", email)
					localStorage.setItem("password", password)
					navigate('/Homepage')
					return result;
				} else {
					return result;
				}
			})
			.then((data) => {
			});
		return false;
	}

	return (
		<div className="login-container">
			<div className="login-card">
				<h2>Welcome Back</h2>
				<p>Please enter your details to sign in</p>

				<div className="input-group">
					<label>Email</label>
					<input 
						type="email"
						value = {email}
						onChange = {(event) => setEmail(event.target.value)}
						placeholder="Enter your email"
					/>
				</div>

				<div className="input-group">
					<label>Password</label>
					<div className = "password-wrapper">
						<input 
							type= {showPassword ? "text" : "password"}
							value = {password}
							onChange = {(event) => setPassword(event.target.value)}
							placeholder="Enter your password"
						/>
						<button
							type ="button"
							class="toggle-button"
							onClick = {togglePasswordVisibility}
						>
							{showPassword ? <FaEyeSlash/> : <FaEye/>}
						</button>
					</div>
				</div>

				<button 
					className="signin-button"
					type="submit"
					onClick={(event) => senddata(event)}
				>
					Sign in
				</button>

				<button
					className = "guest-button"
					type = "button"
					onClick ={() => navigate("/Homepage")}
				>
					Continue as Guest
				</button>


				<p>
					Don't have an account? <a href="/Signup">Sign up</a>
				</p>
			</div>
		</div>

	);
}

export default Loginpage;
