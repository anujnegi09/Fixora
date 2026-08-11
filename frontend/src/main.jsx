import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store.js";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

document.documentElement.classList.add("scrollbar-hide");
document.body.classList.add("scrollbar-hide");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          containerStyle={{
            zIndex: 10000,
          }}
          toastOptions={{
            duration: 2000,
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
