import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducers from "./reducers";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ["persist/PERSIST"],
    },
  }),
});

export default store;
