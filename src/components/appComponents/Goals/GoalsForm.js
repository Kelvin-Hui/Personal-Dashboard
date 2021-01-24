import React from "react";

// Importing Components
import FormDialog from "../Util/FormDialog";

// Importing Material-UI
import { TextField, Fab, FormControl } from "@material-ui/core";
import { Send } from "@material-ui/icons";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { addGoals, toggleGoalsForm } from "../../../features/GoalsSlice";

// Importing Needed Modules
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";

export default function GoalsForm() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.Goals.form);

  const goal = React.useRef();

  const [date, setDate] = React.useState(new Date().toLocaleDateString());
  const [error, setError] = React.useState(false);

  function handleSumbit(e) {
    e.preventDefault();
    if (goal.current.value !== "") {
      dispatch(addGoals({ goal: goal.current.value, date: date }));
      dispatch(toggleGoalsForm());
    } else {
      setError(true);
    }
  }

  return (
    <FormDialog
      open={open}
      close={() => dispatch(toggleGoalsForm())}
      title="Add Goals"
    >
      <FormControl>
        <TextField
          inputRef={goal}
          error={error}
          onFocus={() => setError(false)}
          margin="dense"
          variant="outlined"
          label="Goals"
          fullWidth
          placeholder="Enter Here"
          helperText={error ? "Goal   Required" : null}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            format="MM/dd/yyyy"
            margin="normal"
            fullWidth
            //disablePast
            inputVariant="outlined"
            label="Date Created"
            value={date}
            onChange={(date) => setDate(format(date, "MM/dd/yyyy"))}
          />
        </MuiPickersUtilsProvider>

        <Fab
          variant="extended"
          color="primary"
          onClick={handleSumbit}
          style={{ marginTop: "5%" }}
        >
          <Send />
          Add
        </Fab>
      </FormControl>
    </FormDialog>
  );
}
