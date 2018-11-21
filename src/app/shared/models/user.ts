import { Role } from './role';

interface Auth {
  username: string;
  password: string;
}

export interface User {
  _id?: string;
  auth: Auth;
  role: Role;
  active: boolean;
}
