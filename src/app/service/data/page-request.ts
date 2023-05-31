export class PageRequest {
  private static DEFAULT_PAGE_REQUEST: PageRequest = new PageRequest();

  page: number = 0;
  size: number = 10;
  sort: string[] = [];

  static getDefault(): PageRequest {
    return PageRequest.DEFAULT_PAGE_REQUEST;
  }
}
