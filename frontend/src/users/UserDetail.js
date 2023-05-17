import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import ReservationList from "../reservations/ReservationList";
import { Spinner } from "reactstrap";

function UserDetail(){
    const { id } = useParams();
    const { currentUser } = useContext(UserContext);

    if (!currentUser) return <Spinner />

    return (
        <div className="UserDetail">
            <h3 className="display-4">Hi, {currentUser.username}</h3>
            <Link to={`/users/${id}/edit`} className="btn btn-outline-dark col my-3">
                Edit Profile
            </Link>
            <div className="UserDetail-reservations">
               <ReservationList id={id}/>
            </div>
        </div>
    )
}

export default UserDetail;