import React from "react";

function Window({ title, children, color, text_color }) {
  return (
    <div className="bg-gray-100 shadow-lg rounded-xl overflow-hidden">
      <div className={`${color} px-6 py-4 flex justify-between items-center rounded-t-xl`}>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <h2 className={`ml-2 text-base ${text_color} font-semibold tracking-wide uppercase`}>
          {title}
        </h2>
        <div className={`w-8 h-8 rounded-full ${color}`}></div>
      </div>
      <div className="px-6 py-8">{children}</div>
    </div>
  );
}

export default Window;
