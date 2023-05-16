import React, { useState } from "react";

function SearchForm({searchFor}){
    const [searchTerm, setSearchTerm] = useState("");

    function handleChange(e) {
        e.persist();
        setSearchTerm(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        searchFor(searchTerm || undefined);
        setSearchTerm(searchTerm);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row my-4">
                    <div className="col-8">
                        <input
                            name="searchTerm"
                            placeholder="Enter search term..."
                            value={searchTerm}
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            type="Submit"
                            value="Search"
                            className="form-control btn btn-dark"
                            readOnly
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchForm;