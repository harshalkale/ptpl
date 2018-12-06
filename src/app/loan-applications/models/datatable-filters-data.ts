import { LoanApplicationType } from '../../shared/models/loan-application-type';

export interface DatatableFiltersData {
  applicationId?: string;
  name?: string;
  loanApplicationTypes?: LoanApplicationType[];
  // active?: boolean;
}
