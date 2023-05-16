import React, { useState, useContext } from "react";
import ToolLibraryApi from "../api";
import UserContext from "./UserContext";
import { Alert } from "reactstrap";

function ProfileForm(){
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });

    const [formErrors, setFormErrors] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    function handleChange(e) {
        e.persist();
        setFormData(f => ({ ...f, [e.target.name]: e.target.value}));
        setFormErrors([]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let updatedData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };
        let username = formData.username
        let updatedUser;

        try {
            updatedUser = await ToolLibraryApi.updateProfile(username, updatedData);
        } catch (errors){
            setFormErrors(errors);
            return;
        }
        
        setFormErrors([]);
        setUpdateSuccess(true);
        setFormData(f => ({ ...f, password: ""}));
        setCurrentUser(updatedUser);
    }

    return (
        <div className="ProfileForm">
            <div className="container">
                {formErrors.length ? 
                    <Alert color="warning">
                        {formErrors.map(error =>(<p key={error}>{error}</p>))}
                    </Alert> 
                    : null 
                }
                {updateSuccess ? 
                    <Alert color="success">Changes saved.</Alert> 
                    : null 
                }
                <h4 className="m-4 display-4">Edit Profile</h4>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label for="username">Username</label>
                            <input 
                                readonly
                                id="username" className="form-control-plaintext"
                                value={formData.username}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label for="email">Email</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="form-control"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label for="firstName">First Name</label>
                            <input
                                name="firstName"
                                id="firstName"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={formData.firstName}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label for="lastName">Last Name</label>
                            <input
                                name="lastName"
                                id="lastName"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={formData.lastName}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label for="password">Enter password to save changes:</label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                className="form-control"
                                onChange={handleChange}
                                value={formData.password}
                                required
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="Submit"
                                value="Save"
                                className="form-control btn btn-dark"
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;