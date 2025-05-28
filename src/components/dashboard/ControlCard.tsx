import { Expand, Thermometer, Droplets, Sun} from 'lucide-react'
import { useState } from 'react';
import CustomSwitch from '../material/CustomSwitch';
import { ControlDevice } from '../../types/controlDevice';

interface ControlCardProps{
  device: ControlDevice,
  setExpandedDevice: (value: ControlDevice | null) => void
}

const ControlCard = ({device, setExpandedDevice}: ControlCardProps) => {

    const [isOn, setIsOn] = useState(false);
    const { type } = device;
    const typeFirstDisplay = type.split('_')[0] === "water" ? "humidity" : type.split('_')[0];


    const formatTypeName = (type: string) => {
        return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const selectIcon = (typeFirst: string, isOn?: boolean) => {
        switch(typeFirst){
            case 'temperature':
                return <Thermometer size='24' color={isOn ? `var(--${typeFirstDisplay}-color)` : 'var(--off-color)'}/>;
            case 'humidity':
                return <Droplets size='24' color={isOn ? `var(--${typeFirstDisplay}-color)` : 'var(--off-color)'}/>;
            case 'light':
                return <Sun size='24' color={isOn ? `var(--${typeFirstDisplay}-color)` : 'var(--off-color)'}/>;
            default:
                return <Thermometer size='24' color={isOn ? `var(--${typeFirstDisplay}-color)` : 'var(--off-color)'}/>;
        }
    }
    
  return (
        <div className='card sensor-card control-card' 
            style={{backgroundColor: `var(--${typeFirstDisplay}-color-control)`, 
            borderColor: `var(--${typeFirstDisplay}-color-control-border)`}}>
            <div className='card-header'>
                <div className="left">
                    {selectIcon(typeFirstDisplay, isOn)}
                    <h4>{device.name}</h4>
                </div>
                {/* <Expand
                    size='16'
                    className="expand-icon"
                /> */}
            </div>
            <div className="card-sub-header">
                <h5>Device: {formatTypeName(type)} </h5>
            </div>
            <div className='card-body'>
                <h3 style={{ color: isOn ? "var(--on-color)" : "var(--off-color)" }}>{isOn ? "ON" : "OFF"}</h3>
                <CustomSwitch className="switch" onChange={() => setIsOn(!isOn)} checked={isOn}/>
            </div>
        </div>
  )
}

export default ControlCard