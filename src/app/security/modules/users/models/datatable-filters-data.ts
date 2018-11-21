import { Role } from '../../../../shared/models/role';

export interface DatatableFiltersData {
  username?: string;
  roles?: Role[];
  active?: string;
}
