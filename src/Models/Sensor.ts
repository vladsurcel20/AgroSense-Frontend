interface Sensor {
    id: number;
    name: string;
    type: string;
    value: number; 
    unit: string;
    min: number;
    max: number;
    device: string;
}
export default Sensor;