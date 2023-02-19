import { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import Docstring from "./Docstring";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Explain from "./Explain";
import Optimize from "./Optimize";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Helmet } from "react-helmet-async";


const Layout = () => {
  const [isSidebarNotOpen, setIsSidebarNotOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);
        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            setIsMobile(true);
        } else {
            setIsSidebarNotOpen(false);
            setIsMobile(false);
        }
    };

  const handleSidebarToggle = () => {
    setIsSidebarNotOpen(!isSidebarNotOpen);
  };

  return (
    <>
      <Helmet title="Home">
      <title>Dashboard</title>
      
      <meta name="description" content="Dashboard" />
      <link rel="canonical" href="/app" />

    </Helmet>
      <div className="relative h-screen flex overflow-hidden bg-grey-100">
        <div className={`${isSidebarNotOpen ? "hidden" : ""}`}>
          <SideBar />
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto">
          <button
            className=" sm:hidden text-black-900 w-10 m-5"
            onClick={handleSidebarToggle}
          >
            <Bars3Icon />{" "}
          </button>
          <div className={` ${isSidebarNotOpen ? "" : (isMobile? "hidden" : "")}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/docstring" element={<Docstring />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/explain" element={<Explain />} />
              <Route path="/optimize" element={<Optimize />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
