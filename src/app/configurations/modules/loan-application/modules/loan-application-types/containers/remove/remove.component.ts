import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplicationType } from '../../../../../../../shared/models/loan-application-type';
import { LoanApplicationTypeService } from '../../../../../../../shared/services/loan-application-type/loan-application-type.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
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
      }
    );
  }

  cancel() {
    this.router.navigate([
      'configurations/loan-application/loan-application-types'
    ]);
  }

  remove() {
    this.service.remove(this.loanApplicationType).subscribe(() => {
      this.router.navigate([
        'configurations/loan-application/loan-application-types'
      ]);
    });
  }
}
