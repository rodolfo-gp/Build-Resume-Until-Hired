import React, {useState} from "react";

import Header from "../components/Header";

import "../styles/Loginpage.css";

function Loginpage(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <form className = "loginpage-container">
            <input
                type = "text"
                value={username}
                onChange = {(event) => setUsername(event.target.value)}
                placeholder = "Enter username..."
            />
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password..."
            />
            <p>Username: {username}</p>
        </form>
    );
}



export default Loginpage;