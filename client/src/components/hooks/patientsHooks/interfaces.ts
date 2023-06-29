export interface Patient  {
  _id: number
  name: string
  lastname: string
  cedula: number
  age: number
  email: string
  phone: number
}

export interface Pagination {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}