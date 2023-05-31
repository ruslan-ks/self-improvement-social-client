import { FilterCriteria } from "../dto/request/fitler/filter-criteria";
import { FilterOperation } from "../dto/request/fitler/filter-operation";
import { NoSuchElementError } from "../error/no-such-element-error";
import { Injectable } from "@angular/core";
import { EntityPageRequest } from "../dto/request/page/entity-page-request";

@Injectable({
  providedIn: 'root',
})
export class GetParamsBuilder {
  private operationCodeMap: Map<FilterOperation, string> = new Map<FilterOperation, string>([
    [FilterOperation.EQUAL, 'eq'],
    [FilterOperation.LIKE, 'lk'],
    [FilterOperation.CONTAINS, 'cn'],
    [FilterOperation.GREATER_EQUAL, 'ge'],
    [FilterOperation.LESS_EQUAL, 'le']
  ]);

  build(filters: FilterCriteria[], pageRequest: EntityPageRequest | undefined): string {
    let pageParams = '';
    if (typeof pageRequest !== undefined) {
      pageParams = Object.entries(pageRequest!)
        .map(([k, v]) => k + '=' + v)
        .join('&');
      pageParams += '&';
    }
    const filterQuery = 'query=' + filters
      .map(f => f.field + ' ' + this.toCode(f.operation) + ' ' + f.value)
      .join(';');
    return pageParams + filterQuery;
  }

  private toCode(operation: FilterOperation): string {
    if (!this.operationCodeMap.has(operation)) {
      throw new NoSuchElementError("Key '" + operation + "' not found");
    }
    return this.operationCodeMap.get(operation)!;
  }
}
