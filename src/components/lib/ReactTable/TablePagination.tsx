import { Listbox, Transition } from "@headlessui/react";
import {
  MdOutlineCheck,
  MdOutlineExpandMore,
  MdOutlineArrowLeft,
  MdOutlineArrowRight,
  MdSkipPrevious,
  MdSkipNext,
} from "react-icons/md";

import { Fragment } from "react";

interface TablePaginationProps {
  gotoPage: (value: number) => void;
  setPageSize: (value: number) => void;
  pageIndex: number;
  pageSize: number;
  rowCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onFirstPageClick: () => void;
  onLastPageClick: () => void;
}

const TablePagination = ({
  gotoPage,
  setPageSize,
  pageSize,
  pageIndex,
  rowCount,
  hasNextPage,
  hasPrevPage,
  onPreviousClick,
  onNextClick,
  onFirstPageClick,
  onLastPageClick,
}: TablePaginationProps) => {
  const countStart = pageIndex === 0 ? 1 : pageIndex * pageSize + 1;
  let countEnd = pageIndex === 0 ? pageSize : pageIndex * pageSize + pageSize;
  countEnd = rowCount > countEnd ? countEnd : rowCount;

  const handleChangePagination = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const handleChange = (event: number) => {
    setPageSize(event);
  };

  return (
    <div className="flex flex-row items-center justify-end pt-2">
      <div className="bg-white rounded-md px-2">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="flex flex-row items-center justify-center gap-1 pl-2">
            <p color="secondary ">Row per page</p>
            <Listbox
              value={pageSize}
              onChange={handleChange}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-sm bg-white py-1 pl-1 pr-8 text-left focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300">
                  <span className="block truncate min-h-[20px]">
                    {pageSize}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <MdOutlineExpandMore
                      className="h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute -top-2 transform -translate-y-full mb-1 z-10 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {[10, 20, 30, 40, 50].map((_pageSize) => (
                      <Listbox.Option
                        key={_pageSize}
                        value={_pageSize}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-slate-100 text-gray-900"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {_pageSize}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600">
                                <MdOutlineCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-2 text-gray-900 dark:text-white">
              <li>
                {rowCount
                  ? `${countStart}–${countEnd} of ${rowCount}`
                  : `0–0 of 0`}
              </li>
              <li>
                <button
                  type="button"
                  className={`${
                    hasPrevPage ? "text-slate-500" : "text-gray-300"
                  } focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center`}
                  aria-label="first"
                  title="first"
                  disabled={!hasPrevPage}
                  onClick={onFirstPageClick}
                >
                  <MdSkipPrevious className="w-6 h-6" />
                </button>
              </li>
              <li className="selected">
                <button
                  type="button"
                  className={`${
                    hasPrevPage ? "text-slate-500" : "text-gray-300"
                  } focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center`}
                  aria-label="previous"
                  title="previous"
                  disabled={!hasPrevPage}
                  onClick={onPreviousClick}
                >
                  <MdOutlineArrowLeft className="w-6 h-6" />
                </button>
              </li>
              <li style={{ maxWidth: "48px" }}>
                <div>
                  <label>
                    <input
                      type="number"
                      id="page"
                      value={pageIndex + 1}
                      onChange={handleChangePagination}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </label>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className={`${
                    hasNextPage ? "text-slate-500" : "text-gray-300"
                  } focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center`}
                  aria-label="next"
                  title="next"
                  disabled={!hasNextPage}
                  onClick={onNextClick}
                >
                  <MdOutlineArrowRight className="w-6 h-6" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`${
                    hasNextPage ? "text-slate-500" : "text-gray-300"
                  } focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center`}
                  aria-label="last"
                  title="last"
                  disabled={!hasNextPage}
                  onClick={onLastPageClick}
                >
                  <MdSkipNext className="w-6 h-6" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
