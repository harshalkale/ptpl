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
  coApplicantFlag = false;
  showConfirmationModal = false;

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
    coApplicantFirstName: this.coApplicantFlag
      ? new FormControl('', [Validators.required])
      : new FormControl(''),
    coApplicantMiddleName: this.coApplicantFlag
      ? new FormControl('')
      : new FormControl(''),
    coApplicantLastName: this.coApplicantFlag
      ? new FormControl('', [Validators.required])
      : new FormControl(''),
    // active: new FormControl('', [
    //   Validators.required
    // ]),
    formData: new FormArray([]),
    coApplicantFormData: new FormArray([])
  });
  loanApplicationFormData: LoanApplicationFormData = {
    applicationId: '',
    loanApplicationType: '',
    loanApplicationTypeName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    coApplicant: this.coApplicantFlag,
    coApplicantFirstName: '',
    coApplicantMiddleName: '',
    coApplicantLastName: '',
    active: true,
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

  getMaxTotal = formData => {
    return formData.reduce(
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
  };

  getTotalScore = formData => {
    return formData.reduce(
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
  };

  ngOnInit() {
    this.route.data.subscribe(
      (data: {
        loanApplicationTypes: LoanApplicationType[];
        sections: Section[];
        fields: Field[];
        loanApplication;
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
          if (loanApplicationType && loanApplicationType._id) {
            this.loanApplicationFormData = {
              loanApplicationType: loanApplicationType._id,
              loanApplicationTypeName: loanApplicationType.name,
              ...theRest
            };
            this.selectedLoanApplicationType = loanApplicationType;
          } else {
            this.loanApplicationFormData = {
              loanApplicationType: `${loanApplicationType || ''}`,
              ...theRest
            };
            this.selectedLoanApplicationType = loanApplicationType || {
              _id: this.loanApplicationFormData.loanApplicationType,
              name: this.loanApplicationFormData.loanApplicationTypeName,
              active: true
            };
          }
          this.applicationMaxScore = this.getMaxTotal(theRest.formData);
          this.applicationScore = this.getTotalScore(theRest.formData);
          this.coApplicantFlag = theRest.coApplicant;
          if (this.coApplicantFlag) {
            this.applicationScore =
              (this.applicationScore +
                this.getMaxTotal(theRest.coApplicantFormData)) /
              2;
          }
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
      coApplicantFirstName: this.coApplicantFlag
        ? new FormControl(
            {
              disabled: this.viewMode,
              value: this.loanApplicationFormData.firstName
            },
            [Validators.required]
          )
        : new FormControl(''),
      coApplicantMiddleName: this.coApplicantFlag
        ? new FormControl({
            disabled: this.viewMode,
            value: this.loanApplicationFormData.middleName
          })
        : new FormControl(''),
      coApplicantLastName: this.coApplicantFlag
        ? new FormControl(
            {
              disabled: this.viewMode,
              value: this.loanApplicationFormData.lastName
            },
            [Validators.required]
          )
        : new FormControl(''),
      // active: new FormControl(this.loanApplicationFormData.active, [
      //   Validators.required
      // ]),
      formData: this.getFormDataControl(),
      coApplicantFormData: this.coApplicantFlag
        ? this.getFormDataControl('coApplicantFormData')
        : new FormArray([])
    });
  }

  rebuildFormData() {
    this.buildSectionsForLoanApplicationType();
    this.buildFieldsForLoanApplicationType();
    this.sectionsForLoanApplicationType = this.sectionsForLoanApplicationType.filter(
      section => this.getFieldsForSection(section).length
    );
    this.loanApplicationForm.setControl('formData', this.getFormDataControl());
    this.rebuildCoApplicantFormData();
  }

  rebuildCoApplicantFormData() {
    if (this.coApplicantFlag) {
      this.loanApplicationForm.setControl(
        'coApplicantFormData',
        this.getFormDataControl('coApplicantFormData')
      );
      this.loanApplicationForm.setControl(
        'coApplicantFirstName',
        new FormControl(
          {
            disabled: this.viewMode,
            value: this.loanApplicationFormData.coApplicantFirstName
          },
          [Validators.required]
        )
      );
      this.loanApplicationForm.setControl(
        'coApplicantMiddleName',
        new FormControl({
          disabled: this.viewMode,
          value: this.loanApplicationFormData.coApplicantMiddleName
        })
      );
      this.loanApplicationForm.setControl(
        'coApplicantLastName',
        new FormControl(
          {
            disabled: this.viewMode,
            value: this.loanApplicationFormData.coApplicantLastName
          },
          [Validators.required]
        )
      );
    } else {
      this.loanApplicationForm.setControl(
        'coApplicantFormData',
        new FormArray([])
      );
      this.loanApplicationForm.setControl(
        'coApplicantFirstName',
        new FormControl('')
      );
      this.loanApplicationForm.setControl(
        'coApplicantMiddleName',
        new FormControl('')
      );
      this.loanApplicationForm.setControl(
        'coApplicantLastName',
        new FormControl('')
      );
    }
  }

  getFormDataControl(type = 'formData') {
    if (
      this.loanApplicationFormData[type] &&
      this.loanApplicationFormData[type].length
    ) {
      this.sectionsForLoanApplicationType = this.loanApplicationFormData[
        type
      ].map(section => ({
        _id: section._id,
        sequenceNo: section.sequenceNo,
        loanApplicationTypes: [],
        name: section.name,
        active: true
      }));
      this.fieldsForLoanApplicationType = [];
      this.loanApplicationFormData[type].forEach(section => {
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
                                    loanApplicationType: new FormControl(
                                      score.loanApplicationType._id
                                    ),
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

  toggleCoApplicantFlag() {
    this.coApplicantFlag = !this.coApplicantFlag;
    this.rebuildCoApplicantFormData();
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

  get coApplicantFirstName() {
    return this.loanApplicationForm.get('coApplicantFirstName');
  }

  get coApplicantLastName() {
    return this.loanApplicationForm.get('coApplicantLastName');
  }

  get loanApplicationType() {
    return this.loanApplicationForm.get('loanApplicationType');
  }

  get formData() {
    return <FormArray>this.loanApplicationForm.get('formData');
  }

  get coApplicantFormData() {
    return <FormArray>this.loanApplicationForm.get('coApplicantFormData');
  }

  confirmSubmitHandler = () => {
    const formData = {
      ...this.loanApplicationFormData,
      ...this.loanApplicationForm.value
    };
    if (!formData.loanApplicationTypeName) {
      formData.loanApplicationTypeName = this.selectedLoanApplicationType.name;
    }
    this.submitForm(formData);
    this.showConfirmationModal = false;
  };

  cancelSubmitHandler = () => {
    this.showConfirmationModal = false;
  };

  submitFormHandler() {
    this.showConfirmationModal = true;
  }
}
