import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RoleService } from '../../../../../shared/services/role/role.service';
import { IsNameTakenValidator } from '../../validators/is-name-taken-validator';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../../../../../shared/models/role';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  roleForm: FormGroup;
  roleFormData: Role = {
    name: '',
    canModify: false,
    active: true
  };
  @Input() submitForm;
  @Input() editMode;

  constructor(private service: RoleService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { role: Role }) => {
      this.roleFormData = data.role || this.roleFormData;
      this.roleForm = new FormGroup({
        name: new FormControl(
          this.roleFormData.name,
          [Validators.required],
          [
            IsNameTakenValidator.createValidator(
              this.service,
              this.roleFormData.name
            )
          ]
        ),
        canModify: new FormControl(this.roleFormData.canModify, [
          Validators.required
        ]),
        active: new FormControl(this.roleFormData.active, [Validators.required])
      });
    });
  }

  get name() {
    return this.roleForm.get('name');
  }

  submitFormHandler() {
    this.submitForm({
      ...this.roleFormData,
      ...this.roleForm.value
    });
  }
}
