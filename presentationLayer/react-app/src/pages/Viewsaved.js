import React, { useState, useEffect } from "react";

function Viewsaved(){
    const email = localStorage.getItem("email");  
    const password = localStorage.getItem("password");
    const [documentlist, setList] = useState([]);
    const [textarea, setText] = useState(""); 

    const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

    const URL = "https://api.bru-h.xyz/cv";
    useEffect(() =>{
        if (email != null && password != null){
        Getcvs()
        }else{
        setText("Login to see saved documents")
        }
    }, [])

    async function Getcvs(){
        await fetch (URL, {
            method: "POST",
            headers: myHeaders,
            body:JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((response) =>{
            let result = response.json();
            if (response.status >= 200 && response.status < 300) {
                return result
            }
            else{
                return result
            }
        })
            .then((data)=>{
                if (data["status"] == false){
                    setText(data["message"]);
                }else{
                    setList(data["documents"]);
                }
            });
    }

    async function Getonecv(id){
        await fetch(URL+"/user", {
            method:"POST",
            headers:myHeaders,
            body:JSON.stringify({
                email: email,
                password: password,
                doc_id:id
            })
        }).then((response)=>{
            let result = response.json();
            if (response.status >= 200 && response.status < 300) {
                return result
            }else{
                setText(response.status)
            }
        }).then((data)=>{
            setText(data["document"]["doc_body"])
        })

    }

    return( 
        <div>
        <div>
            {documentlist.map((item)=>(
                <li onClick={() => Getonecv(item["id"])}>{item["doc_title"]}</li>
            ))}
        </div>
        <div>{textarea}</div>
        </div>
    )
    
}
export default Viewsaved;