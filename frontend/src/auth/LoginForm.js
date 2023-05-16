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
                <h2 className="display-4 m-4">Login</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label for="username">Username</label>
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
                            <label for="password">Password</label>
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
                        <div>
                            <input
                                type="Submit"
                                value="Login"
                                className="btn btn-dark"
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;