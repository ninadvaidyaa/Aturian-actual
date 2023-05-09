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

export const useSelectedRow = () =>
  useSelectedRowStore((state) => state.rowSelection);
export const useSetRowSelection = () =>
  useSelectedRowStore((state) => state.actions.setRowSelection);
