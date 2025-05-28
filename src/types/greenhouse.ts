import { Culture } from "./culture";

export interface Greenhouse {
    id: number;
    name: string;
    cultureId: string;
    status: string;
    isActive: boolean;
    locationId: number;
    lastVisited: Date;
    sensorCount?: number; 
    deviceCount?: number; 
    culture?: Culture;
  }