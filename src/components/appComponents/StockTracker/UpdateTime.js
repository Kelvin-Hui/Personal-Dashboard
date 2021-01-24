import React from "react";

// Importing Material-UI
import { Typography } from "@material-ui/core";

export default function UpdateTime() {
  const [time, setTime] = React.useState(new Date().toLocaleTimeString());

  React.useEffect(() => {
    let interval = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      30000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Typography style={{ fontSize: "10px", position: "absolute", right: 0 }}>
      Last Updated: {time}
    </Typography>
  );
}
