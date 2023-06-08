import { Role } from "../enum/role";
import { UserStatus } from "../enum/user-status";

export interface User {
  id: number;
  name: string;
  surname: string;
  birthday: Date;
  role: Role;
  status: UserStatus;
  activityCount: number;
}
