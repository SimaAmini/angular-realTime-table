import { Component, OnInit } from '@angular/core';
import { NgAlertService, MessageType } from '@theo4u/ng-alert';

import { IUser } from 'src/interfaces/iuser';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styles: []
})
export class ListUserComponent implements OnInit {
  loading = true;
  users: IUser[] = [];

  constructor(
    private _userService: UserService,
    private _ngAlert: NgAlertService
  ) {}

  ngOnInit() {
    this.loading = true;
    this._userService.list().subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    this._userService.getChannel().bind('new', data => {
      data.new = true;
      this.users.push(data);
    });
    this._userService.getChannel().bind('deleted', data => {
      this.users = this.users.filter(emp => emp.id !== data.id);
    });
  }

  delete(user: IUser) {
    this._ngAlert.push({
      message: `<strong>Are you sure!</strong> you want to delele this user with name <strong>${user.firstName} ${user.lastName}</strong>`,
      type: MessageType.warning,
      buttons: [
        {
          label: 'Continue',
          css: 'btn btn-danger',
          action: () => {
            this._actualDelete(user);
          }
        }
      ]
    });
  }
  private _actualDelete(user: IUser) {
    this._userService.delete(user).subscribe(() => {
      this.users = this.users.filter(item => item !== user);
      this._ngAlert.push({
        message: `${user.firstName} ${user.lastName} was removed`,
        type: MessageType.success
      });
    });
  }
}
