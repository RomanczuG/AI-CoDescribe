import { useRef } from "react";
import useScrollIndicator from "./Scroll";

function Result({ split, loading }) {
  const ulRef = useRef(null);
  const showScrollIndicator = useScrollIndicator(ulRef);

  return (
    <div className="relative h-full mt-6  ">
      <ul ref={ulRef} className="max-h-96 overflow-y-auto">
        {loading[0] ? (
          // <div className="text-center mt-10">Loading...</div>
          <div className="h-full grid place-content-center">
            <div role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          split.map((item) => {
            return (
              <li
                key={item}
                className="text-base font-medium text-gray-800 px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
              >
                {item}
              </li>
            );
          })
        )}
      </ul>
      {showScrollIndicator && (
  <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center">
    <div className="bg-purple-700 rounded-full h-10 w-10 flex items-center justify-center animate-bounce">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  </div>
)}

    </div>
  );
}

export default Result;
