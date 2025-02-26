import React from "react";

import "../styles/Homepage.css";

function Homepage() {
	return (
		<div className="homepage-container">
			<div className = "title-container">
                <h1>Which would you like to create</h1>
            </div>
            <div className = "button-container">
                <button name="resume" onClick ={() => window.location.href = "/Resume"}>
                    Resume
                </button>
                <button name="cover-letter" onClick ={() => window.location.href = "/Cover_Letter"}>
                    Cover Letter
                </button>
            </div>
		</div>
	);
}

export default Homepage;
