export interface User {
    id: number;
    username?: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId?: number;
    isActive?: boolean;
  }