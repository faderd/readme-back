import { UserRole } from './user-role.enum';

export interface UserInterface {
  _id?: string;
  dateRegistration: Date;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  passwordHash: string;
  role: UserRole;
}
