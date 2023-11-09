export interface ISearchResults {
  count: number,
  repositories : IRepository[] 
}

export interface IRepository {
  id: string,
  name: string,
  forks: number,
  stars: number
}