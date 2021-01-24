import React from "react";

// Importing Material-UI
import { Popover } from "@material-ui/core";

export default function FullScreen(explicitProps) {
  return (
    <Popover
      {...explicitProps}
      //anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      PaperProps={{
        style: { width: "90%", height: "90vh", inset: 0, margin: "auto" },
      }}
    />
  );
}
