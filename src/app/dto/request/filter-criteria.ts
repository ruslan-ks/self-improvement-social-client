import { FilterOperation } from "../../enum/filter-operation";

export class FilterCriteria {
  field: string;
  operation: FilterOperation;
  value: number | string;

  constructor(field: string, operation: FilterOperation, value: number | string) {
    this.field = field;
    this.operation = operation;
    this.value = value;
  }
}
