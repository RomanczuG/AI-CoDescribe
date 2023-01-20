import { useState, useEffect, Fragment } from "react";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import Docstring from "./Docstring";
import { Route, Routes } from 'react-router-dom';

const Layout = () => {

    return (
        <>
            <div className="relative h-screen flex overflow-hidden bg-grey-100">
            <SideBar/>
            <main className="flex-1 relative z-0 overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/docstring" element={<Docstring/>}/>
                </Routes>

            </main>
            </div>
        
        </>
    )
}

export default Layout;