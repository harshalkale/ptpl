import { LoanApplicationType } from './loan-application-type';

export interface LoanApplication {
  _id?: string;
  applicationId: string;
  loanApplicationType: LoanApplicationType;
  firstName: string;
  middleName: string;
  lastName: string;
  coApplicant: boolean;
  formData: any;
  active: boolean;
}
