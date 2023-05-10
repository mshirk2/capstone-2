import React from "react";
import { Link } from "react-router-dom";

function ToolCard({id, title, brand, model, condition, description, contents}){
    return (
        <div className="ToolCard card">
            <div className="card-body">
                <Link to={`tools/${id}`} className="link">
                    <h5 className="card-title">{title}</h5>
                </Link>
                <p className="card-subtitle">{brand} {model}</p>
            </div>
        </div>
    )
}

export default ToolCard;