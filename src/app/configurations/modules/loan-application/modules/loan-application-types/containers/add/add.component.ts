import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IsNameTakenValidator } from '../../validators/is-name-taken-validator';
import { LoanApplicationTypeService } from '../../../../../../../shared/services/loan-application-type/loan-application-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  applicationTypeForm: FormGroup;

  constructor(
    private service: LoanApplicationTypeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.applicationTypeForm = new FormGroup({
      name: new FormControl(
        '',
        [Validators.required],
        [IsNameTakenValidator.createValidator(this.service)]
      ),
      active: new FormControl(true, [Validators.required])
    });
  }

  get name() {
    return this.applicationTypeForm.get('name');
  }

  submitForm() {
    this.service.add(this.applicationTypeForm.value).subscribe(() => {
      this.router.navigate([
        'configurations/loan-application/loan-application-types'
      ]);
    });
  }
}
