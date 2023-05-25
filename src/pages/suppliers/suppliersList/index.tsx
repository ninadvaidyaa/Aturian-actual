import { useEffect, useMemo } from "react";

import { fetchAllSuppliers } from "api/supplier.api";
import { useDefaultColumns, views } from "./columnDefinition";
import {
  useColumnFilters,
  usePagination,
  useSorting,
  useTable,
  useTableActions,
  useSetRowSelection,
  useSelectedRowIds,
} from "./useTable";
import Loader from "components/Loader";
import { useQuery } from "@tanstack/react-query";
import TablePageHeader from "components/TablePageHeader";
import {
  Table,
  TablePagination,
  ViewSelector,
} from "components/lib/ReactTable";

const SupplierPage = () => {
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

        if (values !== "") {
          const filterKey = column.id.split("-");
          if (filterKey.length > 1) {
            filterParams =
              filterParams + filterParams !== ""
                ? `&filters[${filterKey[0]}][${filterKey[1]}]=${values}`
                : `&filters[${filterKey[0]}][${filterKey[1]}]=${values}`;
          } else {
            filterParams =
              filterParams + filterParams !== ""
                ? `filters[${column.id}]=${values}`
                : `filters[${column.id}]=${values}`;
          }
        }
      }
    });
    params = sortParam;
    params = params !== "" ? params + filterParams : filterParams;
    if (params[params.length - 1] === "&") {
      params = params.slice(0, -1);
    }
    if (params[0] === "&") {
      params = params.slice(1, params.length);
    }
    return params;
  };
  const { data, isError, isFetching, error } = useQuery({
    queryKey: [
      "suppliers",
      pagination?.pageIndex,
      pagination?.pageSize,
      queryParams(),
    ],
    queryFn: async () =>
      await fetchAllSuppliers(
        pagination?.pageIndex,
        pagination?.pageSize,
        queryParams()
      ),
    keepPreviousData: true,
  });
  // instantiate the table
  const table = useTable({
    data: data?.data ?? defaultData,
    defaultColumns,
    totalRows: data?.results ?? 0,
  });

  useEffect(() => {
    const { rows } = table.getRowModel();
    if (selectRowIds.size > 0 && table?.getState()) {
      const selectedRows: Record<string, boolean> = {};
      rows.forEach((r) => {
        if (selectRowIds.has(r.original.number)) {
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
          title={"Vendor"}
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

export default SupplierPage;
