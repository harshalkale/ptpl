import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../../../../../../../shared/models/section';
import { SectionService } from '../../../../../../../shared/services/section/section.service';

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent implements OnInit {
  section: Section;

  constructor(
    private service: SectionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { section: Section }) => {
      this.section = data.section;
    });
  }

  cancel() {
    this.router.navigate(['configurations/loan-application/sections']);
  }

  remove() {
    this.service.remove(this.section).subscribe(() => {
      this.router.navigate(['configurations/loan-application/sections']);
    });
  }
}
