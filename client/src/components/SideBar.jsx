import {
  HomeIcon,
  PencilSquareIcon,
  ChatBubbleBottomCenterIcon,
  LanguageIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="flex flex-col font-poppins w-64 h-screen bg-gray-900 rounded-md">
      <div className="px-2 pt-8">
        {/* <img src={profile} alt="logo" className="w-12 rounded-full" /> */}
        <div className="m-3 font-medium text-gray-200 text-2xl">
          <span className="text-purple-400">Code</span>
          <span>scribe.App</span>
        </div>
      </div>
      <div className="grow px-2 text-white">
        <div class="w-full my-4 px-3">
          <div class="h-px bg-gray-100"></div>
        </div>
        <div className="mt-4 px-5">
          <h2 className="font-medium text-2xl">
            Perfect day to code a little.
          </h2>
        </div>
        <div class="w-full my-4 px-3">
          <div class="h-px bg-gray-100"></div>
        </div>
        <div className="mt-4 px-5">
          <h2 className="font-medium text-xl">AI Tools</h2>
        </div>

        <CustomLink to="/app" isActive={true}>
          <HomeIcon className="w-6 mr-3" />
          <p>Dashboard</p>
        </CustomLink>

        <CustomLink to="/app/docstring" isActive={true}>
          <PencilSquareIcon className="w-6 mr-3" />
          <p>Docstring</p>
        </CustomLink>

        <CustomLink to="/app/explain" isActive={true}>
          <ChatBubbleBottomCenterIcon className="w-6 mr-3" />
          <p>Explain Code</p>
        </CustomLink>

        <CustomLink to="/app/lol" isActive={false}>
          <LanguageIcon className="w-6 mr-3 " />
          <p>Translate Code &#40;not available&#41;</p>
        </CustomLink>

        <CustomLink to="/app/optimize" isActive={true}>
          <ArrowTrendingUpIcon className="w-6 mr-3" />
          <p>Optimize Code</p>
        </CustomLink>
      </div>
      <div className="mb-10">
        <div class="w-full my-4 px-3">
          <div class="h-px bg-gray-100"></div>
        </div>
        <div className="px-5 justify-end text-gray-200">
          <div className="font-medium text-sm">Support</div>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfCeAJA5G5EdPAtIzzPej8rpTWgku3sqtRg8fi8U9Z0Fb9nuA/viewform">
            <div className="font-medium text-xs">Submit feature request</div>
          </a>
          <a href="https://twitter.com/betterMateusz">
            <div className="font-medium text-xs">Check twitter</div>
          </a>
          <a href="https://www.buymeacoffee.com/mateuszcoder">
            <div className="font-medium text-xs">Support the author</div>
          </a>
        </div>
      </div>
    </div>
  );
};

function CustomLink({ to, children, isActive }) {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <div
      className={`text-base mt-2 px-5 py-4 hover:bg-purple-900 rounded-md ${
        match ? "bg-purple-900" : ""
      }`}
    >
      <Link
        to={to}
        className={`${
          isActive ? "" : "disabled-link"
        } flex justify-start items-center`}
      >
        {children}
      </Link>
    </div>
  );
}

export default SideBar;
