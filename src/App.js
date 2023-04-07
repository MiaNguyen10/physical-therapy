import { CircularProgress, ThemeProvider } from "@mui/material";
import Router from "app/Router";
import { PermissionProvider } from "app/middlewares/PermissionProvider";
import theme from "app/theme";
import React, { Suspense } from "react";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <PermissionProvider>
        <Suspense fallback={<CircularProgress />}>
          <Router />
        </Suspense>
      </PermissionProvider>
    </ThemeProvider>
  );
}

export default App;
