import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DatatableFiltersData } from '../../models/datatable-filters-data';
import { LoanApplicationType } from '../../../../../../../shared/models/loan-application-type';
import { Section } from '../../../../../../../shared/models/section';

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
      label: this.datatableFiltersForm.value.label,
      sections: this.data.sections
        .filter((section, idx) => this.datatableFiltersForm.value.sections[idx])
        .map(section => section._id),
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
      label: new FormControl(this.data.label),
      loanApplicationTypes: new FormArray(
        this.data.loanApplicationTypes.map(
          (loanApplicationType: LoanApplicationType, index: number) =>
            new FormControl(false)
        )
      ),
      sections: new FormArray(
        this.data.sections.map(
          (section: Section, index: number) => new FormControl(false)
        )
      ),
      active: new FormControl(this.data.active)
    });
  }

  get loanApplicationTypes() {
    return <FormArray>this.datatableFiltersForm.get('loanApplicationTypes');
  }

  get sections() {
    return <FormArray>this.datatableFiltersForm.get('sections');
  }
}
