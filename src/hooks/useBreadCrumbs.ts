import { create } from "zustand";

export const breadCrumbsArrayStore = create<{
  breadCrumbsArray: [] | null;
  setBreadCrumbsArray: (breadCrumbsArray: [] | null) => void;
}>()((set) => ({
  breadCrumbsArray: [],
  setBreadCrumbsArray: (breadCrumbsArray) => {
    set({ breadCrumbsArray });
  },
}));
