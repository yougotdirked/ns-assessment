import { SearchParam, SortOption } from "../enums";

export interface IRequestBody {
  search: string,
  sort?: SortOption,
  searchParams?: SearchParam[]
  page?: number
}

export function toQueryString(requestBody: IRequestBody): string {
  //Rate limits maken het een beetje vreemd: max 100 per keer..
  const result = `?q=${requestBody.search}`
    + `${requestBody.sort ? "&sort=" + requestBody.sort : ""}`
    + ` ${requestBody.page ? "&page=" + requestBody.page : ""}`
    + "&per_page=100" 
  return result;
}