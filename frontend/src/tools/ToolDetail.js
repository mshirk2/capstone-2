import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "reactstrap";
import ToolLibraryApi from "../api";


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

    if (!tool) return <Spinner />

    return (
        <div className = "ToolDetail">
            <div>
                <h4 className="display-4">{tool.title}</h4>
                <img src={tool.images} alt={tool.title} />
                <p>Catalog Code: {tool.catalogCode}</p>
                <p>Brand: {tool.brand}</p>
                <p>Model: {tool.model}</p>
                <p>Condition: {tool.condition}</p>
                <p>Description: {tool.description}</p>
                <p>Contents: {tool.contents}</p>
                <p>Tags: {tool.tags}</p>
                Reserve
            </div>
        </div>
    )
}

export default ToolDetail;