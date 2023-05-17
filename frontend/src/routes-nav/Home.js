import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Home(){
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Home">
            <h1 className="display-2 mb-5">Tool Library</h1>
            {currentUser ?
                <>
                    <h4 className="my-4">Welcome back, {currentUser.firstName}</h4>
                    <Link to="/tools" className="btn btn-outline-dark col">
                        Explore Tools
                    </Link>
                </>
                : 
                    <>
                        <Link to="/login" className="btn btn-outline-dark col my-3">
                            Login
                        </Link>
                        <Link to="/signup" className="btn btn-outline-dark col">
                            Sign Up
                        </Link>
                    </>  
            }
        </div>
    )
}

export default Home;