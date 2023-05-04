import { useState, Fragment } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { MdOutlineCheck, MdOutlineExpandMore } from "react-icons/md";

import { useTableStore } from "hooks/useTable";
import { type UserViews } from "validators/orders.validators";

const ViewSelector = ({ views }: { views: UserViews }) => {
  const [view, setView] = useState("");
  const { setColumnOrder } = useTableStore((state) => state.actions);
  const handleChange = (val: string) => {
    setView(val);
    setColumnOrder(views[val].columns.map((e) => e.id));
  };
  return (
    <div className="w-28 mb-1">
      <Listbox
        defaultValue={views?.[0]?.name}
        value={view}
        onChange={handleChange}
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-sm bg-white py-1 pl-1 pr-8 text-left focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300">
            <span className="block truncate min-h-[20px]">{view}</span>
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
            <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.keys(views).map((objKey) => (
                <Listbox.Option
                  key={objKey}
                  value={objKey}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-slate-100 text-gray-900" : "text-gray-900"
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
                        {views[objKey].name}
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
  );
};

export default ViewSelector;
