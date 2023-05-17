import React, { useState, useEffect }from "react";
import ToolLibraryApi from "../api";
import ReservationCard from "./ReservationCard";

function ReservationList({id}){
    const [reservations, setReservations] = useState(null);

    useEffect(function getReservationsOnMount(){
        async function getReservations(){
            let result = await ToolLibraryApi.getReservations(id);
            setReservations(result);
        }
        getReservations();
    }, [id]);

    console.log("reservations = ", reservations);

    return (
        <div className="ReservationList">
            <h4 className="my-4">Reservations</h4>
            {reservations !== null ? 
                (
                    <div className="ReservationList-list">
                        {reservations.map(r => (
                            <ReservationCard
                                key={r.id}
                                user_id={r.user_id}
                                tool_id={r.tool_id}
                                start_date={r.start_date}
                                end_date={r.end_date}
                            />
                        ))}
                    </div>
                ) : <p>No Reservations Found</p>
            }
        </div>
    )
}

export default ReservationList;