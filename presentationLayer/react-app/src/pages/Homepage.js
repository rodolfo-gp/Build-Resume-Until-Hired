import React from "react";
import { FaEnvelope, FaFileAlt } from "react-icons/fa";

import "../styles/Homepage.css";

import Card from "../components/Card";

function Homepage() {

	return (
		<div className="homepage-container">
			<Card
				title = "Resume"
				description = "Create a professional resume that stands out"
				buttonText = "Build Resume"
				icon = {<FaFileAlt/>}
				color = "#007bff"
				link = "/Resume"
			/>
			<Card
				title = "Cover Letter"
				description= "Write a compelling cover letter"
				buttonText = "Write a Cover Letter"
				icon = {<FaEnvelope/>}
				color="#008000"
				link = "/Cover_Letter"
			/>

		</div>
	);
}

export default Homepage;
