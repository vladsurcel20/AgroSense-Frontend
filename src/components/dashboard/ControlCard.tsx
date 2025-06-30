import { Thermometer, Droplets, Sun, Fan } from 'lucide-react'
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation();

    const [isOn, setIsOn] = useState<boolean>(Boolean(device.state));
    const [isLoading, setIsLoading] = useState(false)
    const { currentGreenhouse, setCurrentGreenhouse } = useDashboard();    
    const { type } = device;
    const typeFirstDisplay = type.split('_')[0] === "water" ? "humidity" : type.split('_')[0];
    const { sendCommand } = useSocket()
    const { currentSensorReading } = useDashboard();

    useEffect(() => {
        setIsOn(Boolean(device.state));
    }, [device.state]);

    // useEffect(() => {
    //     const deviceReading = currentSensorReading?.devicesState[device.type];
    //     if (deviceReading && typeof deviceReading !== "undefined") {
    //         if (Boolean(deviceReading) !== isOn) {
    //             setIsOn(Boolean(deviceReading));
    //         }
    //     }
    // }, [currentSensorReading, device.id, isOn]);

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

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/device_commands`, payload, {
                withCredentials: true
            })
        } catch (error: AxiosError | any) {
            console.error('Error posting command:', error.response?.data?.message || error.message);
            throw error; 
        }
    } 

    const toggleOffAutoMode = async (): Promise<boolean> => {
        if (!currentGreenhouse) return false;
        
        try {
        const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/greenhouses/${currentGreenhouse.id}`;
        await axios.patch(baseUrl, { autoControlEnabled: false }, { withCredentials: true });
        
        setCurrentGreenhouse(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                autoControlEnabled: false
            };
        });
        
        return true;
        } catch (error) {
            console.error('Error toggling auto mode:', error);
            return false;
        }
    };

    const handleToggle = async () => {
        if (isLoading) return; 

        setIsLoading(true);
        const newState = !isOn;
        const previousState = isOn; 

        try {
            const command = {
                deviceType: type, 
                action: newState ? 'on' : 'off',
                read_now: true
            };

            sendCommand(command, async (response) => {
                try {
                    if (response.success) {
                        setIsOn(newState);
                        await updateDevice(newState);
                        await postCommand(newState);
                        console.log(`✅ Comandă procesată cu succes pentru ${device.name}:`, response);
                        toast.success(`Comandă trimisă cu succes pentru ${device.name}`);
                    } else {
                        setIsOn(previousState);
                        toast.error(`Comandă esuată pentru ${device.name}`);
                    }
                } catch (error) {
                    console.error('Error updating device:', error);
                    setIsOn(previousState);
                    toast.error(`Command sent but failed to update device state for ${device.name}`);
                } finally {
                    setIsLoading(false);
                }
            });
            toggleOffAutoMode();

        } catch (error) {
            console.error('Error in handleToggle:', error);
            setIsOn(previousState);
            toast.error(`Comandă esuată pentru ${device.name}`);
            setIsLoading(false);
        }
    };


    const formatTypeName = (type: string) => t(`deviceNames.${type}`, type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));

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
                    <h4>
                        {t(`deviceNames.${device.name}`, { defaultValue: device.name })}
                    </h4>
                </div>
            </div>
            <div className="card-sub-header">
                <h5>{t('deviceLabels.device')}: {formatTypeName(type)} </h5>
            </div>
            <div className='card-body'>
                <h3 style={{ color: isOn ? "var(--on-color)" : "var(--off-color)" }}>{isOn ? "ON" : "OFF"}</h3>
                <CustomSwitch className="switch" onChange={handleToggle} checked={isOn} disabled={isLoading}/>
            </div>
        </div>
  )
}

export default ControlCard;