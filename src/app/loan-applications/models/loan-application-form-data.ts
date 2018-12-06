export interface LoanApplicationFormData {
  _id?: string;
  applicationId: string;
  loanApplicationType: string;
  firstName: string;
  middleName: string;
  lastName: string;
  coApplicant: boolean;
  formData: any;
  active: boolean;
}
