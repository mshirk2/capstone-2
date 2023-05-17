import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "reactstrap";

function LoginForm({login}){
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState([]);
    const history = useHistory();

    function handleChange(e) {
        e.persist();
        setFormData(f => ({ ...f, [e.target.name]: e.target.value}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData)
        if (result.success){
            history.push(`/tools`);
        } else {
            setFormErrors(result.errors);
        }
    }

    let {username, password} = formData;

    return (
        <div className="LoginForm">
            <div className="container">
                {formErrors.length ?
                    <Alert color="warning">
                        {formErrors.map(error =>(<p  key={error}>{error}</p>))}
                    </Alert>
                    : null
                }
                <h2 className="display-4 my-4">Welcome back</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label htmlFor="username">Username</label>
                                <input
                                    name="username"
                                    id="username"
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={username}
                                    autoComplete="username"
                                    required
                                />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                className="form-control"
                                onChange={handleChange}
                                autoComplete="current-password"
                                value={password}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;