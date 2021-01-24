import React from "react";

// Importing Material-UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Typography,
  Chip,
  Fab,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleDialog, deleteEvent } from "../../../features/CalendarSlice";

const styles = {
  title: {
    border: "1px black solid",
    borderRadius: "15px",
    margin: "10px",
    textAlign: "center",
  },
  divider: {
    height: "3px",
    marginBottom: "2.5%",
    marginTop: "2%",
  },
  content: {
    textAlign: "center",
  },
  type: {
    color: "grey",
    textAlign: "left",
  },
  fab: {
    marginTop: "5%",
  },
};

const columnType = (prop) => {
  return (
    <>
      <div>
        <Typography style={styles.type}>{prop.type}</Typography>
        <Divider style={styles.divider} />
      </div>
    </>
  );
};

function dateToString(date, type) {
  const string = new Date(date);
  switch (type) {
    case "date":
      return string.toLocaleDateString();
    case "time":
      var hours = string.getHours();
      var minutes = string.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    case "value":
      return string.valueOf();
    default:
      return string;
  }
}

export default function EventDisplay(props) {
  const display = useSelector((state) => state.Calendar.display);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(toggleDialog({ id: null }));
    dispatch(deleteEvent({ id: display.event.id }));
  };

  const eventBgColor = display.event.bgColor;
  return (
    <Dialog
      open={display.open}
      onClose={() => dispatch(toggleDialog({ id: null }))}
    >
      <DialogTitle
        style={{
          ...styles.title,
          backgroundColor: eventBgColor,
          color: eventBgColor ? "white" : null,
        }}
      >
        {display.event.title}
      </DialogTitle>
      <DialogContent style={styles.content}>
        {display.event.detail && (
          <>
            {columnType({ type: "Detail" })}
            <p>{display.event.detail}</p>
          </>
        )}

        {display.event.categories && (
          <>
            {columnType({ type: "Categories" })}
            <Chip
              label={display.event.categories}
              style={{ backgroundColor: display.event.bgColor }}
            />
          </>
        )}

        {columnType({ type: "Date" })}
        <Typography>
          {display.event.allday ? display.event.date : <></>}
        </Typography>
        {display.event.allDay ? (
          <Typography>{dateToString(display.event.date, "date")}</Typography>
        ) : (
          <>
            <Typography>{dateToString(display.event.start, "date")}</Typography>
            -<Typography>{dateToString(display.event.end, "date")}</Typography>
          </>
        )}

        {columnType({ type: "Time" })}

        {display.event.allDay ? (
          <p>
            <Chip label="All Day" variant="outlined" />
          </p>
        ) : (
          <>
            <Typography>
              Start : {dateToString(display.event.start, "time")}
            </Typography>
            <Typography>
              {" "}
              End : {dateToString(display.event.end, "time")}
            </Typography>
          </>
        )}

        <Fab
          color="secondary"
          variant="extended"
          style={styles.fab}
          onClick={() => handleDelete()}
        >
          <Delete />
          Delete This Event
        </Fab>
      </DialogContent>
    </Dialog>
  );
}
