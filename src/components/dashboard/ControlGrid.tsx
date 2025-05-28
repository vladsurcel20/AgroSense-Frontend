import { Modal } from '@mui/material';
// import expandedDeviceCard from './expandedDeviceCard';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useRef, useState } from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import axios, { AxiosError } from 'axios';
import { ControlDevice } from '../../types/controlDevice';
import ControlCard from './ControlCard';

const ControlGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState<ControlDevice[]>([]);
  const [expandedDevice, setExpandedDevice] = useState<ControlDevice | null>(null);
  const { currentGreenhouse } = useDashboard();

  // const modalRef = useRef<HTMLDivElement | null>(null);

  const baseUrl = `http://localhost:5000/api/devices?greenhouseId=${currentGreenhouse!.id}`;


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

  const handleClose = () => {
    setExpandedDevice(null);
  };

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

      {/* {expandedDevice && (
        <Modal
          open={!!expandedDevice}
          onClose={handleClose}
        >
          <ExpandedDeviceCard
            ref={modalRef}
            setexpandedDevice={setexpandedDevice}
            expandedDevice={expandedDevice}
            value={getSensorValue(expandedDevice.id)}
          />
        </Modal>
      )} */}
    </>
  );
};

export default ControlGrid;