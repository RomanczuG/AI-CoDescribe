import { Fragment } from "react";
import {
  Bars3BottomLeftIcon,
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  CheckIcon,
  HomeIcon,
  PencilSquareIcon,
  ChatBubbleBottomCenterIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import { logo, profile } from "../assets";
import { Link, useResolvedPath } from "react-router-dom";


const SideBar = () => {
  return (
    <div className="font-poppins w-64 h-screen bg-gray-900 rounded-md">
      <div className="px-6 pt-8">
        <div className=" flex items-center justify-start">
          <img src={profile} alt="logo" className="w-12 rounded-full" />
          <div className="m-3 text-gray-200 font-xs flex flex-col">
            <div>Mateusz Romaniuk</div>
          </div>
        </div>
      </div>
      <div className="px-2 text-white">
        <div className="mt-6 px-5">
          <h2 className="font-medium text-2xl">
          Perfect day to code a little.
          </h2>
        </div>
        <div class="w-full my-4 px-3">
          <div class="h-px bg-gray-100"></div>
        </div>
        <div className="mt-20 px-5">
          <h2 className="font-medium text-2xl">AI Options</h2>
        </div>
        

        <div className=" text-lg mt-2 px-5 py-4 hover:bg-purple-900 rounded-md">
          <Link to="/app" className="flex justify-start items-center ">
            <HomeIcon className="w-6 mr-3" />
            <p>Dashboard</p>
          </Link>
        </div>
        <div className=" text-lg mt-2 px-5 py-4 hover:bg-purple-900 rounded-md">
          <Link to="/app/doctring" className="flex justify-start items-center ">
            <PencilSquareIcon className="w-6 mr-3" />
            <p>Docstring</p>
          </Link>
        </div>
        <div className=" text-lg mt-2 px-5 py-4 hover:bg-purple-900 rounded-md">
          <a className="flex justify-start items-center ">
            <ChatBubbleBottomCenterIcon className="w-6 mr-3" />
            <p>Explain Code</p>
          </a>
        </div>
        <div className=" text-lg mt-2 px-5 py-4 hover:bg-purple-900 rounded-md">
          <a className="flex justify-start items-center ">
            <LanguageIcon className="w-6 mr-3" />
            <p>Translate Code</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;


