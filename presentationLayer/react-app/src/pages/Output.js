import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as HTMLDocx from 'html-docx-js/dist/html-docx.js'; // Import the html-docx-js library
import { saveAs } from 'file-saver'; // Import file-saver
import { useUser } from "../context/UserContext"; //Importing context

import "../styles/Generation.css";

const OutputForm = () => {
    const location = useLocation();
    let { output, doc_title } = location.state || {};
    const [responsemessage, setMessage] = useState("");
    const [newdoc_title, setDoc_Title] = useState("");
    const { email, password, login, logout } = useUser();

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
                doc_title: newdoc_title
            }),
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                setMessage("Save Successful");
            } else {
                setMessage("Save failed");
            }
        });
    }

    const downloadDOCX = () => {
        // Convert output to HTML format without including the title in the body
        const htmlContent = `
            <html>
                <body>
                    <div>
                        ${output.map(line => `<p>${line}</p>`).join('')}
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
        <div className='output_page'>
            <h1 className='header'>Generated File</h1>
            <div className="Generation_output">
                {output && output.length > 0 ? (
                    output.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))
                ) : (
                    <p>No output available</p>
                )}
            </div>
            <input
                type="title"
                value={newdoc_title}
                onChange={(event) => setDoc_Title(event.target.value)}
                placeholder="(Optional) Enter Document Title"
            />
            <div className='button&response'>
                {email && password && <button onClick={Savedoc}>Save</button>}
                <button onClick={downloadDOCX}>Download DOCX</button>
                {responsemessage}
            </div>
        </div>
    );
};

export default OutputForm;
