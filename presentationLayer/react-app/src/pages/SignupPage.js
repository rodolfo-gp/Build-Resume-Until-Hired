import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import "../styles/Form.css";

function SignupPage(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPasswoord, setConfirmPassword] = useState("");


    return(
		<form className="form-container">
            <h3>Signup</h3>
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
            <div className = "password-container">
                <input
                    type = "password"
                    value ={confirmPasswoord}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm password..."
                />
            </div>

			<button className="login" onClick={() => navigate("/Login")}>
				Return to Login page
			</button>
			<button className="submit" type="submit">
				Sign up
			</button>
		</form>
    );

}


export default SignupPage;