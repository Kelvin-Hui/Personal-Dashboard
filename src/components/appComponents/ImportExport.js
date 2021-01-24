import React from "react";

import store from "../../configureStore";

// Importing Material-UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleOpen } from "../../features/AppStatusSlice";

export default function ImportExport() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.AppStatus.ImportExport.open);

  const [jsonFile, setFile] = React.useState(null);
  const [error, setError] = React.useState(false);

  function readJSON(event) {
    if (event.target.files[0].type !== "application/json") {
      setError(true);
    }
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      // The file's text will be printed here
      //console.log(JSON.parse(e.target.result));
      setFile(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  }
  function downloadJSON() {
    var StatesFile = new Blob([JSON.stringify(store.getState(), null, 2)], {
      type: "application/json",
      name: "PersonalDashboardData.json",
    });

    var url = window.URL || window.webkitURL;
    var link = url.createObjectURL(StatesFile);
    var a = document.createElement("a");
    a.download = "PersonalDashboardData.json";
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  function importJSON() {
    dispatch({ type: "Import", json: jsonFile });
  }

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(toggleOpen({ app: "ImportExport" }))}
    >
      <DialogTitle>Import / Export</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          type="file"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={readJSON}
          inputProps={{ accept: ".json" }}
          onFocus={() => setError(false)}
          error={error}
          helperText={error ? "Wrong Type of Files" : null}
        />
        <Button
          fullWidth
          variant="contained"
          disabled={error || jsonFile === null}
          onClick={() => {
            dispatch(toggleOpen({ app: "ImportExport" }));
            importJSON();
            setFile(null);
          }}
        >
          Import
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            dispatch(toggleOpen({ app: "ImportExport" }));
            downloadJSON();
          }}
        >
          Export Your Data
        </Button>
      </DialogContent>
    </Dialog>
  );
}
