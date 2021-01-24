import React from "react";
//import React, { lazy, Suspense } from "react";

// Importing Components
import ToDoList from "./appComponents/ToDoList";
import StockTracker from "./appComponents/StockTracker";
import Goals from "./appComponents/Goals";
import Calendar from "./appComponents/Calendar";
import LiveClock from "./appComponents/LiveClock";
import ImportExport from "./appComponents/ImportExport";
import Setting from "./appComponents/Setting";

//Import Material - UI
// import { Skeleton } from "@material-ui/lab";

// Importing Redux
import { useSelector } from "react-redux";

// const ToDoList = lazy(() => import("./appComponents/ToDoList"));
// const StockTracker = lazy(() => import("./appComponents/StockTracker"));
// const Goals = lazy(() => import("./appComponents/Goals"));
// const Calendar = lazy(() => import("./appComponents/Calendar"));
// const LiveClock = lazy(() => import("./appComponents/LiveClock"));
// const ImportExport = lazy(() => import("./appComponents/ImportExport"));
// const Setting = lazy(() => import("./appComponents/Setting"));

// const renderLoader = () => <Skeleton variant="rect" />;

export default function RunningApps() {
  const status = useSelector((state) => state.AppStatus);

  return React.useMemo(() => {
    return (
      // <Suspense fallback={renderLoader()}>
      <div>
        {status.ToDoList.open && <ToDoList />}
        {status.StockTracker.open && <StockTracker />}
        {status.Goals.open && <Goals />}
        {status.Calendar.open && <Calendar />}
        {status.LiveClock.open && <LiveClock />}
        <ImportExport />
        <Setting />
      </div>
      // </Suspense>
    );
  }, [
    status.ToDoList.open,
    status.Goals.open,
    status.Calendar.open,
    status.LiveClock.open,
    status.StockTracker.open,
  ]);
}
