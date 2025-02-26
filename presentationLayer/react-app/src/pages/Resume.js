import React, { useState } from "react";


function Resume() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [socials, setSocials] = useState("");
    const [education, setEducation] = useState("");
    const [skills, setSkills] = useState("");
    const [experience, setExp] = useState("");
    const [projects, setProjects] = useState("");
    const [volunteer, setVolunteer] = useState("");


    return (
        <div>
            <h2>Please input resume data into the following fields</h2>
            <form>
                <h3>Name:</h3>
                <input
                    required="true"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <h3>Address:</h3>
                <input
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <h3>Phone:</h3>
                <input
                    required="true"
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
                <h3>Socials:</h3>
                <input
                    type="text"
                    value={socials}
                    onChange={(event) => setSocials(event.target.value)}
                />
                <h3>Education:</h3>
                <input
                    required="true"
                    type="text"
                    value={education}
                    onChange={(event) => setEducation(event.target.value)}
                />
                <h3>Skills:</h3>
                <input
                    required="true"
                    type="text"
                    value={skills}
                    onChange={(event) => setSkills(event.target.value)}
                />
                <h3>Experience:</h3>
                <input
                    required="true"
                    type="text"
                    value={experience}
                    onChange={(event) => setExp(event.target.value)}
                />
                <h3>Projects:</h3>
                <input
                    required="true"
                    type="text"
                    value={projects}
                    onChange={(event) => setProjects(event.target.value)}
                />
                <h3>Volunteer:</h3>
                <input
                    type="text"
                    value={volunteer}
                    onChange={(event) => setVolunteer(event.target.value)}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Resume;