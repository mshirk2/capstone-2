import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../images/screwdriver-wrench-solid.svg";
import "./ToolCard.css"

function ToolCard({id, title, catalogCode, brand, model, condition, description, contents, available, tags, image}){

    if(!image) image = placeholderImage;

    return (
        <div className="ToolCard card">
            <div className="card-body">
                <Link to={`tools/${id}`} className="link">
                    {image && <img src={image} alt={title} />}
                    <h5 className="card-title">{title}</h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-muted">{catalogCode}</h6>
                {brand && <div>{brand}</div>}
                {tags && tags.map(t => 
                    <small className="mr-2" key={t}>{t}</small>
                )}
            </div>
        </div>
    )
}

export default ToolCard;