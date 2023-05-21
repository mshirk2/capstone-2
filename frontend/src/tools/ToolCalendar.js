import React, { useEffect, useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import ToolLibraryApi from "../api";
import SubmissionModal from "./SubmissionModal";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuid } from "uuid";
import "./ToolCalendar.css";


function ToolCalendar({tool_id}){
  const { currentUser } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(function getReservationsOnMount(){
    async function getReservations(){
      let reservations = await ToolLibraryApi.getReservations(null, tool_id, true);
      let resEvents = reservations.map(r => (
        {
          id: r.id,
          title: "Reserved",
          start: r.start_date,
          end: r.due_date,
          allDay: true,
          backgroundColor: "#223843",
          borderColor: "#223843"
        }
      ));
      setEvents(resEvents);
    }
    getReservations();
  }, [null, tool_id, true]);

  function handleSelect(dates){
    setDates(dates);
    setShowModal(true);
    setModalContent("submit");

  }

  async function handleSubmit(evt){
    evt.preventDefault();
    let result = await ToolLibraryApi.createReservation({
      user_id: currentUser.id,
      tool_id: tool_id,
      is_active: true,
      start_date: dates.start,
      due_date: dates.end,
      returned_data: null
    });
    
    if(result.reservation){
      setModalContent("confirmed")
    } else {
      alert("We encountered an error. Please try again")
      console.log(result.errors);
    }

    setEvents([
      ...events,
      {
        id: uuid(),
        title: "Reserved",
        start: dates.start,
        end: dates.end,
        allDay: true,
        backgroundColor: "#223843",
        borderColor: "#223843"
      },
    ]);
  }

  return (
    <div className="ToolCalendar card">
        <div className="card-body">
            <SubmissionModal show={showModal} modalContent={modalContent} onClose={() => setShowModal(false)} onSubmit={handleSubmit} dates={dates}/>
            <h4 className="card-title">Select a date to reserve</h4>
            <p className="card-subtitle text-muted mb-4">Click and drag to select multiple days</p>
            <FullCalendar
                editable
                selectable
                selectOverlap={false}
                eventOverlap={false}
                events={events}
                select={handleSelect}
                headerToolbar={{
                  start: "title",
                  center: "today,dayGridMonth,dayGridWeek",
                  end: "prev,next",
                }}
                plugins={[daygridPlugin, interactionPlugin]}
                views={["dayGridMonth", "dayGridWeek"]}
                validRange={function(nowDate){
                  return{
                    start: nowDate
                  }
                }}
                
            />
      </div>
    </div>
  );
};


export default ToolCalendar;