import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";

function CoverLetterForm({ row, col }) {
	const navigate = useNavigate();
	const [output, setoutput] = useState("");

	const [formData, setFormData] = useState({
		name: { value: "", placeholder: "Full Name" },
		email: { value: "", placeholder: "Email" },
		address: { value: "", placeholder: "Address" },
		phone: { value: "", placeholder: "Phone number" },
		education: { value: "", placeholder: "Education" },
		recipientInfo: { value: "", placeholder: "Name of Hiring Manager" },
		companyName: { value: "", placeholder: "Company Name" },
		companyLocation: { value: "", placeholder: "Location of the Company" },
		skills: {value: "", placeholder: "List skills seperated by commas"},
		workExperience: { value: "", placeholder: "List of work experience" },
		additionalExperience: {
			value: "",
			placeholder: "List of addtional experience such as univeristy clubs",
		},
		projects: { value: "", placeholder: "Name of projects you have worked on" },
		jobDesc: { value: "", placeholder: "Description of job" },
		template: {value: "", placeholder: "Template for Cover Letter (Optional)"},
		latex: {value: "", palceholder: "False"}
	});

	const textAreaFields = [
		"workExperience",
		"additionalExperience",
		"projects",
		"jobDesc",
		"template"
	];

	const URL = "https://api.bru-h.xyz/coverletter";

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
			setoutput(data["doc_body"])
		});
		return false;
	}

	return (
		<div className="form-container">
			<h3>Enter your Cover Letter Information</h3>
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
			<div>{output}</div>
		</div>
	);
}

export default CoverLetterForm;
