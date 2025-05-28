export interface Sensor {
    id: number;
    name: string;
    type: string;
    localization: string;
    unit: string;
    greenhouseId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }