import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../../shared/services/user/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {}

  submitForm = formValue => {
    this.service.add(formValue).subscribe(() => {
      this.router.navigate(['security/users']);
    });
  };
}
