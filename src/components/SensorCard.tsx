import { Expand, Thermometer, Droplets, Sun} from 'lucide-react'



interface SensorCardProps{
  type: string,
  setIsExpanded: (value: boolean) => void
}

const SensorCard = ({type, setIsExpanded}: SensorCardProps ) => {

    const value = 25;
    const unit = '°C';
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
                    onClick={() => setIsExpanded(true)}
                    className="expand-icon"
                />
            </div>
            <div className="card-sub-header">
                <h5>Device: Sensor 1 </h5>
            </div>
            <div className='card-body'>
            <h1 style={{color: `var(--${type}-color)`}}>
                    {value}{unit}
                </h1>
            </div>
            <div className='card-footer'>
                <p>Min: {value-5}{unit}</p>
                <p>Max: {value+2}{unit}</p>
            </div>
        </div>
  )
}

export default SensorCard