import React from "react";
import { Link } from "react-router-dom";
import placeholderImage from "../images/screwdriver-wrench-solid.svg";
import "./ReservationCard.css"

function ReservationCard({title, tool_id, catalog_code, end_formatted, diff, images}){

    // Determine singular or plural day/days until tool is due
    let dayOrDays;
    diff.days === 1 || diff.days === -1 ? dayOrDays = 'day' : dayOrDays = 'days'

    if(!images) images[0] = placeholderImage;

    return (
        <div className="ReservationCard card my-2">
            <div className="card-body">
                <Link to={`/tools/${tool_id}`} className="link">
                    {images && <img src={images[0]} alt={title} />}
                    <h5 className="card-title">{title}</h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-muted">{catalog_code}</h6>
                <div>Due: {end_formatted}</div>
                <a href="#" className="btn btn-outline-dark mt-5">Return</a>
            </div>
            <div className="card-footer">
                {diff.days <= 0 ?
                    <small className="text-danger">Due {diff.days * -1} {dayOrDays} ago</small>
                : <small className="text-muted">Due in {diff.days} {dayOrDays}</small>
                }
            </div>
        </div>
    )
}

export default ReservationCard;