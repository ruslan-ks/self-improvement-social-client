import { Component, Input } from '@angular/core';
import { ShortUserData } from "../../interface/short-user-data";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: ShortUserData | null = null;
}