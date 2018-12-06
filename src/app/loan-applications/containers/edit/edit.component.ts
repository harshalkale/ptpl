import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplicationService } from '../../../shared/services/loan-application/loan-application.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(
    private service: LoanApplicationService,
    private router: Router
  ) {}

  ngOnInit() {}

  submitForm = formValue => {
    this.service.update(formValue).subscribe(() => {
      this.router.navigate(['loan-applications']);
    });
  };
}
