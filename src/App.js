import "./App.css";
import Homepage from "./components/Homepage";

import store from "./configureStore";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Homepage />
      </PersistGate>
    </Provider>
  );
}

export default App;
