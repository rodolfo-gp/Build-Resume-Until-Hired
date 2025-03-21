import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";
import "../styles/Generation.css";

/**
 * The CSS for this page comes from the input field component
 */

/**
 * The CSS for this page comes from the input field component
 */

function ResumeForm({ row, col }) {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: { value: "", placeholder: "Full Name" },
		email: { value: "", placeholder: "Email" },
		address: { value: "", placeholder: "Address" },
		phone: { value: "", placeholder: "Phone Number" },
		socials: { value: "", placeholder: "Socials link such as LinkedIn" },
		education: {
			value: "",
			placeholder: "Education with expected Graduation date",
		},
		skills: { value: "", placeholder: "List of skills" },
		workExperience: { value: "", placeholder: "List of work experience" },
		additionalExperience: {
			value: "",
			placeholder: "List of addtional experience such as univeristy clubs",
		},
		projects: { value: "", placeholder: "Name of projects you have worked on" },
		jobDesc: { value: "", placeholder: "Description of job" },
		template: { value: "", placeholder: "Template for Resume (Optional)" },
		latex: false
	});

	const textAreaFields = [
		"skills",
		"workExperience",
		"additionalExperience",
		"projects",
		"jobDesc",
		"template",
	];

	const fieldGroups = [
		["name"],
		["email"],
		["address", "phone"],
		["socials"],
		["education"],
		["skills"],
		["workExperience"],
		["additionalExperience"],
		["projects"],
		["jobDesc"],
		["template"],
	];

	const URL = localStorage.getItem("url") + "/resume";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata() {
		await fetch(URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(formData),
		}).then((response)=>{
			let result = response.json();
			if (response.status >= 200 && response.status < 300) {
				return result
			}
		}).then((data)=>{
			const formattedText = data["doc_body"].split("\\n");
            navigate("/Output", { state: { output: formattedText, doc_title: 'Resume' } });
		});
		return false;
	}

	return (
		<div className="form-container">

			<div>
				<h3 className="title">Enter your Resume Information</h3>
				<p className="subtitle">Provide details to build your professional resume.</p>
			</div>

			{/**
			 * This looks confusing but .map() is a function
			 * So it can have a return given there's {}
			 */}
			<div className = "two-column-grid">
				{fieldGroups.map((fields, index) => {
					/** we are destructing to make the later part of the code more readable */
					const [leftName, rightName] = fields;
					const leftEntry = formData[leftName];
					const rightEntry = rightName ? formData[rightName] : null;

					return (
						<div className="row">
							<InputField
								field={leftName}
								value={leftEntry.value}
								handleChange={handleChange}
								setFormData={setFormData}
								textAreaFields={textAreaFields}
								placeholder={leftEntry.placeholder}
								row = {row}
								col = {col}
							/>
							{rightEntry && (
								<InputField
									field={rightName}
									value={rightEntry.value}
									handleChange={handleChange}
									setFormData={setFormData}
									textAreaFields={textAreaFields}
									placeholder={rightEntry.placeholder}
									row = {row}
									col = {col}
								/>
							)}
						</div>
					);
				})}

				{/**Buttons */}
				<div className="button-container">
					<button
						className="back-button"
						type="button"
						onClick={() => navigate("/Homepage")}
					>
						Main Menu
					</button>
					<button
						className="submit"
						type="submit"
						onClick={senddata}
					>
						Generate Letter →
					</button>
				</div>


			{/** End of two-column-grid*/}

			</div>

		{/** End of form-container */}
		</div>
	);
}

export default ResumeForm;
