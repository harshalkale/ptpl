import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { LoanApplicationService } from '../../../shared/services/loan-application/loan-application.service';
import { LoanApplicationType } from '../../../shared/models/loan-application-type';
import { Section } from '../../../shared/models/section';
import { IsApplicationIdTakenValidator } from '../../validators/is-application-id-taken-validator.service';
import { ActivatedRoute } from '@angular/router';
import { LoanApplication } from '../../../shared/models/loan-application';
import { LoanApplicationFormData } from '../../models/loan-application-form-data';
import { Field } from '../../../shared/models/field';

@Component({
  selector: 'app-loan-application-form',
  templateUrl: './loan-application-form.component.html',
  styleUrls: ['./loan-application-form.component.css']
})
export class LoanApplicationFormComponent implements OnInit {
  @Input() submitForm;
  @Input() editMode;
  @Input() viewMode;

  applicationMaxScore: number;
  applicationScore: number;

  loanApplicationForm = new FormGroup({
    applicationId: new FormControl(
      '',
      [Validators.required],
      [IsApplicationIdTakenValidator.createValidator(this.service)]
    ),
    coApplicant: new FormControl(''),
    loanApplicationType: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    lastName: new FormControl('', [Validators.required]),
    // active: new FormControl('', [
    //   Validators.required
    // ]),
    formData: new FormArray([])
  });
  loanApplicationFormData: LoanApplicationFormData = {
    applicationId: '',
    loanApplicationType: '',
    firstName: '',
    middleName: '',
    lastName: '',
    active: true,
    coApplicant: false,
    formData: null
  };

  loanApplicationTypesList: LoanApplicationType[] = [];
  selectedLoanApplicationType: LoanApplicationType;

  sectionsList: Section[] = [];
  sectionsForLoanApplicationType: Section[] = [];
  selectedSectionIndex = 0;

  fieldsList: Field[] = [];
  fieldsForLoanApplicationType: Field[] = [];

  constructor(
    private service: LoanApplicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
      (data: {
        loanApplicationTypes: LoanApplicationType[];
        sections: Section[];
        fields: Field[];
        loanApplication: LoanApplication;
      }) => {
        if (data.loanApplicationTypes && data.loanApplicationTypes.length) {
          this.loanApplicationTypesList = data.loanApplicationTypes;
        }
        if (data.sections && data.sections.length) {
          this.sectionsList = data.sections;
        }
        if (data.fields && data.fields.length) {
          this.fieldsList = data.fields;
        }
        if (data.loanApplication) {
          const { loanApplicationType, ...theRest } = data.loanApplication;
          this.loanApplicationFormData = {
            loanApplicationType: loanApplicationType._id,
            ...theRest
          };
          this.selectedLoanApplicationType = loanApplicationType;
          this.applicationMaxScore = theRest.formData.reduce(
            (sectionMax, section) =>
              sectionMax +
              section.fields.reduce(
                (fieldMax, field) =>
                  fieldMax +
                  field.options.reduce((optionMax, option) => {
                    const optionScore = (
                      option.scores.find(
                        score =>
                          (score.loanApplicationType._id ||
                            score.loanApplicationType) ===
                          this.selectedLoanApplicationType._id
                      ) || {}
                    ).score;
                    return optionMax < optionScore ? optionScore : optionMax;
                  }, 0),
                0
              ),
            0
          );
          this.applicationScore = theRest.formData.reduce(
            (sectionTotal, section) =>
              sectionTotal +
              section.fields.reduce(
                (fieldTotal, field) =>
                  fieldTotal +
                  ((
                    (
                      (
                        field.options.find(
                          option => option._id === field.selectedOption
                        ) || {}
                      ).scores || []
                    ).find(
                      score =>
                        (score.loanApplicationType._id ||
                          score.loanApplicationType) ===
                        this.selectedLoanApplicationType._id
                    ) || {}
                  ).score || 0),
                0
              ),
            0
          );
        }

        this.rebuildForm();
      }
    );
  }

  rebuildForm() {
    this.loanApplicationForm = new FormGroup({
      applicationId: new FormControl(
        {
          disabled: this.viewMode,
          value: this.loanApplicationFormData.applicationId
        },
        [Validators.required],
        [
          IsApplicationIdTakenValidator.createValidator(
            this.service,
            this.loanApplicationFormData.applicationId
          )
        ]
      ),
      coApplicant: new FormControl({
        disabled: this.viewMode,
        value: this.loanApplicationFormData.coApplicant
      }),
      loanApplicationType: new FormControl(
        {
          disabled: this.viewMode,
          value: this.loanApplicationFormData.loanApplicationType
        },
        [Validators.required]
      ),
      firstName: new FormControl(
        {
          disabled: this.viewMode,
          value: this.loanApplicationFormData.firstName
        },
        [Validators.required]
      ),
      middleName: new FormControl({
        disabled: this.viewMode,
        value: this.loanApplicationFormData.middleName
      }),
      lastName: new FormControl(
        {
          disabled: this.viewMode,
          value: this.loanApplicationFormData.lastName
        },
        [Validators.required]
      ),
      // active: new FormControl(this.loanApplicationFormData.active, [
      //   Validators.required
      // ]),
      formData: this.getFormDataControl()
    });
  }

  rebuildFormData() {
    this.buildSectionsForLoanApplicationType();
    this.buildFieldsForLoanApplicationType();
    this.sectionsForLoanApplicationType = this.sectionsForLoanApplicationType.filter(
      section => this.getFieldsForSection(section).length
    );
    this.loanApplicationForm.setControl('formData', this.getFormDataControl());
  }

  getFormDataControl() {
    if (
      this.loanApplicationFormData.formData &&
      this.loanApplicationFormData.formData.length
    ) {
      this.sectionsForLoanApplicationType = this.loanApplicationFormData.formData.map(
        section => ({
          _id: section._id,
          sequenceNo: section.sequenceNo,
          loanApplicationTypes: [],
          name: section.name,
          active: true
        })
      );
      this.fieldsForLoanApplicationType = [];
      this.loanApplicationFormData.formData.forEach(section => {
        this.fieldsForLoanApplicationType = this.fieldsForLoanApplicationType.concat(
          (<any>section).fields.map(field => ({
            _id: field._id,
            section: {
              _id: section._id
            },
            sequenceNo: field.sequenceNo,
            label: field.label,
            options: field.options,
            selectedOption: field.selectedOption,
            active: true
          }))
        );
      });
    }
    const formData = new FormArray([]);
    this.sectionsForLoanApplicationType.forEach((section, secIdx) =>
      formData.setControl(
        secIdx,
        new FormGroup({
          _id: new FormControl(section._id),
          sequenceNo: new FormControl(section.sequenceNo),
          name: new FormControl(section.name),
          fields: new FormArray(
            this.getFieldsForSection(section).map(
              field =>
                new FormGroup({
                  _id: new FormControl(field._id),
                  sequenceNo: new FormControl(field.sequenceNo),
                  label: new FormControl(field.label),
                  options: new FormArray(
                    field.options.map(
                      option =>
                        new FormGroup({
                          _id: new FormControl(option._id),
                          text: new FormControl(option.text),
                          scores: new FormArray(
                            option.scores
                              .filter(
                                score =>
                                  score.loanApplicationType._id ===
                                  this.selectedLoanApplicationType._id
                              )
                              .map(
                                score =>
                                  new FormGroup({
                                    loanApplicationType: new FormControl(score.loanApplicationType._id),
                                    score: new FormControl(score.score)
                                  })
                              )
                          )
                        })
                    )
                  ),
                  selectedOption: new FormControl(
                    {
                      disabled: this.viewMode,
                      value: (<any>field).selectedOption || ''
                    },
                    [Validators.required]
                  )
                })
            )
          )
        })
      )
    );

    return formData;
  }

  prevSection() {
    this.selectedSectionIndex--;
  }

  nextSection() {
    this.selectedSectionIndex++;
  }

  getFieldsForSection(section) {
    return this.fieldsForLoanApplicationType
      .filter(field => section._id === field.section._id)
      .sort((a, b) => a.sequenceNo - b.sequenceNo);
  }

  getFieldIdentifier(field) {
    return field.label
      .toLowerCase()
      .split(' ')
      .join('-');
  }

  buildSectionsForLoanApplicationType() {
    this.sectionsForLoanApplicationType = this.sectionsList
      .filter(
        section =>
          section.loanApplicationTypes
            .map(lat => lat._id)
            .indexOf(this.selectedLoanApplicationType._id) >= 0
      )
      .sort((a, b) => a.sequenceNo - b.sequenceNo);
  }

  buildFieldsForLoanApplicationType() {
    this.fieldsForLoanApplicationType = this.fieldsList
      .filter(
        field =>
          field.loanApplicationTypes
            .map(lat => lat._id)
            .indexOf(this.selectedLoanApplicationType._id) >= 0
      )
      .sort((a, b) => a.sequenceNo - b.sequenceNo);
  }

  changeLoanApplicationType(loanApplicationType) {
    this.selectedLoanApplicationType = this.loanApplicationTypesList.find(
      lat => lat._id === loanApplicationType
    );
    this.rebuildFormData();
  }

  get applicationId() {
    return this.loanApplicationForm.get('applicationId');
  }

  get coApplicant() {
    return this.loanApplicationForm.get('coApplicant');
  }

  get firstName() {
    return this.loanApplicationForm.get('firstName');
  }

  get lastName() {
    return this.loanApplicationForm.get('lastName');
  }

  get loanApplicationType() {
    return this.loanApplicationForm.get('loanApplicationType');
  }

  get formData() {
    return <FormArray>this.loanApplicationForm.get('formData');
  }

  submitFormHandler() {
    const formData = {
      ...this.loanApplicationFormData,
      ...this.loanApplicationForm.value
    };
    this.submitForm(formData);
  }
}
