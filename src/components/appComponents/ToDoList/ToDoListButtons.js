import React from "react";

// Importing Material-UI
import { IconButton } from "@material-ui/core";
import {
  HighlightOff,
  CheckBox,
  CheckBoxOutlineBlank,
  Star,
  StarBorder,
} from "@material-ui/icons";

// Importing Redux
import { useDispatch } from "react-redux";
import { toggle, deleteListItem } from "../../../features/ToDoListSlice";

export default function ToDoListButtons({ done, id, priority }) {
  const dispatch = useDispatch();
  return (
    <>
      <IconButton
        onClick={() => dispatch(toggle({ id: id, type: "priority" }))}
        size="small"
      >
        {priority ? <Star style={{ color: "orange" }} /> : <StarBorder />}
      </IconButton>

      <IconButton
        size="small"
        onClick={() => dispatch(toggle({ id: id, type: "done" }))}
      >
        {done ? <CheckBox /> : <CheckBoxOutlineBlank />}
      </IconButton>
      <IconButton
        size="small"
        onClick={() => dispatch(deleteListItem({ id: id }))}
      >
        <HighlightOff />
      </IconButton>
    </>
  );
}
