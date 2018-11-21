import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DatatableFiltersData } from '../../models/datatable-filters-data';

@Component({
  selector: 'app-datatable-filters',
  templateUrl: './datatable-filters.component.html',
  styleUrls: ['./datatable-filters.component.css']
})
export class DatatableFiltersComponent implements OnInit {
  @Input()
  data: DatatableFiltersData;

  @Input()
  handler;

  @Input()
  reset;

  isCollapsed = false;
  filtersApplied = false;
  datatableFiltersForm: FormGroup;

  filterHandler() {
    this.filtersApplied = true;
    const formValue = {
      name: this.datatableFiltersForm.value.name,
      canModify:
        this.datatableFiltersForm.value.canModify !== null
          ? $.fn.dataTable.util.escapeRegex(
              '' + this.datatableFiltersForm.value.canModify
            )
          : null,
      active:
        this.datatableFiltersForm.value.active !== null
          ? $.fn.dataTable.util.escapeRegex(
              '' + this.datatableFiltersForm.value.active
            )
          : null
    };
    this.handler(formValue);
  }
  resetHandler() {
    this.datatableFiltersForm.reset();
    this.filtersApplied = false;
    this.reset();
  }

  constructor() {}

  ngOnInit() {
    this.datatableFiltersForm = new FormGroup({
      name: new FormControl(this.data.name),
      canModify: new FormControl(this.data.canModify),
      active: new FormControl(this.data.active)
    });
  }
}
