import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useColumnFilters,
  usePagination,
  useSelectedRowIds,
  useSetRowSelection,
  useSorting,
  useTable,
  useTableActions,
} from "./useTable";
import Loader from "components/Loader";
import { useDefaultColumns, views } from "./columnDefinition";

import TablePageHeader from "components/TablePageHeader";
import {
  ViewSelector,
  TablePagination,
  Table,
} from "components/lib/ReactTable";

import { fetchAllFlags, fetchAllStatus } from "api/settings.api";

import { fetchAllPrebillsItems } from "api/invoice.api";

const ManagePrebillsPage = () => {
  const pagination = usePagination();
  const columnFilters = useColumnFilters();
  const sorting = useSorting();
  const defaultData = useMemo(() => [], []);
  const defaultColumns = useDefaultColumns();
  const { setColumnOrder } = useTableActions();
  const setRowSelection = useSetRowSelection();
  const selectRowIds = useSelectedRowIds();
  useEffect(() => {
    setColumnOrder(views.view1.columns.map((c) => c.id));
  }, []);

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
      "managePrebillList",
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams(),
    ],
    queryFn: async () =>
      await fetchAllPrebillsItems(
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

  useEffect(() => {
    const { rows } = table.getRowModel();
    if (selectRowIds.size > 0 && table?.getState()) {
      const selectedRows: Record<string, boolean> = {};
      rows.forEach((r) => {
        if (selectRowIds.has(r.original.invoiceNum)) {
          selectedRows[r.id] = true;
        }
      });
      setRowSelection(selectedRows);
    }
    return () => {
      setRowSelection({});
    };
  }, [pagination?.pageIndex, data?.data]);
  return (
    <>
      {isFetching && <Loader />}

      <div className="">
        <TablePageHeader
          title={"Prebills"}
          table={table}
        />
        <ViewSelector
          views={views}
          setColumnOrder={setColumnOrder}
        />
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
            setRowSelection({});
          }}
          rowCount={data?.total ?? 0}
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

export default ManagePrebillsPage;
