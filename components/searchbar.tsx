'use client'

import { SortOption, SearchParam } from "@/src/enums";
import { ISearchResults } from "@/src/models/searchResults";
import { useCallback, useEffect, useState } from "react"

interface ISearchBarProps {
  sort?: SortOption,
  searchParams?: SearchParam[],
  page?: number,
  setSearchResults: (results: ISearchResults) => void,
  resetPagination: () => void
}

export default function SearchBar({page = 1, ...props}: ISearchBarProps) {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchBehaviour = async () => {
    await doSearch();
  }

  const doSearch = useCallback(async () => {
    const requestBody = {
      search: search,
      sort: props.sort,
      searchParams: props.searchParams,
      page: page
    }

    if (search.length >= 3) {
      console.log("searching...")
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        });
        const result = await response.json();
        if (response.status != 200) {
          console.error()
        }
        else {
          const searchResult: ISearchResults = {
            count: result.total_count,
            repositories: result.items
          }
          props.setSearchResults(searchResult);
        }
      }
    }, [page, props, search])

  useEffect(() => {
    if (page !== currentPage) {
      doSearch();
      setCurrentPage(page);
    }
  }, [currentPage, doSearch, page])


  return (
    <div className={"p-2 bg-blue-200 rounded-2xl overflow-hidden flex"}>
      <form onSubmit={(e) => e.preventDefault()} className="flex w-full focus:outline-2 focus:outline-blue">
        <input className="rounded-l-lg pl-4 w-1/2" placeholder="Search!" onChange={(e) => setSearch(e.target.value)}></input>
        {/* Ik heb op de button de disabled css laten staan maar gekozen om een statusmessage te laten zien vanwege accessibility issues*/}
        <button type="submit" className="rounded-r-lg bg-blue-400 p-2 px-5 hover:bg-blue-800 hover:text-white hover:cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed" onClick={searchBehaviour}>Search</button>
      </form>
    </div>
  )
}
  