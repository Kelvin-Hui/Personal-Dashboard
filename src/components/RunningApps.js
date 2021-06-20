import React from "react";

// Importing Components
import ToDoList from "./appComponents/ToDoList";
import StockTracker from "./appComponents/StockTracker";
import Goals from "./appComponents/Goals";
import Calendar from "./appComponents/Calendar";
import LiveClock from "./appComponents/LiveClock";
import ImportExport from "./appComponents/ImportExport";
import Setting from "./appComponents/Setting";

// Importing Redux
import { useSelector } from "react-redux";

export default function RunningApps() {
    const status = useSelector((state) => state.AppStatus);

    return React.useMemo(() => {
        return (
            <div>
                {status.ToDoList.open && <ToDoList />}
                {status.StockTracker.open && <StockTracker />}
                {status.Goals.open && <Goals />}
                {status.Calendar.open && <Calendar />}
                {status.LiveClock.open && <LiveClock />}
                <ImportExport />
                <Setting />
            </div>
        );
    }, [
        status.ToDoList.open,
        status.Goals.open,
        status.Calendar.open,
        status.LiveClock.open,
        status.StockTracker.open,
    ]);
}
