import { create } from "zustand";

export const menuStore = create<{
  openItem: string[];
  selectedID: string;
  drawerOpen: boolean;
  setActiveItem: (openItem: []) => void;
  openDrawer: (drawerOpen: boolean) => void;
  activeID: (selectedID: string) => void;
}>()((set) => ({
  openItem: ["order-list"],
  drawerOpen: true,
  selectedID: "",
  setActiveItem: (openItem) => {
    set({ openItem });
  },
  openDrawer: (drawerOpen) => {
    set({ drawerOpen });
  },
  activeID: (selectedID) => {
    set({ selectedID });
  },
}));
