import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DatatableFiltersData } from '../../models/datatable-filters-data';
import { LoanApplicationType } from '../../../../../../../shared/models/loan-application-type';

@Component({
  selector: 'app-datatable-filters',
  templateUrl: './datatable-filters.component.html',
  styleUrls: ['./datatable-filters.component.css']
})
export class DatatableFiltersComponent implements OnInit {
  @Input()
  data: DatatableFiltersData = {
    loanApplicationTypes: [],
    active: false,
    name: ''
  };

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
      loanApplicationTypes: this.data.loanApplicationTypes
        .filter(
          (loanApplicationType, idx) =>
            this.datatableFiltersForm.value.loanApplicationTypes[idx]
        )
        .map(loanApplicationType => loanApplicationType._id),
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
      loanApplicationTypes: new FormArray(
        this.data.loanApplicationTypes.map(
          (loanApplicationType: LoanApplicationType, index: number) =>
            new FormControl(false)
        )
      ),
      active: new FormControl(this.data.active)
    });
  }

  get loanApplicationTypes() {
    return <FormArray>this.datatableFiltersForm.get('loanApplicationTypes');
  }
}
