import React from 'react'
import styles from '../style';
import Navbar from './Navbar';
import Hero from './Hero';
import { BrowserRouter } from 'react-router-dom';
// import Tools from './Tools';
import { lazy } from 'react';
const Content = lazy(() => import('./Tools'));

const LandingPage = () => {
    return (
        // <BrowserRouter>
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
          <div className={`  ${styles.paddingX} ${styles.flexCenter}`}>
          {/* <div className={` ${styles.flexCenter}`}> */}
            <div className={`${styles.boxWidth}`}>
              {/* Stats
              Bussines
              etc. */}

              {/* <Tools/> */}
              <Content/>

            </div>
          </div>
    
        </div>
        // </BrowserRouter>
      )
}

export default LandingPage;