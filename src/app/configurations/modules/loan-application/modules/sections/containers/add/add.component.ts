import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../../../../../../../shared/services/section/section.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(private service: SectionService, private router: Router) {}

  ngOnInit() {}

  submitForm = formValue => {
    this.service.add(formValue).subscribe(() => {
      this.router.navigate(['configurations/loan-application/sections']);
    });
  };
}
