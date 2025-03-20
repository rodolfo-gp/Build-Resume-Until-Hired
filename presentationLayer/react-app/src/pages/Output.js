import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';

import "../styles/Generation.css";

const OutputForm = () => {
    const location = useLocation();
    let { output, doc_title } = location.state || {};
    const [responsemessage, setMessage] = useState("");
    const [newdoc_title, setDoc_Title] = useState("");

    useEffect(()=>{
           setDoc_Title(doc_title);
    },[])

    if (output != null){
        localStorage.setItem("doc_body", JSON.stringify(output));
        localStorage.setItem("doc_title", JSON.stringify(newdoc_title));
    }else{
        output = JSON.parse(localStorage.getItem("doc_body"));
        doc_title = JSON.parse(localStorage.getItem("doc_title"));

    }


    const email = localStorage.getItem("email")
    const password = localStorage.getItem("password")

	const URL = localStorage.getItem("url") + "/cv/save"

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    async function Savedoc() {
        await fetch(URL, {
            method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
                email:email,
                password:password,
                latex:false,
                doc_body:output,
                doc_title:newdoc_title
            }),
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                setMessage("Save Successful");
            } else {
                setMessage("Save failed");
            }
        });
    }

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");

        // Add title if available
        if (doc_title) {
            doc.setFontSize(18);
            doc.text(doc_title.toString(), 20, 20);
            doc.setFontSize(12);
            doc.text(" ", 20, 30);
        }

        // Add content line by line
        let y = 40;
        output.forEach((line) => {
            const text = typeof line === "string" ? line : JSON.stringify(line);
            doc.text(text, 20, y);
            y += 10;
        });

        doc.save(doc_title ? `${doc_title}.pdf` : "Generated_Document.pdf");
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFont("helvetica", "normal");

        // Add title if available
        if (doc_title) {
            doc.setFontSize(18);
            doc.text(doc_title.toString(), 20, 20);
            doc.setFontSize(12);
            doc.text(" ", 20, 30);
        }

        // Add content line by line
        let y = 40;
        output.forEach((line) => {
            const text = typeof line === "string" ? line : JSON.stringify(line);
            doc.text(text, 20, y);
            y += 10;
        });

        doc.save(doc_title ? `${doc_title}.pdf` : "Generated_Document.pdf");
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
            value = {newdoc_title}
            onChange={(event)=>setDoc_Title(event.target.value)}
            placeholder="(Optional) Enter Document Title"
            />
            <div className='button&response'>
                {email && password && <button onClick={Savedoc}>Save</button>}
                <button onClick={downloadPDF}>Download PDF</button>
                {email && password && <button onClick={Savedoc}>Save</button>}
                <button onClick={downloadPDF}>Download PDF</button>
                {responsemessage}
            </div>
        </div>
    );
};
};

export default OutputForm;