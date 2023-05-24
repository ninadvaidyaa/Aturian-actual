import { useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchAllOrders } from "api/order.api";
import Loader from "components/Loader";

import { defaultColumns, views } from "./columnDefinition";
import {
  useColumnFilters,
  usePagination,
  useSorting,
  useTable,
  useTableActions,
} from "hooks/useTable";
import { useSetRowSelection } from "hooks/useSelectRow";

import TablePageHeader from "components/TablePageHeader";

import {
  ViewSelector,
  TablePagination,
  Table,
} from "components/lib/ReactTable";
import { fetchAllFlags, fetchAllStatus } from "api/settings.api";

const OrderPageComponent = () => {
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
      "ordersList",
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams(),
    ],
    queryFn: async () =>
      await fetchAllOrders(
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

  return (
    <>
      {isFetching && <Loader />}

      <div className="">
        <TablePageHeader
          title={"Orders"}
          table={table}
        />
        <ViewSelector views={views} />
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

export default OrderPageComponent;
