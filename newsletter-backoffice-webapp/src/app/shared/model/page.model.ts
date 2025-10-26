export interface PageResult<T> {
  content: T[]
  page: Page
}

export interface Page {
  totalElements: number
  totalPages: number
  pageSize: number
  currentPage: number
}

export interface PageRequest {
  pageSize: number
  pageIndex: number
}
