import React, { useState } from "react";

import "../styles/Form.css";

{/**This needs the same treatment as Resume to over having a million divs */}

function CoverLetter({row, col}) {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [company, setCompany] = useState("");
	const [jobDesc, setJobDesc] = useState("");

	return (
		<form className="form-container">
			<h3>Enter your Cover Letter Information</h3>
			<div className = "field-container">
                <input
                    type = "text"
                    value = {name}
                    onChange = {(event) => setName(event.target.value)}
                    placeholder = "Name"
                />
            </div>
            <div className = "field-container">
                <input
                    type = "text"
                    value = {address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Address"
                />
            </div>
            <div className = "field-container">
                <input
                    type = "text"
                    value = {phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Phone Number"
                />
            </div>			
			<div className = "field-container">
                <input
                    type = "text"
                    value = {company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="company"
                />
            </div>
            <div className = "field-container">
                <textarea
                    value = {jobDesc}
                    onChange={(event) => setJobDesc(event.target.value)}
                    placeholder="Job Description"
					rows={row}
					cols={col}
                />
            </div>

			<button className="submit" type="submit">
				Submit
			</button>
		</form>
	);
}

export default CoverLetter;
