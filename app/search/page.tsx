'use client'

import SearchBar from "@/components/searchbar";
import Table from "@/components/table";
import { ISearchResults } from "@/src/models/searchResults";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<ISearchResults>();

  const changePage = (input: -1 | 1) => {
    if ((page + input) >= 1 && (searchResults && (page + input <= Math.ceil(searchResults?.count / 100)))) {
      setPage(page + input);
    }
  }

  return ( <div className="flex flex-col w-full">
      <h1>Search Github Repositories</h1>
      <SearchBar resetPagination={() => setPage(1)} page={page} setSearchResults={(results) => setSearchResults(results)}/>
      <Table title={"Results"} data={searchResults?.repositories}/>
      {
        searchResults && <div className="flex gap-2 p-3">
          <button onClick={() => changePage(-1)}>
            Previous
          </button>
          {/* todo: page input field */}
            <div>{page} / {Math.ceil(searchResults?.count / 10)}</div>
          <button onClick={() => changePage(1)}>
            Next
          </button>
        </div>
      }
    </div>
  )
}
