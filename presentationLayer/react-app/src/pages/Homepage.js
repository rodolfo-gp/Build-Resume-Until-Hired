import React from "react";

import "../styles/Homepage.css";

function Homepage(){

    
    return(
        <div className = "homepage-container">
            <h1>Which would you like to create</h1>
            <div className="Buttons">
            <a href="Resume">  
                <button name="Resume">Resume</button>
            </a> 
            <a href="Cover_Letter">
                <button name="Cover Letter">Cover Letter</button>
            </a>
            </div>
        </div>
    );
}

export default Homepage;