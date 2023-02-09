import { useState} from "react";
import {refractor} from "refractor";
import {toHtml} from 'hast-util-to-html'
import React from "react";
import axios from "axios";
import { Listbox } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Code from "./Code";


const client = axios.create({
  baseURL: "https://codescribeapp.herokuapp.com",
  // baseURL : "http://127.0.0.1:5000",
});

const docstringCode = `#Example Code
def fit_and_predict(X, y):
  # Fit the model to the data
  model = LinearRegression()
  model.fit(X, y)

  # Predict on a new dataset
  X_new = np.array([[0.5], [1.0], [1.5], [2.0]])
  y_pred = model.predict(X_new)

  return y_pred`;

const explanationCode = `#Example Code
void calc_mean_variance(double* data, int n, double* mean, double* variance) {
    *mean = 0;
    *variance = 0;
    for (int i = 0; i < n; i++) {
        *mean += data[i];
    }
    *mean /= n;
    for (int i = 0; i < n; i++) {
        *variance += (data[i] - *mean) * (data[i] - *mean);
    }
    *variance /= n;
    }`;

// Set language for docstring
const language = [
  { id: 1, name: "Python", value: "python", unavailable: false },
  // { id: 2, name: "Java", unavailable: false },
  { id: 3, name: "C", value: "c", unavailable: false },
  { id: 4, name: "JavaScript", value: "javascript", unavailable: true },
  { id: 5, name: "Swift", value: "swift", unavailable: false },
];

const Tools = () => {
  // Let type code for docstring
  const [disp, setDisp] = useState(true);
  const letTypeDisp = (disp) => {
    setCodeDoc("");
    setDisp(!disp);
  };

  // Let create docstring
  const [codeDoc, setCodeDoc] = useState(docstringCode);
  const [docstringLoading, setDocstringLoading] = useState([false, false]);
  const [docstring, setDocstring] = useState("");
  const generateDocstring = () => {
    setDocstringLoading([true, false]);
    if (first) {
      openModal();
    } else {
      // setLoading(true);
      client
        .post("/gen_docstring", {
          code: codeDoc,
          language: selectedLanguage.value,
          docstring: "",
        })
        .then((res) => {
          setFirst(true);
          setDocstringLoading([false, true]);
          // setLoading(false);
          setDocstring(res.data.docstring);
          // setGenerated(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Let type code for explanation
  const [dispExp, setDispExp] = useState(true);
  const letTypeExp = (dispExp) => {
    setDispExp(!dispExp);
    setCodeExp("");
  };

  // Let create explanation
  const [codeExp, setCodeExp] = useState(explanationCode);
  const [explanation, setExplanation] = useState("");
  const [explanationLoading, setExplanationLoading] = useState([false, false]);

  const generateExplanation = () => {
    setExplanationLoading([true, false]);
    if (first) {
      openModal();
    } else {
      // setLoading(true);
      client
        .post("/gen_explanation", {
          code: codeExp,
          language: selectedLanguage.value,
          explanation: "",
        })
        .then((res) => {
          setFirst(true);
          setExplanationLoading([false, true]);
          // setLoading(false);
          setExplanation(res.data.explanation);
          // setGenerated(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Set language for docstring
  const language = [
    { id: 1, name: "Python", value: "python", unavailable: false },
    // { id: 2, name: "Java", unavailable: false },
    { id: 3, name: "C", value: "c", unavailable: false },
    { id: 4, name: "JavaScript", value: "javascript", unavailable: true },
    { id: 5, name: "Swift", value: "swift", unavailable: false },
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(language[0]);

  // Display modal
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // First was generated
  const [first, setFirst] = useState(false);

  const tree = refractor.highlight(explanationCode, 'js')
  const html = toHtml(tree)
  console.log(html)

  return (
    <section
      id="tools"
      className="flex flex-col items-center justify-center w-full h-full"
    >
      {/* <div dangerouslySetInnerHTML={{__html: html}}></div> */}
      {/* {parse(html)} */}
      {/* {html} */}
      {/* <pre dangerouslySetInnerHTML={{ __html: html }}></pre> */}
      {/* <Code/> */}
      
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />

        <Dialog.Panel className="fixed inset-0 left-1/3 top-1/3 h-min max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
          <Dots />
          <Dialog.Title
            as="h3"
            className="mt-2 text-lg font-medium leading-6 text-gray-900"
          >
            Do you want to generate more?
          </Dialog.Title>

          <p className="mt-2 text-sm text-gray-500">
            Generate as many explanations and docstrings as you want for free.
            Click button below to get started.
          </p>
          <div className="flex ">
            <div className="mt-4 mr-4">
              <a href="/app">
                <button className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Get Started
                </button>
              </a>
            </div>
            <div className="mt-4">
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 ss:w-4/5">
        <Window
          title="Generate AI Docstring"
          description="It can be a function, class and much more..."
          listbox={true}
        >
          <div className=" ">
            <div className="ss:text-xs text-[10px] bg-white rounded-lg mt-6">
              <div className="w-full ss:h-60 border-2 border-gray-200 rounded-lg ">
                {disp ? (
                  <div onClick={letTypeDisp}>
                    {/* <Highlight className="rounded-lg" language="python"> */}
                    <pre><code>{codeDoc}</code></pre>
                      
                    {/* </Highlight> */}
                  </div>
                ) : (
                  <textarea
                    className="w-full h-60 border-2 border-gray-300 rounded-lg p-4"
                    value={codeDoc}
                    onChange={(e) => setCodeDoc(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Tab") {
                        e.preventDefault();
                        let start = e.target.selectionStart;
                        let end = e.target.selectionEnd;
                        let newCode = e.target.value;

                        newCode =
                          newCode.substring(0, start) +
                          "\t" +
                          newCode.substring(end);
                        setCodeDoc(newCode);
                        e.target.selectionStart = start + 1;
                      }
                    }}
                  ></textarea>
                )}
              </div>
            </div>
            <div className="relative z-0 flex ss:w-1/2">
              <button
                // className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-white text-xs  rounded-lg p-4"
                className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-purple-100 hover:bg-purple-200 hover:text-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={generateDocstring}
              >
                Generate Docstring
              </button>
            </div>
          </div>
        </Window>

        <Window
          title=""
          description="It is easy to generate AI docstrings for your code. Simply paste
              your code below, choose your language, and click on the button.
              Then paste the generated docstring into your code."
          listbox={false}
        >
          {" "}
          <div className=" ">
            <div className="ss:text-xs text-[10px] bg-white rounded-lg mt-6">
              <div className="overflow-auto w-full ss:h-60 h-40 border-2 border-gray-200 rounded-lg ">
                {docstringLoading[0] ? (
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
                ) : docstringLoading[1] ? (
                  // <Highlight className={`rounded-lg ${selectedLanguage.value}`}>
                  <pre><code>{docstring}</code></pre>
                    
                  // </Highlight>
                ) : (
                  <div className="text-base ss:font-semibold flex items-center px-2 h-full">
                    Click Generate Docstring button to see the result
                  </div>
                )}
              </div>
            </div>
            <div className="relative z-0 flex ss:w-1/2">
              <a href="/app">
                <button
                  className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-purple-100 hover:bg-purple-200 hover:text-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  // className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-xs  text-white rounded-lg p-4"
                >
                  Get started for free!
                </button>
              </a>
            </div>
          </div>{" "}
        </Window>
        {/* Explain */}
        <Window
          title="Generate Code Explanation"
          description="It can be a function, class and much more..."
          listbox={false}
        >
          <div className=" ">
            <div className="ss:text-xs text-[10px] bg-white rounded-lg mt-6">
              <div className="w-full ss:h-60 border-2 border-gray-200 rounded-lg">
                {dispExp ? (
                  <div onClick={letTypeExp}>
                    {/* <Highlight className="rounded-lg" language="python"> */}
                      
                    {/* </Highlight> */}
                    <pre><code>{explanationCode}</code></pre>
                  </div>
                ) : (
                  <textarea
                    className="w-full h-60 border-2 border-gray-300 rounded-lg p-4"
                    value={codeExp}
                    onChange={(e) => setCodeExp(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Tab") {
                        e.preventDefault();
                        let start = e.target.selectionStart;
                        let end = e.target.selectionEnd;
                        let newCode = e.target.value;

                        newCode =
                          newCode.substring(0, start) +
                          "\t" +
                          newCode.substring(end);
                        setCodeExp(newCode);
                        e.target.selectionStart = start + 1;
                      }
                    }}
                  ></textarea>
                )}
              </div>
            </div>
            <div className="relative z-0 flex ss:w-1/2">
              <button
                className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-purple-100 hover:bg-purple-200 hover:text-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                // className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-white text-xs rounded-lg p-4"
                onClick={generateExplanation}
              >
                Explain the code
              </button>
            </div>
          </div>
        </Window>

        {/* Right */}
        <Window
          title=""
          description="Simply paste your code and let AI explain it for you. Understand
              your and others code better."
          listbox={false}
        >
          <div className=" ">
            <div className="ss:text-xs text-[10px] bg-white rounded-lg mt-6">
              <div className="overflow-auto w-full ss:h-60 h-40 border-2 border-gray-200 rounded-lg">
                {explanationLoading[0] ? (
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
                ) : explanationLoading[1] ? (
                  <>
                    <div className="p-4 display-linebreak">{explanation}</div>
                  </>
                ) : (
                  <div className="text-base ss:font-semibold flex items-center px-2 h-full">
                    Click Generate Explanation button to see the result
                  </div>
                )}
              </div>
            </div>
            <div className="relative z-0 flex ss:w-1/2">
              <a href="/app">
                <button
                  className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-purple-100 hover:bg-purple-200 hover:text-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  // className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-xs  text-white rounded-lg p-4"
                >
                  Get started for free!
                </button>
              </a>
            </div>
          </div>
        </Window>
      </div>
    </section>
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

// Window for the explanation and docstring
function Window({ title, description, listbox, children }) {
  const [selectedLanguage, setSelectedLanguage] = useState(language[0]);
  return (
    <div className="flex flex-col drop-shadow-lg font-poppins p-8  rounded-xl bg-gray-100 text-black">
      <div className="grow font-medium">
        <Dots />
        <div className="font-semibold ss:text-3xl text-2xl mt-6">{title}</div>
        <div className="mt-[5px] font-medium ss:text-[15px] text-[13px]">
          {description}
        </div>
        {listbox ? (
          <>
            <div className="mt-3 ss:text-[10px] text-[8px]">
              Choose your coding language
            </div>
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
          </>
        ) : (
          <></>
        )}
      </div>
      {children}
    </div>
  );
}

export default Tools;
