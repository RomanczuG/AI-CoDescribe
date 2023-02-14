import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Listbox } from "@headlessui/react";
import { Dialog } from "@headlessui/react";

function App({
  buttonName,
  generateResponse,
  listbox,
  placeholder,
  button = true,
}) {
  const [code, setCode] = React.useState(placeholder);
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
      {listbox ? (
        <div className="z-10 relative">
          <div className="mt-3 ss:text-[10px] text-[8px]">
            Choose your coding language
          </div>
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
                      `${active ? "text-white bg-indigo-600" : "text-gray-900"}
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
      ) : (
        <></>
      )}

      <div className="flex flex-col w-full h-full ">
        {/* <div className="overflow-auto"> */}
        <CodeEditor
          className="z-0 relative grow border-2 border-gray-300 rounded-lg p-4"
          value={code}
          language={selectedLanguage.value}
          placeholder="Type your code here..."
          onChange={(evn) => setCode(evn.target.value)}
          padding={15}
          data-color-mode="dark"
          minHeight={250}
          style={{
            fontSize: 12,
            backgroundColor: "#0A0A0A",
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
        {/* </div> */}
        <div className="relative z-0 flex ss:w-1/2">
          {button ? (
            <>
              <button
                // className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-white text-xs  rounded-lg p-4"
                className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-purple-100 hover:bg-purple-200 hover:text-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => generateResponse([code, selectedLanguage.value])}
              >
                {buttonName}
                {/* <div className="top-0 right-0 z-10 ">
            <span className="flex z-10 relative h-3 w-3 top-0 right-0 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div> */}
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
