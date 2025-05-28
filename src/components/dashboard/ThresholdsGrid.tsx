import { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import axios, { AxiosError } from "axios";
import { Sensor } from "../../types/sensor";
import ThresholdCard from "./ThresholdCard";
import { Culture } from "../../types/culture";
import { ThresholdConfig, transformThresholdsToArray } from "../../helpers/thresholdToArray";

const ThresholdsGrid = () => {

  const { currentGreenhouse } = useDashboard();

  const [thresholds, setThresholds] = useState<ThresholdConfig[]>();
  const [loading, setLoading] = useState(true);
  const baseUrl = `http://localhost:5000/api/cultures/${currentGreenhouse!.cultureId}`

  useEffect(() => {
    const fetchThresholds = async () => {
      try {
        const res = await axios.get(baseUrl, { withCredentials: true });
        const transformed = transformThresholdsToArray(res.data);
        setThresholds(transformed);
      } catch (error) {
        console.error('Error fetching thresholds:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentGreenhouse?.cultureId) fetchThresholds();
  }, [currentGreenhouse?.cultureId]);

  const handleSave = async (updatedConfig: ThresholdConfig) => {
    try {
      const payload = {
        [updatedConfig.minField]: updatedConfig.minValue,
        [updatedConfig.maxField]: updatedConfig.maxValue
      };
      
      await axios.patch(baseUrl, payload, { withCredentials: true });
      setThresholds(prev => prev?.map(t => 
        t.type === updatedConfig.type ? updatedConfig : t
      ));
    } catch (error) {
      console.error('Error updating thresholds:', error);
    }
  };


  return (
    <div className='threshold-cards-grid'>
        {thresholds?.map((threshold: ThresholdConfig) => (
          <ThresholdCard
            key={threshold?.cropId}
            threshold={threshold}
            // onSave={handleSave}
          />
        ))}
    </div>
  )
}

export default ThresholdsGrid