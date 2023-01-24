import React from "react";
import styles from "../style";
import { example, see_example, generate, right_arrow } from "../assets";
import Highlight from "react-highlight";
import { useState, useEffect } from "react";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";



const docstring = `#Example Code
def fit_and_predict(X, y):
  # Fit the model to the data
  model = LinearRegression()
  model.fit(X, y)

  # Predict on a new dataset
  X_new = np.array([[0.5], [1.0], [1.5], [2.0]])
  y_pred = model.predict(X_new)

  return y_pred`;

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

const Hero = () => {
  // First loading, second showing
  const [docstringLoading, setDocstringLoading] = useState([false, false]);

  const showDocstring = () => {
    setDocstringLoading([true, false]);
    // wait 1 second
    setTimeout(() => {
      setDocstringLoading([false, true]);
    }, 1000);
  };
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col x1:px-0 sm:px16 px-6 flex flex-row justify-between items-center z-10`}
      >
        <div className="py-4 px-5 text-center items-center ">
          <div className="font-extrabold text-7xl leading-[97px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3BFF] via-[#DEACAC] to-[#5C24FF]">
            <Typewriter
              onInit={(typewriter) => {
                typewriter

                  .typeString("Translate")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Optimize")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Document")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Explain")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Transform your code!")
                  .start();
              }}
            />
          </div>
          <div className="font-medium text-7xl text-center leading-[50px] text-[#3E3E3E]">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("your code with AI")
                  .pauseFor(9500)
                  .deleteAll()
                  .typeString("With AI")
                  .start();
              }}
            />
          </div>

          <div className="flex justify-center font-poppins font-normal text-xl leading-[33px] mt-20 text-[#3E3E3E] text-center h-[99px] tracking-wider">
            <p className="w-3/4">
              Our AI dev tools facilitates the process of writing code by
              providing to document, explain, optimize, and translate your code.
              No matter if you are using Python, Java, or C++, we have you
              covered. Make your personal & team project more efficient with our
              AI dev tools.
            </p>
          </div>
        </div>

        <div className="font-poppins text-white  py-6 px-20 z-10">
          <a href="/app">
            <button className="cursor-pointer font-semibold h-[70px] w-[229px] relative overflow-hidden rounded-lg bg-black  ring-red-500/50 ring-offset-black will-change-transform">
              <span class="absolute inset-0.5 z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 ">
                Get Started
              </span>
              <span
                aria-hidden
                class="absolute inset-0 z-5 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
              />
            </button>
          </a>
          <a href="#modal" target="_self">
            <button className="cursor-pointer font-semibold ml-10 h-[70px] w-[229px] relative overflow-hidden rounded-lg bg-black px-20 py-6 ring-red-500/50 ring-offset-black will-change-transform">
              <span class="absolute inset-0.5 z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 ">
                See how it works
              </span>
              <span
                aria-hidden
                class="absolute inset-0 z-5 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
              />
            </button>
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8" >
        <div className="flex flex-col drop-shadow-lg font-poppins p-8  rounded-xl bg-gray-100 text-black">
          <div className="grow font-medium">
            <Dots />
            <div className="font-semibold text-4xl mt-6">
              Generate AI Docstring
            </div>
            <div className="mt-[15px] font-medium text-[15px]">
              It can be a function, class and much more...
            </div>
            
          </div>
          <div className=" ">
            <div className="text-xs bg-white rounded-lg mt-6">
              <div className="w-full h-80 border-2 border-gray-200 rounded-lg ">
                <Highlight className="rounded-lg" language="python">
                  {docstring}
                </Highlight>
              </div>
            </div>
            <div className="relative z-0 flex w-1/2">
              <button className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-4"
              onClick={showDocstring}
              >
                Generat Example Docstring
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
          <div className=" ">
            <div className="text-xs bg-white rounded-lg mt-6">
              <div className="overflow-auto w-full h-80 border-2 border-gray-200 rounded-lg ">
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
                    <div className="text-lg font-semibold grid place-content-center h-full">Click Generate Docstring button to see the result</div>
                )
              )}
                
              </div>
            </div>
            <div className="relative z-0 flex w-1/2">
              <button className="mt-4 w-full bg-purple-700 hover:bg-purple-900 text-white rounded-lg p-4">
                Generate your own for free!
              </button>
            </div>
          </div>
        </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="m-2 font-poppins p-[22px] bg-black w-[582px] h-[468px] rounded-[18px]">
            <div className=" flex flex-row">
              <div className="mr-[8px] bg-red-600 w-[14px] h-[14px] rounded-full"></div>
              <div className="mr-[8px] bg-yellow-500 w-[14px] h-[14px] rounded-full"></div>
              <div className="bg-green-600 w-[14px] h-[14px] rounded-full"></div>
            </div>
            <div className="mt-[8px] font-medium text-2xl text-white">
              Generate docstrings for Python
            </div>
            <div className="mt-[8px] font-normal text-[12px] text-white">
              Keep your code organized in teams/personal projects
            </div>
            <div className="mt-[15px] font-medium text-[15px] text-white">
              It can be a function, class and much more...
            </div>

            <div className="px-1 py-1 text-[13px] bg-white w-[538px] h-[250px] rounded-[10px]">
              <Highlight language="python">{docstring}</Highlight>
            </div>
            <a
              href="/app"
              class="mt-5 inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2  sm:w-auto sm:text-sm"
            >
              <div className="flex flex-row items-center justify-between">
                <img src={generate} className="mr-2 w-[15px] h-[15px]" />
                <div className="font-[10px]">Generate your own for free</div>
              </div>
            </a>
          </div>
          <div className="m-2 font-poppins p-[22px] bg-black w-[582px] h-[468px] rounded-[18px]">
            <div className=" flex flex-row">
              <div className="mr-[8px] bg-red-600 w-[14px] h-[14px] rounded-full"></div>
              <div className="mr-[8px] bg-yellow-500 w-[14px] h-[14px] rounded-full"></div>
              <div className="bg-green-600 w-[14px] h-[14px] rounded-full"></div>
            </div>
            <div className="mt-[8px] font-medium text-2xl text-white">
              How to use:
            </div>
            <div className="mt-[15px] font-[400px] text-[14px] text-white flex-col">
              <div className="flex flex-row items-center justify-start my-4">
                <img src={right_arrow} className="mr-2 w-[15px] h-[15px]" />
                <div className="font-[10px]">
                  Copy the code element you want to document (such as a
                  function) and paste it into the app.
                </div>
              </div>
              <hr></hr>

              <div className="flex flex-row items-center justify-start my-4 ">
                <img src={right_arrow} className="mr-2 w-[15px] h-[15px]" />
                <div className="font-[10px]">
                  Click the "Generate" button to create the docstring.
                </div>
              </div>
              <hr></hr>
              <div className="flex flex-row items-center justify-start my-4">
                <img src={right_arrow} className="mr-2 w-[15px] h-[15px]" />
                <div className="font-[10px]">
                  Copy the docstring from the output field.
                </div>
              </div>
              <hr></hr>
              <div className="flex flex-row items-center justify-start my-4">
                <img src={right_arrow} className="mr-2 w-[15px] h-[15px]" />
                <div className="font-[10px]">
                  Paste the docstring below the code element in your code
                  editor, making sure to follow the proper syntax for the
                  selected programming language.
                </div>
              </div>
              <hr></hr>
              <div className="flex flex-row items-center justify-start my-4">
                <img src={right_arrow} className="mr-2 w-[15px] h-[15px]" />
                <div className="font-[10px]">
                  Save your code and test the docstring by hovering your cursor
                  over the code element to see the description.
                </div>
              </div>
            </div>
            <a
              href="#modal"
              target="_self"
              class="mt-1 inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
            >
              <div className="flex flex-row items-center justify-between">
                <img src={see_example} className="mr-2 w-[15px] h-[15px]" />
                <div className="font-[10px]">See example in VSCode</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div
        class="group invisible relative z-10 opacity-0 transition-all duration-300 target:visible target:opacity-100"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        id="modal"
      >
        <div class="fixed inset-0 z-10 overflow-y-auto ">
          <div class="flex min-h-full justify-center p-4 text-center items-center p-0">
            <a
              href="#"
              target="_self"
              class="fixed inset-0 block cursor-default bg-black/50 bg-opacity-75 transition-opacity"
            >
              <span class="sr-only">Close Modal</span>
            </a>

            <div class="relative z-10 scale-90 transform overflow-hidden rounded-[18px] bg-white text-left opacity-0 shadow-xl transition-all duration-300 group-target:scale-100 group-target:opacity-100 my-8 w-full max-w-screen-md">
              <div class="bg-white px-4 p-6 pb-4">
                <div class="flex items-start">
                  <div class="m-5 text-left">
                    <div className=" flex flex-row">
                      <div className="mr-[8px] bg-red-600 w-[14px] h-[14px] rounded-full"></div>
                      <div className="mr-[8px] bg-yellow-500 w-[14px] h-[14px] rounded-full"></div>
                      <div className="bg-green-600 w-[14px] h-[14px] rounded-full"></div>
                    </div>
                    <h1
                      class="mt-5 text-4xl font-poppins font-medium leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Here is an Example in VSCode
                    </h1>
                    <div class="mt-5 w-3/4">
                      <p class="text-xl text-gray-500">
                        Quickly access detailed function descriptions by
                        hovering your cursor. Enhance organization for team and
                        personal projects with AI-generated descriptions.
                      </p>
                    </div>

                    <img src={example} className=" max-fit " />
                  </div>
                </div>
              </div>

              <div class="font-poppins bg-gray-50 flex flex-row px-6 py-6">
                <a
                  href="/app"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Get Started for Free
                </a>
                <a
                  href="#"
                  target="_self"
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Go Back
                </a>
              </div>
            </div>
            {/* <span
                aria-hidden
                class="absolute inset-0 z-0 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
              /> */}
          </div>
        </div>
      </div>

      <div className="absolute w-[462px] h-[462px] bg-[#8593E8] top-[289px] left-[238px] rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-[462px] h-[462px] bg-[#5D6EF3] top-[199px] left-[672px] rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-[462px] h-[462px] bg-[#FC4FF6] top-[330px] left-[1146px] rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-[462px] h-[462px] bg-[#8593E8] top-[689px] left-[719px] rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-[462px] h-[462px] bg-[#5D6EF3] top-[702px] left-[1419px] rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-[462px] h-[462px] bg-[#FC4FF6] top-[638px] left-[51px] rounded-full opacity-20 blur-2xl z-0"></div>
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

export default Hero;
