import React from "react";

// Importing Components
import ToDoListButtons from "./ToDoListButtons";

// Importing Material-UI
import { ListItem, ListItemText } from "@material-ui/core";

export default function ToDoListItem({ task }) {
  return (
    <ListItem divider key={task.id}>
      <ListItemText
        primary={task.title}
        secondary={task.date ? <b>Due Date : {task.date}</b> : null}
        style={{
          textDecoration: task.done ? "line-through" : null,
          color:
            new Date().setHours(0, 0, 0, 0) >
            new Date(task.date).setHours(0, 0, 0, 0)
              ? "red"
              : null,
        }}
      />
      <ToDoListButtons done={task.done} id={task.id} priority={task.priority} />
    </ListItem>
  );
}
