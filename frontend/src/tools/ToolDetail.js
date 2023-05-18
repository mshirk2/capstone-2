import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import ToolLibraryApi from "../api";
import placeholderImage from "../images/screwdriver-wrench-solid.svg";
import './ToolDetail.css'


function ToolDetail(){
    const { id } = useParams();
    const [tool, setTool] = useState(null);
    
    useEffect(function getToolOnMount(){
        async function getTool(){
            let tool = await ToolLibraryApi.getTool(id);
            setTool(tool);
        }
        getTool();
    }, [id]);

    if(!tool) return <Spinner />
    if(!tool.images.length) tool.images = [placeholderImage];

    let { title, catalogCode, brand, model, condition, description, contents, tags, images } = tool;

    return (
        <div className="ToolDetail">
            <div>
                <img src={images} alt={title} />
                <h4 className="card-title">{title}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{catalogCode}</h6>
                {brand && <p>Brand: {brand}</p>}
                {model && <p>Model: {model}</p>}
                {condition && <p>Condition: {condition}</p>}
                {description && <p>Description: {description}</p>}
                {contents && <p>Contents: {contents}</p>}
                {tags && <p>Tags: {tags}</p>}
            </div>
        </div>
    )
}

export default ToolDetail;