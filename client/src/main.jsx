import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes}  from 'react-router-dom'
import NotFound from './components/NotFound'
import Layout from './components/Layout'
import LandingPage from './components/LandingPage'

let Content = React.lazy(() => import('./components/Layout'))

ReactDOM.createRoot(document.getElementById('root')).render(  
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
        <Route exact path="/" element = {<LandingPage/>}/>

          
        <Route path="/app/*" element = {
        <React.Suspense fallback={<div>Loading...</div>}>
        <Content/>
        </React.Suspense>
        }/>
          
        <Route path="*" element = {<NotFound/>}/>
      </Routes>

    </BrowserRouter>
   
  </React.StrictMode>,
)
