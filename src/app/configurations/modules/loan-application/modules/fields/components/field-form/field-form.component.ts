import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FieldService } from '../../../../../../../shared/services/field/field.service';
import { LoanApplicationType } from '../../../../../../../shared/models/loan-application-type';
import { Section } from '../../../../../../../shared/models/section';
import { AtLeastOneCheckedValidator } from '../../validators/at-least-one-checked-validator';
import { ActivatedRoute } from '@angular/router';
import { Field } from '../../../../../../../shared/models/field';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent implements OnInit {
  @Input() submitForm;
  @Input() editMode;

  fieldForm = new FormGroup({
    sequenceNo: new FormControl(''),
    label: new FormControl(''),
    section: new FormControl(''),
    loanApplicationTypes: new FormArray([]),
    active: new FormControl(''),
    options: new FormArray([])
  });
  fieldFormData: Field = {
    sequenceNo: null,
    label: '',
    loanApplicationTypes: [],
    active: true,
    options: []
  };

  sectionsList: Section[] = [];
  selectedSection: Section;

  loanApplicationTypesList: LoanApplicationType[] = [];
  selectedLoanApplicationTypes: LoanApplicationType[] = [];

  optionsList = [];

  constructor(private service: FieldService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: {
        loanApplicationTypes: LoanApplicationType[];
        sections: Section[];
        field: Field;
      }) => {
        this.fieldFormData = data.field || this.fieldFormData;
        if (
          data.sections &&
          data.sections.length &&
          data.loanApplicationTypes &&
          data.loanApplicationTypes.length
        ) {
          this.loanApplicationTypesList = data.loanApplicationTypes;
          if (this.fieldFormData.section) {
            this.selectedSection = this.fieldFormData.section;
          }
          if (
            this.fieldFormData.loanApplicationTypes &&
            this.fieldFormData.loanApplicationTypes.length
          ) {
            this.selectedLoanApplicationTypes = this.fieldFormData.loanApplicationTypes;
          }
          if (this.fieldFormData.options && this.fieldFormData.options.length) {
            this.optionsList = this.fieldFormData.options;
          }
          this.sectionsList = data.sections;
          this.rebuildForm();
        }
      }
    );
  }

  rebuildForm() {
    this.fieldForm = new FormGroup({
      sequenceNo: new FormControl(
        this.fieldFormData.sequenceNo,
        [Validators.required],
        []
      ),
      label: new FormControl(this.fieldFormData.label, [Validators.required]),
      section: new FormControl(
        {
          value: (<any>(this.fieldFormData.section || {}))._id || '',
          disabled: this.editMode
        },
        [Validators.required],
        []
      ),
      loanApplicationTypes: new FormArray(
        this.selectedSection
          ? this.selectedSection.loanApplicationTypes.map(
              lat =>
                new FormControl({
                  value:
                    this.selectedLoanApplicationTypes.find(
                      slat => slat._id === lat._id
                    ) !== undefined,
                  disabled: this.editMode
                })
            )
          : []
      ),
      active: new FormControl(this.fieldFormData.active, [Validators.required]),
      options: new FormArray(
        this.optionsList.map(
          (option, idx) =>
            new FormGroup({
              text: new FormControl(option.text, [Validators.required]),
              scores: new FormArray(
                option.scores.map(
                  score =>
                    new FormGroup({
                      loanApplicationType: new FormControl(
                        score.loanApplicationType
                      ),
                      score: new FormControl(score.score, [Validators.required])
                    })
                )
              )
            })
        )
      )
    });
  }

  changeSection(sectionId) {
    if (!sectionId) {
      this.selectedSection = null;
      this.fieldForm.setControl('loanApplicationTypes', new FormArray([]));
    } else {
      this.selectedSection = this.sectionsList.find(
        sectionItem => sectionItem._id === sectionId
      );
      const lats = this.loanApplicationTypesList.filter(
        (loanApplicationType: LoanApplicationType) =>
          this.selectedSection.loanApplicationTypes.find(
            (lat: LoanApplicationType) => lat._id === loanApplicationType._id
          )
      );
      this.fieldForm.setControl(
        'loanApplicationTypes',
        new FormArray(
          lats.map(
            (loanApplicationType: LoanApplicationType) =>
              new FormControl(
                this.fieldFormData.loanApplicationTypes.find(
                  latData => loanApplicationType._id === latData._id
                ) !== undefined
              )
          ),
          [AtLeastOneCheckedValidator.createValidator()]
        )
      );
    }

    this.buildOptions();
  }

  changeLoanApplicationType() {
    this.selectedLoanApplicationTypes = this.loanApplicationTypes.value
      .map((latChk, idx) =>
        latChk ? this.loanApplicationTypesList[idx] : null
      )
      .filter(lat => lat);

    this.buildOptions();
  }

  buildOptions() {
    const currentOptions = this.fieldForm.value.options;

    this.fieldForm.setControl(
      'options',
      new FormArray(
        this.optionsList.map(
          (option, idx) =>
            new FormGroup({
              text: new FormControl(
                currentOptions[idx] ? currentOptions[idx].text : '',
                [Validators.required]
              ),
              scores: new FormArray(
                this.selectedLoanApplicationTypes.map(
                  lat =>
                    new FormGroup({
                      loanApplicationType: new FormControl(lat._id),
                      score: new FormControl(
                        (
                          (currentOptions[idx]
                            ? currentOptions[idx].scores
                            : []
                          ).find(
                            score => score.loanApplicationType === lat._id
                          ) || {}
                        ).score || '',
                        [Validators.required]
                      )
                    })
                )
              )
            })
        )
      )
    );
  }

  addNewOption() {
    this.optionsList.push({
      text: '',
      scores: []
    });

    this.buildOptions();
  }

  removeOption(idx) {
    this.optionsList.splice(idx, 1);
    this.fieldForm.patchValue(this.fieldForm.value.options.splice(idx, 1));

    this.buildOptions();
  }

  get sequenceNo() {
    return this.fieldForm.get('sequenceNo');
  }

  get label() {
    return this.fieldForm.get('label');
  }

  get section() {
    return this.fieldForm.get('section');
  }

  get loanApplicationTypes() {
    return <FormArray>this.fieldForm.get('loanApplicationTypes');
  }

  get options() {
    return <FormArray>this.fieldForm.get('options');
  }

  submitFormHandler() {
    const formData = {
      ...this.fieldFormData,
      ...this.fieldForm.value
    };
    if (!this.editMode) {
      const selectedLoanApplicationTypes = [];
      this.loanApplicationTypesList.forEach((loanApplicationType, idx) => {
        if (this.fieldForm.value.loanApplicationTypes[idx]) {
          selectedLoanApplicationTypes.push(loanApplicationType);
        }
      });
      formData.loanApplicationTypes = selectedLoanApplicationTypes;
    }
    this.submitForm(formData);
  }
}
