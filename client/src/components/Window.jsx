import React from "react";

function Window({ title, description, children }) {
  return (
    <div className="flex flex-col bg-gray-900 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center mb-4">
        <Dots className="mr-2" />
      </div>
      <div className="text-lg font-medium">{title}</div>
      {children}
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

export default Window;
