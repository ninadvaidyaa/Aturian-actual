import { useState, Fragment } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";

import { type Table } from "@tanstack/react-table";

const Search = () => (
  <div className="flex flex-row items-center justify-between gap-1 ">
    <button
      type="button"
      className="inline-flex items-center rounded-md bg-white p-2.5  text-center text-sm font-medium text-gray-400 focus:outline-none  focus:ring-1 focus:ring-blue-300"
    >
      <span className="fal fa-lock " />
      <span className="sr-only">Icon</span>
    </button>
    <form className="w-full">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-none bg-white p-2 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 active:border-blue-500"
          placeholder="Search Mockups, Logos..."
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    </form>
  </div>
);
interface TablePageHeaderProps<M> {
  table: Table<M>;
  title: string;
}

const TablePageHeader = <TData,>({
  table,
  title,
}: TablePageHeaderProps<TData>) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="z-20">
        <div className="flex flex-row items-center justify-between gap-1 ">
          <h2 className="text-2xl font-semibold">{title} List</h2>
          <div className="col-span-8 flex flex-row items-center justify-end gap-2">
            <Search />
            <button
              type="button"
              className="mr-2 inline-flex items-center justify-center rounded-lg bg-skin-fill px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-slate-50 hover:bg-skin-fill"
            >
              <i className="fal fa-plus -ml-1 mr-2 "></i>
              Add New {title}
            </button>
            <Menu
              as="div"
              className="relative inline-block text-center"
            >
              <Menu.Button className="h-6 w-6 rounded-full p-0.5 font-bold text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-300">
                <i className="far fa-cog fa-lg"></i>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-30 mt-2 w-min origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-slate-200" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          onClick={openModal}
                        >
                          Column
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-slate-200" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                        >
                          Filter
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>

      {/* edit customer dialog */}
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-30"
          onClose={closeModal}
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
                    Show/Hide Columns
                  </Dialog.Title>
                  <div className="mt-2">
                    {table.getAllLeafColumns().map((column) => (
                      <div key={column.id}>
                        {column.columnDef.enableHiding === false ? (
                          <div className="flex items-center">
                            <input
                              checked={column.getIsVisible()}
                              disabled
                              id={column.id}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                              htmlFor={column.id}
                              className="ml-2 text-sm font-medium text-gray-900"
                            >
                              {column.columnDef.id === "select"
                                ? "select"
                                : column.columnDef.header?.toString()}
                            </label>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <input
                              id={column.id}
                              type="checkbox"
                              checked={column.getIsVisible()}
                              onChange={column.getToggleVisibilityHandler()}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor={column.id}
                              className="ml-2 text-sm font-medium text-gray-900"
                            >
                              {column.columnDef.header?.toString()}
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                      onClick={closeModal}
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

export default TablePageHeader;
