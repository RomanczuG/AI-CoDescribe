import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import LandingPage from "./components/LandingPage";
import { HelmetProvider } from "react-helmet-async";

let Content = React.lazy(() => import("./components/Layout"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            path="/app/*"
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                <Content />
              </React.Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </HelmetProvider>
  </React.StrictMode>
);
