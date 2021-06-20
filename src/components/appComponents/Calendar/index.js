import React from "react";

// Importing Components
import Widget from "../Util/Widget";
import EventCalendar from "./EventCalendar";

// Importing Material-UI
import { Today } from "@material-ui/icons";

// Importing Redux
import { useDispatch } from "react-redux";
import { toggleOpen } from "../../../features/AppStatusSlice";

export default function Calendar() {
    const dispatch = useDispatch();

    //console.log("Calendar");

    return (
        <Widget
            title="Calendar"
            onClose={() => dispatch(toggleOpen({ app: "Calendar" }))}
            icon={<Today style={{ color: "blue" }} />}
        >
            <div
                style={{
                    height: "calc(100% - 48px)",
                    overflow: "auto",
                    overflowX: "hidden",
                }}
            >
                <EventCalendar />
            </div>
        </Widget>
    );
}
