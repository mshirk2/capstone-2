import React, { useState, useEffect }from "react";
import ToolLibraryApi from "../api";
import ReservationCard from "./ReservationCard";

function ReservationList({user_id}){
    const [activeReservations, setActiveReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);


    // Set active or past reservations using getReservations(user_id, tool_id, is_active)
    useEffect(function getActiveReservationsOnMount(){
        getActiveReservations();
    }, [user_id, null, true]);

    async function getActiveReservations(){
        let result = await ToolLibraryApi.getReservations(user_id, null, true);
        setActiveReservations(result);
    }

    useEffect(function getPastReservationsOnMount(){
        getPastReservations();
    }, [user_id, null, false]);

    async function getPastReservations(){
        let result = await ToolLibraryApi.getReservations(user_id, null, false);
        setPastReservations(result);
    }

    // Using reservation id, set returned date, set is_active to false, and re-render components
    async function completeReservation(id){
        id = parseInt(id);
        await ToolLibraryApi.completeReservation(id);
        getActiveReservations();
        getPastReservations();
    }

    console.log("activeReservations =", activeReservations);
    console.log("pastReservations =", pastReservations);

    return (
        <div className="ReservationList">
            <div className="ReservationList-active">
                <h4 className="my-4">Current Reservations</h4>
                    {activeReservations.length > 0 ?
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
                        ) : (
                            <div>
                                <p>No Reservations Found</p>
                                <a href="/tools" className="btn btn-dark">Explore Tools</a>
                            </div>
                        )
                    }
            </div>
            <div className="ReservationList-past">
                <h4 className="my-4">Past Reservations</h4>
                    {pastReservations.length > 0 ? 
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