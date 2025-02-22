import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Homepage(){

    return(
        <div className = "homepage-container">
            <Header/>
            <div>
                <p>div inside a div cause im div-ed</p>
            </div>
            <Footer/>
        </div>
    );
}

export default Homepage;