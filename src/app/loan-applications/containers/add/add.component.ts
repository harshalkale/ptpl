import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplicationService } from '../../../shared/services/loan-application/loan-application.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(
    private service: LoanApplicationService,
    private router: Router
  ) {}

  ngOnInit() {}

  submitForm = formValue => {
    this.service.add(formValue).subscribe(() => {
      this.router.navigate(['loan-applications']);
    });
  };
}
