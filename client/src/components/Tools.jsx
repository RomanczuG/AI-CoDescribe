import { useEffect, useRef, useState } from "react";
import React from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import Window from "./Window";
import Result from "./Result";
// lazy load the component Editor
const Editor = React.lazy(() => import("./Editor"));
// const DialogModal = React.lazy(() => import("./DialogModal"));
const client = axios.create({
  baseURL: "https://codescribeapp.herokuapp.com",
  // baseURL : "http://127.0.0.1:5000",
});

const docstringCode = `def fit_and_predict(X, y):
  # Fit the model to the data
  model = LinearRegression()
  model.fit(X, y)

  # Predict on a new dataset
  X_new = np.array([[0.5], [1.0], [1.5], [2.0]])
  y_pred = model.predict(X_new)

  return y_pred`;
const docstringCode2 = `\"\"\"
Use \`\`fit_and_predict(X, y)\`\` to fit a linear regression model to the data and
predict on a new dataset.

Parameters
----------
X : array-like
    The independent variable(s) used to fit the model.
y : array-like
    The dependent variable used to fit the model.

Returns
----------
y_pred : array-like
    The predicted values for the new dataset.
\"\"\"`;

const explanationCode = `void calc_mean_variance(double* data, int n, double* mean, double* variance) {
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

const explanationCode2 = `The calc_mean_variance function is defined and takes in four parameters: data, n, mean, and variance.
The mean and variance variables are initialized to 0.
A for loop is used to iterate over the range of n.
The mean is calculated by summing the values in data and dividing by n.
Another for loop is used to iterate over the range of n.
The variance is calculated by summing the squared differences between each value in data and the mean, and dividing by n.
The mean and variance variables are returned.
`;

const optimizationCode = `async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    return (await response.json())
      .filter(post => post.userId === 1)
      .sort((a, b) => a.id - b.id)
      .slice(0, 5)
      .map(({title, body}) => ({title, body}));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
`;

const Tools = () => {
  // Let create docstring
  const [codeDoc, setCodeDoc] = useState([docstringCode, ""]);
  const [docstringLoading, setDocstringLoading] = useState([false, false]);
  const [docstring, setDocstring] = useState(docstringCode2);
  const handleCallbackDocstring = (childData) => {
    setCodeDoc(childData);
  };
  useEffect(() => {
    if (codeDoc[1] != "") {
      generateDocstring();
      window.sa_event("docstring", {
        language: codeDoc[1],
        code: codeDoc[0],
        langing_page: true,
        created_at: new Date(),
      });
    }
  }, [codeDoc]);

  const generateDocstring = () => {
    setDocstringLoading([true, false]);
    if (first) {
      openModal();
    } else {
      // setLoading(true);

      client
        .post("/gen_docstring", {
          code: codeDoc[0],
          language: codeDoc[1],
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

  // Let create explanation
  const [codeExp, setCodeExp] = useState([explanationCode, ""]);
  const [explanation, setExplanation] = useState(explanationCode2);
  const [explanationLoading, setExplanationLoading] = useState([false, false]);
  const [splitExplanation, setSplitExplanation] = useState([
    "The calc_mean_variance function is defined and takes in four parameters: data, n, mean, and variance.",
    "The mean and variance variables are initialized to 0.",
    "A for loop is used to iterate over the range of n.",
    "The mean is calculated by summing the values in data and dividing by n.",
    "Another for loop is used to iterate over the range of n.",
    "The variance is calculated by summing the squared differences between each value in data and the mean, and dividing by n.",
    "The mean and variance variables are returned.",
  ]);

  const handleCallbackExplanation = (childData) => {
    setCodeExp(childData);
  };
  useEffect(() => {
    if (codeExp[1] != "") {
      generateExplanation();
      window.sa_event("explanation", {
        language: codeExp[1],
        code: codeExp[0],
        langing_page: true,
        created_at: new Date(),
      });
    }
  }, [codeExp]);

  const generateExplanation = () => {
    setExplanationLoading([true, false]);
    if (first) {
      openModal();
    } else {
      // setLoading(true);
      client
        .post("/gen_explanation", {
          code: codeExp[0],
          language: codeExp[1],
          explanation: "",
        })
        .then((res) => {
          setFirst(true);
          setExplanationLoading([false, true]);
          // setLoading(false);
          setExplanation(res.data.explanation);
          setSplitExplanation(res.data.explanation.split("\n"));
          // setGenerated(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const [codeOptimize, setCodeOptimize] = useState([optimizationCode, ""]);
  const [optimization, setOptimization] = useState("");
  const [optimizationLoading, setOptimizationLoading] = useState([
    false,
    false,
  ]);
  const [splitOptimization, setSplitOptimization] = useState([
    "Use the await keyword to avoid nesting promises: In this case, the response.json() call can be replaced with await response.json().",
    "Use the spread operator to avoid unnecessary array operations: In this case, the filter, sort, slice, and map operations can be replaced with a single spread operation.",
    "Use the fetch API's built-in query parameters to filter the response: In this case, the filter operation can be replaced with a query parameter in the fetch call.",
  ]);
  const handleCallbackOptimization = (childData) => {
    setCodeOptimize(childData);
  };
  useEffect(() => {
    if (codeOptimize[1] != "") {
      generateOptimization();
      window.sa_event("optimization", {
        language: codeOptimize[1],
        code: codeOptimize[0],
        langing_page: true,
        created_at: new Date(),
      });
    }
  }, [codeOptimize]);

  const generateOptimization = () => {
    setOptimizationLoading([true, false]);
    if (first) {
      openModal();
    } else {
      // setLoading(true);
      client
        .post("/gen_optimization", {
          code: codeOptimize[0],
          language: codeOptimize[1],
          optimization: "",
        })
        .then((res) => {
          setFirst(true);
          setOptimizationLoading([false, true]);
          // setLoading(false);
          setOptimization(res.data.optimization);
          setSplitOptimization(res.data.optimization.split("\n"));
          console.log(splitOptimization);
          // setGenerated(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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

  return (
    <section
      id="tools"
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />

        <Dialog.Panel className="fixed inset-0 left-1/3 top-1/3 h-min max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
          {/* <Dots /> */}
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

      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 lg:w-5/6 w-full">
        <div class="bg-purple-100 py-12 md:col-span-2 rounded-xl">
          <div className="absolute z-0 w-1/3 h-1/3 bg-[#FC4FF6] rounded-full opacity-20 blur-[100px] z-0"></div>
          <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
              <h2 class="text-base text-purple-600 font-semibold tracking-wide uppercase">
                Introducing
              </h2>
              <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Generate AI Doc Comments
              </p>
            </div>
            <div class="mt-10">
              <p class="text-xl text-gray-700">
                Writing clear and concise documentation for your code is
                crucial, but it can be a tedious and time-consuming task. That's
                why we've created the "Generate AI Doc Comments" feature, which
                uses artificial intelligence to automatically generate
                documentation for your code. Simply paste your code into our
                editor, select your language, and click on the "Generate
                Docstring" button. Our system will analyze your code and provide
                you with an autogenerated docstring that you can simply copy and
                paste into your code. It's that easy!
              </p>
            </div>
          </div>
        </div>
        <Window
          text_color={"text-black"}
          color={"bg-purple-100"}
          title="Paste your code here"
          // description="Automatically generate documentation for your code. It can be a function, class and much more..."
        >
          <Editor
            buttonName={"Generate Docstring"}
            placeholder={docstringCode}
            listbox={true}
            generateResponse={handleCallbackDocstring}
          />
        </Window>
        <Window
          text_color={"text-black"}
          color={"bg-purple-100"}
          // title=""
          title="Keep your code clean with AI Doc Comments."
        >
          {" "}
          {/* <div className="h-full "> */}
          {docstringLoading[0] ? (
            // <div className="text-center mt-10">Loading...</div>
            <div className="h-full grid place-content-center ">
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
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <Editor placeholder={docstring} button={false} listbox={false} />
              <a href="/app">
                <button className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-purple-700 px-4 py-2 text-sm font-medium text-purple-100 hover:bg-purple-200 hover:text-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                  Get started for free!
                </button>
              </a>
            </>
          )}
        </Window>
        {/* <Window className="col-span-2"> */}
        <div class="bg-blue-100 py-12 md:col-span-2 rounded-xl">
          <div className="absolute z-0 w-1/3 h-1/3 bg-[#5D6EF3] rounded-full opacity-20 blur-[100px] z-0"></div>
          <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
              <h2 class="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Introducing
              </h2>
              <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                AI Explaining Code
              </p>
            </div>
            <div class="mt-10">
              <p class="text-xl text-gray-700">
                Understanding someone else's code can be a real challenge. But
                don't worry, we've got you covered with our "AI Explaining Code"
                feature. Simply paste the code you want to understand into our
                editor, select your language, and click on the "Explain the
                code" button. Our AI will analyze the code and provide you with
                an explanation of how it works. You can even use it to explain
                your own code to others. Try it now!
              </p>
            </div>
          </div>
        </div>

        {/* </Window> */}

        <Window
          text_color={"text-black"}
          color={"bg-blue-100"}
          title="Paste your code here"
          // description="It can be a function, class and much more..."
          listbox={false}
        >
          <Editor
            buttonName={"Explain the code"}
            placeholder={explanationCode}
            listbox={true}
            generateResponse={handleCallbackExplanation}
            deafultLanguage={1}
          />
        </Window>
        {/* Right */}
        <Window
          text_color={"text-black"}
          color={"bg-blue-100"}
          // title=""
          title="Understand your and others code better."
          listbox={false}
        >
          <Result split={splitExplanation} loading={explanationLoading} />

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
        </Window>
        {/* Optimize */}
        <div class="bg-green-100 py-12 md:col-span-2 rounded-xl">
        <div className="absolute z-0 w-1/3 h-1/3 bg-green-400 rounded-full opacity-40 blur-[80px] z-0"></div>
          <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:text-center">
              <h2 class="text-base text-green-600 font-semibold tracking-wide uppercase">
                Introducing
              </h2>
              <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                AI Code Optimization
              </p>
            </div>
            <div class="mt-10">
              <p class="text-xl text-gray-700">
                Optimizing your code can be a complex and time-consuming task.
                That's why we've created the "AI Code Optimization" feature,
                which uses artificial intelligence to analyze your code and
                identify potential areas for optimization. Simply paste your
                code into our editor, select your language, and click on the
                "Optimize the code" button. Our system will provide you with
                suggestions on how to make your code faster and more efficient.
                Try it now and see how much time and effort you can save!
              </p>
            </div>
          </div>
        </div>

        <Window
          color={"bg-green-100"}
          text_color={"text-black"}
          // title="Generate AI optimization for your code."
          title="Paste your code here"
          // description="See how you can improve your code. It is also a great way to learn
          // from AI and improve your coding skills."
          listbox={false}
        >
          <Editor
            buttonName={"Optimize the code"}
            placeholder={optimizationCode}
            listbox={true}
            generateResponse={handleCallbackOptimization}
            deafultLanguage={2}
          />
        </Window>
        {/* Right */}
        <Window
          color={"bg-green-100"}
          // title=""
          title="Optimize the code by using the following instructions:"
          listbox={false}
        >
          <Result split={splitOptimization} loading={optimizationLoading} />
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

          {/* </div> */}
        </Window>
      </div>
    </section>
  );
};

export default Tools;
