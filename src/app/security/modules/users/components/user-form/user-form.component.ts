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
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    active: new FormControl(true)
  });
  userFormData: UserFormData = {
    username: '',
    password: '',
    role: '',
    active: true
  };
  @Input() submitForm;
  @Input() editMode;

  roles: Role[] = [];

  constructor(private service: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ roles, user }) => {
      this.roles = roles;
      if (user) {
        this.userFormData.username = user.auth.username;
        this.userFormData.password = user.auth.password;
        this.userFormData.role = user.role._id;
        this.userFormData.active = user.active;
      }
      this.userForm = new FormGroup({
        username: new FormControl(
          {
            value: this.userFormData.username,
            disabled: !!this.userFormData.username
          },
          [Validators.required],
          [
            IsUsernameTakenValidator.createValidator(
              this.service,
              this.userFormData.username
            )
          ]
        ),
        password: new FormControl(
          {
            value: this.userFormData.password,
            disabled: !!this.userFormData.password
          },
          [Validators.required]
        ),
        role: new FormControl(this.userFormData.role, [Validators.required]),
        active: new FormControl(this.userFormData.active)
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
    const formData = this.userFormData,
      formValue = {
        ...this.userForm.value,
        auth: {
          username: this.userForm.value.username || formData.username,
          password: this.userForm.value.password || formData.password
        }
      };
    this.submitForm(formValue);
  }
}
