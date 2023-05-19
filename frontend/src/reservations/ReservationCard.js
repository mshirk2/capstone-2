import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../images/screwdriver-wrench-solid.svg";
import "./ReservationCard.css"

function ReservationCard({id, title, tool_id, catalog_code, is_active, start_formatted, due_formatted, returned_formatted, diff, images, completeReservation}){

    // Determine formatting for day/days until tool is due
    let dayOrDays = 'days';
    if(diff.days === 1 || diff.days === -1) dayOrDays = 'day';

    let toolDue = '';
    let toolDueClass="text-danger";
    if(!diff.days && diff.milliseconds > 0){
        toolDue = "Due tomorrow";
    } else if(!diff.days && diff.milliseconds < 0){
        toolDue = "Due today";
    } else if(diff.days <= -1){
        toolDue = `Due ${diff.days * -1} ${dayOrDays} ago`;
    } else if(diff.days >= 1){
        toolDue = `Due in ${diff.days} ${dayOrDays}`;
        toolDueClass = "text-muted";
    }

    async function handleComplete(){
        completeReservation(id);
    }

    if(!images) images[0] = placeholderImage;

    const pastReservation = (        
        <div className="ReservationCard card my-2">
            <div className="card-body">
                <Link to={`/tools/${tool_id}`} className="link">
                    {images && <img src={images[0]} alt={title} />}
                    <h5 className="card-title">{title}</h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-muted">{catalog_code}</h6>
                <div>Reserved: {start_formatted}</div>
                <div>Due: {due_formatted}</div>
                <div>Returned: {returned_formatted}</div>
            </div>
        </div>
    )

    const activeReservation = (
        <div className="ReservationCard card my-2">
            <div className="card-body">
                <Link to={`/tools/${tool_id}`} className="link">
                    {images && <img src={images[0]} alt={title} />}
                    <h5 className="card-title">{title}</h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-muted">{catalog_code}</h6>
                <div>Reserved: {start_formatted}</div>
                <div>Due: {due_formatted}</div>
                <button className="btn btn-outline-dark mt-5" onClick={handleComplete}>Return</button>
            </div>
            <div className="card-footer">
                <small className={toolDueClass}>{toolDue}</small>
            </div>
        </div>
    )

    if(is_active === true) return activeReservation;

    return pastReservation;
}

export default ReservationCard;