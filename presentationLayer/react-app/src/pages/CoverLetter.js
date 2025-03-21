import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";

/**
 * The CSS for this page comes from the input field component
 */

function CoverLetterForm({row, col}) {
	const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: { value: "", placeholder: "Full Name" },
        email: { value: "", placeholder: "Email" },
        address: { value: "", placeholder: "Address" },
        phone: { value: "", placeholder: "Phone number" },
        education: { value: "", placeholder: "Education" },
        recipientInfo: { value: "", placeholder: "Name of Hiring Manager" },
        companyName: { value: "", placeholder: "Company Name" },
        companyLocation: { value: "", placeholder: "Location of the Company" },
        skills: { value: "", placeholder: "List skills separated by commas" },
        workExperience: { value: "", placeholder: "List of work experience" },
        additionalExperience: { value: "", placeholder: "List of additional experience such as university clubs" },
        projects: { value: "", placeholder: "Name of projects you have worked on" },
        jobDesc: { value: "", placeholder: "Description of job" },
        template: { value: "", placeholder: "Template for Cover Letter (Optional)" },
        latex: false
    });


	const textAreaFields = [
		"workExperience",
		"additionalExperience",
		"projects",
		"jobDesc",
		"template"
	];
		/** This is out the page is going to be laid out */
		const fieldGroups = [
			["name"],
			["email"],
			["address", "phone"],
			["education"],
			["recipientInfo"],
			["companyName", "companyLocation"],
			["skills"],
			["workExperience"],
			["additionalExperience"],
			["projects"],
			["jobDesc"],
			["template"],
		];

	const URL = localStorage.getItem("url") + "/coverletter";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

    async function senddata() {
        const formattedData = Object.fromEntries(
            Object.entries(formData).map(([key, val]) =>
                typeof val === "object" && val.hasOwnProperty("value") ? [key, val.value] : [key, val]
            )
        );

        await fetch(URL, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(formattedData),
        }).then((response) => response.json())
        .then((data) => {
            const formattedText = data["doc_body"].split("\\n");
            navigate("/Output", { state: { output: formattedText, doc_title: 'Cover Letter' } });
        });
    }


	return (
		<div className="form-container">
			<div>
				<h3 className="title">Enter your Cover Letter Information</h3>
				<p className="subtitle">Provide details below to build your professional cover letter.</p>
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
						onClick={(event) => senddata(event)}
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

export default CoverLetterForm;
