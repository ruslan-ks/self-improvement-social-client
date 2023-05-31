export interface PageResponse {
  page: number;
  size: number;   // Requested page size. The actual amount of elements receive may be less
  count: number;  // Total count of the elements(depends on request filters)
}
