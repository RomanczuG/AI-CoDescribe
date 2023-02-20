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
        <title>CoDecribe.app: AI Coding Companion</title>
        <meta
          name="description"
          content="Take advantage of AI when coding. Document, Optimize and Explain code like never before."
        />
        <link rel="canonical" href="/" />
        {/* Open Graph tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="CoDecribe.app: AI Coding Companion"
        />
        <meta
          property="og:description"
          content="Take advantage of AI when coding. Document, Optimize and Explain code like never before."
        />
        <meta property="og:url" content="/" />

        {/* Schema markup */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://www.codescribe.app/",
        "name": "CoDecribe.app",
        "description": "Take advantage of AI when coding. Document, Optimize and Explain code like never before."
      }
    `}
        </script>
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
