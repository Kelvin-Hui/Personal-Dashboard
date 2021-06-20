import React from "react";

// Importing Material-UI
import {
    Select,
    MenuItem,
    Toolbar,
    Paper,
    IconButton,
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

// Importing Redux
import { useDispatch, useSelector } from "react-redux";
import {
    updateShow,
    emptyList,
    toggleToDoForm,
} from "../../../features/ToDoListSlice";

const styles = {
    paper: {
        position: "sticky",
        bottom: 0,
        width: "100%",
    },
    text: {
        marginRight: "2.5%",
    },
    btn: {
        position: "absolute",
        right: "5%",
    },
};

export default function ToDoListOption() {
    const dispatch = useDispatch();
    const showvalue = useSelector((state) => state.ToDoList.show);

    return (
        <Paper style={styles.paper}>
            <Toolbar variant="dense">
                <b style={styles.text}>Show:</b>
                <Select
                    defaultValue={showvalue}
                    onChange={(e) =>
                        dispatch(updateShow({ showvalue: e.target.value }))
                    }
                    variant="outlined"
                >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Important"> Important</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="In Progress"> In Progress</MenuItem>
                    <MenuItem value="Closer Due Date">
                        {" "}
                        Closer Due Date
                    </MenuItem>
                </Select>

                <section style={styles.btn}>
                    <IconButton onClick={() => dispatch(toggleToDoForm())}>
                        <Add />
                    </IconButton>
                    <IconButton onClick={() => dispatch(emptyList())}>
                        <Delete />
                    </IconButton>
                </section>
            </Toolbar>
        </Paper>
    );
}
