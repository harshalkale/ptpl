import { LoanApplicationType } from './loan-application-type';
import { Section } from './section';

interface Score {
  loanApplicationType: LoanApplicationType;
  score: number;
}

interface Option {
  _id?: string;
  text: string;
  scores: Score[];
}

export interface Field {
  _id?: string;
  sequenceNo: number;
  label: string;
  section?: Section;
  loanApplicationTypes?: LoanApplicationType[];
  options?: Option[];
  active: boolean;
}
