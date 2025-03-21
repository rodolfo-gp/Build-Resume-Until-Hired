import React, { useState, useEffect } from "react";

import "../styles/ViewSaved.css";

function Viewsaved() {
	const email = localStorage.getItem("email");
	const password = localStorage.getItem("password");
	const [documentlist, setList] = useState([]);
	const [textarea, setText] = useState("");
	const [errorText, setErrorText] = useState("");
	const [currentID, setID] = useState();
    const [currentButton, setCurrentButton] = useState(null);

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const URL = localStorage.getItem("url") + "/cv";
	useEffect(() => {
		if (email != null && password != null && email && password) {
			Getcvs();
		} else {
			setErrorText("Login to see saved documents");
		}
	}, []);

	async function Getcvs() {
		await fetch(URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		})
			.then((response) => {
				let result = response.json();
				if (response.status >= 200 && response.status < 300) {
					return result;
				} else {
					return result;
				}
			})
			.then((data) => {
				if (data["status"] == false) {
					console.log("nothing on user");
					setErrorText(data["message"]);
					setList([]);
					setID();
				} else {
					setList(data["documents"]);
				}
			});
	}

	async function Getonecv(id) {
		await fetch(URL + "/user", {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				email: email,
				password: password,
				doc_id: id,
			}),
		})
			.then((response) => {
				let result = response.json();
				if (response.status >= 200 && response.status < 300) {
					return result;
				} else {
					setErrorText(response.status);
				}
			})
			.then((data) => {
				setText(data["document"]["doc_body"]);
				setID(data["document"]["id"]);
			});
	}

	async function deletedoc(id) {
		await fetch(URL + "/user", {
			method: "DELETE",
			headers: myHeaders,
			body: JSON.stringify({
				email: email,
				password: password,
				doc_id: id,
			}),
		}).then((response) => {
			if (response.status >= 200 && response.status < 300) {
				setErrorText("Deletion successful");
				setText([]);
				Getcvs();
			} else {
				setErrorText("Deletion failed");
			}
		});
	}

    function handleButtonClick(index, id){
        setCurrentButton(index);
        Getonecv(id);
    }

	return (
		<div className="viewer">
			<div className="viewer-wrapper">
			<div>
				<h3>Saved Documents:</h3>
			</div>
				{documentlist.length > 0 && (
					<div className="title-container">
						{documentlist.map((item,index) => (
							<button
                                onClick={() => handleButtonClick(index, item["id"])}
                                className = {currentButton === index ? "active" : ""}
                            >
                                {item["doc_title"]}
							</button>
						))}
					</div>
				)}

				{errorText? (
					<div className="content-container">{errorText}</div>
				) : currentID ?(
					<>
						<div className="content-container">{
							textarea.map((line, index) => (
							<p key={index}>{line}</p>
							))}
						</div>
						<button
							className="delete-button button"
							onClick={() => deletedoc(currentID)}
						>
							Delete
						</button>
					</>
				) : null}
			</div>
		</div>
	);
}
export default Viewsaved;
