import { create } from 'zustand';

interface ISearchStore {
  searches: any[]
  addSearch: (search: any) => void
}

const store: ISearchStore = {
  searches: [],
  addSearch: (search: any) => {}
}

export const useSearchStore = create<ISearchStore>((set) => {
  return {
    ...store,
    addSearch: (search: any) => {
      const newSearchList = [search, ...store.searches];
      set({ searches: newSearchList })
    }
  }
})