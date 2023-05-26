import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useColumnFilters,
  usePagination,
  useSorting,
  useTable,
} from "./useTable";
import Loader from "components/Loader";
import { useDefaultColumns } from "./columnDefinition";

import { TablePagination, Table } from "components/lib/ReactTable";

import { fetchAllFlags, fetchAllStatus } from "api/settings.api";
import { fetchAllPickPackOthers } from "api/inventory.api";
import CheckBox from "components/CheckBox";

const PickPackOtherListPage = () => {
  const pagination = usePagination();
  const columnFilters = useColumnFilters();
  const sorting = useSorting();
  const defaultData = useMemo(() => [], []);
  const defaultColumns = useDefaultColumns();
  const [checked, setChecked] = useState({
    shipped: false,
    consolidated: false,
  });
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

  const { data: statusData } = useQuery(["status"], fetchAllStatus);
  const { data: flagData } = useQuery(["flags"], fetchAllFlags);
  const { data, isFetching, isError, error } = useQuery({
    queryKey: [
      "pickPackOthersList",
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams(),
    ],
    queryFn: async () =>
      await fetchAllPickPackOthers(
        pagination?.pageIndex,
        pagination?.pageSize,
        queryParams()
      ),
    keepPreviousData: true,
    enabled: (!!statusData?.results && !!flagData?.results) ?? false,
  });

  // instantiate the table
  const table = useTable({
    data: data?.data ?? defaultData,
    defaultColumns,
    totalRows: data?.total ?? 0,
  });

  return (
    <>
      {isFetching && <Loader />}

      <div className="">
        <div className="flex flex-row justify-end gap-2">
          <div className="flex w-1/3 flex-row gap-2">
            <CheckBox
              {...{
                onChange: () => {
                  setChecked((prev) => ({
                    ...prev,
                    consolidated: !prev.consolidated,
                  }));
                },
                checked: checked.consolidated,
                label: "Include Consolidated Pick Ticket",
              }}
            />
            <CheckBox
              {...{
                onChange: () => {
                  setChecked((prev) => ({ ...prev, shipped: !prev.shipped }));
                },
                checked: checked.shipped,
                label: "Include Fully Shipped",
              }}
            />
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
        <Table
          table={table}
          isError={!isFetching && isError && data?.data?.length === 0}
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
          }}
          rowCount={data?.total ?? 0}
          onPreviousClick={() => {
            table.previousPage();
          }}
          onNextClick={() => {
            table.nextPage();
          }}
          onFirstPageClick={() => {
            table.setPageIndex(0);
          }}
          onLastPageClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
          }}
        />
      </div>
    </>
  );
};

export default PickPackOtherListPage;
