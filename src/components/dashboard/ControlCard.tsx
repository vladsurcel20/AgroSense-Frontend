import { Thermometer, Droplets, Sun, Fan } from 'lucide-react'
import { useEffect, useState } from 'react';
import CustomSwitch from '../material/CustomSwitch';
import { ControlDevice } from '../../types/controlDevice';
import { useSocket } from '../../services/WebSocketService'
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import { useDashboard } from '../../contexts/DashboardContext';

interface ControlCardProps{
  device: ControlDevice,
  setExpandedDevice?: (value: ControlDevice | null) => void 
}
    
const ControlCard = ({device}: ControlCardProps) => {

    const { currentSensorReading } = useDashboard();

    const initialState = currentSensorReading?.devicesState?.[device.type] !== undefined
        ? Boolean(currentSensorReading.devicesState[device.type])
        : Boolean(device.state);

    const [isOn, setIsOn] = useState<boolean>(initialState);
    const [isLoading, setIsLoading] = useState(false)
    const { type } = device;
    const typeFirstDisplay = type.split('_')[0] === "water" ? "humidity" : type.split('_')[0];
    const { sendCommand } = useSocket()

    useEffect(() => {
        if (currentSensorReading?.devicesState?.[device.type] !== undefined) {
            setIsOn(Boolean(currentSensorReading.devicesState[device.type]));
        } else {
            if (device.state) setIsOn(Boolean(device.state));
        }
    }, [currentSensorReading, device.type, device.state]);

    const updateDevice = async (newState: boolean) => {
        try{
            await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/devices/${device.id}`, {
                state: newState,
                lastActivity: Date.now() 
            }, {
                withCredentials: true
            })
        } catch (error: AxiosError | any) {
            console.error('Error updating device:', error.response?.data?.message || error.message);
            throw error; 
        }
    }

    const postCommand = async (newState: boolean) => {
        try{
            const payload = {
                command: newState ? 'on' : 'off',
                recordedAt: Date.now(),
                deviceId: device.id,
                initiatedBy: "manual"
            };

            console.log(payload)

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/device_commands`, payload, {
                withCredentials: true
            })
        } catch (error: AxiosError | any) {
            console.error('Error posting command:', error.response?.data?.message || error.message);
            throw error; 
        }
    } 

    const handleToggle = async () => {
        if (isLoading) return; 

        setIsLoading(true);
        const newState = !isOn;
        const previousState = isOn; 
        let deviceUpdated = false;
        setIsOn(newState);
        try {
            // 2. Trimite comanda prin socket
            const command = {
                deviceType: type, 
                action: newState ? 'on' : 'off',
                read_now: true
                // Poți adăuga parametri specifici dacă e necesar
                // params: { 
                //   duration: 300, // pentru pompă
                //   intensity: 100 // pentru lumini
                // }
            };

            sendCommand(command);            
            await updateDevice(newState); 
            deviceUpdated = true;           
            await postCommand(newState);
            
            console.log(`✅ Comandă procesată cu succes pentru ${device.name}:`, command);
            toast.success(`Comandă trimisă cu succes pentru ${device.name}`);
            
        } catch (error) {
            if (!deviceUpdated) {
                setIsOn(previousState);
                toast.error(`Comandă esuată pentru ${device.name}`);
            } else {
                toast.error(`Command sent but failed to update device state for ${device.name}`);
            }
        } finally {
            setIsLoading(false);
        }
    };


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
            case 'fan':
                return <Fan size='24' color={isOn ? `var(--green-card-text)` : 'var(--off-color)'}/>;
            default:
                return <Thermometer size='24' color={isOn ? `var(--${typeFirstDisplay}-color)` : 'var(--off-color)'}/>;
        }
    }
    
  return (
        <div className='card sensor-card control-card' 
            style={typeFirstDisplay !== 'fan' ? {backgroundColor: `var(--${typeFirstDisplay}-color-control)`, 
            borderColor: `var(--${typeFirstDisplay}-color-control-border)`} : 
            { backgroundColor: `var(--green-card-background)`, borderColor: `var(--green-card-border)`}}>
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
                <CustomSwitch className="switch" onChange={handleToggle} checked={isOn} disabled={isLoading}/>
            </div>
        </div>
  )
}

export default ControlCard;