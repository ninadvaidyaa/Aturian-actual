import React, { useState, Fragment } from "react";
import { Transition, Dialog, Popover } from "@headlessui/react";

import type { CellContext } from "@tanstack/react-table";
import {
  MdOutlineDeleteOutline,
  MdDiscount,
  MdDisabledByDefault,
  MdOutlineEditNote,
  MdSync,
  MdOutlineMoreVert,
  MdOutlineRemoveRedEye,
  MdOutlineFactCheck,
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
      <div className="flex flex-row ">
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
          >
            <MdOutlineEditNote
              className="h-4 w-4"
              color="#1890FF"
            />
            <span className="sr-only">Edit</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
          >
            <MdOutlineRemoveRedEye
              className="h-4 w-4"
              color="#1C1B1F"
            />
            <span className="sr-only">Preview</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
          >
            <MdOutlineFactCheck
              className="h-4 w-4"
              color="#BB0505"
            />
            <span className="sr-only">Quick View</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
          >
            <MdSync
              className="h-4 w-4"
              color="#8C8C8C"
            />
            <span className="sr-only">Icon</span>
          </button>
        </div>

        <Popover className="">
          {({ open }) => (
            <>
              <Popover.Button className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  ">
                <MdOutlineMoreVert
                  className={`${open ? "" : "text-opacity-70"}
                   h-4 w-4 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                  color="#1C1B1F"
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
                <Popover.Panel className="absolute z-10 ms-[-250px] mt-3 flex max-w-sm flex-col rounded-lg bg-white shadow">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="mx-4 inline-flex items-center border-b border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 first:mt-1 focus:outline-none focus:ring-4 focus:ring-gray-100 hover:bg-gray-100"
                  >
                    <MdOutlineDeleteOutline className="mr-2 h-4 w-4" />
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mx-4 inline-flex items-center border-b border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 hover:bg-gray-100"
                  >
                    <MdDiscount className="mr-2 h-4 w-4" />
                    Discontinue
                  </button>
                  <button
                    type="button"
                    className="mx-4 inline-flex items-center border-b border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 hover:bg-gray-100"
                  >
                    <MdDisabledByDefault className="mr-2 h-4 w-4" />
                    Disable
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

          <div className="fixed inset-0 overflow-y-auto p-2">
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
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Reprehenderit ipsam aliquid enim similique nemo
                      consequatur, a optio tempore aliquam quis!
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
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
