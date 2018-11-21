import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../../../shared/models/role';
import { RoleService } from '../../../../../shared/services/role/role.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  role: Role;

  constructor(
    private service: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { role: Role }) => {
      this.role = data.role;
    });
  }

  cancel() {
    this.router.navigate(['security/roles']);
  }

  remove() {
    this.service.remove(this.role).subscribe(() => {
      this.router.navigate(['security/roles']);
    });
  }
}
