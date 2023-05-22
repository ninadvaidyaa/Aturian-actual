import React, { useState, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

import type { CellContext } from "@tanstack/react-table";
import {
  MdOutlineFingerprint,
  MdOutlinePrint,
  MdOutlineLocalPrintshop,
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
      <div className="flex flex-row justify-end gap-1">
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
          >
            <MdOutlinePrint
              className="h-4 w-4"
              color="#1890FF"
            />
            <span className="sr-only">Icon</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
          >
            <MdOutlineFingerprint
              className="h-4 w-4"
              color="#BB0505"
            />
            <span className="sr-only">Icon</span>
          </button>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center rounded-full p-1 text-center text-sm font-medium text-skin-inverted focus:outline-none focus:ring-1 focus:ring-blue-300  "
          >
            <MdOutlineLocalPrintshop
              className="h-4 w-4 "
              color="#8C8C8C"
            />
            <span className="sr-only">Icon</span>
          </button>
        </div>
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
