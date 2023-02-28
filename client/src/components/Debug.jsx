import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "./Editor";
import Window from "./Window";
import CodeEditor from "@uiw/react-textarea-code-editor";

const client = axios.create({
  baseURL: "https://codescribeapp.herokuapp.com",
});

const Debug = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState("");
  const [goodCode, setGoodCode] = useState("");
  const generateDebug = () => {
    setLoading(true);
    client
      .post("/gen_debug", {
        code: code,
        language: "python",
        error: error,
        debug: "",
      })
      .then((res) => {
        setLoading(false);
        setSolution(res.data["solution"]);
        setGoodCode(res.data["good_code"]);
        console.log(res.data["solution"]);
        console.log(res.data["good_code"]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="max-w-screnn-xl flex flex-col">
        <div className="drop-shadow-lg font-poppins p-8 m-6 rounded-xl items-center bg-gray-100 text-black">
          <Dots />
          <div className="font-semibold text-4xl mt-6">Debug your code</div>
          <div className="font-medium text-base mt-6">
            Enter your code and the error you are getting and AI will help you
            debug it.
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-rows-2 gap-4 mx-6">
          <div className="grid gap-4 w-full px-2">
            <Window title="Code and Error message">
              {/* <Editor
                parentCallback={handleCallbackDebug}
                //   buttonName="Debug"
                button={false}
                func={handleCallbackDebug}
                listbox={true}
              /> */}
              <div className="mt-2 flex flex-col w-full h-full ">
                <CodeEditor
                  className="z-0 relative grow border-2 border-gray-300 rounded-lg p-4"
                  language={""}
                  placeholder="Type your code here..."
                  //   onChange={(evn) => setError(evn.target.value)}
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
              </div>
              <div className="mt-2 flex flex-col w-full h-full ">
                <CodeEditor
                  className="z-0 relative grow border-2 border-gray-300 rounded-lg p-4"
                  language={""}
                  placeholder="Type your error message here..."
                  onChange={(evn) => setError(evn.target.value)}
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
              </div>
              <button
                className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-purple-100 hover:bg-purple-200 hover:text-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={generateDebug}
              >
                Debug
              </button>
            </Window>
          </div>

          <Window title="What to do:">
            <div className="h-full max-h-96 mt-6 overflow-auto">
              <ul className="h-full">
                {loading ? (
                  <div class="grid place-content-center h-full">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-700"
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
                    <>
                  <textarea
                    className="w-full h-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-mono text-sm p-4 rounded-lg"
                    value={solution}
                    readOnly
                  ></textarea>
                  <textarea
                    className="w-full h-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-mono text-sm p-4 rounded-lg"
                    value={goodCode}
                    readOnly
                    ></textarea>
                  </>

                  //   splitDebug.map((item) => {
                  //     return (
                  //       <>
                  //         <li className="text-base font-medium text-gray-800 px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                  //           {item}
                  //         </li>
                  //       </>
                  //     );
                  //   })
                )}
              </ul>
            </div>
          </Window>
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

export default Debug;
