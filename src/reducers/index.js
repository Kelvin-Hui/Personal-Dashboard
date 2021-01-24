import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";

import AppStatusSlice from "../features/AppStatusSlice";
import ToDoListSlice from "../features/ToDoListSlice";
import GoalsSlice from "../features/GoalsSlice";
import CalendarSlice from "../features/CalendarSlice";
import StockTrackerSlice from "../features/StockTrackerSlice";

const appReducers = combineReducers({
  AppStatus: AppStatusSlice,
  ToDoList: ToDoListSlice,
  Goals: GoalsSlice,
  Calendar: CalendarSlice,
  StockTracker: StockTrackerSlice,
});

const initalState = {
  AppStatus: {
    Calendar: {
      open: false,
      pos: {
        x: -230,
        y: -160,
      },
      dims: {
        height: 450,
        width: 450,
      },
    },
    Goals: {
      open: false,
      pos: {
        x: -200,
        y: -200,
      },
      dims: {
        height: 350,
        width: 400,
      },
    },
    StockTracker: {
      open: false,
      pos: {
        x: -200,
        y: -240,
      },
      dims: {
        height: 350,
        width: 400,
      },
    },
    ToDoList: {
      open: false,
      pos: {
        x: -200,
        y: -280,
      },
      dims: {
        height: 350,
        width: 400,
      },
    },
    LiveClock: {
      open: true,
      pos: {
        x: -200,
        y: 0,
      },
      dims: {
        height: 150,
        width: 400,
      },
    },
    ImportExport: {
      open: false,
    },
    Setting: {
      open: true,
      name: "",
    },
  },
  ToDoList: {
    show: "All",
    data: [],
    form: false,
    ToDoListId: 0,
  },
  Goals: {
    form: false,
    data: [],
    GoalsId: 0,
  },
  Calendar: {
    display: {
      open: false,
      event: "",
    },
    form: {
      open: false,
      start: "",
      end: "",
      allDay: "",
    },
    events: [],
    EventId: 0,
  },
  StockTracker: {
    form: false,
    data: {},
  },
};

const rootReducers = (state, action) => {
  switch (action.type) {
    case "Reset":
      storage.removeItem("persist:root");
      return initalState;
    case "Import":
      storage.removeItem("persist:root");
      return action.json;
    default:
      return appReducers(state, action);
  }
};

export default rootReducers;
