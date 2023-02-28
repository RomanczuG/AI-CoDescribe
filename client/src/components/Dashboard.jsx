import React, { useState, useEffect } from "react";
import { early_bird, day_eagle, night_owl } from "../assets";
import {
  PencilSquareIcon,
  ChatBubbleBottomCenterIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftEllipsisIcon,
  WrenchScrewdriverIcon,
  BugAntIcon,

} from "@heroicons/react/24/outline";
const Layout = () => {
  return (
    <>
    <div className="max-w-screen-xl flex flex-col">
      <div className="drop-shadow-lg font-poppins p-8 ss:m-10 m-4 rounded-xl items-center bg-gray-100 text-black">
        <div className="flex justify-between">
          <div>
            <Dots />
            <TimeWindow />
          </div>
          <div className="mt-4">
            <ShowTime />
          </div>
        </div>
      </div>

      <div className="drop-shadow-lg font-poppins p-8 ss:mx-10 mx-4 rounded-xl items-center bg-gray-100 text-black">
        <Dots />
        <div className="mt-4 font-semibold text-3xl">
          Everything starts here.
        </div>
        <div className="mt-3 mb-6 font-medium text-xl">
          What do you want to do today? Here is the list of the tools you can use. Click on the tool to get started.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">

          <CardTool title={"Docstring"} description={"Generate AI docstrings for your code. Make it easier for you and others to understand your code."}>
          <PencilSquareIcon className="text-white m-5" />
          </CardTool>

          <CardTool title={"Explain Code"} description={"Are you stuck? Ask AI to explain your code. No matter if it is your code, or someone else's."}>
          <ChatBubbleBottomCenterIcon className="text-white m-5" />
          </CardTool>

          <CardTool title={"Debug Code"} description={"Easily debug your code. Get AI to explain the errors and help you fix them."}>
          <BugAntIcon className="text-white m-5" />
          </CardTool>

          <CardTool title={"Optimize Code"} description={"Get AI to optimize your code. Make it faster, more efficient, and more readable."}>
          <ArrowTrendingUpIcon className="text-white m-5" />
          </CardTool>

          <CardTool title={"Code Review"} description={"Get AI to review your code. See if it is readable, efficient, and if it follows best practices."}>
          <ChatBubbleLeftEllipsisIcon className="text-white m-5" />
          </CardTool>

          <CardTool title={"More coming soon!"} description={"We are working on more features. If you have any suggestions, please let us know!"}>
          <WrenchScrewdriverIcon className="text-white m-5" />
          </CardTool>

          
            

        </div>
      </div>
      </div>
    </>
  );
};

function TimeWindow() {
  var [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <div className="sm:flex sm:space-x-4 items-center mt-6 ">
      <div className="flex-shrink-0 content-start">
        {dateState.getHours() < 9 ? (
          <img src={early_bird} className="mx-auto w-24 rounded-lg" />
        ) : (
          dateState.getHours() < 18 ? (
          <img src={day_eagle} className="mx-auto w-24 rounded-lg" />
          ): (
          <img src={night_owl} className="mx-auto w-24 rounded-lg" /> )
          
        )}
      </div>

      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
        <div className="text-lg font-medium text-gray-600">
          {" "}
          {dateState.getHours() < 9
            ? "It looks like you are an ealy bird!" 
            : dateState.getHours() < 18
            ? "Are you more of an early bird or a night owl?" 
            : "Night owl"
          }
        </div>
        <div className="text-xl font-bold text-gray-900 sm:text-3xl">
          {" "}
          User thank you for using CoDescribe!
        </div>
      </div>
    </div>
  );
}

function CardTool({ title, description, children}) {
  return (

          <div className="items-center flex flex-col">
            <div className="relative z-10 w-20 bg-gray-700 rounded-full flex justify-between">
                {children}
              </div>
            <div className="relative z-0 -translate-y-9 text-center rounded-[20px] bg-white p-6 drop-shadow-lg">
              <div className="font-medium mt-7 text-purple-900 text-2xl">{title} </div>
              <div className="mt-3 font-medium text-base">
                {description}
              </div>
            </div>
            
          </div>
          
          );
}

function Dots() {
  return (
    <div className="flex flex-row">
      <div className="mr-[8px] bg-red-600 w-[14px] h-[14px] rounded-full"></div>
      <div className="mr-[8px] bg-yellow-500 w-[14px] h-[14px] rounded-full"></div>
      <div className="bg-green-600 w-[14px] h-[14px] rounded-full"></div>
    </div>
  );
}

function ShowTime() {
  var [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);

  return (
    <div className="ss:text-6xl text-3xl font-bold text-gray-900 sm:text-3xl">
      {dateState.toLocaleTimeString()}
    </div>
  );
}

export default Layout;
