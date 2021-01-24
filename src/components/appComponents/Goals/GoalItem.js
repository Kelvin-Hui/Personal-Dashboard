import React from "react";

// Importing Components
import GoalButtons from "./GoalButtons";
// Importing Material-UI
import { ListItem, ListItemText } from "@material-ui/core";

export default function GoalItem({ goal }) {
  return (
    <>
      <ListItem divider key={goal.id}>
        <ListItemText
          primary={goal.goal}
          secondary={`Date Created: ${goal.date}`}
          style={goal.achieved ? { textDecorationLine: "line-through" } : null}
        />
        <GoalButtons achieved={goal.achieved} id={goal.id} />
      </ListItem>
    </>
  );
}
