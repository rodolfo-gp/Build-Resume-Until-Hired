import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Form.css";


function SignupPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
  	const [responsemessage, setMessage] = useState("");


    const URL = "https://api.bru-h.xyz/signup";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata() {
        await fetch(URL, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                email: email,
                password: password
            }),
        }).then(response => {
			let result = response.json();
			if (response.status>=200 && response.status<300){
				return result
			}
			else{
				return result
			}
		}).then(data => {
			setMessage(data["message"])
		})
		return false;
	}

    //state variable to check if the passwords are the same
    let issame = password === confirmPassword
	return (
		<div className="login-container">
			<div className="login-card">
				<h2>Create an account</h2>
				<p>Sign up to get started with our platform</p>

				<div className = "input-group">
					<label>Full Name</label>
					<input
						type="text"
						value = {username}
						onChange = {(event) => setUsername(event.target.value)}
						placeholder="Enter your full name"
					/>
				</div>

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
					<input 
						type= "password"
						value = {password}
						onChange = {(event) => setPassword(event.target.value)}
						placeholder="Create a password"
					/>
				</div>

				<div className="input-group">
					<label>Confirm Password</label>
					<input
						type = "password"
						value = {password}
						onChange = {(event) => setPassword(event.target.value)}
						placeholder = "Confirm password"
					/>
				</div>

				<button 
					className="signin-button"
					type="submit"
					onClick={(event) => senddata(event)}
				>
					Create Account
				</button>

				<p>
					Already have an account? <a href="/Login">Sign in</a>
				</p>
			</div>
          <p>{responsemessage}</p>
		</div>
	);

}

export default SignupPage;
