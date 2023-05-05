import { create } from "zustand";
import type { OnChangeFn, RowSelectionState } from "@tanstack/react-table";

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
      set((state) => ({
        ...state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        rowSelection: updater(state.rowSelection),
      }));
    },
  },
}));

export const useSelectedRow = () =>
  useSelectedRowStore((state) => state.rowSelection);
export const useSetRowSelection = () =>
  useSelectedRowStore((state) => state.actions.setRowSelection);
