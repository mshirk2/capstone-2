import React, { useEffect, useState} from "react";
import ToolLibraryApi from "../api";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuid } from "uuid";
import "./ToolCalendar.css";

function ToolCalendar({tool_id}){
  const [events, setEvents] = useState([]);

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

  const handleSelect = (data) => {
    const {start, end} = data;
    alert("Reservation confirmed");
    setEvents([
      ...events,
      {
        id: uuid(),
        title: "Reserved",
        start: start,
        end: end,
        allDay: true,
        backgroundColor: "#223843",
        borderColor: "#223843"
      },
    ]);
    
  }

  return (
    <div className="ToolCalendar card">
        <div className="card-body">
            <h4 className="card-title">Select a date to reserve</h4>
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
                validRange={{
                    start: '2023-05-06'
                }}
                
            />
      </div>
    </div>
  );
};


export default ToolCalendar;