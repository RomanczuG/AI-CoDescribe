import React from "react";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import axios from "axios";
import Highlight from "react-highlight";

const client = axios.create({
  baseURL: "https://codescribeapp.herokuapp.com",
  // baseURL : "http://127.0.0.1:5000",
});

const Docstring = () => {
  const [docstring, setDocstring] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generateDocstring = () => {
    setLoading(true);
    client.post("/gen_docstring", {
        code: code,
        language: selectedLanguage.value,
        docstring: "",
      })
      .then((res) => {
        
        setLoading(false);
        setDocstring(res.data.docstring);
        console.log(docstring);
        setGenerated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const language = [
    { id: 1, name: "Python", value: "python", unavailable: false },
    // { id: 2, name: "Java", unavailable: false },
    { id: 3, name: "C", value: "c", unavailable: false },
    { id: 4, name: "JavaScript", value: "javascript", unavailable: true },
    { id: 5, name: "Swift", value: "swift", unavailable: false },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(language[0]);
  return (
    <>
      <div className="max-w-screen-xl flex flex-col">
        <div className="drop-shadow-lg font-poppins p-8 ss:m-10 m-4 rounded-xl items-center bg-gray-100 text-black">
          <Dots />
          <div className="font-semibold text-4xl mt-6">
            Generate AI Docstring
          </div>
          <div className="font-medium text-base mt-6">
            It is easy to generate AI docstrings for your code. Simply paste
            your code below, choose your language, and click on the button. Then
            paste the generated docstring into your code.
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-rows-2 gap-4">
          <div className="flex flex-col drop-shadow-lg font-poppins p-8 lg:ml-10 mx-4 rounded-xl bg-gray-100 text-black">
            <div className="grow font-medium">
              <Dots />
              <div className="mt-6 text-3xl">Choose your coding language</div>
              <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
                <div className="mt-2 w-1/2 relative">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedLanguage.name}
                    </span>
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
                            active
                              ? "text-white bg-indigo-600"
                              : "text-gray-900"
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
            </div>
            <div className=" ">
              <div className="text-sm mt-6">
                <textarea
                  className="w-full h-80 border-2 border-gray-300 rounded-lg p-4"
                  placeholder="Paste your code here"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="relative z-0 flex w-1/2">                  
              <button
                onClick={generateDocstring}
                className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-4"
              >
                Generate Docstring
              </button>
              </div>  
            </div>
          </div>

          <div className="flex flex-col drop-shadow-lg font-poppins p-8 lg:mr-10 mx-4 rounded-xl bg-gray-100 text-black">
            <div className="font-medium grow">
              <Dots />

              <div className="mt-6 text-3xl">Generated Docstring</div>
              <div className="mt-2 text-sm">
                Copy the generated docstring and paste it into your code.
              </div>
            </div>
            <div className="">
              <div className="overflow-auto text-sm bg-white mt-6 w-full h-80 border-2 border-gray-300 rounded-lg display-linebreak">
                {loading ? (
                  // <div className="text-center mt-10">Loading...</div>
                  <div class="grid place-content-center h-full">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-700"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Highlight
                    className={`rounded-lg ${selectedLanguage.value}`}
                    // language={selectedLanguage.value}
                  >
                    
                    {docstring}
                  </Highlight>
                )}
              </div>
              <div className="relative z-0 flex w-1/2">
                <button
                  className="grid inline-flex mt-6 w-full bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-4"
                  onClick={() => {
                    navigator.clipboard.writeText(docstring);
                  }}
                >
                  Copy Docstring
                </button>
                {generated ? (
                  <div className="absolute top-0 right-0 z-10 mt-6 ">
                    <span className="flex z-10 relative h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
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
