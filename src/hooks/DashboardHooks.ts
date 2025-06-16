import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSensorChartData = (sensorId: number, period: string) => {
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/sensor_readings/chart`, {
          params: { sensorId, period },
          withCredentials: true
        });
        setChartData(res.data);
      } catch (error) {
        console.error('Failed to fetch chart data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [sensorId, period]);

  return { chartData, loading };
};



export const useSensorMinMax = (greenhouseId: number, sensorId?: number, period: string = '24h', all: boolean = false) => {
  const [minMaxData, setMinMaxData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinMaxData = async () => {
      try {
        const params: any = { period };
        
        if (sensorId && !all) {
          params.sensorId = sensorId;
        }
        
        if (all && !sensorId) {
          params.all = 'true';
        }

        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/sensor_readings/${greenhouseId}/minmax`, {
          params,
          withCredentials: true
        });
        
        setMinMaxData(res.data);
      } catch (error) {
        console.error('Failed to fetch min/max data', error);
      } finally {
        setLoading(false);
      }
    };

    if (greenhouseId) {
      fetchMinMaxData();
    }
  }, [greenhouseId, sensorId, period, all]);

  return { minMaxData, loading };
};
