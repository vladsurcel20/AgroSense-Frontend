export interface ControlDevice {
  id: number;
  name: string;
  type: string;
  localization?: string | null;
  state?: boolean | null;
  greenhouseId?: number | null;
  userId: number;
  lastActivity?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}