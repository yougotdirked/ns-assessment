import { SearchParam, SortOption } from "../enums";

export interface IRequestBody {
  search: string,
  sort?: "stars" | "forks",
  stars?: number,
  language?: string,
  followers?: number,
  page?: number,
  maxCount?: number
}

export function toQueryString({search, sort, stars, language, followers, page, maxCount}: IRequestBody): string {
  //Rate limits maken het een beetje vreemd: max 100 per keer..
  //Todo: resultaten controleren
  const result = `?q=${search}+in:name+in:description+in:topics+in:readme`
    + (language ? `+language:${language}` : "")
    + (followers ? `+followers:>=${followers}` : "")
    + (page ? "&page=" + page : "")
    + (sort ? `&sort=${sort}` : "")
    + (`&per_page=${maxCount || 100}`)
  return result;
}