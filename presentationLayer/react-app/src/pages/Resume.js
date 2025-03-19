import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";

function ResumeForm({ row, col }) {
	const navigate = useNavigate();
	const [output, setOutput] = useState([]);

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
		latex: {value: ""}
	});

	const textAreaFields = [
		"skills",
		"workExperience",
		"additionalExperience",
		"projects",
		"jobDesc",
		"template",
	];

	const URL = "https://api.bru-h.xyz/resume";

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
			setOutput(formattedText)
		});
		return false;
	}

	return (
		<div className="form-container">
			<h3>Enter your Resume Information</h3>

			{Object.entries(formData).map(([field, data]) => (
				<InputField
					field={field}
					value={data.value}
					handleChange={handleChange}
					setFormData={setFormData}
					textAreaFields={textAreaFields}
					placeholder={data.placeholder}
					row={row}
					col={col}
				/>
			))}

			<div className="button-container">
				<button
					className="back-button"
					type="button"
					onClick={() => navigate("/Homepage")}
				>
					Back
				</button>
				<button
					className="submit"
					type="submit"
					onClick={(event) => senddata(event)}
				>
					Submit
				</button>
			</div>
			<div>
				{output.map((line, index) => (
					<p key={index}>{line}</p>
				))}
			</div>
		</div>
	);
}

export default ResumeForm;
