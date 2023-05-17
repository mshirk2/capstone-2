import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from 'reactstrap';

function SignupForm({signup}) {
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);
    const history = useHistory();

    function handleChange(e) {
        e.persist();
        setFormData(f => ({ ...f, [e.target.name]: e.target.value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await signup(formData)
        if (result.success){
            history.push(`/tools`);
        } else {
            setFormErrors(result.errors)
        }
    }

    let {username, email, firstName, lastName, password} = formData;

    return (
        <div className="SignupForm">
            <div className="container">
                {formErrors.length ? 
                    <Alert color="warning">
                        {formErrors.map(error =>(<p key={error}>{error}</p>))}
                    </Alert> 
                    : null 
                }
                <h2 className="my-4 display-4">Sign Up</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                id="username"
                                type="text"
                                className="form-control"
                                autoComplete="username"
                                onChange={handleChange}
                                value={username}
                                required
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="email">Email</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                className="form-control"
                                onChange={handleChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                name="firstName"
                                id="firstName"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={firstName}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                name="lastName"
                                id="lastName"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={lastName}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                className="form-control"
                                autoComplete="new-password"
                                onChange={handleChange}
                                value={password}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;