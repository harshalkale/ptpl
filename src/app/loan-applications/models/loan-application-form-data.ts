export interface LoanApplicationFormData {
  _id?: string;
  applicationId: string;
  loanApplicationType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  coApplicant: boolean;
  coApplicantFirstName?: string;
  coApplicantMiddleName?: string;
  coApplicantLastName?: string;
  formData: any;
  coApplicantFormData?: any;
  active: boolean;
}
