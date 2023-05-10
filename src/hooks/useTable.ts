import { useEffect , useMemo } from "react";

import { create } from "zustand";
import {
  type ColumnFiltersState,
  type ColumnOrderState,
  type VisibilityState,
  type PaginationState,
  type ColumnPinningState,
  type OnChangeFn,
  type SortingState,
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

import { useSelectedRow, useSetRowSelection } from "./useSelectRow";

export type Updater<T> = (old: T) => T;
interface TableStateProps {
  columnOrder?: ColumnOrderState;
  pagination?: PaginationState;
  columnVisibility?: VisibilityState;
  columnPinning?: ColumnPinningState;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
}
interface TableState extends TableStateProps {
  actions: {
    setColumnVisibility: OnChangeFn<VisibilityState>;
    setColumnPinning: OnChangeFn<ColumnPinningState>;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
    setColumnOrder: OnChangeFn<ColumnOrderState>;
    setPagination: OnChangeFn<PaginationState>;
    setSorting: OnChangeFn<SortingState>;
    reset: () => void;
  };
}
const DEFAULT_PROPS: TableStateProps = {
  columnOrder: [],
  pagination: { pageIndex: 0, pageSize: 50 },
  columnVisibility: {},
  columnPinning: {},
  sorting: [],
  columnFilters: [],
};
export const useTableStore = create<TableState>()((set) => ({
  ...DEFAULT_PROPS,
  actions: {
    setColumnVisibility: (updater) => {
      set((state) => {
        if (typeof updater === "function") {
          return {
            columnVisibility: updater(
              state.columnVisibility as VisibilityState
            ),
          };
        } else {
          return {
            ...state,
            columnVisibility: updater,
          };
        }
      });
    },
    setColumnPinning: (updater) => {
      set((state) => {
        if (typeof updater === "function") {
          return {
            columnPinning: updater(state.columnPinning as ColumnPinningState),
          };
        } else {
          return {
            ...state,
            columnPinning: updater,
          };
        }
      });
    },
    setColumnFilters: (updater) => {
      set((state) => {
        if (typeof updater === "function") {
          return {
            columnFilters: updater(state.columnFilters as ColumnFiltersState),
          };
        } else {
          return {
            ...state,
            columnFilters: updater,
          };
        }
      });
    },
    setColumnOrder: (newOrder) => {
      set((state) => {
        if (newOrder instanceof Array) {
          return {
            ...state,
            columnOrder: newOrder,
          };
        } else {
          return {
            ...state,
            columnOrder: newOrder(state.columnOrder as ColumnOrderState),
          };
        }
      });
    },
    setPagination: (updater) => {
      set((state) => {
        if (typeof updater === "function") {
          return {
            ...state,
            pagination: updater(state.pagination as PaginationState),
          };
        } else {
          return {
            ...state,
            pagination: updater,
          };
        }
      });
    },
    setSorting: (updater) => {
      set((state) => {
        if (updater instanceof Array) {
          return {
            ...state,
            sorting: updater,
          };
        } else {
          return {
            ...state,
            sorting: updater(state.sorting as SortingState),
          };
        }
      });
    },
    reset: () => {
      set(DEFAULT_PROPS);
    },
  },
}));

export const useColumnOrder = () => useTableStore((state) => state.columnOrder);
export const usePagination = () => useTableStore((state) => state.pagination);
export const useColumnVisibility = () =>
  useTableStore((state) => state.columnVisibility);
export const useColumnPinning = () =>
  useTableStore((state) => state.columnPinning);
export const useColumnFilters = () =>
  useTableStore((state) => state.columnFilters);
export const useSorting = () => useTableStore((state) => state.sorting);
export const useTableActions = () => useTableStore((state) => state.actions);

interface ReactTableProps<P> {
  defaultColumns: Array<ColumnDef<P>>;
  totalRows: number;
  data: P[];
}

export const useTable = <P>({
  defaultColumns,
  data,
  totalRows,
}: ReactTableProps<P>) => {
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
      reset,
    },
  } = useTableStore((state) => state);
  const defaultData = useMemo(() => [], []);
  const rowSelection = useSelectedRow();
  const setRowSelection = useSetRowSelection();
  useEffect(
    () => () => {
      reset();
    },
    []
  );
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
      rowSelection,
    },
    columnResizeMode: "onChange",
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnFiltersChange: (updater) => {
      setColumnFilters(updater);
    },
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    // debugTable: true,
    manualPagination: true,
    manualFiltering: true,
  });
  return table;
};
