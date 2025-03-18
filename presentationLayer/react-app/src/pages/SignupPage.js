import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

import "../styles/Form.css";

function SignupPage(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const URL = "https://api.bru-h.xyz/signup";


	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata() {
        await fetch(URL, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
                email: username,
                password: password
            }),
        });
        return false;
    }

    //state variable to check if the passwords are the same
    let issame = password === confirmPassword

    return(
		<div className="form-container" id="input">
            <h3>Signup</h3>
			<div className = "field-container">
                <input
                    type = "text"
                    value = {username}
                    onChange = {(event) => setUsername(event.target.value)}
                    placeholder = "Enter username..."
                />
            </div>
            <div className = "field-container">
                <input
                    type = "password"
                    value = {password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password..."
                />
            </div>
            <div className = "field-container" id="comfirm">
                <input
                    type = "password"
                    value ={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm password..."
                />
            </div>
            <>
                {!issame && <p>passwords do not match</p>}
            </>
			<button className="login" onClick={() => navigate("/Login")}>
				Return to Login page
			</button>
			<button disabled={!issame} id="submitbutton" className="submit" type="button" onClick={(event)=>senddata(event)}>
				Sign up
			</button>
		</div>
    );

}


export default SignupPage;