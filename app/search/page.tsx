'use client'

import SearchBar from "@/components/searchbar";
import Table from "@/components/table";
import { ISearchResults } from "@/src/models/searchResults";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<ISearchResults>();

  const labelCols = [{
    label: "Repository Name",
    col: "name"},
    {
      label: "Programming Language",
      col: "language"
    },
    {
      label: "Stars",
      col: "stargazers_count"
    }, 
    { 
      label: "Forks",
      col: "forks"
    }];

  const changePage = (input: -1 | 1) => {
    if ((page + input) >= 1 && (searchResults && (page + input <= Math.ceil(searchResults?.count / 100)))) {
      setPage(page + input);
    }
  }

  return (
    	<div className="flex flex-col w-full">
      <h1 className="text-xl mb-3">Search Github Repositories</h1>
      <p className="mb-5">
        Dit is mijn React Assessment opdracht voor de NS. Ik heb gekozen om het met NextJS te maken. De voertaal van de inhoud van de pagina is Engels
        Ik heb het een beetje functie boven vorm gehouden vanwege tijd, en het project minimaal te houden qua plugins.
        Er wordt gebruik gemaakt van tailwind en voor het opslaan van de searches gebruik ik zustand. 
      </p>
      <p>
        Qua techniek heb ik ervoor gekozen om zoveel mogelijk te laten doen door de API. Van pagina wisselen doet nu bijvoorbeeld een nieuwe API call.
      </p>
      <p className="mb-5">
        Hypothetische doorontwikkeling zou dingen als pictogrammen toevoegen en de styling verhelderen. De GitHub API biedt ook nog meer zoekmethodes die buiten scope waren voor de opdracht.
      </p>
      <p className="mb-5">
        Je kan zoeken met de zoekbalk, en de knop Additonal Options geeft meer sorteer en filterfuncties. Bovenin kan je van pagina wisselen. Onderaan de tabel kan je bladeren.
      </p>
      <SearchBar resetPagination={() => setPage(1)} page={page} setSearchResults={(results) => setSearchResults(results)}/>
      <Table title={"Results"} data={searchResults?.repositories} labelCols={labelCols}/>
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
