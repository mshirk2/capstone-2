import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import ToolLibraryApi from "../api";
import placeholderImage from "../images/screwdriver-wrench-solid.svg";
import './ToolDetail.css'
import ToolCalendar from "./ToolCalendar";


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
        <div>
            <div className="ToolDetail card mb-4">
                <div className="card-body">
                    <img src={images} alt={title} />
                    <h4 className="card-title">{title}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">{catalogCode}</h6>
                    {brand && <div>Brand    {brand}</div>}
                    {model && <div>Model: {model}</div>}
                    {condition && <div>Condition: {condition}</div>}
                    {description && <div>Description: {description}</div>}
                    {contents && <div>Contents: {contents}</div>}
                    {tags.map(tag => (<span key={tag} className="badge badge-light mr-2 mt-2">{tag}</span>))}
                </div>
            </div>
            <div>
                <ToolCalendar />
            </div>
        </div>
    )
}

export default ToolDetail;