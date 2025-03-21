import React, { useState, useEffect } from "react";

import "../styles/ViewSaved.css";

function Viewsaved() {
	const email = localStorage.getItem("email");
	const password = localStorage.getItem("password");
	const [documentlist, setList] = useState([]);
	const [textarea, setText] = useState("");
	const [currentID, setID] = useState();
    const [currentButton, setCurrentButton] = useState(null);
	const [deletemessage, setDelete] = useState("");

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const URL = localStorage.getItem("url") + "/cv";
	useEffect(() => {
		if (email != null && password != null && email && password) {
			Getcvs();
		} else {
			setText("Login to see saved documents");
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
					setText(data["message"]);
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
					setText(response.status);
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
				setDelete("Deletion successful");
				setText("");
				Getcvs();
			} else {
				setDelete("Deletion failed");
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

				{currentID && (
					<>
						<div className="content-container">{textarea}</div>
						<button
							className="delete-button button"
							onClick={() => deletedoc(currentID)}
						>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	);
}
export default Viewsaved;
