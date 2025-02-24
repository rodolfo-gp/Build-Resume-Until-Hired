import React, {useState} from "react";


function CoverLetter(){

        const [name, setName] = useState("");
        const [address, setAddress] = useState("");
        const [phone, setPhone] = useState("");
        const [socials, setSocials] = useState("");
        const [company, setCompany] = useState("");
        const [jobDesc, setJobDesc] = useState("");
        const [resume, setResume] = useState("");


    
    return(
    <div>
        <h2>Please input cover letter data into the following fields</h2>
        <form>
            <h3>Name:</h3>
            <input
            required = "true"
            type = "text"
            value = {name}
            onChange = {(event) => setName(event.target.value)}
            />
            <h3>Address:</h3>
            <input
            type = "text"
            value = {address}
            onChange = {(event) => setAddress(event.target.value)}
            />
            <h3>Phone:</h3>
            <input
            required = "true"
            type = "text"
            value = {phone}
            onChange = {(event) => setPhone(event.target.value)}
            />
            <h3>Socials:</h3>
            <input
            type = "text"
            value = {socials}
            onChange = {(event) => setSocials(event.target.value)}
            />
            <h3>Company Name:</h3>
            <input
            required = "true"
            type = "text"
            value = {company}
            onChange = {(event) => setCompany(event.target.value)}
            />
            <h3>Job Description:</h3>
            <input
            required = "true"
            type = "text"
            value = {jobDesc}
            onChange = {(event) => setJobDesc(event.target.value)}
            />
            <h3>Resume/Relavent Skills:</h3>
            <input
            required = "true"
            type = "text"
            value = {resume}
            onChange = {(event) => setResume(event.target.value)}
            />
        <input type="submit" value="Submit"/>
        </form>
    </div>
    );
}

export default CoverLetter;