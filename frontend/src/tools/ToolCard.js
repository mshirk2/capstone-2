import React from "react";
import { Link } from "react-router-dom";
import "./ToolCard.css"

function ToolCard({id, title, catalogCode, brand, model, condition, description, contents, available, tags, image}){



    return (
        <div className="ToolCard card">
            <div className="card-body">
                <Link to={`tools/${id}`} className="link">
                    {image && <img src={image} alt={title} />}
                    <h5 className="card-title">{title}</h5>
                </Link>
                {brand && <div>{brand}</div>}
                {tags && tags.map(t => 
                    <small className="mr-2" key={t}>{t}</small>
                )}
            </div>
        </div>
    )
}

export default ToolCard;