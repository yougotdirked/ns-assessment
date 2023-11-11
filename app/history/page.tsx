'use client'

import Table from "@/components/table";
import { IRequestBody } from "@/src/models";
import { ISearchResults } from "@/src/models/searchResults";
import { useSearchStore } from "@/src/store/searchStore"
import { useState } from "react";

export default function Page() {
  const [searchResults, setSearchResults] = useState<ISearchResults>();

  const store = useSearchStore();
  const searchListCols = ["name", "resultCount"];
  const resultListCols = ["name", "forks"];

  const searchWithParams = async (requestBody: IRequestBody) => {
    requestBody.maxCount = 10;
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
      setSearchResults(searchResult);
    }
  }

  return (
    <div className="flex flex-col w-full">
        <h1>Search History</h1>
        <Table title={"Last 10 searches"} data={store.searches} cols={searchListCols} onRowClick={(e, rowData) => searchWithParams(rowData.body)}/>
        <Table title={"Results"} data={searchResults?.repositories} cols={resultListCols}/>
    </div>
      
  )
}