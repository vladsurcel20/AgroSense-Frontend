export interface Sensor {
    id: number;
    name: string;
    type: string;
    localization: string;
    unit: string;
    height_cm: number;
    width_cm: number;
    length_cm: number;
    radius_cm: number;
    greenhouseId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }