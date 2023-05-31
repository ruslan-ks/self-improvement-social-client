// Custom page request object
export class EntityPageRequest {
  page: number = 0;
  size: number = 20;
  sortBy: string = "";
  sortDirection = "ASC";

  constructor(page: number, size: number, sortBy: string, sortDirection: string | undefined) {
    this.page = page;
    this.size = size;
    this.sortBy = sortBy;
    if (typeof sortDirection !== undefined) {
      this.sortDirection = sortDirection!;
    }}
}
