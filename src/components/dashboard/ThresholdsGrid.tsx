import { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import axios, { AxiosError } from "axios";
import { Sensor } from "../../types/sensor";
import ThresholdCard from "./ThresholdCard";
import { Culture } from "../../types/culture";

const ThresholdsGrid = () => {

  const { currentGreenhouse } = useDashboard();
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const baseUrl = `http://localhost:5000/api/sensors?greenhouseId=${currentGreenhouse!.id}`;
  // const [thresholds, setThresholds] = useState<Culture>();
  // const baseUrl = `http://localhost:5000/api/cultures/${currentGreenhouse!.cultureId}`

  // useEffect(() => {
  //   if (currentSensorReading) {
  //     setIsLoading(false);
  //   }
  // }, [currentSensorReading]);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const res = await axios.get(baseUrl, {
          withCredentials: true,
        });
        const data = res.data;
        const uniqueMap = new Map<string, Sensor>();
        data.forEach((sensor: Sensor) => {
          const key = `${sensor.type}-${sensor.localization}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, sensor);
          }
        });
        setSensors(Array.from(uniqueMap.values()));
      } catch (error: AxiosError | any) {
        console.error(error.response.data.message);
      }
    };

    fetchSensors();
  }, []);

  //   useEffect(() => {
  //   const fetchThresholds = async () => {
  //     try {
  //       const res = await axios.get(baseUrl, {
  //         withCredentials: true,
  //       });
  //       const thresholdsData = res.data;
  //       setThresholds(thresholdsData);
  //     } catch (error: AxiosError | any) {
  //       console.error(error.response.data.message);
  //     }
  //   };

  //   fetchThresholds();
  // }, []);


  return (
    <div className='sensor-cards-grid'>
        {sensors.map((sensor: Sensor) => (
          <ThresholdCard
            key={sensor.id}
            type={sensor.type}
          />
        ))}
    </div>
  )
}

export default ThresholdsGrid