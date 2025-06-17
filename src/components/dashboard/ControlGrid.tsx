import { useEffect, useState } from 'react';
import ControlCard from './ControlCard';
import { ControlDevice } from '../../types/controlDevice';
import axios, { AxiosError } from 'axios';
import { useDashboard } from '../../contexts/DashboardContext';

const ControlGrid = () => {
  const [devices, setDevices] = useState<ControlDevice[]>([]);
  const [expandedDevice, setExpandedDevice] = useState<ControlDevice | null>(null);
  const { currentGreenhouse } = useDashboard();

  const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/devices?greenhouseId=${currentGreenhouse!.id}`;

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await axios.get(baseUrl, {
          withCredentials: true,
        });
        const data = res.data;
        setDevices(data);
      } catch (error: AxiosError | any) {
        console.error(error.response.data.message);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    if (!expandedDevice) {
      setExpandedDevice(null);
    }
  }, [expandedDevice]);

  return (
    <>
      <div className='sensor-cards-grid'>
        {devices.map((device) => (
          <ControlCard
            key={device.id}
            device={device}
            setExpandedDevice={setExpandedDevice}
          />
        ))}
      </div>
    </>
  );
};

export default ControlGrid;