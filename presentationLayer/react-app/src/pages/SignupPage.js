import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from '../context/UserContext';  // Import the custom hook

import "../styles/Form.css";

function SignupPage() {
	let navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
	const {login} = useUser();

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmedPasswordVisibility = () => {
		setShowConfirmedPassword(!showConfirmedPassword);
	};

	const URL = localStorage.getItem("url") + "/signup";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata() {
		await fetch(URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => {
				let result = response.json();
				if (response.status >= 200 && response.status < 300) {
					localStorage.setItem("email", email);
					localStorage.setItem("password", password);
					login(email, password)
					navigate("/Homepage");
					return result;
				} else {
					return result;
				}
			})
			.then((data) => {});
		return false;
	}

	//state variable to check if the passwords are the same
	let issame = password === confirmPassword;
	return (
		<div className="login-container">
			<div className="login-card">
				<h2>Create an account</h2>
				<p>Sign up to get started with our platform</p>

				<div className="input-group">
					<label>Email</label>
					<div className="credential-wrapper">
						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder="Enter your email"
						/>
					</div>
				</div>

				<div className="input-group">
					<label>Password</label>
					<div className="credential-wrapper">
						<input
							type={showPassword ? "text" : "password"}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							placeholder="Create a password"
						/>
						<button
							type="button"
							class="toggle-button"
							onClick={togglePasswordVisibility}
						>
							{showPassword ? (
								<FaEyeSlash className="show-password-icon" />
							) : (
								<FaEye className="show-password-icon" />
							)}
						</button>
					</div>
				</div>

				<div className="input-group">
					<label>Confirm Password</label>
					<div className="credential-wrapper">
						<input
							type={showConfirmedPassword ? "text" : "password"}
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
							placeholder="Confirm password"
						/>
						<button
							type="button"
							class="toggle-button"
							onClick={toggleConfirmedPasswordVisibility}
						>
							{showConfirmedPassword ? (
								<FaEyeSlash className="show-password-icon" />
							) : (
								<FaEye className="show-password-icon" />
							)}
						</button>
					</div>
				</div>

				<button
					className="signin-button"
					disabled={!issame}
					type="submit"
					onClick={(event) => senddata(event)}
				>
					Create Account
				</button>

				<p>
					Already have an account? <a href="/Login">Sign in</a>
				</p>
				{!issame && (<h5 className = "error">
					Passwords do not match
				</h5>)}
			</div>
		</div>
	);
}

export default SignupPage;
