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
import { Link, useResolvedPath, useMatch } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex flex-col font-poppins w-64 h-screen bg-gray-900 rounded-md">
      <div className="px-6 pt-8">
        <div className=" flex items-center justify-start">
          <img src={profile} alt="logo" className="w-12 rounded-full" />
          <div className="m-3 text-gray-200 font-xs flex flex-col">
            <div>Mateusz Romaniuk</div>
          </div>
        </div>
      </div>
      <div className="grow px-2 text-white">
        <div className="mt-6 px-5">
          <h2 className="font-medium text-2xl">
            Perfect day to code a little.
          </h2>
        </div>
        <div class="w-full my-4 px-3">
          <div class="h-px bg-gray-100"></div>
        </div>
        <div className="mt-20 px-5">
          <h2 className="font-medium text-2xl">AI Tools</h2>
        </div>
        
        <CustomLink to="/app">
            <HomeIcon className="w-6 mr-3" />
            <p>Dashboard</p>
        </CustomLink>

        <CustomLink to="/app/docstring">
            <PencilSquareIcon className="w-6 mr-3" />
            <p>Docstring</p>
        </CustomLink>

        <CustomLink to="/app/explain">
            <ChatBubbleBottomCenterIcon className="w-6 mr-3" />
            <p>Explain Code</p>
        </CustomLink>

        <CustomLink to="/app/translate">
            <LanguageIcon className="w-6 mr-3" />
            <p>Translate Code</p>
        </CustomLink>
      </div>
      <div className="mb-10">
        <div class="w-full my-4 px-3">
            <div class="h-px bg-gray-100"></div>
            </div>
        <div className="px-5 justify-end text-gray-200">
            <div className="font-medium text-xl">Support</div>
            <div className="font-medium text-md">Submit feature request</div>
            <div className="font-medium text-md">Check twitter</div>
            <div className="font-medium text-md">Support the author</div>


            </div>
      </div>
    </div>
  );
};



function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    
    <div className={`text-lg mt-2 px-5 py-4 hover:bg-purple-900 rounded-md ${
        match ? "bg-purple-900" : ""
      }`}>
          <Link to={to} className="flex justify-start items-center">
            {children}
          </Link>
        </div>
  );
}

export default SideBar;
