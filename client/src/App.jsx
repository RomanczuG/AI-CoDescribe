import React from "react";
import LandingPage from "./components/LandingPage";
// import { useEffect } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import { BrowserRouter } from "react-router-dom";
import God from "./components/God";

const App = () => {

  return (
    <>
      <Layout/>
    </>
    
  );
};

export default App;
