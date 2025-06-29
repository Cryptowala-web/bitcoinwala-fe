import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ContentProvider from "./context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContentProvider>
  </StrictMode>
);
