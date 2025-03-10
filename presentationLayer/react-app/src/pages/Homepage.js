import React from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Homepage.css";

function Homepage() {
	const navigate = useNavigate();

	return (
		<div className="homepage-container">
			<div className="title-container">
				<h1>Which would you like to create</h1>
			</div>
			<div className="button-container">
				<button name="resume" onClick={() => navigate("/Resume")}>
					Resume
				</button>
				<button name="cover-letter" onClick={() => navigate("/Cover_Letter")}>
					Cover Letter
				</button>
			</div>
		</div>
	);
}

export default Homepage;
