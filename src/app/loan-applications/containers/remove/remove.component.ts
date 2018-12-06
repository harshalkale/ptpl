import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from '../../../shared/models/loan-application';
import { LoanApplicationService } from '../../../shared/services/loan-application/loan-application.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  loanApplication: LoanApplication;

  constructor(
    private service: LoanApplicationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { loanApplication: LoanApplication }) => {
      this.loanApplication = data.loanApplication;
    });
  }

  cancel() {
    this.router.navigate(['loan-applications']);
  }

  remove() {
    this.service.remove(this.loanApplication).subscribe(() => {
      this.router.navigate(['loan-applications']);
    });
  }
}
