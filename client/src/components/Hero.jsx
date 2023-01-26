import React from "react";
import styles from "../style";
import { example} from "../assets";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";


const Hero = () => {
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
          {/* <Link to="/app">
            <button className="cursor-pointer font-semibold h-[70px] w-[229px] relative overflow-hidden rounded-lg bg-black  ring-red-500/50 ring-offset-black will-change-transform">
              <span class="absolute inset-0.5 z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 ">
                Get Started
              </span>
              <span
                aria-hidden
                class="absolute inset-0 z-5 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
              />
            </button>
          </Link> */}
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
