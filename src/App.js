import React from "react";
import "./App.css";
import "aos/dist/aos.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import { useStore } from "./redux/Store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const store = useStore();
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <Router>
            <AppRouter />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
