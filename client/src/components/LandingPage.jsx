import React from "react";
import styles from "../style";
import Navbar from "./Navbar";
import Hero from "./Hero";
import { lazy } from "react";
import { Helmet } from "react-helmet-async";
const Content = lazy(() => import("./Tools"));

const LandingPage = () => {
  return (
    <>
    <Helmet title="Home">
      <title>Home</title>
      
      <meta name="description" content="Home page" />

    </Helmet>
    <div className="w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={` ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <div className={`  ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Content />
        </div>
      </div>
    </div>
    </>

  );
};

export default LandingPage;
