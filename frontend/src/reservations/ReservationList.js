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
                                title={r.title}
                                tool_id={r.tool_id}
                                catalog_code={r.catalog_code}
                                start_formatted={r.start_formatted}
                                end_formatted={r.end_formatted}
                                diff={r.diff}
                                images={r.images}
                            />
                        ))}
                    </div>
                ) : <p>No Reservations Found</p>
            }
        </div>
    )
}

export default ReservationList;