import { CircularProgress, ThemeProvider } from "@mui/material";
import React, { Suspense } from "react";
import "./App.css";
import Router from "./app/Router";
import theme from "./app/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<CircularProgress />}>
        <Router />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
