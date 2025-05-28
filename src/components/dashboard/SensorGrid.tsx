import SensorCard from './SensorCard';
import { Modal } from '@mui/material';
import ExpandedSensorCard from './ExpandedSensorCard';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useRef, useState } from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import axios, { AxiosError } from 'axios';
import { Sensor } from '../../types/sensor';
import { useSensorMinMax } from '../../hooks/DashboardHooks';
import { toast } from 'sonner';
import { convertDistanceToLiters } from '../../helpers/waterLevelHelper';

export interface minMaxData {
  sensorId: number;
  min: number;
  max: number;
  hasData: boolean;
  readingsCount: number;
}

const SensorGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [expandedSensor, setExpandedSensor] = useState<Sensor | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const { currentSensorReading, currentGreenhouse } = useDashboard();

  const modalRef = useRef<HTMLDivElement | null>(null);

  const baseUrl = `${import.meta.env.VITE_BASE_URL}/sensors?greenhouseId=${currentGreenhouse!.id}`;

  const { minMaxData } = useSensorMinMax(currentGreenhouse!.id, undefined, timeRange, true);

  useEffect(() => {
    if (!minMaxData || !Array.isArray(minMaxData) || sensors.length === 0) return;

    const sensorsNoData = minMaxData
      .filter((item: minMaxData) => item.hasData === false)
      .map((item: minMaxData) => item.sensorId);

    if (sensorsNoData.length === 0) return;

    const sensorsNoDataNames = sensors
      .filter((sensor) => sensorsNoData.includes(sensor.id))
      .map((sensor) => sensor.name);

    if (sensorsNoData.length === sensors.length) {
      setTimeRange('7d');
      toast.warning("In ultimele 24h nu exista nicio citire pentru niciun senzor.", 
        {
          description: "Verifica conexiunea la internet sau starea senzorilor.",
          position: "top-center"
        }
      );
      toast.info("Au fost aduse inregistarile din ultimele 7 zile.", 
        {
          position: "top-center"
        }
      );
    } else {
      toast.warning(
        `In ultimele 24h nu exista citiri pentru senzorii: ${sensorsNoDataNames.join(", ")}.`,
        {
          description: "Verifica conexiunea la internet sau starea senzorilor.",
          position: "top-center"
        }
      );
  }
}, [minMaxData, sensors]);

  useEffect(() => {
    if (currentSensorReading) {
      setIsLoading(false);
    }
  }, [currentSensorReading]);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const res = await axios.get(baseUrl, {
          withCredentials: true,
        });
        const data = res.data;
        setSensors(data);
      } catch (error: AxiosError | any) {
        console.error(error.response.data.message);
      }
    };

    fetchSensors();
  }, []);

  useEffect(() => {
    if (!expandedSensor) {
      setExpandedSensor(null);
    }
  }, [expandedSensor]);

  const handleClose = () => {
    setExpandedSensor(null);
  };

  const getSensorValue = (sensorId: number) => {
    const rawValue = currentSensorReading?.readings?.[sensorId] ?? 0;
    const sensor = sensors.find((s) => s.id === sensorId);

    if (!sensor) return rawValue;

    if (sensor.type === 'water_level') {
      return convertDistanceToLiters(
        rawValue,
        sensor.height_cm,
        sensor.width_cm,
        sensor.length_cm,
        sensor.radius_cm
      );
    }

    return rawValue
  };

  return (
    <>
      <div className='sensor-cards-grid'>
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.id}
            sensor={sensor}
            setExpandedSensor={setExpandedSensor}
            value={getSensorValue(sensor.id)}
            minMaxData={minMaxData.find((item:minMaxData) => item.sensorId === sensor.id)}
          />
        ))}
      </div>

      {expandedSensor && (
        <Modal
          open={!!expandedSensor}
          onClose={handleClose}
        >
          <div>
            <ExpandedSensorCard
              ref={modalRef}
              setExpandedSensor={setExpandedSensor}
              expandedSensor={expandedSensor}
              value={getSensorValue(expandedSensor.id)}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default SensorGrid;