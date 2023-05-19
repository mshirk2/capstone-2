import React, { useState, useEffect }from "react";
import ToolLibraryApi from "../api";
import ReservationCard from "./ReservationCard";

function ReservationList({id}){
    const [activeReservations, setActiveReservations] = useState(null);
    const [pastReservations, setPastReservations] = useState(null);

    useEffect(function getActiveReservationsOnMount(){
        getActiveReservations();
    }, [id, true]);

    async function getActiveReservations(){
        let result = await ToolLibraryApi.getReservations(id, true);
        setActiveReservations(result);
    }

    useEffect(function getPastReservationsOnMount(){
        getPastReservations();
    }, [id, false]);

    async function getPastReservations(){
        let result = await ToolLibraryApi.getReservations(id, false);
        setPastReservations(result);
    }

    async function completeReservation(id){
        id = parseInt(id);
        await ToolLibraryApi.completeReservation(id);
        getActiveReservations();
        getPastReservations();
    }

    console.log("activeReservations = ", activeReservations);
    console.log("pastReservations = ", pastReservations);

    return (
        <div className="ReservationList">
            <div className="ReservationList-active">
                <h4 className="my-4">Current Reservations</h4>
                    {activeReservations !== null ?
                        (
                            <div className="ReservationList-active-list">
                                {activeReservations.map(r => (
                                    <ReservationCard
                                        key={r.id}
                                        id={r.id}
                                        title={r.title}
                                        tool_id={r.tool_id}
                                        catalog_code={r.catalog_code}
                                        is_active={r.is_active}
                                        start_formatted={r.start_formatted}
                                        due_formatted={r.due_formatted}
                                        returned_formatted={r.returned_formatted}
                                        diff={r.diff}
                                        images={r.images}
                                        completeReservation={completeReservation}
                                    />
                                ))}
                            </div>
                        ) : <p>No Reservations Found</p>
                    }
            </div>
            <div className="ReservationList-past">
                <h4 className="my-4">Past Reservations</h4>
                    {pastReservations !== null ? 
                        (
                            <div className="ReservationList-past-list">
                                {pastReservations.map(r => (
                                    <ReservationCard
                                        key={r.id}
                                        id={r.id}
                                        title={r.title}
                                        tool_id={r.tool_id}
                                        catalog_code={r.catalog_code}
                                        is_active={r.is_active}
                                        start_formatted={r.start_formatted}
                                        due_formatted={r.due_formatted}
                                        returned_formatted={r.returned_formatted}
                                        diff={r.diff}
                                        images={r.images}
                                    />
                                ))}
                            </div>
                        ) : <p>No Reservations Found</p>
                    }
            </div>
        </div>
    )
}

export default ReservationList;