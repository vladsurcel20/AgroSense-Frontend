import { Expand, Thermometer, Droplets, Sun, Waves} from 'lucide-react'
import { Sensor } from '../../types/sensor'
import { minMaxData } from './SensorGrid'

interface SensorCardProps{
  sensor: Sensor,
  value: number,
  setExpandedSensor: (value: Sensor | null) => void
  minMaxData: minMaxData
}

const SensorCard = ({sensor, value, setExpandedSensor, minMaxData}: SensorCardProps ) => {

    const {type, unit, localization} = sensor;
    const formatLocalization = localization?.charAt(0).toUpperCase() + localization?.slice(1);

    const formatTypeName = (type: string): string => {
        return type
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

     const formatType = formatTypeName(type)

    const selectIcon = (type: string) => {
        switch(type){
            case 'temperature':
                return <Thermometer size='24' color={`var(--${type}-color)`}/>;
            case 'humidity':
                return <Droplets size='24' color={`var(--${type}-color)`}/>;
            case 'light':
                return <Sun size='24' color={`var(--${type}-color)`}/>;
            case 'water_level':
                return <Waves  size='24' color={`var(--humidity-color)`}/>;
            default:
                return <Thermometer size='24' color={`var(--${type}-color)`}/>;
        }
    }

  return (
        <div className='card sensor-card' style={ type!=="water_level" ? {backgroundColor: `var(--${type}-color-light)`, borderColor: `var(--${type}-color)`} 
            : {backgroundColor: `var(--humidity-color-light)`, borderColor: `var(--humidity-color)`}
        }>
            <div className='card-header'>
                <div className="left">
                    {selectIcon(type)}
                    <h4>{formatType} {formatLocalization ? formatLocalization : ''}</h4>
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
                <h1 style={ type!=="water_level" ? {color: `var(--${type}-color)`} : {color: `var(--humidity-color)`}}>
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