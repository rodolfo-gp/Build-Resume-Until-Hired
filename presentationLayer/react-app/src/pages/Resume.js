import React, { useState } from "react";

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

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


	return (
		<form className="form-container">
			<h3>Enter your Resume Information</h3>

            {Object.entries(formData).map(([field, value]) => 
                <div className = "field-container">
                    
                    {/**
                     * If the field is in textAreaFields it uses <textarea>
                     * otherwise it uses the regular <input/>
                     */}
                    {textAreaFields.includes(field) ? (
                        <textarea
                            id = {field}
                            name = {field}
                            value = {value}
                            onChange = {handleChange}
                            placeholder = {`${field} `}
                            rows = {row}
                            cols = {col}
                        />
                    ) : (
                        <input
                            id = {field}
                            type = "text"
                            name = {field}
                            value = {value}
                            onChange = {handleChange}
                            placeholder = {`${field}`}
                        />
                    )}

                </div>
            )}
            
			<button className="submit" type="submit">
				Submit
			</button>

		</form>
	);
}

export default ResumeForm;
