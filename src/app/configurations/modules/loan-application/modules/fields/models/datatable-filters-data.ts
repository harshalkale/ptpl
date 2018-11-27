import { LoanApplicationType } from '../../../../../../shared/models/loan-application-type';
import { Section } from '../../../../../../shared/models/section';

export interface DatatableFiltersData {
  label?: string;
  active?: boolean;
  sections?: Section[];
  loanApplicationTypes?: LoanApplicationType[];
}
