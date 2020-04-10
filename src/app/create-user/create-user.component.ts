import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';
import { IUser } from 'src/interfaces/iuser';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styles: []
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  loading: boolean;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this._createForm();
  }

  private _createForm() {
    this.userForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required]
    });
  }
  onSubmit() {
    const param = this.userForm.value;
    this._userService.create(param).subscribe(
      (user: IUser) => {
        this.loading = false;
        this.userForm.reset();
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }
}
