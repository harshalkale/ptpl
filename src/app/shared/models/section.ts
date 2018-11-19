import { LoanApplicationType } from './loan-application-type';

export interface Section {
  _id?: string;
  sequenceNo: number;
  name: string;
  loanApplicationTypes?: Array<LoanApplicationType>;
  active: boolean;
}
