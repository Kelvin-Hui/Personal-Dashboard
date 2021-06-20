import React from "react";

// Importing Components
import Widget from "../Util/Widget";
import ToDoListItem from "./ToDoListItem";
import ToDoListOption from "./ToDoListOption";
import ToDoListForm from "./ToDoListForm";

// Importing Material-UI
import { List } from "@material-ui/core";
import { PlaylistAddCheck } from "@material-ui/icons";

// Importing Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleOpen } from "../../../features/AppStatusSlice";

export default function ToDoList() {
    const dispatch = useDispatch();
    const itemData = useSelector((state) => state.ToDoList.data);
    return (
        <Widget
            title="ToDoList"
            icon={<PlaylistAddCheck style={{ color: "#D79C62" }} />}
            onClose={() => dispatch(toggleOpen({ app: "ToDoList" }))}
        >
            <List
                disablePadding
                style={{ height: "calc(100% - 48px)", overflow: "auto" }}
            >
                {itemData.map((task) => {
                    return <ToDoListItem task={task} key={task.id} />;
                })}
                <ToDoListOption />
            </List>

            <ToDoListForm />
        </Widget>
    );
}
