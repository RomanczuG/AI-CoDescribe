import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import God from './components/God'
import { BrowserRouter, Link } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(  
  <React.StrictMode>
    <BrowserRouter>
      <God/>
    </BrowserRouter>
   
  </React.StrictMode>,
)
