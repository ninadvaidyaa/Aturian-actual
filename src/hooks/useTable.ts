import { create } from "zustand";
import type {
  ColumnFiltersState,
  ColumnSort,
  ColumnOrderState,
  VisibilityState,
  PaginationState,
  ColumnPinningState,
  OnChangeFn,
  SortingState,
} from "@tanstack/react-table";

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
    reset: ()=> void
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
      set((state) => ({
        ...state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        columnVisibility: updater(state.columnVisibility as VisibilityState),
      }));
    },
    setColumnPinning: (updater) => {
      set((state) => ({
        ...state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        columnPinning: updater(state.columnPinning as ColumnPinningState),
      }));
    },
    setColumnFilters: (updater) => {
      set((state) => ({
        ...state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        columnFilters: updater(state.columnFilters as ColumnFiltersState),
      }));
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
      set((state) => ({
        ...state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        pagination: updater(state.pagination as PaginationState),
      }));
    },
    setSorting: (updater) => {
      set((state) => ({
        ...state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        sorting: updater(state.sorting as ColumnSort[]),
      }));
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
