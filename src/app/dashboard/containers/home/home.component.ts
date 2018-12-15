import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  counts = {
    loanApplicationTypes: 0,
    sections: 0,
    fields: 0,
    roles: 0,
    users: 0
  };

  ngOnInit() {
    this.route.data.subscribe(
      ({ loanApplicationTypes, sections, fields, roles, users }) => {
        this.counts.loanApplicationTypes = loanApplicationTypes.length;
        this.counts.sections = sections.length;
        this.counts.fields = fields.length;
        this.counts.roles = roles.length;
        this.counts.users = users.length;
      }
    );
  }
}
