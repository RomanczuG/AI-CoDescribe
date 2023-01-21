import React from "react";
import { useState } from "react";
import { Listbox } from '@headlessui/react'

const Docstring = () => {
    const people = [
        { id: 1, name: 'Python', unavailable: false },
        { id: 2, name: 'Java', unavailable: false },
        { id: 3, name: 'C++/C', unavailable: false },
        { id: 4, name: 'JavaScript', unavailable: true },
        { id: 5, name: 'Swift', unavailable: false },
      ]
    const [selectedPerson, setSelectedPerson] = useState(people[0])
    return (
      <>
        <div className="font-poppins p-5 m-10 rounded-xl flex justify-between items-center bg-gray-100 text-black">
          <div className="font-semibold text-4xl">
            Generate AI Docstring
          </div>
        </div>
        <div className="font-poppins p-5 m-10 rounded-xl flex justify-between items-center bg-gray-100 text-black">
          <div className="font-medium text-4xl">
            Choose your code
          </div>
          
        </div>
      </>
    );
  };
  
  export default Docstring;
  