import React from "react";

// Importing Components
import FormDialog from "../Util/FormDialog";

// Importing Material-UI
import { TextField, Fab, FormControl } from "@material-ui/core";
import { Send } from "@material-ui/icons";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { addToDoList, toggleToDoForm } from "../../../features/ToDoListSlice";

// Importing Needed Modules
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import format from "date-fns/format";

export default function ToDoListForm() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.ToDoList.form);

    const title = React.useRef();

    const [date, setDate] = React.useState(new Date().toLocaleDateString());
    const [error, setError] = React.useState(false);

    function handleSumbit(e) {
        e.preventDefault();
        if (title.current.value !== "") {
            dispatch(addToDoList({ title: title.current.value, date: date }));
            setDate(new Date().toLocaleDateString());
            dispatch(toggleToDoForm());
        } else {
            setError(true);
        }
    }

    return (
        <FormDialog
            open={open}
            close={() => dispatch(toggleToDoForm())}
            title="Add ToDo"
        >
            <FormControl>
                <TextField
                    inputRef={title}
                    error={error}
                    onFocus={() => setError(false)}
                    margin="dense"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    placeholder="Enter Here"
                    helperText={error ? "Title Required" : null}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        format="MM/dd/yyyy"
                        margin="normal"
                        fullWidth
                        disablePast
                        inputVariant="outlined"
                        label="Due Date"
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
