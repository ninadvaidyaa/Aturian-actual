import { useMemo, useEffect,  useState, Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchPickListInventory } from "api/inventory.api";
import Loader from "components/Loader";

import { defaultColumns } from "./columnDefinition";
import {
  useColumnFilters,
  usePagination,
  useSorting,
  useTable,
  useTableActions,
} from "hooks/useTable";
import { useSetRowSelection } from "hooks/useSelectRow";

import {
  TablePagination,
  Table,
} from "components/lib/ReactTable";
import { fetchAllFlags, fetchAllStatus } from "api/settings.api";
import { INVENTORY_GET_PICKPACK_LIST_API } from "constants/api.constants";

import { Listbox, Transition } from "@headlessui/react";
import { MdOutlineCheck, MdOutlineExpandMore } from "react-icons/md";
import CheckBox from "components/CheckBox";

const PickListInventoryPage = () => {
  const pagination = usePagination();
  const tableActions = useTableActions();
  const columnFilters = useColumnFilters();
  const sorting = useSorting();
  const setRowSelection = useSetRowSelection();

  const defaultData = useMemo(() => [], []);

  useEffect(
    () => () => {
      tableActions.reset();
    },
    []
  );

  const queryParams = () => {
    let params = "";
    let sortParam = "";
    if (sorting && sorting?.length > 0) {
      // id, desc
      sorting?.forEach((s) => {
        if (s.desc) {
          sortParam += `sort[by]=${s.id}&sort[direction]=desc`;
        } else {
          sortParam += `sort[by]=${s.id}&sort[direction]=asc`;
        }
      });
    }
    let filterParams = "";
    columnFilters?.forEach((column) => {
      if (column.value && typeof column.value === "string") {
        const values = column.value
          .split("|")
          .filter((v) => v !== "")
          .join(",");

        if (values !== "") filterParams += `filters[${column.id}]=${values}`;
      }
    });
    params = sortParam + "&" + filterParams;
    if (params[params.length - 1] === "&") {
      params = params.slice(0, -1);
    }
    if (params[0] === "&") {
      params = params.slice(1, params.length);
    }
    return params;
  };
  const { data:statusData, } = useQuery(["status"], fetchAllStatus);
  const { data:flagData } = useQuery(["flags"], fetchAllFlags);
  
  const { data, isFetching, isError, error } = useQuery({
    queryKey: [
      INVENTORY_GET_PICKPACK_LIST_API,
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams(),
    ],
    queryFn: async () =>
      await fetchPickListInventory(
        pagination?.pageIndex,
        pagination?.pageSize,
        queryParams()
      ),
    keepPreviousData: true,
    enabled: (!!statusData?.results && !!flagData?.results) ?? false ,
  });

  // instantiate the table
  const table = useTable({
    data: data?.data ?? defaultData,
    defaultColumns,
    totalRows: data?.results ?? 0,
  });

  const [checked, setChecked] = useState(false);

  return (
    <>
      {isFetching && <Loader />}
      <div className="flex flex-row gap-2">
        <Selector objArr={warehouses} />
        <Selector objArr={shipStation} />
        <div className="flex flex-row gap-2">
        <CheckBox {...{onChange: () => {setChecked(prev => !prev );}, checked, label:"Include Consolidated Pick Ticket" }} />
        <CheckBox {...{onChange: () => {setChecked(prev => !prev );}, checked, label:"Include Fully Shipped" }} />  
        </div>
        <div>
        <button
              type="button"
              className="mr-2 inline-flex items-center justify-center rounded-lg bg-skin-fill px-3 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-slate-50 hover:bg-skin-fill"
            >
              <i className="fal fa-print -ml-1 mr-2 "></i>
              Print
            </button>
        </div>
      </div>
      
      <div className="">
        <Table
          table={table}
          isError={isError}
          error={error}
        />
        <TablePagination
          pageSize={table.getState().pagination.pageSize}
          pageIndex={table.getState().pagination.pageIndex}
          hasNextPage={table.getCanNextPage()}
          hasPrevPage={table.getCanPreviousPage()}
          setPageSize={(newSize: number) => {
            table.setPageSize(newSize);
          }}
          gotoPage={(n: number) => {
            table.setPageIndex(n);
            setRowSelection({});
          }}
          rowCount={data?.results ?? 0}
          onPreviousClick={() => {
            table.previousPage();
            setRowSelection({});
          }}
          onNextClick={() => {
            table.nextPage();
            setRowSelection({});
          }}
          onFirstPageClick={() => {
            table.setPageIndex(0);
            setRowSelection({});
          }}
          onLastPageClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
            setRowSelection({});
          }}
        />
      </div>
    </>
  );

};

const warehouses = [
  { name: 'All Warehouses' },
  { name: 'WH-Chicago' },
  { name: 'WH-Indiana' },
  { name: 'Vendor - Release Program' },  
];

const shipStation = [
  { name: 'ShipStation-1' },
  { name: 'ShipStation-2' },
  { name: 'ShipStation-3' },
  { name: 'ShipStation-4' },  
];

const Selector = ({objArr}: {objArr: Array<Record<string, string>>}) => {

  const [selected, setSelected] = useState(objArr[0].name);
  
  return (
  <div className="mb-1 w-72">
  <Listbox 
    value={selected}
    onChange={setSelected}
  >
    <div className="relative mt-1">
      <Listbox.Button className="relative w-full cursor-default rounded-sm bg-white py-1 pl-1 pr-8 text-left focus:outline-none focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300">
        <span className="block min-h-[20px] truncate">{selected}</span>
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
        <Listbox.Options className="absolute z-30  mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {objArr.map((item) => (
            <Listbox.Option
              key={item.name}
              value={item.name}
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
                    {item.name}
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

export default PickListInventoryPage;
