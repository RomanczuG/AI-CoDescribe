import React from "react";
import { Dialog } from "@headlessui/react";

const DialogModal = (isOpen, setIsOpen) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />

      <Dialog.Panel className="fixed inset-0 left-1/3 top-1/3 h-min max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
        {/* <Dots /> */}
        <Dialog.Title
          as="h3"
          className="mt-2 text-lg font-medium leading-6 text-gray-900"
        >
          Do you want to generate more?
        </Dialog.Title>

        <p className="mt-2 text-sm text-gray-500">
          Generate as many explanations and docstrings as you want for free.
          Click button below to get started.
        </p>
        <div className="flex ">
          <div className="mt-4 mr-4">
            <a href="/app">
              <button className="inline-flex justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                Get Started
              </button>
            </a>
          </div>
          <div className="mt-4">
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DialogModal;
