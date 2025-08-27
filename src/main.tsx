// src/main.tsx বা src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { router } from "./routes";
import { ThemeProvider } from "./provider/themeProvider";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";
import "./lib/leaflet-setup";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
