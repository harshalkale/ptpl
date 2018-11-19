import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplicationType } from '../../../../../../../shared/models/loan-application-type';
import { LoanApplicationTypeService } from '../../../../../../../shared/services/loan-application-type/loan-application-type.service';
import { IsNameTakenValidator } from '../../validators/is-name-taken-validator';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  applicationTypeForm: FormGroup;
  loanApplicationType: LoanApplicationType;

  constructor(
    private service: LoanApplicationTypeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: { loanApplicationType: LoanApplicationType }) => {
        this.loanApplicationType = data.loanApplicationType;
        this.applicationTypeForm = new FormGroup({
          name: new FormControl(
            this.loanApplicationType.name,
            [Validators.required],
            [
              IsNameTakenValidator.createValidator(
                this.service,
                this.loanApplicationType.name
              )
            ]
          ),
          active: new FormControl(this.loanApplicationType.active, [
            Validators.required
          ])
        });
      }
    );
  }

  get name() {
    return this.applicationTypeForm.get('name');
  }

  submitForm() {
    this.service
      .update({
        ...this.loanApplicationType,
        ...this.applicationTypeForm.value
      })
      .subscribe(() => {
        this.router.navigate([
          'configurations/loan-application/loan-application-types'
        ]);
      });
  }
}
