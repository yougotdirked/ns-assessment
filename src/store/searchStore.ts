import { create } from 'zustand';
import { IRequestBody } from '../models';

interface ISearchStore {
  searches: {name: string, body: IRequestBody, resultCount: number}[]
  addSearch: (body: IRequestBody, resultCount: number) => void
}

const store: ISearchStore = {
  searches: [],
  addSearch: (body: IRequestBody, resultCount: number) => {}
}

export const useSearchStore = create<ISearchStore>((set) => {
  return {
    ...store,
    addSearch: (body: IRequestBody, resultCount: number) => {
      const name = body.search;
      const searches = store.searches;
      searches.push({name, body, resultCount});
      set({searches});
    }
  }
})