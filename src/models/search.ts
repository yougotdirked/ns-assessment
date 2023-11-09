export interface ISearch {
  search: string,
  sort: "stars" | "forks",
  stars: number,
  language: string,
  followers: number,
}