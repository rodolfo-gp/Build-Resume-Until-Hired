import React, { useState } from "react";
import {useNavigate} from "react-router-dom";


import "../styles/Form.css";

function Loginpage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginstatus, setLogin] = useState(false);
	const [responsemessage, setMessage] = useState("");

	/** This is how we send user login information to the flask backend
	 *  TODO: Change the url to be the actual URL required for the backend
	 */
	const URL = "https://api.bru-h.xyz/login";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata() {
		await fetch(URL,{
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				email:email,
				password:password
			}),
			keepalive:true
		}).then(response => {
			let result = response.json();
			if (response.status>=200 && response.status<300){
				setLogin(true);
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

	return (
		<form className="form-container">
			<h3>Login</h3>
			<div className = "field-container">
                <input
					required = {true}
                    type = "text"
                    value = {email}
                    onChange = {(event) => setEmail(event.target.value)}
                    placeholder = "Enter email..."
                />
            </div>
            <div className = "field-container">
                <input
					required = {true}
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
			<button className="submit" type="button" onClick={(event)=>senddata(event)} >
				Log in
			</button>
			<p>{responsemessage}</p>
		</form>
	);
}

export default Loginpage;
