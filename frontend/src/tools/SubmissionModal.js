import React from "react";
import "./SubmissionModal.css"

function SubmissionModal(props){

    const start = new Date(props.dates.start).toDateString();
    const end = new Date(props.dates.end).toDateString();

    const submitReservation = (
        <div className={`modal modal-submit ${props.show ? 'show' : ''}`} onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-body">
                        <h4 className="modal-header">Please confirm your reservation</h4>
                        <div>Start Date: {start}</div>
                        <div>End Date: {end}</div>
                        <div className="modal-footer">
                            <button onClick={props.onSubmit} className="btn btn-dark">Submit</button>
                            <button onClick={props.onClose}className="btn btn-outline-dark">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const ReservationConfirmed = (
        <div className={`modal modal-confirmed ${props.show ? 'show' : ''}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-body">
                    <h4>Reservation Confirmed</h4>
                    <div className="modal-footer">
                        <button onClick={props.onClose}className="btn btn-outline-dark">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    if(props.modalContent === "submit") return submitReservation;
    else return ReservationConfirmed;
}

export default SubmissionModal;