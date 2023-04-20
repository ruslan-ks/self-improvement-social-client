import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent {
  constructor(private translateService: TranslateService) {}

  onSelectChange(event: any) {
    this.translateService.use(event.target.value);
  }
}
