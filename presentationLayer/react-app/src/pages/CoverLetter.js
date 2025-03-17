import React, { useState } from "react";
import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";

import "../styles/Form.css";

function CoverLetterForm({ row, col }) {
	const [formData, setFormData] = useState({
		name: { value: "", placeholder: "Full Name" },
		address: { value: "", placeholder: "Address" },
		phone: { value: "", placeholder: "Phone number" },
		education: { value: "", placeholder: "Education" },
		company: { value: "", placeholder: "Company you wish to apply to" },
		recipientinfo: { value: "", placeholder: "Name of Hiring Manager" },
		jobDesc: { value: "", placeholder: "Description of job" },
		resume: { value: "", placeholder: "Upload your file" },
	});

	const textAreaFields = ["education", "recipient info", "jobDesc", "resume"];

	const URL = "";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata() {
		await fetch(URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(formData),
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
			<button
				className="submit"
				type="submit"
				onClick={(event) => senddata(event)}
			>
				Submit
			</button>
		</div>
	);
}

export default CoverLetterForm;
