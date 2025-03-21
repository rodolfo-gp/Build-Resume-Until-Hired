import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from '../context/UserContext';  // Import the custom hook

import "../styles/LoginSignup.css";

function Loginpage() {
	const navigate = useNavigate();
	const [inputemail, setemail] = useState();
	const [inputpassword, setPassword] = useState();
	const [showPassword, setShowPassword] = useState(false);
	const {email, login} = useUser();
	const [errormessage, setErrorMessage] = useState("");

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const URL = localStorage.getItem("url") + "/login";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata(event) {
		event.preventDefault();

		await fetch(URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				email: inputemail,
				password: inputpassword,
			}),
			keepalive: true,
		})
			.then((response) => {
				let result = response.json();
				if (response.status >= 200 && response.status < 300) {
					localStorage.setItem("email", inputemail);
					localStorage.setItem("password", inputpassword);
					login(inputemail, inputpassword);
					navigate("/Homepage");
					return result;
				} else {
					setErrorMessage("Incorrect Username or Password")
					return result;
				}
			})
			.then((data) => {});
		return false;
	}

	return (
		<div className="login-container">
			<div className="login-card">
				<h2>Welcome Back</h2>
				<p>Please enter your details to sign in</p>

				<div className="input-group">
					<label>Email</label>
					<div className="credential-wrapper">
						<input
							type="email"
							value={inputemail}
							onChange={(event) => setemail(event.target.value)}
							placeholder="Enter your email"
						/>
					</div>
				</div>

				<div className="input-group">
					<label>Password</label>
					<div className="credential-wrapper">
						<input
							type={showPassword ? "text" : "password"}
							value={inputpassword}
							onChange={(event) => setPassword(event.target.value)}
							placeholder="Enter your password"
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

				<button
					className="signin-button"
					type="submit"
					onClick={(event) => senddata(event)}
				>
					Sign in
				</button>

				<button
					className="guest-button"
					type="button"
					onClick={() => navigate("/Homepage")}
				>
					Continue as Guest
				</button>

				<p>
					Don't have an account? <a href="/Signup">Sign up</a>
				</p>
				{!email&& 
				<p>
				{errormessage}
				</p>
				}
			</div>
		</div>
	);
}

export default Loginpage;
