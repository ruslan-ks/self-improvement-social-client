import { Component, Input } from '@angular/core';
import { User } from "../../interface/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  @Input({ required: true }) users: User[];
}
