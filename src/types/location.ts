export interface Location {
    id: number;
    name: string;
    address: string;
    city: string;
    userId: number;
    isActive: boolean;
    lastVisited: string;
    greenhouseCount?: number; 
  }