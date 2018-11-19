import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SectionService } from '../../../../../../../shared/services/section/section.service';
import { IsNameTakenValidator } from '../../validators/is-name-taken-validator';
import { LoanApplicationType } from '../../../../../../../shared/models/loan-application-type';
import { AtLeastOneCheckedValidator } from '../../validators/at-least-one-checked-validator';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../../../../../../shared/models/section';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.css']
})
export class SectionFormComponent implements OnInit {
  sectionForm: FormGroup;
  sectionFormData: Section = {
    sequenceNo: null,
    name: '',
    active: true,
    loanApplicationTypes: []
  };
  loanApplicationTypesList: LoanApplicationType[];
  @Input() submitForm;
  @Input() editMode;

  constructor(private service: SectionService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: {
        loanApplicationTypes: LoanApplicationType[];
        section: Section;
      }) => {
        this.loanApplicationTypesList = data.loanApplicationTypes;
        this.sectionFormData = data.section || this.sectionFormData;
        if (data.loanApplicationTypes && data.loanApplicationTypes.length) {
          this.sectionForm = new FormGroup({
            sequenceNo: new FormControl(
              this.sectionFormData.sequenceNo,
              [Validators.required],
              []
            ),
            name: new FormControl(
              this.sectionFormData.name,
              [Validators.required],
              [
                IsNameTakenValidator.createValidator(
                  this.service,
                  this.sectionFormData.name
                )
              ]
            ),
            loanApplicationTypes: new FormArray(
              (this.loanApplicationTypesList || []).map(
                (loanApplicationType: LoanApplicationType) =>
                  new FormControl(
                    this.sectionFormData.loanApplicationTypes.find(
                      latData => loanApplicationType._id === latData._id
                    ) !== undefined
                  )
              ),
              [AtLeastOneCheckedValidator.createValidator()]
            ),
            active: new FormControl(this.sectionFormData.active, [
              Validators.required
            ])
          });
        }
      }
    );
  }

  get sequenceNo() {
    return this.sectionForm.get('sequenceNo');
  }

  get name() {
    return this.sectionForm.get('name');
  }

  get loanApplicationTypes() {
    return <FormArray>this.sectionForm.get('loanApplicationTypes');
  }

  submitFormHandler() {
    const selectedLoanApplicationTypes = [];
    this.loanApplicationTypesList.forEach((loanApplicationType, idx) => {
      if (this.sectionForm.value.loanApplicationTypes[idx]) {
        selectedLoanApplicationTypes.push(loanApplicationType);
      }
    });
    this.submitForm({
      ...this.sectionFormData,
      ...this.sectionForm.value,
      loanApplicationTypes: selectedLoanApplicationTypes
    });
  }
}
