import React from "react";
import styles from "../style";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
const Content = lazy(() => import("./Title_animated"));

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`z-10 flex-1 ${styles.flexStart} flex flex-col px-6 justify-between items-center`}
      >
        <div className="md:py-4 px-5 text-center items-center ">
        <Suspense fallback={<div>Loading...</div>}>
          <Content />
          </Suspense>
          {/* <Title_animated/> */}

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
          {/* <Link to="/app">  */}
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
            {/* </Link> */}
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
  
      <div className="absolute z-0 w-1/3 h-1/3 bg-[#8593E8] top-1/3 left-1/4 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="absolute z-0 w-1/3 h-1/3 bg-[#5D6EF3] top-1/4 left-2/4 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="absolute z-0 w-1/3 h-1/3 bg-[#FC4FF6] top-1/2 left-3/4 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="absolute z-0 w-1/3 h-1/3 bg-[#8593E8] top-2/3 left-3/4 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="absolute z-0 w-1/3 h-1/3 bg-[#5D6EF3] top-2/3 left-2/4 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="absolute z-0 w-1/3 h-1/3 bg-[#FC4FF6] top-2/3 left-1/5 rounded-full opacity-20 blur-3xl z-0"></div>
    </section>
  );
};


export default Hero;
