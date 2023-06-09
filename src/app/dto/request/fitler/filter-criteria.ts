import { FilterOperator } from "./filter-operator";

export class FilterCriteria {
  field: string;
  operation: FilterOperator;
  value: number | string;

  constructor(field: string, operation: FilterOperator, value: number | string) {
    this.field = field;
    this.operation = operation;
    this.value = value;
  }
}
