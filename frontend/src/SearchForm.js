import React, {useState} from "react";

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
                <div className="form-group row m-4">
                    <input
                        name="searchTerm"
                        placeholder="Enter search term..."
                        value={searchTerm}
                        className="form-control col-md-10"
                        onChange={handleChange}
                    />
                    <input
                        type="Submit"
                        value="Search"
                        className="form-control col-md-2"
                        readOnly
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchForm;