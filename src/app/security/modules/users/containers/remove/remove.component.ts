import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../../shared/models/user';
import { UserService } from '../../../../../shared/services/user/user.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  user: User;

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
    });
  }

  cancel() {
    this.router.navigate(['security/users']);
  }

  remove() {
    this.service.remove(this.user).subscribe(() => {
      this.router.navigate(['security/users']);
    });
  }
}
