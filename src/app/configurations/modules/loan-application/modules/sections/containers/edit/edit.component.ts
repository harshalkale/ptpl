import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/shared/services/section/section.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private service: SectionService, private router: Router) {}

  ngOnInit() {}

  submitForm = formValue => {
    this.service.update(formValue).subscribe(() => {
      this.router.navigate(['configurations/loan-application/sections']);
    });
  };
}
