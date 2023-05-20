import React, { useState} from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { v4 as uuid } from "uuid";
import "./ToolCalendar.css";

const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
};

function ToolCalendar(){
  const [events, setEvents] = useState([]);

  const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuid(),
        },
      ]);
    }
  };

  return (
    <div className="ToolCalendar card">
        <div className="card-body">
            <h4 className="card-title">Select a date to reserve</h4>
            <FullCalendar
                editable
                selectable
                events={events}
                select={handleSelect}
                headerToolbar={{
                start: "title",
                center: "today,dayGridMonth,dayGridWeek",
                end: "prev,next",
                }}
                eventContent={(info) => <EventItem info={info} />}
                plugins={[daygridPlugin, interactionPlugin]}
                views={["dayGridMonth", "dayGridWeek"]}
            />
      </div>
    </div>
  );
};


export default ToolCalendar;