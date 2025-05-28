import { Expand, Thermometer, Droplets, Sun} from 'lucide-react'
import { Sensor } from '../../types/sensor'
import { minMaxData } from './SensorGrid'

interface SensorCardProps{
  sensor: Sensor,
  value: number,
  setExpandedSensor: (value: Sensor | null) => void
  minMaxData: minMaxData
}

const SensorCard = ({sensor, value, setExpandedSensor, minMaxData}: SensorCardProps ) => {

    const {type, unit} = sensor;
    const formatType = type.charAt(0).toUpperCase() + type.slice(1);

    const selectIcon = (type: string) => {
        switch(type){
            case 'temperature':
                return <Thermometer size='24' color={`var(--${type}-color)`}/>;
            case 'humidity':
                return <Droplets size='24' color={`var(--${type}-color)`}/>;
            case 'light':
                return <Sun size='24' color={`var(--${type}-color)`}/>;
            default:
                return <Thermometer size='24' color={`var(--${type}-color)`}/>;
        }
    }

  return (
        <div className='card sensor-card' style={{backgroundColor: `var(--${type}-color-light)`, borderColor: `var(--${type}-color)`}}>
            <div className='card-header'>
                <div className="left">
                    {selectIcon(type)}
                    <h4>{formatType}</h4>
                </div>
                <Expand
                    size='16'
                    onClick={() => {
                        setExpandedSensor(sensor);
                    }}
                    className="expand-icon"
                />
            </div>
            <div className="card-sub-header">
                <h5>Device: {sensor.name} </h5>
            </div>
            <div className='card-body'>
            <h1 style={{color: `var(--${type}-color)`}}>
                    {value}{unit}
                </h1>
            </div>
            <div className='card-footer'>
                <p>Min: {minMaxData.min}{unit}</p>
                <p>Max: {minMaxData.max}{unit}</p>
            </div>
        </div>
  )
}

export default SensorCard