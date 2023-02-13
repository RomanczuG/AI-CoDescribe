import React from 'react'

function Window({ title, description, children }) {

    return (
      <div className="flex flex-col drop-shadow-lg font-poppins p-8  rounded-xl bg-gray-100 text-black">
        <div className="font-medium">
          <Dots />
          <div className="font-semibold ss:text-3xl text-2xl mt-6">{title}</div>
          <div className="mt-[5px] font-medium ss:text-[15px] text-[13px]">
            {description}
          </div>
        </div>
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

export default Window
