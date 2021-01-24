import React from "react";

// Importing Assets
import appIcon from "../assets/appIcon.svg";

// Importing Redux
import { useDispatch } from "react-redux";
import { toggleOpen } from "../features/AppStatusSlice";

// Importing Material-UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  PlaylistAddCheck,
  ListAlt,
  ShowChart,
  Today,
  AccessTime,
  ImportExport,
  Settings,
} from "@material-ui/icons";

const styles = {
  app_btn: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 20,
  },
};

const AppButton = ({ icon, appText, action }) => {
  return (
    <IconButton onClick={action}>
      <div>
        {icon}
        <Typography>{appText}</Typography>
      </div>
    </IconButton>
  );
};

export default function AppDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <IconButton style={styles.app_btn} onClick={() => setOpen(true)}>
        <img src={appIcon} alt="Apps" height="32px" width="32px" />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add To Screen:</DialogTitle>
        <DialogContent
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <AppButton
            icon={<PlaylistAddCheck style={{ color: "#D79C62" }} />}
            appText="To Do List"
            action={() => {
              dispatch(toggleOpen({ app: "ToDoList" }));
              setOpen(false);
            }}
          />
          <AppButton
            icon={<ShowChart style={{ color: "green" }} />}
            appText="StockTracker"
            action={() => {
              dispatch(toggleOpen({ app: "StockTracker" }));
              setOpen(false);
            }}
          />
          <AppButton
            icon={<ListAlt color="error" />}
            appText="Goals"
            action={() => {
              dispatch(toggleOpen({ app: "Goals" }));
              setOpen(false);
            }}
          />

          <AppButton
            icon={<Today style={{ color: "blue" }} />}
            appText="Calendar"
            action={() => {
              dispatch(toggleOpen({ app: "Calendar" }));
              setOpen(false);
            }}
          />
          <AppButton
            icon={<AccessTime style={{ color: "grey" }} />}
            appText="Clock"
            action={() => {
              dispatch(toggleOpen({ app: "LiveClock" }));
              setOpen(false);
            }}
          />
          <AppButton
            icon={<ImportExport />}
            appText="Import Export"
            action={() => {
              dispatch(toggleOpen({ app: "ImportExport" }));
              setOpen(false);
            }}
          />
          <AppButton
            icon={<Settings />}
            appText="Settings"
            action={() => {
              dispatch(toggleOpen({ app: "Setting" }));
              setOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
