import { Component, OnInit } from '@angular/core';
import { ShortUserData } from "../../interface/short-user-data";
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: ShortUserData[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsersPage()
      .subscribe(this.setUsers);
  }

  private setUsers = (users: ShortUserData[]) => {
    this.users = users;
  }
}
