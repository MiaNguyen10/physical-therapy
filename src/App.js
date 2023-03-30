import { CircularProgress } from "@mui/material";
import React, { Suspense } from "react";
import "./App.css";
import Router from "./app/Router";

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Router />
    </Suspense>
  );
}

export default App;
