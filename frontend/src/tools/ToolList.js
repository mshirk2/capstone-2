import React, { useState, useEffect } from "react";
import ToolLibraryApi from "../api";
import SearchForm from "../SearchForm";
import ToolCard from "./ToolCard";
import { Spinner } from "reactstrap";

function ToolList(){
    const [tools, setTools] = useState(null);

    useEffect(function getToolsOnMount(){
        getTools();
    }, []);

    async function getTools(title){
        let tools = await ToolLibraryApi.getTools(title);
        setTools(tools);
    }

    if (!tools) return <Spinner />

    return (
        <div className="ToolList">
            <h2 className="display-4">Explore Tools</h2>
            <SearchForm searchFor={getTools} />
            {tools.length ?
                (
                    <div className="ToolList-list">
                        {tools.map(t => (
                            <ToolCard
                                key={t.id}
                                id={t.id}
                                title={t.title}
                                brand={t.brand}
                                model={t.model}
                                condition={t.condition}
                                description={t.description}
                                contents={t.contents}
                            />
                        ))}
                    </div>
                )
            : (<p>Results Not Found</p>)
            }
        </div>
    )
}

export default ToolList;