import React from 'react'
import styles from '../style';
import Navbar from './Navbar';
import Hero from './Hero';
// import { useEffect } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';

const LandingPage = () => {
    return (
        <BrowserRouter>
        <div className='w-full overflow-hidden'>
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Navbar/>
            </div>
          </div>
    
          <div className={` ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Hero/>
            </div>
          </div>
          <div className={` ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              {/* Stats
              Bussines
              etc. */}
            </div>
          </div>
    
        </div>
        </BrowserRouter>
      )
}

export default LandingPage;