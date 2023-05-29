import { useEffect, useMemo } from "react";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import type {
  ColumnFiltersState,
  ColumnOrderState,
  VisibilityState,
  PaginationState,
  ColumnPinningState,
  OnChangeFn,
  SortingState,
  ColumnDef,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { type OrdersList } from "validators/orders.validators";
import { listPageSize } from "constants/column.dataTypes";

interface SelectedRowProps {
  rowSelection?: RowSelectionState;
  actions: {
    setRowSelection: OnChangeFn<RowSelectionState>;
  };
}

const useSelectedRowStore = create<SelectedRowProps>()((set) => ({
  rowSelection: {},
  actions: {
    setRowSelection: (updater) => {
      set((state) => {
        if (typeof updater === "function") {
          return {
            rowSelection: updater(state.rowSelection as RowSelectionState),
          };
        } else {
          return {
            ...state,
            rowSelection: updater,
          };
        }
      });
    },
  },
}));

export const useRowSelection = () =>
  useSelectedRowStore((state) => state.rowSelection);
export const useSetRowSelection = () =>
  useSelectedRowStore((state) => state.actions.setRowSelection);

interface SelectedRowIDProps {
  ids: Set<string | number>;
  actions: {
    setRowIds: (rowId: string | number) => void;
    setAll: (rowIds: string[] | number[]) => void;
    resetAll: () => void;
  };
}
const useSelectedRowIdStore = create<SelectedRowIDProps>()((set) => ({
  ids: new Set<string | number>(),
  actions: {
    setRowIds: (rowId: string | number) => {
      set((state) => {
        if (state.ids.has(rowId)) {
          const old = state.ids;
          old.delete(rowId);

          return {
            ids: new Set(old),
          };
        } else {
          const old = state.ids;
          old.add(rowId);
          return {
            ids: new Set(old),
          };
        }
      });
    },
    setAll: (rowIds: string[] | number[]) => {
      set((state) => ({
        ids: new Set<string | number>(rowIds),
      }));
    },
    resetAll: () => {
      set((state) => ({
        ids: new Set(),
      }));
    },
  },
}));

export const useSelectedRowIds = () =>
  useSelectedRowIdStore((state) => state.ids);
export const selectedRowIdActions = () =>
  useSelectedRowIdStore((state) => state.actions);

export type Updater<T> = (old: T) => T;
export interface TableStateProps<TData> {
  columnOrder?: ColumnOrderState;
  pagination?: PaginationState;
  columnVisibility?: VisibilityState;
  columnPinning?: ColumnPinningState;
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  selectedRows: Partial<TData>;
}
interface TableState<TData> extends TableStateProps<TData> {
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
const DEFAULT_PROPS: TableStateProps<OrdersList> = {
  columnOrder: [],
  pagination: { pageIndex: 0, pageSize: listPageSize },
  columnVisibility: {},
  columnPinning: {},
  sorting: [],
  columnFilters: [],
  selectedRows: {},
};
export const useTableStore = create<TableState<OrdersList>>()((set) => ({
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

export const useColumnOrder = () =>
  useTableStore((state) => state.columnOrder, shallow);
export const usePagination = () =>
  useTableStore((state) => state.pagination, shallow);
export const useColumnVisibility = () =>
  useTableStore((state) => state.columnVisibility, shallow);
export const useColumnPinning = () =>
  useTableStore((state) => state.columnPinning, shallow);
export const useColumnFilters = () =>
  useTableStore((state) => state.columnFilters, shallow);
export const useSorting = () =>
  useTableStore((state) => state.sorting, shallow);
export const useTableActions = () => useTableStore((state) => state.actions);

export const useSelectedRows = () =>
  useTableStore((state) => state.selectedRows);

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
  const rowSelection = useRowSelection();
  const setRowSelection = useSetRowSelection();
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
    onPaginationChange: (updater) => {
      setPagination(updater);
      setRowSelection({});
    },
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
