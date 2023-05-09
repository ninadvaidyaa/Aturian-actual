import React, { useState, Fragment } from "react";
import { Transition, Popover, Dialog } from "@headlessui/react";

import type { CellContext } from "@tanstack/react-table";
import {
  MdOutlineRemoveRedEye,
  MdOutlineAvTimer,
  MdOutlineDeleteOutline,
  MdOutlineMoreVert,
  MdOutlineNoteAdd,
  MdOutlineStickyNote2,
  MdOutlineNotificationsNone,
  MdOutlineCameraAlt,
  MdOutlineFactCheck,
  MdOutlineFileCopy,
  MdOutlineTextSnippet,
  MdOutlineAssignmentTurnedIn,
} from "react-icons/md";

const genericMemo: <T>(component: T) => T = React.memo;
interface RowActionsProps<TData, P> {
  info: CellContext<TData, P>;
}

const RowActionComponent = <TData, P>({ info }: RowActionsProps<TData, P>) => {
  const [add, setAdd] = useState<boolean>(false);
  const handleAdd = () => {
    setAdd(!add);
  };

  return (
    <>
      <div className="flex flex-row gap-1">
        <div>
          <button
            type="button"
            className="text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center  "
          >
            <MdOutlineRemoveRedEye
              className="w-4 h-4"
              color="#8C8C8C"
            />
            <span className="sr-only">Icon</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center  "
          >
            <MdOutlineAvTimer
              className="w-4 h-4"
              color="#1890FF"
            />
            <span className="sr-only">Icon</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center  "
          >
            <MdOutlineDeleteOutline
              className="w-4 h-4 "
              color="#BB0505"
            />
            <span className="sr-only">Icon</span>
          </button>
        </div>
        <Popover className="">
          {({ open }) => (
            <>
              <Popover.Button className="text-skin-inverted focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center  ">
                <MdOutlineMoreVert
                  className={`${open ? "" : "text-opacity-70"}
                   h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute flex flex-col ms-[-170px] z-10 mt-3 max-w-sm bg-white rounded-lg shadow">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="text-gray-900 bg-white hover:bg-gray-100 mx-4 border-b border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                  >
                    <MdOutlineNoteAdd className="w-4 h-4 mr-2" />
                    Order Notes
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 mx-4 border-b border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                  >
                    <MdOutlineStickyNote2 className="w-4 h-4 mr-2" />
                    Data Entry
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 mx-4 border-b border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                  >
                    <MdOutlineNotificationsNone className="w-4 h-4 mr-2" />
                    Order Notification
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 mx-4 border-b border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                  >
                    <MdOutlineCameraAlt className="w-4 h-4 mr-2" />
                    Order Proof
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 mx-4 border-b border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                  >
                    <MdOutlineFactCheck className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 mx-4 border-b border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                  >
                    <MdOutlineFileCopy className="w-4 h-4 mr-2" />
                    Duplicate Order
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 mx-4 border-b border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                  >
                    <MdOutlineTextSnippet className="w-4 h-4 mr-2" />
                    Add Pink Slip
                  </button>
                  <button
                    type="button"
                    className="text-gray-900 bg-white hover:bg-gray-100 mx-4 border-b border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium text-sm px-3 py-2 text-center inline-flex items-center"
                  >
                    <MdOutlineAssignmentTurnedIn className="w-4 h-4 mr-2" />
                    Assign
                  </button>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      <Transition
        appear
        show={add}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-20"
          onClose={handleAdd}
        >
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Sample Modal
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit ipsam aliquid enim similique nemo consequatur, a optio tempore aliquam quis!
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleAdd}
                    >
                      close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const RowActions = genericMemo(RowActionComponent);
export default RowActions;
