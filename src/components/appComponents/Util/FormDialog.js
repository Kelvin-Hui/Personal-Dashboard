import React from "react";

// Importing Material-UI
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";

const styles = {
  title: {
    border: "1px black solid",
    borderRadius: "15px",
    margin: "10px",
    textAlign: "center",
  },
};

export default function FormDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.close}>
      <DialogTitle style={styles.title}>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}
