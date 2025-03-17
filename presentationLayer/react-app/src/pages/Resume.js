import React, { useState } from "react";
import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";

import "../styles/Form.css";

function ResumeForm({row, col}) {
	const [formData, setFormData] = useState({
		name: {value: "", placeholder: "Full Name"},
		address: {value: "", placeholder: "Address"},
		phone: {value: "", placeholder: "Phone Number"},
		socials: {value: "", placeholder: "Socials link such as LinkedIn"},
		education: {value: "", placeholder: "Education with expected Graduation date"},
		skills: {value: "", placeholder: "List of skills"},
		experience: {value: "", placeholder: "List of Experience"},
		volunteer: {value: "", placeholder: "Volunteer experience"},
	});

    const textAreaFields = ["education", "skills", "experience", "volunteer"];

	const URL = "";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function senddata() {
		await fetch(URL,{
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify(formData),
		});
		return false;
	}
	
	return (
		<div className="form-container">
			<h3>Enter your Resume Information</h3>

            {Object.entries(formData).map(([field, data]) => 
                <InputField
                    field = {field}
                    value = {data.value}
                    handleChange={handleChange}
                    setFormData={setFormData}
                    textAreaFields={textAreaFields}
					placeholder={data.placeholder}
                    row = {row}
                    col = {col}
                />
            )}

			<button className="submit" type="submit" onClick={(event)=>senddata(event)}>
				Submit
			</button>

		</div>
	);
}

export default ResumeForm;
