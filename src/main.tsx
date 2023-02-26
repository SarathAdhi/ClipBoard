import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { ContextProvider } from "./common/context/Provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>

    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        className: "font-medium",
      }}
    />
  </React.StrictMode>
);
