import React from "react";

// Importing Material-UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Tooltip,
  InputAdornment,
} from "@material-ui/core";
import { Autorenew, Link, Settings, Save } from "@material-ui/icons";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleOpen, updateName } from "../../features/AppStatusSlice";

export default function Setting() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.AppStatus.Setting);

  const name = React.useRef();

  return (
    <Dialog
      open={status.open}
      onClose={() => dispatch(toggleOpen({ app: "Setting" }))}
    >
      <DialogTitle>
        <Settings fontSize="small" />
        Setting
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          inputRef={name}
          variant="outlined"
          margin="normal"
          fullWidth
          label="Name"
          defaultValue={status.name}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    dispatch(toggleOpen({ app: "Setting" }));
                    dispatch(updateName({ name: name.current.value }));
                  }}
                >
                  <Save />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Remember To Export Data Before You Reset">
          <IconButton
            color="secondary"
            onClick={() => {
              dispatch({ type: "Reset" });
              dispatch(toggleOpen({ app: "Setting" }));
            }}
          >
            <Autorenew />
            Reset Data
          </IconButton>
        </Tooltip>
        <IconButton
          onClick={() => {
            window.open(
              "https://www.pexels.com/photo/contemporary-megapolis-district-under-cloudy-sky-5847757/"
            );
            window.open(
              "https://www.pexels.com/photo/skyline-photography-of-buildings-3052361/"
            );
          }}
        >
          <Link />
          Picture Sources
        </IconButton>
      </DialogContent>
    </Dialog>
  );
}
