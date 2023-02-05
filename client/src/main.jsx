import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import God from './components/God'
import { BrowserRouter, Link } from 'react-router-dom'
/* A simple analytics plugin. */
// import Analytics from "analytics"
// import simpleAnalyticsPlugin from "@analytics/simple-analytics";

// const analytics = Analytics({
//   app: "codescribe.app",
//   plugins: [
//     // Load simple analytics! 🎉
//     simpleAnalyticsPlugin(),
//   ],
// });


ReactDOM.createRoot(document.getElementById('root')).render(  
  <React.StrictMode>
    <BrowserRouter>
      <God/>
    </BrowserRouter>
   
  </React.StrictMode>,
)
