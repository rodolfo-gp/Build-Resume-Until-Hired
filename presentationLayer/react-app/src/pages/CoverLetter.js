import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";

function CoverLetterForm({ row, col }) {
	const navigate = useNavigate();
	const [output, setOutput] = useState([]);

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
            const title = data["doc_title"];
            navigate("/Output", { state: { output: formattedText, doc_title: title } });
        });
    }
    

    return (
        <div className="form-container">
            <h3>Enter your Cover Letter Information</h3>
            {Object.entries(formData).map(([field, data]) => 
                field !== "latex" ? (
                    <InputField
                        key={field}
                        field={field}
                        value={data.value}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        textAreaFields={textAreaFields}
                        placeholder={data.placeholder}
                        row={row}
                        col={col}
                    />
                ) : (
                    <label key={field}>
                        <input
                            type="checkbox"
                            name="latex"
                            checked={formData.latex}
                            onChange={(e) => handleChange(e, setFormData)}
                        />
                        Use LaTeX
                    </label>
                )
            )}

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
                    type="button"
                    onClick={senddata}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default CoverLetterForm;
