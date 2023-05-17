import React from "react";

function ReservationCard({user_id, tool_id, start_date, end_date}){
    return (
        <div className="ReservationCard card">
            <div className="card-body">
                User Id: {user_id}
                Tool Id: {tool_id}
                Start date: {start_date}
                End date: {end_date}
            </div>
        </div>
    )
}

export default ReservationCard;