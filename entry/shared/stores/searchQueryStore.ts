import { create } from "zustand";

type useSearchQueryData = {
  query: string;
  setQuery: (queryValue: string) => void;
};
export const useSearchQueryData = create<useSearchQueryData>((set) => ({
  query: "",
  setQuery: (queryValue) => set({ query: queryValue }),
}));
