import { Fragment, useMemo, lazy } from "react";
import Loadable from "components/Loadable";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
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
import TableHeader from "./ReactTableHeader";
import { useTableContext } from "contexts/TableContext";
import ScrollX from "components/ScrollX";
import TablePageHeader from "components/TablePageHeader";
import EmptyTable from "./EmptyTable";

const TablePagination = Loadable(
  lazy(async () => await import("./TablePagination"))
);

interface ReactTableProps<P> {
  defaultColumns: Array<ColumnDef<P>>;
  totalRows: number;
  data: P[];
  size: "small" | "medium";
}

const ReactTable = <M,>({
  defaultColumns,
  data,
  totalRows,
  size = "medium",
}: ReactTableProps<M>) => {
  const columns = useMemo(() => [...defaultColumns], []);
  const {
    columnOrder,
    pagination,
    columnVisibility,
    columnPinning,
    sorting,
    columnFilters,
    setColumnOrder,
    setColumnFilters,
    setPagination,
    setColumnVisibility,
    setColumnPinning,
    setSorting,
  } = useTableContext((state) => state);

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
    <Fragment>
      <TablePageHeader table={table} />

      <Paper
        elevation={0}
        sx={{ padding: "8px" }}
      >
        <ScrollX
          style={{
            maxHeight: "500px",
          }}
        >
          {/* <TableContainer> */}
          <Table
            size={size}
            stickyHeader={true}
          >
            <TableHeader table={table} />
            {data.length ? <ReactTableBody table={table} /> :<EmptyTable msg="No data" colSpan={table.getAllLeafColumns().length} />} 
    
          </Table>
          {/* </TableContainer> */}
        </ScrollX>
      </Paper>
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
    </Fragment>
  );
};

export default ReactTable;
