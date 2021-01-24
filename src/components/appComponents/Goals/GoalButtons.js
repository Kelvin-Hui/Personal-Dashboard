import React from "react";

// Importing Material-UI
import { IconButton } from "@material-ui/core";
import {
  CheckCircle,
  CheckCircleOutline,
  HighlightOff,
} from "@material-ui/icons";

// Importing Redux
import { useDispatch } from "react-redux";
import { toggleAchieved, deleteGoal } from "../../../features/GoalsSlice";

export default function GoalButtons({ achieved, id }) {
  const dispatch = useDispatch();
  return (
    <>
      <IconButton
        size="small"
        onClick={() => dispatch(toggleAchieved({ id: id }))}
      >
        {achieved ? <CheckCircle /> : <CheckCircleOutline />}
      </IconButton>

      <IconButton size="small" onClick={() => dispatch(deleteGoal({ id: id }))}>
        <HighlightOff />
      </IconButton>
    </>
  );
}
