import React from "react";
import styles from "../style";
import { example } from "../assets";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex flex-col px-6 justify-between items-center`}
      >
        <div className="md:py-4 px-5 text-center items-center ">
          <div className="font-extrabold md:pb-0 pb-5 md:text-7xl text-5xl md:leading-[97px] leading-[40px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3BFF] via-[#DEACAC] to-[#5C24FF]">
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
          <div className="font-medium md:text-7xl text-5xl md:leading-[50px] leading-[40px] text-center text-[#3E3E3E]">
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

          <div className="flex justify-center font-poppins font-normal md:text-xl text-base md:leading-[33px] leading-[23px] md:mt-20 mt-10 text-[#3E3E3E] text-center tracking-wider">
            <p className="md:w-3/4 w-full">
              Our AI dev tools facilitates the process of writing code by
              providing to document, explain, optimize, and translate your code.
              No matter if you are using Python, Java, or C++, we have you
              covered. Make your personal & team project more efficient with our
              AI dev tools.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 font-poppins text-white mt-5">
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
          <a href="#tools">
            <button className="cursor-pointer font-semibold h-[70px] w-[229px] relative overflow-hidden rounded-lg bg-black py-6 ring-red-500/50 ring-offset-black will-change-transform">
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
  
      <div className="absolute w-1/3 h-1/3 bg-[#8593E8] top-1/3 left-1/4 rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-1/3 h-1/3 bg-[#5D6EF3] top-1/4 left-2/4 rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-1/3 h-1/3 bg-[#FC4FF6] top-1/2 left-3/4 rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-1/3 h-1/3 bg-[#8593E8] top-2/3 left-3/4 rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-1/3 h-1/3 bg-[#5D6EF3] top-2/3 left-2/4 rounded-full opacity-20 blur-2xl z-0"></div>
      <div className="absolute w-1/3 h-1/3 bg-[#FC4FF6] top-2/3 left-1/5 rounded-full opacity-20 blur-2xl z-0"></div>
    </section>
  );
};

export default Hero;
