import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

enum ArrowButtonType {
  BACK = 'BACK', FORTH = 'FORTH'
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input({ required: true }) pageCount: number;
  @Input() maxButtonCount: number = 3;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  private buttonCount = 1;

  buttonNumbers: number[] = Array.from({ length: this.buttonCount }, (_, i) => i + 1);
  currentPageNumber: number = 1;

  get arrowButtonType(): typeof ArrowButtonType {
    return ArrowButtonType;
  }

  ngOnInit() {
    if (this.maxButtonCount < 1) {
      throw new Error('Illegal property value: buttonCount: ' + this.buttonCount);
    }
    this.setButtons();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setButtons();
  }

  private setButtons() {
    if (this.pageCount < 1) {
      this.pageCount = 1;
    }
    this.buttonCount = Math.min(this.maxButtonCount, this.pageCount);
    this.buttonNumbers = Array.from({ length: this.buttonCount }, (_, i) => i + 1);
  }

  onArrowButtonClick(arrowType: ArrowButtonType) {
    console.log('Arrow button click: ', arrowType);
    switch (arrowType) {
      case ArrowButtonType.BACK:
        if (this.currentPageNumber > 1) {
          this.currentPageNumber--;
          this.pageChange.emit(this.currentPageNumber);
        }
        break;
      case ArrowButtonType.FORTH:
        if (this.currentPageNumber < this.pageCount) {
          this.currentPageNumber++;
          this.pageChange.emit(this.currentPageNumber);
        }
        break;
    }
    this.shiftButtonNumbersIfNecessary();
  }

  private shiftButtonNumbersIfNecessary(): void {
    const mid = this.mid(this.buttonNumbers);
    if (this.currentPageNumber !== mid) {
      let shift = Math.abs(this.currentPageNumber - mid);
      if (this.currentPageNumber > mid) {
        // increase button numbers
        const maxPossibleIncrement = this.pageCount - this.buttonNumbers[this.buttonNumbers.length - 1];
        shift = Math.min(shift, maxPossibleIncrement);
        this.buttonNumbers = this.buttonNumbers.map(value => value + shift);
        return;
      }
      // else - decrease button numbers
      const maxPossibleDecrement = this.buttonNumbers[0] - 1;
      shift = Math.min(shift, maxPossibleDecrement);
      this.buttonNumbers = this.buttonNumbers.map(value => value - shift);
    }
  }

  onNumberedButtonClick(pageNumber: number) {
    if (pageNumber !== this.currentPageNumber) {
      if (pageNumber > 0 && pageNumber <= this.pageCount) {
        this.currentPageNumber = pageNumber;
      }

      this.shiftButtonNumbersIfNecessary();
      this.pageChange.emit(this.currentPageNumber);
    }
  }

  /**
   * Returns element placed in the middle of an array<br>
   * For example: mid([1, 2, 3]) = 2, mid([1, 2]) = 1}
   */
  private mid(array: number[]): number {
    return array.length % 2 === 1
      ? array[Math.floor(array.length / 2)]
      : array[array.length / 2 - 1];
  }
}
