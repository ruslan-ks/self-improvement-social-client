import { FilterCriteria } from "../dto/request/fitler/filter-criteria";
import { FilterOperator } from "../dto/request/fitler/filter-operator";
import { NoSuchElementError } from "../error/no-such-element-error";
import { Injectable } from "@angular/core";
import { EntityPageRequest } from "../dto/request/page/entity-page-request";
import { PageRequest } from "../dto/request/page/page-request";

@Injectable({
  providedIn: 'root',
})
export class GetParamsBuilder {
  private operationCodeMap: Map<FilterOperator, string> = new Map<FilterOperator, string>([
    [FilterOperator.EQUAL, 'eq'],
    [FilterOperator.LIKE, 'lk'],
    [FilterOperator.CONTAINS, 'cn'],
    [FilterOperator.GREATER_EQUAL, 'ge'],
    [FilterOperator.LESS_EQUAL, 'le']
  ]);

  build(filters: FilterCriteria[], pageRequest: EntityPageRequest | undefined): string {
    let pageParams = '';
    if (typeof pageRequest !== undefined) {
      pageParams = Object.entries(pageRequest)
        .map(([k, v]) => v ? k + '=' + v : '')
        .join('&');
    }
    if (filters) {
      const filterQuery = filters.length > 0
        ? 'query=' + filters
          .map(f => f.field + ' ' + this.toCode(f.operation) + ' ' + f.value)
          .join(';')
        : '';
      if (pageParams.length > 0) {
        pageParams += '&';
      }
      pageParams += filterQuery;
    }
    return pageParams;
  }

  pageRequestBuild(pageRequest: PageRequest): string {
    return Object.entries(pageRequest)
      .map(([k, v]) => k + '=' + v)
      .join('&');
  }

  private toCode(operation: FilterOperator): string {
    if (!this.operationCodeMap.has(operation)) {
      throw new NoSuchElementError("Key '" + operation + "' not found");
    }
    return this.operationCodeMap.get(operation)!;
  }
}
