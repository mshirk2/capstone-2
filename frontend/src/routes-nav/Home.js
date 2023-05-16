import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Home(){
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Home">
            <h1 className="display-1">Tool Library</h1>
            {currentUser ?
                <>
                    <h4 className="my-4">Welcome back, {currentUser.firstName}</h4>
                    <Link to="/tools" className="btn btn-dark">Explore Tools</Link>
                </>
                : 
                    <p>
                        <Link to="/login" className="btn btn-dark m-4">Login</Link>
                        <Link to="/signup" className="btn btn-dark">Sign Up</Link>
                    </p>
            }
        </div>
    )
}

export default Home;