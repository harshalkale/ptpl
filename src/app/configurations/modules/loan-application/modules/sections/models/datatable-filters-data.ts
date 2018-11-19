import { LoanApplicationType } from '../../../../../../shared/models/loan-application-type';

export interface DatatableFiltersData {
  name?: string;
  loanApplicationTypes?: LoanApplicationType[];
  active?: boolean;
}
