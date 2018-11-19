import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor() {}
  sections = [
    'PERSONAL INFORMATION',
    'OTHER INFORMATION',
    'OCCUPATION & INCOME',
    'SCHEME SPECIFIC PARAMETERS'
  ];
  currentSectionIdx = 0;

  applicationTypes = ['VEHICLE', 'HOUSING'];
  currentApplicationTypeIdx = 0;

  personTypes = ['SALARIED', 'SELF-EMPLOYED / PROFESSIONALS'];
  currentPersonTypeIdx = '';
  personTypeDesignations = [
    // SALARIED
    ['EXECUTIVE / SENIOR MANAGER', 'OFFICER', 'SALARIED-OTHERS'],
    // SELF-EMPLOYED / PROFESSIONALS
    [
      'MAJORITY STAKEHOLDER OF THE CONCERN',
      'MINORITY STAKEHOLDER',
      'SELF-EMPLOYED / PROFESSIONALS-OTHERS'
    ]
  ];

  applicantData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl('', []),
    lastName: new FormControl('', [Validators.required])
  });

  otherData = new FormGroup({
    coApplicant: new FormControl('', []),
    ageCriteria: new FormControl('', []),
    educationalQualification: new FormControl('', []),
    designation: new FormControl('', []),
    familyCompositionDependant: new FormControl('', []),
    // other info
    propertyOwned: new FormControl('', []),
    vehiclesOwned: new FormControl('', []),
    netAssets: new FormControl('', []),
    depositPositionPotential: new FormControl('', []),
    existingBorrowingArra: new FormControl('', []),
    recoveryOfInstallments: new FormControl('', []),
    // occup & inc
    lengthOfService: new FormControl('', []),
    periodInBusinessProfession: new FormControl('', []),
    employmentDetails: new FormControl('', []),
    ownIncome: new FormControl('', []),
    spousesIncome: new FormControl('', []),
    installmentToIncomeRatio: new FormControl('', []),

    // applicationType = VELICLE
    typeOfVehicle: new FormControl('', []),
    valueOfVehicle: new FormControl('', []),
    vRepayment: new FormControl('', []),
    vPurposeOfLoan: new FormControl('', []),

    // applicationType = HOUSING
    locationOfTheProperty: new FormControl('', []),
    valueOfTheProperty: new FormControl('', []),
    hRepayment: new FormControl('', []),
    hPurposeOfLoan: new FormControl('', [])
  });

  applicationForm = new FormGroup({
    // loan info
    loanApplicationNo: new FormControl('', [Validators.required]),
    applicationType: new FormControl(
      this.applicationTypes[this.currentApplicationTypeIdx],
      [Validators.required]
    ),
    // personal info
    applicantData: this.applicantData,
    otherData: this.otherData
  });

  prevSection = () => this.currentSectionIdx--;
  nextSection = () => this.currentSectionIdx++;
  changeApplicationType = event => {
    this.currentApplicationTypeIdx = parseFloat(event.target.value);
    switch (this.currentApplicationTypeIdx) {
      case 0: {
        this.applicationForm.patchValue({
          locationOfTheProperty: '',
          valueOfTheProperty: '',
          hRepayment: '',
          hPurposeOfLoan: ''
        });
        break;
      }
      case 1: {
        this.applicationForm.patchValue({
          typeOfVehicle: '',
          valueOfVehicle: '',
          vRepayment: '',
          vPurposeOfLoan: ''
        });
        break;
      }
      default: {
        this.applicationForm.patchValue({
          locationOfTheProperty: '',
          valueOfTheProperty: '',
          hRepayment: '',
          hPurposeOfLoan: '',
          typeOfVehicle: '',
          valueOfVehicle: '',
          vRepayment: '',
          vPurposeOfLoan: ''
        });
        break;
      }
    }
  };
  changePersonType = event => {
    const currentPersonTypeIdx = this.personTypeDesignations.reduce(
      (acc, val, idx) => {
        if (val.indexOf(event.target.value) >= 0) {
          acc = idx.toString();
        }
        return acc;
      },
      ''
    );
    this.currentPersonTypeIdx = currentPersonTypeIdx;
    switch (this.currentPersonTypeIdx) {
      case '0': {
        this.applicationForm.patchValue({
          periodInBusinessProfession: '',
          employmentDetails: ''
        });
        break;
      }
      case '1': {
        this.applicationForm.patchValue({
          lengthOfService: '',
          employmentDetails: ''
        });
        break;
      }
      default: {
        this.applicationForm.patchValue({
          lengthOfService: '',
          periodInBusinessProfession: '',
          employmentDetails: ''
        });
        break;
      }
    }
  };

  ngOnInit() {}
}
