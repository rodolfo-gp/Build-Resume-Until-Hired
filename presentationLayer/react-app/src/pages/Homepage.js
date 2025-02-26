import React from "react";

import "../styles/Homepage.css";

function Homepage() {
	return (
		<div className="homepage-container">
			<h1>Which would you like to create</h1>
            <button name="resume" onClick ={() => window.location.href = "/Resume"}>
                Resume
            </button>
            <button name="cover-letter" onClick ={() => window.location.href = "/Cover_Letter"}>
                Cover Letter
            </button>
		</div>
	);
}

export default Homepage;
