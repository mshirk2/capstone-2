import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Home(){
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Home">
            <h1 className="display-1">Tool Library</h1>
            {currentUser ?
                <h4>Welcome back, {currentUser.firstName}</h4>
                : (
                    <p>
                        <Link to="/login" className="btn">Login</Link>
                        <Link to="/signup" className="btn">Sign Up</Link>
                    </p>
                )
            }
        </div>
    )
}

export default Home;