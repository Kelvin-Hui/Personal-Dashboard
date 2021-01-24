import React from "react";

// Importing Material-UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Send } from "@material-ui/icons";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { addEvent, toggleEventForm } from "../../../features/CalendarSlice";

// Importing Needed Modules
import { CirclePicker } from "react-color";

const styles = {
  dialogPaper: {
    //height: "47.5vh",
    //width: "40vw",
  },
  title: {
    border: "1px black solid",
    borderRadius: "15px",
    margin: "10px",
    textAlign: "center",
  },
  content: {
    textAlign: "center",
    overflow: "auto",
  },
  fab: {
    marginTop: "5%",
  },
  colorpicker: {
    margin: "auto",
  },
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
const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];
export default function EventForm() {
  const dispatch = useDispatch();
  const Calendar = useSelector((state) => state.Calendar);

  const [bgColor, setBgColor] = React.useState("#2196f3");

  const title = React.useRef();
  const detail = React.useRef();
  const categories = React.useRef();

  function handleSumbit() {
    dispatch(
      addEvent({
        title: title.current.value,
        detail: detail.current.value,
        bgColor: bgColor,
        categories:
          categories.current.value.charAt(0).toUpperCase() +
          categories.current.value.slice(1),
        start: Calendar.form.start,
        end: Calendar.form.end,
      })
    );
    dispatch(toggleEventForm());
  }
  return (
    <Dialog
      open={Calendar.form.open}
      onClose={() => dispatch(toggleEventForm())}
      PaperProps={{ style: styles.dialogPaper }}
    >
      <DialogTitle style={{ ...styles.title, backgroundColor: bgColor }}>
        Add New Event
      </DialogTitle>
      <DialogContent style={styles.content}>
        <TextField
          inputRef={title}
          margin="dense"
          variant="outlined"
          label="Title"
          fullWidth
          placeholder="Enter Here"
        />
        <TextField
          inputRef={detail}
          margin="dense"
          variant="outlined"
          label="Detail"
          multiline
          fullWidth
          placeholder="Enter Here"
        />

        <Autocomplete
          freeSolo
          options={[
            ...new Set(Calendar.events.map((event) => event.categories)),
          ]}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={categories}
              margin="dense"
              variant="outlined"
              label="Categories"
              fullWidth
              placeholder="Enter Here"
            />
          )}
        ></Autocomplete>

        <div style={{ display: "inline-block" }}>
          <CirclePicker
            colors={colors}
            color={bgColor}
            onChange={(color) => setBgColor(color.hex)}
          />
        </div>

        <TextField
          margin="dense"
          variant="outlined"
          label="Date"
          fullWidth
          defaultValue={
            dateToString(Calendar.form.start, "date") ===
            dateToString(Calendar.form.end, "date")
              ? dateToString(Calendar.form.start, "date")
              : dateToString(Calendar.form.start, "date") +
                " - " +
                dateToString(Calendar.form.end, "date")
          }
          disabled
        />
        <TextField
          margin="dense"
          variant="outlined"
          label="Start"
          fullWidth
          defaultValue={dateToString(Calendar.form.start, "time")}
          disabled
        />
        <TextField
          margin="dense"
          variant="outlined"
          label="End"
          fullWidth
          defaultValue={dateToString(Calendar.form.end, "time")}
          disabled
        />

        <Fab
          variant="extended"
          color="primary"
          onClick={handleSumbit}
          style={styles.fab}
        >
          <Send />
          Add
        </Fab>
      </DialogContent>
    </Dialog>
  );
}
