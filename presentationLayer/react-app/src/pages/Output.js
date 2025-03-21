import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as HTMLDocx from "html-docx-js/dist/html-docx.js";
import { saveAs } from "file-saver";

import "../styles/Generation.css";

const OutputForm = () => {
	const location = useLocation();
	const navigate = useNavigate();
	let { output, doc_title } = location.state || {};
	const [newdoc_title, setDoc_Title] = useState("");

	useEffect(() => {
		setDoc_Title(doc_title);
	}, []);

	if (output != null) {
		localStorage.setItem("doc_body", JSON.stringify(output));
		localStorage.setItem("doc_title", JSON.stringify(newdoc_title));
	} else {
		output = JSON.parse(localStorage.getItem("doc_body"));
		doc_title = JSON.parse(localStorage.getItem("doc_title"));
	}

	const email = localStorage.getItem("email");
	const password = localStorage.getItem("password");

	const URL = localStorage.getItem("url") + "/cv/save";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	async function Savedoc() {
		await fetch(URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				email: email,
				password: password,
				latex: false,
				doc_body: output,
				doc_title: newdoc_title,
			}),
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				navigate("/View");
			}
		});
	}

	const downloadDOCX = () => {
		// Convert output to HTML format without including the title in the body
		const htmlContent = `
            <html>
                <body>
                    <div>
                        ${output.map((line) => `<p>${line}</p>`).join("")}
                    </div>
                </body>
            </html>
        `;

		// Convert the HTML content to DOCX
		const docxBlob = HTMLDocx.asBlob(htmlContent);

		// Use FileSaver's saveAs function to save the DOCX file
		saveAs(docxBlob, `${newdoc_title || "Generated_Document"}.docx`);
	};

	return (
		<div className="output-container">
			<h1 className="header">Generated File</h1>

			<div className = "content">
				<div className="document-title-wrapper">
					<input
						type="title"
						value={newdoc_title}
						onChange={(event) => setDoc_Title(event.target.value)}
						placeholder="Enter Document Title (Optional)"
					/>
					<div className="document-actions">
						{email && password && (
							<button onClick={Savedoc} className="document-button">
								💾 Save
							</button>
						)}
						<button onClick={downloadDOCX} className="document-button">
							📄 Download DOCX
						</button>
					</div>
				</div>

				<div className="generated-content">
					{output && output.length > 0 ? (
						output.map((line, index) => <p key={index}>{line}</p>)
					) : (
						<p>No output available</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default OutputForm;
