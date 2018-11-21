import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UserService } from '../../../../../shared/services/user/user.service';
import { IsUsernameTakenValidator } from '../../validators/is-username-taken-validator';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../../shared/models/user';
import { UserFormData } from '../../models/user-form-data';
import { Role } from 'src/app/shared/models/role';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userFormData: UserFormData = {
    username: '',
    password: '',
    role: '',
    active: true
  };
  @Input() submitForm;
  @Input() editMode;

  userData: User;

  roles: Role[] = [];

  constructor(private service: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { roles: Role[]; user: User }) => {
      this.roles = data.roles;
      if (data.user) {
        this.userData = data.user;
        this.userFormData.username = data.user.auth.username;
        this.userFormData.password = data.user.auth.password;
        this.userFormData.role = data.user.role._id;
        this.userFormData.active = data.user.active;
      }
      this.userForm = new FormGroup({
        username: new FormControl(
          this.userFormData.username,
          [Validators.required],
          [
            IsUsernameTakenValidator.createValidator(
              this.service,
              this.userFormData.username
            )
          ]
        ),
        password: new FormControl(this.userFormData.password, [
          Validators.required
        ]),
        role: new FormControl(this.userFormData.role, [Validators.required]),
        active: new FormControl(this.userFormData.active, [Validators.required])
      });
    });
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get role() {
    return this.userForm.get('role');
  }

  submitFormHandler() {
    const formValue = this.userForm.value,
      formData = {
        ...this.userData,
        auth: {
          username: formValue.username,
          password: formValue.password
        },
        role: formValue.role,
        active: formValue.active
      };
    this.submitForm(formData);
  }
}
