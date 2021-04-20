import "./config/ReactotronConfig";
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import Themes from "./themes";
import AppComponents from "./components/App";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";
import { store, persistor } from "./store";

function App() {
  return (
    <LayoutProvider>
      <UserProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={Themes.default}>
              <CssBaseline />
              <AppComponents />
              <ToastContainer autoClose={3000} />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </UserProvider>
    </LayoutProvider>
  );
}

export default App;
