import { React } from "react";

import "../styles/Card.css";
import { Link } from "react-router-dom";

function Card({ title, description, buttonText, icon, color, link}) {

    const darkenColor = (hex, percent) =>{
        let num = parseInt(hex.slice(1), 16);
        let r = (num >> 16) - (num >> 16) * percent;
        let g = ((num >> 8) & 0x00ff) - ((num >> 8) & 0x00ff) * percent;
        let b = (num & 0x000ff) - (num & 0x000ff) * percent;

        return `rgb(${Math.max(0,r)} ${Math.max(0,g)}, ${Math.max(0,b)})`;
    };

	return (
		<div className="card">
			<div className="icon" style={{ color }}>
				{icon}
			</div>
			<h3>{title}</h3>
			<p>{description}</p>
            <Link to={link} style={{textDecoration: "none"}}>
                <button 
                    className="button" 
                    style={{
                            backgroundColor: color,
                            transition: "background 0.3s",
                        }}
                    onMouseEnter={(event) => (event.target.style.backgroundColor = darkenColor(color, 0.2))}
                    onMouseLeave={(event) => (event.target.style.backgroundColor = color)}
                >
                    {buttonText}
                </button>
            </Link>
		</div>
	);
}

export default Card;
