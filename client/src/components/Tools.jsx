import { useState, useEffect } from "react";
import Highlight from "react-highlight";
import React from "react";

const docstring = `#Example Code
def fit_and_predict(X, y):
  # Fit the model to the data
  model = LinearRegression()
  model.fit(X, y)

  # Predict on a new dataset
  X_new = np.array([[0.5], [1.0], [1.5], [2.0]])
  y_pred = model.predict(X_new)

  return y_pred`;

const explanation = `#Example Code
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

const explanationFin = `
Use calc_mean_variance(double* data, int n, double* mean, double* variance) to calculate the mean and variance of an array of data.\n
1. Initialize the mean and variance to 0.\n
2. Calculate the mean by summing the data and dividing by the number of elements.\n
3. Calculate the variance by subtracting the mean from each element and squaring the result.\n
4. Divide the variance by the number of elements.`;




const docstringFin = `#Example Code
def fit_and_predict(X, y):
  """
  Use fit_and_predict(X, y) to fit a linear regression model to the data and
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
      The predicted values from the model.
  """
  # Fit the model to the data
  model = LinearRegression()
  model.fit(X, y)

  # Predict on a new dataset
  X_new = np.array([[0.5], [1.0], [1.5], [2.0]])
  y_pred = model.predict(X_new)

  return y_pred`;

const Tools = () => {
      // First loading, second showing
  const [docstringLoading, setDocstringLoading] = useState([false, false]);

  const showDocstring = () => {
    setDocstringLoading([true, false]);
    // wait 1 second
    setTimeout(() => {
      setDocstringLoading([false, true]);
    }, 1000);
  };

  const [explanationLoading, setExplanationLoading] = useState([false, false]);

  const showExplanation = () => {
    setExplanationLoading([true, false]);
    // wait 1 second
    setTimeout(() => {
      setExplanationLoading([false, true]);
    }, 1000);
  };
    return (
        <section id="tools" className="flex flex-col items-center justify-center w-full h-full">
        <div className="grid grid-cols-2 gap-8 w-4/5" >
        {/* Docstring */}
      <div className="flex flex-col drop-shadow-lg font-poppins p-8  rounded-xl bg-gray-100 text-black">
        <div className="grow font-medium">
          <Dots />
          <div className="font-semibold text-3xl mt-6">
            Generate AI Docstring
          </div>
          <div className="mt-[15px] font-medium text-[15px]">
            It can be a function, class and much more...
          </div>
          
        </div>
        <div className=" ">
          <div className="text-xs bg-white rounded-lg mt-6">
            <div className="w-full h-60 border-2 border-gray-200 rounded-lg ">
              <Highlight className="rounded-lg" language="python">
                {docstring}
              </Highlight>
            </div>
          </div>
          <div className="relative z-0 flex w-1/2">
            <button className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-white text-xs  rounded-lg p-4"
            onClick={showDocstring}
            >
              Generate Example Docstring
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col drop-shadow-lg font-poppins p-8 rounded-xl bg-gray-100 text-black">
        <div className="grow font-medium">
          <Dots />
          <div className="font-medium text-base mt-6">
            It is easy to generate AI docstrings for your code. Simply paste
            your code below, choose your language, and click on the button.
            Then paste the generated docstring into your code.
          </div>
        </div>
        {/* Left */}
        <div className=" ">
          <div className="text-xs bg-white rounded-lg mt-6">
            <div className="overflow-auto w-full h-60 border-2 border-gray-200 rounded-lg ">
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
              ) : ( 
                docstringLoading[1] ? (
                  <Highlight
                  className="rounded-lg "
                  language="python"
                >
                  {docstringFin}
                </Highlight>
                  
                ) : (
                  <div className="text-base font-semibold grid place-content-center h-full">Click Generate Docstring button to see the result</div>
              )
            )}
              
            </div>
          </div>
          <div className="relative z-0 flex w-1/2">
            <button className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-xs  text-white rounded-lg p-4">
              Generate your own for free!
            </button>
          </div>
        </div>
      </div>
      

      {/* Explain */}
      <div className="flex flex-col drop-shadow-lg font-poppins p-8  rounded-xl bg-gray-100 text-black">
        <div className="grow font-medium">
          <Dots />
          <div className="font-semibold text-3xl mt-6">
            Generate Code Explanation
          </div>
          <div className="mt-[15px] font-medium text-[15px]">
            It can be a function, class and much more...
          </div>
          
        </div>
        <div className=" ">
          <div className="text-xs bg-white rounded-lg mt-6">
            <div className="w-full h-60 border-2 border-gray-200 rounded-lg ">
              <Highlight className="rounded-lg" language="c">
                {explanation}
              </Highlight>
            </div>
          </div>
          <div className="relative z-0 flex w-1/2">
            <button className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-white text-xs rounded-lg p-4"
            onClick={showExplanation}
            >
              Generate Example Explanation
            </button>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-col drop-shadow-lg font-poppins p-8 rounded-xl bg-gray-100 text-black">
        <div className="grow font-medium">
          <Dots />
          <div className="font-medium text-base mt-6">
                Simply paste your code and let AI explain it for you. Understand your and others code better.
              </div>
        </div>
        {/* Left */}
        <div className=" ">
          <div className="text-xs bg-white rounded-lg mt-6">
            <div className="overflow-auto w-full h-60 border-2 border-gray-200 rounded-lg ">
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
              ) : ( 
                explanationLoading[1] ? (     
                    <>
                    <div className="px-4 pt-4">Use calc_mean_variance(double* data, int n, double* mean, double* variance) to calculate the mean and variance of an array of data.</div>
                    <div className="px-4">1. Initialize the mean and variance to 0.</div>
                    <div className="px-4">2. Calculate the mean by summing the data and dividing by the number of elements.</div>
                    <div className="px-4">3. Calculate the variance by subtracting the mean from each element and squaring the result.</div>
                    <div className="px-4">4. Divide the variance by the number of elements.</div>
                    </>               
                ) : (
                  <div className="text-base font-semibold grid place-content-center h-full">Click Generate Explanation button to see the result</div>
              )
            )}
              
            </div>
          </div>
          <div className="relative z-0 flex w-1/2">
            <button className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-xs  text-white rounded-lg p-4">
              Generate your own for free!
            </button>
          </div>
        </div>
      </div>

      </div>
      </section>

    )
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

export default Tools