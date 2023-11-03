"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import TaskForm from "../Form/taskForm";
import { BsListTask } from "react-icons/bs";
import { useTaskDispatch, useTasks } from "../../app/TaskContext";

export default function AddGroupTask() {
  let [isOpen, setIsOpen] = useState(false);

  const dispatch = useTaskDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  const receivedData = (data) => {
    setIsOpen(data);
  };

  function openModal() {
    setIsOpen(true);
    dispatch({
      type: "RESET_NEW_DATA",
    });
  }

  return (
    <>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={openModal}
          className="flex items-center gap-2 px-3 py-2.5 rounded-md text-white bg-[#3e80ff] hover:bg-[#3e70ff] max-md:px-2.5 max-md:py-0.5"
        >
          <FiPlusSquare className="max-md:text-lg"/>
          <p className="text-xs font-medium max-md:text-[8px]">Add Task</p>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg flex items-center gap-4 font-medium leading-6 text-gray-900"
                  >
                    New Task
                    <BsListTask className="text-xl" />
                  </Dialog.Title>
                  <div className="mt-8">
                    <TaskForm sendOpen={receivedData} />
                  </div>

                  {/* <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div> */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
