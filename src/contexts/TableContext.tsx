import { createStore, useStore } from "zustand";
import { useRef, createContext, useContext } from "react";
import type {
  ColumnFiltersState,
  ColumnSort,
  ColumnOrderState,
  VisibilityState,
  PaginationState,
  ColumnPinningState,
  ColumnDef,
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
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setColumnPinning: OnChangeFn<ColumnPinningState>;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setColumnOrder: OnChangeFn<ColumnOrderState>;
  setPagination: OnChangeFn<PaginationState>;
  setSorting: OnChangeFn<SortingState>;
}

const createTableStore = (initProps?: Partial<TableStateProps>) => {
  const DEFAULT_PROPS: TableStateProps = {
    columnOrder: [],
    pagination: { pageIndex: 0, pageSize: 5 },
    columnVisibility: {},
    columnPinning: {},
    sorting: [],
    columnFilters: [],
  };
  return createStore<TableState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
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
  }));
};

type TableStore = ReturnType<typeof createTableStore>;

type TableProviderProps = React.PropsWithChildren<TableStateProps>;

const TableContext = createContext<TableStore | null>(null);

export const TableProvider = <P,>({
  columns,
  children,
}: TableProviderProps & {
  columns: Array<ColumnDef<P>>;
}) => {
  const storeRef = useRef<TableStore>();
  if (!storeRef.current) {
    const props = {
      columnOrder: columns.map((col) => col.id as string),
      pagination: { pageIndex: 0, pageSize: 5 },
      columnVisibility: {},
      columnPinning: {},
      sorting: [],
      columnFilters: [],
    };
    storeRef.current = createTableStore(props);
  }
  return (
    <TableContext.Provider value={storeRef.current}>
      {children}
    </TableContext.Provider>
  );
};

export function useTableContext<T>(
  selector: (state: TableState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T {
  const store = useContext(TableContext);
  if (!store) throw new Error("Missing TableContext.Provider in the tree");
  return useStore(store, selector, equalityFn);
}
