import { create } from "zustand";

type PageStoreData = {
  title: string;
};

type PageStoreActions = {
  setTitle: (newTitle: string) => void;
};

type PageStore = PageStoreData & PageStoreActions;

const INITIAL_PAGE_STORE_DATA: PageStoreData = {
  title: "",
};

export const usePageStore = create<PageStore>((set) => ({
  ...INITIAL_PAGE_STORE_DATA,
  setTitle: (newTitle: string) => set(() => ({ title: newTitle })),
}));
