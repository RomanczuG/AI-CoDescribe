import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "./Editor";
import Window from "./Window";

const client = axios.create({
  baseURL: "https://codescribeapp.herokuapp.com",
  // baseURL : "http://127.0.0.1:5000",
});

const Docstring = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [docstring, setDocstring] = useState("");
  const [code, setCode] = useState("", "");
  const [loading, setLoading] = useState(false);
  // const [generated, setGenerated] = useState(false);
  const [chosen, setChosen] = useState(false);
  const handleCallbackDocstring = (childData) => {
    setCode(childData);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(docstring);
    // Create a popup saying that the docstring was copied
    setShowPopup(true);
    // Remove the popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };
  useEffect(() => {
    if (chosen == true) {
      generateDocstring();
    } else {
      setChosen(true);
    }
  }, [code]);

  const generateDocstring = () => {
    setLoading(true);
    console.log(code);
    client
      .post("/gen_docstring", {
        code: code[0],
        language: code[1],
        docstring: "",
      })
      .then((res) => {
        setLoading(false);
        setDocstring(res.data.docstring);
        console.log(docstring);
        setGenerated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="max-w-screen-xl flex flex-col">
        <div className="drop-shadow-lg font-poppins p-8 m-6 rounded-xl items-center bg-gray-100 text-black">
          <Dots />
          <div className="font-semibold text-4xl mt-6">
            Generate AI Docstring
          </div>
          <div className="font-medium text-base mt-6">
            It is easy to generate AI docstrings for your code. Simply paste
            your code below, choose your language, and click on the button. Then
            paste the generated docstring into your code.
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-rows-2 gap-4 mx-6">
          <Window
            title="Simply use your code!"
            description="Put function, class, struct, and etc."
          >
            <Editor
              className="mt-8"
              code={code}
              setCode={setCode}
              buttonName="Generate Docstring"
              listbox={true}
              generateResponse={handleCallbackDocstring}
            />
          </Window>
          <Window
            title="Generated Docstring"
            description="Copy the generated docstring and paste it into your code."
          >
            <div className="h-full">
              {loading ? (
                // <div className="text-center mt-10">Loading...</div>
                <div class="grid place-content-center h-full">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-700"
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
                <Editor
                  className="h-full"
                  placeholder={docstring}
                  buttonName="Copy Docstring"
                  listbox={false}
                  generateResponse={handleCopy}
                />
              )}
            </div>
            {showPopup && (
              <div className="fixed top-0 right-0 mt-5 mr-5 p-4 bg-purple-700 text-white rounded-md shadow-md z-50">
                <span role="img" aria-label="clipboard">
                  📋
                </span>{" "}
                Docstring copied!
              </div>
            )}
          </Window>
        </div>
      </div>
    </>
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

export default Docstring;
