import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import ToolLibraryApi from "../api";
import { Spinner } from "reactstrap";

function UserDetail(){
    const { id } = useParams();
    const { currentUser } = useContext(UserContext);
    const [reservations, setReservations] = useState(null);

    useEffect(function getReservationsOnMount(){
        async function getReservations(){
            let result = await ToolLibraryApi.getReservations(id);
            setReservations(result);
        }
        getReservations();
    }, [id]);

    if (!currentUser) return <Spinner />
    
    console.log("reservations = ", reservations);

    return (
        <div className="UserDetail">
            <h3 className="display-4">Hi, {currentUser.username}</h3>
            <Link to={`/users/${id}/edit`} className="btn btn-outline-dark col my-3">
                Edit Profile
            </Link>
            <div className="UserDetail-reservations">
                <h4 className="my-4">Reservations</h4>
                {reservations !== null ? 
                    <p>I found some reservations.. {reservations}</p>
                    : <p>No Reservations Found</p>
                }
            </div>
        </div>
    )
}

export default UserDetail;