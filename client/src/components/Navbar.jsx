import { useState } from "react";

import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  return (
    <nav className="w-full flex py-6 justify-between items-center top-48">
      <div className="w-[198px] h-[36px] text-logo font-bold text-2xl "> CoDescribe.app </div>
      <ul className="list-none sm:flex  hidden items-center  w-[60px]">
        {navLinks.map((nav, index) => (
          <li 
          key={nav.id} 
          className={`font-poppins font-normal text-logo cursor-pointer text-[16px] ${index === navLinks.length-1 ? 'mr-0' : 'mr-10'} text-white`}>
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className="font-poppins font-normal text-white cursor-pointer">
        {/* <button
            class="ml-10 h-[47px] w-[150px] rounded-[14px] text-base font-semibold text-white bg-gradient-to-r from-[#FF3BFF] to-[#5C24FF] hover:from-[#CF1ACF] hover:to-[#3508B6]">
            SignUp
        </button>
        <button
            class="ml-10 h-[47px] w-[150px] rounded-[14px] text-base font-semibold text-white bg-gradient-to-r from-[#FF3BFF] to-[#5C24FF] hover:from-[#CF1ACF] hover:to-[#3508B6]">
            LogIn
        </button> */}
        <a href="https://old.codescribe.app">
            <button className="cursor-pointer font-semibold  h-[70px] w-[180px] relative overflow-hidden rounded-lg bg-black  ring-red-500/50 ring-offset-black will-change-transform">
              <span class="absolute inset-0.5 z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 ">SignUp</span>
              <span aria-hidden class="absolute inset-0 z-5 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400" />
              
            </button>
          </a>
          <a href="https://old.codescribe.app">
            <button className="cursor-pointer font-semibold ml-10 h-[70px] w-[180px] relative overflow-hidden rounded-lg bg-black px-20 py-6 ring-red-500/50 ring-offset-black will-change-transform">
              <span class="absolute inset-0.5 z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 ">LogIn</span>
              <span aria-hidden class="absolute inset-0 z-5 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400" />
              
            </button>
          </a>

      </div>
    </nav>
  );
};

export default Navbar;
