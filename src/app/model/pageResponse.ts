export interface PageResponse<T>
{
  currentPage : number
  size :number
  totalElements:number
  totalPages : number
  items:T[]
}
