import React from "react";

// Importing Components
import WatchListItem from "./WatchListItem";
import WatchListForm from "./WatchListForm";
import UpdateTime from "./UpdateTime";

// Importing Material-UI
import { List, Typography, Divider, Fab, Zoom } from "@material-ui/core";
import { Add } from "@material-ui/icons";

// Importing Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleStockForm } from "../../../features/StockTrackerSlice";

export default function WatchList() {
  const dispatch = useDispatch();
  const [fab, setFab] = React.useState(false);
  const watchList = useSelector((state) => state.StockTracker.data);

  return (
    <List
      disablePadding
      onMouseEnter={() => setFab(true)}
      onMouseLeave={() => setFab(false)}
      style={{ height: "calc(100% - 48px)", overflow: "auto" }}
    >
      <UpdateTime />

      {Object.keys(watchList).map((listName) => {
        return (
          <>
            <Typography>{listName}</Typography>
            <Divider variant="middle" style={{ height: "3px" }} />
            {watchList[listName].map((ticker) => (
              <WatchListItem ticker={ticker} listName={listName} key={ticker} />
            ))}
          </>
        );
      })}
      <WatchListForm />

      <Zoom in={fab}>
        <Fab
          size="small"
          style={{
            position: "fixed",
            right: "10%",
            bottom: "5%",
            color: "green",
            backgroundColor: "white",
          }}
          onClick={() => dispatch(toggleStockForm())}
        >
          <Add />
        </Fab>
      </Zoom>
    </List>
  );
}
