import { useMemo, lazy, Fragment } from "react";
import Loadable from "components/Loadable";

import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,

} from "@tanstack/react-table";

import ReactTableBody from "./TableBody";
import TablePageHeader from "components/TablePageHeader";
import EmptyTable from "./EmptyTable";
import { useTableStore } from "hooks/useTable";
import ViewSelector from "./ViewSelector";
import { views } from "pages/orders/columnDefinition";
import DraggableColumnHeader from "./ColumnHeader";
import Filter from "./ColumnFilter";
import ScrollX from "components/ScrollX";

const TablePagination = Loadable(
  lazy(async () => await import("./TablePagination"))
);

interface ReactTableProps<P> {
  defaultColumns: Array<ColumnDef<P>>;
  totalRows: number;
  data: P[];
  size: "small" | "medium";
  title: string
}

const ReactTable = <M,>({
  defaultColumns,
  data,
  totalRows,
  size = "medium",
  title
}: ReactTableProps<M>) => {
  const columns = useMemo(() => [...defaultColumns], []);

  const {
    columnOrder,
    pagination,
    columnVisibility,
    columnPinning,
    sorting,
    columnFilters,
    actions: {
      setColumnOrder,
      setColumnFilters,
      setPagination,
      setColumnVisibility,
      setColumnPinning,
      setSorting,
    },
  } = useTableStore((state) => state);

  const defaultData = useMemo(() => [], []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    pageCount: Math.ceil(totalRows / (pagination?.pageSize as number)),
    state: {
      columnOrder,
      pagination,
      columnVisibility,
      columnPinning,
      sorting,
      columnFilters,
    },
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    // debugTable: true,
    manualPagination: true,
    manualFiltering: true,
  });

  return (
    <div className="">
      <TablePageHeader
        title={title}
        table={table}
      />
      <ViewSelector views={views} />
      <div className="p-2 bg-white rounded-sm">
        <ScrollX className="h-[calc(100vh_-_270px)] relative overflow-auto rounded-sm">
          <table
            className="table-fixed"
            style={{ width: table.getCenterTotalSize() }}
          >
            <thead className="sticky top-0 capitalize bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <Fragment key={headerGroup.id}>
                  <tr key={`${headerGroup.id}-name`}>
                    {headerGroup.headers.map((header) => (
                      <DraggableColumnHeader
                        key={header.id}
                        header={header}
                        table={table}
                      />
                    ))}
                  </tr>
                  <tr key={`${headerGroup.id}-filter`}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="overflow-hidden text-ellipsis whitespace-nowrap px-1 py-2 text-left font-normal"
                        key={header.id}
                        colSpan={header.colSpan}
                      >
                        {header.column.getCanFilter() ? (
                          <Filter
                            key={header.id}
                            column={header.column}
                          />
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </Fragment>
              ))}
            </thead>
            {data.length ? (
              <ReactTableBody table={table} />
            ) : (
              <EmptyTable
                msg="No Records Available"
                colSpan={table.getAllLeafColumns().length}
              />
            )}
          </table>
        </ScrollX>
      </div>
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
        rowCount={totalRows}
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
  );
};

export default ReactTable;