import { Component, Input } from '@angular/core';
import { ShortUserData } from "../../dto/response/short-user-data";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user: ShortUserData | null = null;

  toAvatarUrl(user: ShortUserData | null): string {
    return `http://localhost:8080/users/${user?.id}/avatar`;
  }

}
