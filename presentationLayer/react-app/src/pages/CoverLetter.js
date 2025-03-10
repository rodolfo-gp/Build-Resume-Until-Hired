import React, { useState } from "react";
import { handleChange } from "../utils/FormValidation";
import InputField from "../components/InputField";

import "../styles/Form.css";

function CoverLetterForm({ row, col }) {
	const [formData, setFormData] = useState({
		name: "",
		address: "",
		phone: "",
		company: "",
		jobDesc: "",
	});

	const textAreaFields = ["jobDesc"];

	return (
		<form className="form-container">
			<h3>Enter your Cover Letter Information</h3>
			{Object.entries(formData).map(([field, value]) => (
				<InputField
					field={field}
					value={value}
					handleChange={handleChange}
					setFormData={setFormData}
					textAreaFields={textAreaFields}
					row={row}
					col={col}
				/>
			))}
			<button className="submit" type="submit">
				Submit
			</button>
		</form>
	);
}

export default CoverLetterForm;
