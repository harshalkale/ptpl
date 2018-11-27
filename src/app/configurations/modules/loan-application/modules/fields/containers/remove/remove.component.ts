import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from '../../../../../../../shared/models/field';
import { FieldService } from '../../../../../../../shared/services/field/field.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  field: Field;

  constructor(
    private service: FieldService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { field: Field }) => {
      this.field = data.field;
    });
  }

  cancel() {
    this.router.navigate(['configurations/loan-application/fields']);
  }

  remove() {
    this.service.remove(this.field).subscribe(() => {
      this.router.navigate(['configurations/loan-application/fields']);
    });
  }
}
