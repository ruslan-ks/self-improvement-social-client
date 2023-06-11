import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() searchSubmitted: EventEmitter<string> = new EventEmitter<string>();

  searchForm: FormGroup = new FormGroup({
    searchInput: new FormControl(null)
  });

  onSearchSubmit() {
    this.searchSubmitted.emit(this.searchForm.value.searchInput);
  }
}
