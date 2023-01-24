import React from "react";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import axios from "axios";

const client = axios.create({
  baseURL: 'http://localhost:5000/'
})

const Docstring = () => {

  const [docstring, setDocstring] = useState("")
  const [code, setCode] = useState("")
  const generateDocstring = () => {
    axios
    .post("http://127.0.0.1:5000/gen_docstring",
    {
      code: code,
      language: selectedLanguage.name,
      docstring: "This function adds two numbers"
    }   
    )
    .then((res) => {
      console.log(res)
      setDocstring(res.data.docstring)
      console.log(docstring);
    })
    .catch((err) => {
      console.log(err);
    });
  }




  const language = [
    { id: 1, name: "Python", unavailable: false },
    { id: 2, name: "Java", unavailable: false },
    { id: 3, name: "C++/C", unavailable: false },
    { id: 4, name: "JavaScript", unavailable: true },
    { id: 5, name: "Swift", unavailable: false },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(language[0]);
  return (
    <>
      <div className="max-w-screen-xl flex flex-col">
        <div className="drop-shadow-lg font-poppins p-8 m-10 rounded-xl items-center bg-gray-100 text-black">
          <Dots />
          <div className="font-semibold text-4xl mt-6">
            Generate AI Docstring
          </div>
          <div className="font-medium text-base mt-6">
            It is easy to generate AI docstrings for your code. Simply paste
            your code below, choose your language, and click on the button. Then
            paste the generated docstring into your code.
            
            <button className="text-white bg-black" onClick={generateDocstring}>Generate Docstring</button>

          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-rows-2 gap-10">
          <div className="drop-shadow-lg font-poppins p-8 lg:ml-10 rounded-xl items-center bg-gray-100 text-black">
            <Dots />
            <div className="mt-6 font-medium text-3xl">Choose your code</div>
            <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
              <div className="mt-2 w-1/2 relative">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="block truncate">{selectedLanguage.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {language.map((language) => (
                    <Listbox.Option
                      key={language.id}
                      className={({ active }) =>
                        `${
                          active ? "text-white bg-indigo-600" : "text-gray-900"
                        }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                      }
                      value={language}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`${
                              selected ? "font-medium" : "font-normal"
                            } block truncate`}
                          >
                            {language.name}
                          </span>
                          {selected ? (
                            <span
                              className={`${
                                active ? "text-white" : "text-indigo-600"
                              }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                            >
                              <svg
                                className="w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>

            {/* <textarea
              className="mt-6 w-full h-80 border-2 border-gray-300 rounded-lg p-4"
              placeholder="Paste your code here"
            ></textarea> */}
            <input className="mt-6 w-full h-80 border-2 border-gray-300 rounded-lg p-4" type="text" placeholder="Paste your code here" onChange={(e) => setCode(e.target.value)} />
            {code}
            <button onClick={generateDocstring} className="mt-6 w-1/2 bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-4">
              Generate Docstring
            </button>
          </div>

          <div className=" drop-shadow-lg font-poppins p-8 lg:mr-10 rounded-xl items-center bg-gray-100 text-black">
            <Dots />
            <div className="mt-6 font-medium text-3xl">Generated Docstring</div>
            <div className="mt-2 font-medium text-sm">
              Copy the generated docstring and paste it into your code.
            </div> 
            <textarea className="mt-6 w-full h-80 border-2 border-gray-300 rounded-lg p-4">
              
            </textarea>
            {docstring}
            <button className="mt-6 w-1/2 bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-4">
              Copy Docstring
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


function Dots() {
  return (
    <div className="flex flex-row">
      <div className="mr-[8px] bg-red-600 w-[14px] h-[14px] rounded-full"></div>
      <div className="mr-[8px] bg-yellow-500 w-[14px] h-[14px] rounded-full"></div>
      <div className="bg-green-600 w-[14px] h-[14px] rounded-full"></div>
    </div>
  );
}

export default Docstring;
