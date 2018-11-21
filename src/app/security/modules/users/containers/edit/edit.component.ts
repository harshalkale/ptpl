import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../shared/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {}

  submitForm = formValue => {
    this.service.update(formValue).subscribe(() => {
      this.router.navigate(['security/users']);
    });
  };
}
