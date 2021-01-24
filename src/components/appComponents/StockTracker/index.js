import React from "react";

// Importing Components
import Widget from "../Util/Widget";
import WatchList from "./WatchList";

// Importing Material-UI
import { ShowChart } from "@material-ui/icons";

// Importing Redux
import { useDispatch } from "react-redux";
import { toggleOpen } from "../../../features/AppStatusSlice";

export default function StockTracker() {
  const dispatch = useDispatch();
  //console.log("Stock Tracker");

  return (
    <Widget
      title="StockTracker"
      onClose={() => dispatch(toggleOpen({ app: "StockTracker" }))}
      icon={<ShowChart style={{ color: "green" }} />}
    >
      <WatchList />
    </Widget>
  );
}
