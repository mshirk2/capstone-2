import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../images/screwdriver-wrench-solid.svg";
import "./ToolCard.css"

function ToolCard({id, title, catalogCode, brand, model, condition, description, contents, tags, image}){

    if(!image) image = placeholderImage;

    return (
        <div className="ToolCard card">
            <div className="card-body">
                <Link to={`tools/${id}`} className="link">
                    {image && <img src={image} alt={title} />}
                    <h5 className="card-title">{title}</h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-muted">{catalogCode}</h6>
                {brand && <div>Brand: {brand}</div>}
                {condition && <div>Condition: {condition}</div>}
                {tags && tags.map(tag => (<span key={tag} className="badge badge-light mr-2 mt-2">{tag}</span>))}
            </div>
        </div>
    )
}

export default ToolCard;