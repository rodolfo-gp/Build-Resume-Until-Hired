import React, { useState } from "react";
import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";

import "../styles/Form.css";

function ResumeForm({row, col}) {
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		phone: "",
		socials: "",
		education: "",
		skills: "",
		experience: "",
		volunteer: "",
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

            {Object.entries(formData).map(([field, value]) => 
                <InputField
                    field = {field}
                    value = {value}
                    handleChange={handleChange}
                    setFormData={setFormData}
                    textAreaFields={textAreaFields}
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
