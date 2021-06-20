import React from "react";

// Importing Components
import EventDisplay from "./EventDisplay";
import EventForm from "./EventForm";

import {
    CustomEvent,
    CustomToolbar,
    CustomEventAgenda,
    CustomDayEvent,
} from "./CustomComponents";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleDialog, toggleEventForm } from "../../../features/CalendarSlice";

// Importing Needed Modules
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import WorkWeek from "react-big-calendar/lib/WorkWeek";
import moment from "moment";

function eventStyle(event, start, end, isSelected) {
    var style = {
        backgroundColor: event.bgColor,
    };
    return { style: style };
}

const localizer = momentLocalizer(moment);

export default function EventCalendar() {
    const eventlist = useSelector((state) => state.Calendar.events);
    const dispatch = useDispatch();
    return (
        <>
            <Calendar
                views={{
                    month: true,
                    day: true,
                    week: WorkWeek,
                    agenda: true,
                }}
                localizer={localizer}
                events={eventlist}
                selectable
                defaultDate={new Date()}
                onSelectEvent={(event) =>
                    dispatch(toggleDialog({ id: event.id }))
                }
                onSelectSlot={(e) =>
                    dispatch(
                        toggleEventForm({
                            start: e.start,
                            end: e.end,
                            allDay: e.start === e.end,
                        })
                    )
                }
                eventPropGetter={eventStyle}
                components={{
                    event: CustomEvent,
                    toolbar: CustomToolbar,
                    agenda: {
                        event: CustomEventAgenda,
                    },
                    day: {
                        event: CustomDayEvent,
                    },
                }}
            />
            <EventDisplay />
            <EventForm />
        </>
    );
}
