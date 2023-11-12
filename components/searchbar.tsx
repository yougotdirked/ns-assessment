'use client'

import { SortOption, SearchParam } from "@/src/enums";
import { ISearchResults } from "@/src/models/searchResults";
import { useSearchStore } from "@/src/store/searchStore";
import { useCallback, useEffect, useState } from "react"

interface ISearchBarProps {
  page?: number,
  setSearchResults: (results: ISearchResults) => void,
  resetPagination: () => void
}

export default function SearchBar({page = 1, ...props}: ISearchBarProps) {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [followers, setFollowers] = useState<number>();
  const [stars, setStars] = useState<number>();
  const [language, setLanguage] = useState<string>();
  const [menuState, setMenuState] = useState<boolean>(false);
  const [sort, setSort] = useState<"stars" | "forks">();

  const store = useSearchStore();

  const searchBehaviour = async () => {
    await doSearch();
    setCurrentPage(1);
    
    props.resetPagination();
  }

  const menuBehaviour = () => {
    setMenuState(!menuState);
  }

  const doSearch = useCallback(async () => {
    const requestBody = {
      search: search,
      sort: sort,
      stars: stars,
      language: language,
      followers: followers,
      page: page
    }

    if (search.length >= 3) {
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
          store.addSearch(requestBody, result.total_count);
          props.setSearchResults(searchResult);
        }
      }
      setMenuState(false);
    }, [followers, language, page, props, search, sort, stars, store])

  useEffect(() => {
    if (page !== currentPage) {
      doSearch();
      setCurrentPage(page);
    }
  }, [currentPage, doSearch, page])

  return (
    <div className={"p-2 bg-blue-200 rounded-2xl flex"}>
      <form onSubmit={(e) => e.preventDefault()} className="flex w-full focus:outline-2 focus:outline-blue">
        <div className="flex-3 grow">
          <div className="flex w-full content-center">
          <input className="rounded-l-lg pl-4 w-1/2" placeholder="Search!" onChange={(e) => setSearch(e.target.value)}></input>
          {/* Ik heb op de button de disabled css laten staan maar gekozen om een statusmessage te laten zien vanwege accessibility issues*/}
          <button type="submit" className="rounded-r-lg bg-blue-400 px-5 hover:bg-blue-800 hover:text-white hover:cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed" 
            onClick={searchBehaviour}>
              Search
          </button>
          </div>
        </div>
        <div className="flex-1 grow relative flex">
        <button type="button"  className="ml-auto rounded-lg bg-blue-400 px-5 hover:bg-blue-800 hover:text-white hover:cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed" onClick={menuBehaviour}>
          Additional Options
        </button>
          <div className={`bg-gray-400 rounded-lg top-[110%] right-0 absolute flex flex-col overflow-hidden ${!menuState ? "h-[0px]" : "h-auto p-5"}`} >
            <div className="flex flex-col gap-2">
              <div className="flex"><label className="flex pr-2 mr-auto">Followers:</label><input className="pl-4" placeholder="Followers" onChange={(e) => setFollowers(Number.parseInt(e.target.value))}></input></div>
              <div className="flex"><label className="flex pr-2 mr-auto">Stars: </label><input className="pl-4" placeholder="Stars" onChange={(e) => setStars(Number.parseInt(e.target.value))}></input></div>
              <div className="flex"><label className="flex pr-2 mr-auto">Language: </label><input className="pl-4 w-1/2" placeholder="Language" onChange={(e) => setLanguage(e.target.value)}></input></div>
            </div>
            Sorting: {sort}
            <div className="flex gap-2">
              <button className={`rounded-lg bg-blue-400 px-5 hover:bg-blue-800 hover:text-white hover:cursor-pointer ${sort==="stars" && "bg-white"}`} onClick={() => setSort("stars")}>Stars</button>
              <button className={`rounded-lg bg-blue-400 px-5 hover:bg-blue-800 hover:text-white hover:cursor-pointer ${sort==="forks" && "bg-white"}`} onClick={() => setSort("forks")}>Forks</button>
              <button className={`rounded-lg bg-blue-400 px-5 hover:bg-blue-800 hover:text-white hover:cursor-pointer ${!sort && "bg-white"}`} onClick={() => setSort(undefined)}>None</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
  