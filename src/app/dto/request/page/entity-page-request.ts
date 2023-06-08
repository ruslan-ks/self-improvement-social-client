// Custom page request object
export class EntityPageRequest {
  page: number = 0;
  size: number = 20;
  sortBy: string = "";
  sortDirection = "ASC";

  private static DEFAULT_INSTANCE: EntityPageRequest = new EntityPageRequest(0, 20, "", "ASC");

  static getDefault() {
    return EntityPageRequest.DEFAULT_INSTANCE;
  }

  constructor(page: number, size: number, sortBy: string, sortDirection: string | undefined) {
    this.page = page;
    this.size = size;
    this.sortBy = sortBy;
    if (typeof sortDirection !== undefined) {
      this.sortDirection = sortDirection!;
    }}
}
