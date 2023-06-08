import { Component, Input } from '@angular/core';
import { User } from "../../interface/user";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input({ required: true }) user: User | null = null;

  toAvatarUrl(user: User | null): string {
    return `http://localhost:8080/users/${user?.id}/avatar`;
  }

}
