export interface EspSensorReadings {
  greenhouseId: number;
  readings: {
    [sensorId: string]: number;
  };
  devicesState: {
    [deviceId: string]: boolean;
  };
}