import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanApplication } from 'src/app/shared/models/loan-application';

@Component({
  selector: 'app-loan-application-print',
  templateUrl: './loan-application-print.component.html',
  styleUrls: ['./loan-application-print.component.css']
})
export class LoanApplicationPrintComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  loanApplication: LoanApplication = {
    applicationId: '',
    coApplicant: false,
    active: false,
    firstName: '',
    formData: [],
    lastName: '',
    loanApplicationType: {
      name: '',
      active: false
    },
    loanApplicationTypeName: '',
    middleName: ''
  };

  formDatatable = { formData: [], coApplicantFormData: [] };
  sectionTotals = { formData: [], coApplicantFormData: [] };
  sectionMaxTotals = { formData: [], coApplicantFormData: [] };
  fullTotal = { formData: 0, coApplicantFormData: 0 };
  fullMaxTotal = 0;

  ngOnInit() {
    this.route.data.subscribe((data: { loanApplication }) => {
      if (data.loanApplication) {
        this.loanApplication = data.loanApplication;
        this.buildFormDatatable();
        if (this.loanApplication.coApplicant) {
          this.buildFormDatatable('coApplicantFormData');
        }
      }
    });
  }

  buildFormDatatable(type = 'formData') {
    this.formDatatable[type] = [];
    if (this.loanApplication[type] && this.loanApplication[type].length) {
      this.loanApplication[type]
        .sort((a, b) => a.sequenceNo - b.sequenceNo)
        .forEach(section => {
          this.formDatatable[type].push({
            type: 'section',
            name: section.name
          });
          if (section.fields && section.fields.length) {
            section.fields
              .sort((a, b) => a.sequenceNo - b.sequenceNo)
              .forEach(field => {
                this.formDatatable[type].push({
                  type: 'field',
                  sequenceNo: field.sequenceNo,
                  label: field.label,
                  selectedOption: (
                    (field.options || []).find(
                      option => option._id === field.selectedOption
                    ) || {}
                  ).text
                });
              });
          }
        });
        this.buildSectionTotals(type);
        this.buildSectionMaxTotals(type);
    }
  }

  buildSectionTotals(type = 'formData') {
    this.sectionTotals[type] = [];
    if (this.loanApplication[type] && this.loanApplication[type].length) {
      this.loanApplication[type]
        .sort((a, b) => a.sequenceNo - b.sequenceNo)
        .forEach(section => {
          this.sectionTotals[type].push({
            sequenceNo: section.sequenceNo,
            name: section.name,
            total: (section.fields || []).reduce(
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
                      this.loanApplication.loanApplicationType._id
                  ) || {}
                ).score || 0),
              0
            )
          });
        });
      this.fullTotal[type] = this.getFullTotal(this.sectionTotals[type]);
    }
  }

  buildSectionMaxTotals(type = 'formData') {
    this.sectionMaxTotals[type] = [];
    if (this.loanApplication[type] && this.loanApplication[type].length) {
      this.loanApplication[type]
        .sort((a, b) => a.sequenceNo - b.sequenceNo)
        .forEach(section => {
          this.sectionMaxTotals[type].push({
            sequenceNo: section.sequenceNo,
            name: section.name,
            total: (section.fields || []).reduce(
              (fieldMax, field) =>
                fieldMax +
                field.options.reduce((optionMax, option) => {
                  const optionScore = (
                    option.scores.find(
                      score =>
                        (score.loanApplicationType._id ||
                          score.loanApplicationType) ===
                        this.loanApplication.loanApplicationType._id
                    ) || {}
                  ).score;
                  return optionMax < optionScore ? optionScore : optionMax;
                }, 0),
              0
            )
          });
        });
      this.fullMaxTotal = this.getFullMaxTotal(this.sectionMaxTotals[type]);
    }
  }

  getFullTotal(sectionTotals) {
    return sectionTotals.reduce((acc, val) => (acc += val.total), 0);
  }

  getFullMaxTotal(sectionMaxTotals) {
    return sectionMaxTotals.reduce((acc, val) => (acc += val.total), 0);
  }

  buildName(type = 'primary') {
    const builtName = {
      primary: [
        this.loanApplication.firstName,
        this.loanApplication.middleName,
        this.loanApplication.lastName
      ]
        .filter(name => !!name)
        .join(' '),
      coApplicant: [
        this.loanApplication.coApplicantFirstName,
        this.loanApplication.coApplicantMiddleName,
        this.loanApplication.coApplicantLastName
      ]
        .filter(name => !!name)
        .join(' ')
    };
    return builtName[type];
  }

  getSections(loanApplication) {
    return loanApplication.formData.map(({ name }) => ({ name }));
  }

  print() {
    const printable = document.getElementById('printable').innerHTML;
    const newWindow = window.open('', '_blank');
    const printStyle = `<style>
      .noprint {
          display: none !important;
      }

      *,
      *:before,
      *:after {
          background: transparent !important;
          color: #000 !important; /* Black prints faster */
          -webkit-box-shadow: none !important;
          box-shadow: none !important;
          text-shadow: none !important;
      }

      .lead {
        font-size: 16px;
      }

      .text-right {
        text-align: right;
      }

      .text-center {
        text-align: center;
      }

      /*
      * Printing Tables:
      * http://css-discuss.incutio.com/wiki/Printing_Tables
      */

     table.table.table-bordered {
        width: 100%;
        margin: 0 auto;
        border-spacing: 0px;
        border: 1px solid silver;
        border-bottom: none;
      }

      tr {
          page-break-inside: avoid;
      }

      table.table.table-bordered td {
        border: 1px solid silver;
        border-top: none;
        border-left: none;
        padding: 3px;
        font-size: 10px;
      }

      table.table.table-bordered td:last-child {
        border-right: none;
      }

      table.table.table-borderless {
        width: 100%;
        margin: 0 auto;
        border: none !important;
      }

      table.table.table-borderless td {
        padding: 3px;
        font-size: 10px;
        border: none !important;
      }

      small {
        font-weight: normal;
      }
    </style>`;
    newWindow.document.write(printStyle + printable);
    newWindow.print();
    newWindow.close();
  }
}
