import React, { useContext, useState, createContext, ReactNode, useEffect } from "react";
import { Location } from "../types/location";
import { Greenhouse } from "../types/greenhouse";
import { EspSensorReadings } from "../types/espSensorReading";
import axios, { AxiosError } from "axios";
import { ThresholdConfig, transformThresholdsToArray } from "../helpers/thresholdToArray";

interface DashboardContext {
  currentLocation: Location | null
  currentGreenhouse: Greenhouse | null
  locations: Location[]
  greenhouses: Greenhouse[]
  searchedLocations: Location[]
  searchedGreenhouses: Greenhouse[]
  currentSensorReading: EspSensorReadings
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>
  setGreenhouses: React.Dispatch<React.SetStateAction<Greenhouse[]>>
  setSearchedLocations: React.Dispatch<React.SetStateAction<Location[]>>
  setSearchedGreenhouses: React.Dispatch<React.SetStateAction<Greenhouse[]>>
  setCurrentLocation: React.Dispatch<React.SetStateAction<Location>>
  setCurrentGreenhouse: React.Dispatch<React.SetStateAction<Greenhouse>>
  setCurrentSensorReading: React.Dispatch<React.SetStateAction<EspSensorReadings>>

  // New threshold editing related properties
  thresholds: ThresholdConfig[] | null
  thresholdsEditable: boolean
  pendingThresholds: ThresholdConfig[] | null
  setThresholdsEditable: (value: boolean) => void
  updateThreshold: (updatedThreshold: ThresholdConfig) => void
  saveThresholds: () => Promise<boolean>
  cancelThresholds: () => void
}

export const DashboardContext = createContext<DashboardContext | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<Location>(() => {
    const saved = sessionStorage.getItem("location");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentGreenhouse, setCurrentGreenhouse] = useState<Greenhouse>(() => {
    const saved = sessionStorage.getItem("greenhouse");
    return saved ? JSON.parse(saved) : null;
  });

  const [locations, setLocations] = useState<Location[]>([])
  const [greenhouses, setGreenhouses] = useState<Greenhouse[]>([])
  const [searchedLocations, setSearchedLocations] = useState<Location[]>([])
  const [searchedGreenhouses, setSearchedGreenhouses] = useState<Greenhouse[]>([])
  const [currentSensorReading, setCurrentSensorReading] = useState<EspSensorReadings>({} as EspSensorReadings)

  // New threshold state
  const [thresholds, setThresholds] = useState<ThresholdConfig[] | null>(null);
  const [thresholdsEditable, setThresholdsEditable] = useState(false);
  const [pendingThresholds, setPendingThresholds] = useState<ThresholdConfig[] | null>(null);

  // Fetch thresholds when greenhouse changes
  useEffect(() => {
    const fetchThresholds = async () => {
      if (!currentGreenhouse?.id) return;
      
      try {
        const baseUrl = `${import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'}/gh_preferences/${currentGreenhouse.id}`;
        const res = await axios.get(baseUrl, { withCredentials: true });
        const transformed = transformThresholdsToArray(res.data);
        setThresholds(transformed);
        setPendingThresholds(null); // Reset pending changes
      } catch (error) {
        console.error('Error fetching thresholds:', error);
      }
    };

    if (currentGreenhouse?.cultureId) fetchThresholds();
  }, [currentGreenhouse?.id, currentGreenhouse?.cultureId]);

  // Update a single threshold (during edit)
  const updateThreshold = (updatedThreshold: ThresholdConfig) => {
    if (!thresholds || !thresholdsEditable) return;

    // Create pending changes if they don't exist yet
    if (!pendingThresholds) {
      setPendingThresholds([...thresholds]);
    }

    // Update the specific threshold in pending changes
    setPendingThresholds(prev => 
      prev?.map(t => 
        (t.type === updatedThreshold.type && t.minField === updatedThreshold.minField) 
          ? updatedThreshold 
          : t
      ) || null
    );
  };

  // Save all threshold changes
  const saveThresholds = async (): Promise<boolean> => {
    if (!currentGreenhouse?.id || !pendingThresholds) return false;
    
    try {
      const baseUrl = `${import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'}/gh_preferences/${currentGreenhouse.id}`;
      
      // Prepare payload with all changed fields
      const payload: Record<string, number> = {};
      pendingThresholds.forEach(threshold => {
        const original = thresholds?.find(t => 
          t.type === threshold.type && t.minField === threshold.minField
        );
        
        if (original?.minValue !== threshold.minValue) {
          payload[threshold.minField] = threshold.minValue;
        }
        
        if (original?.maxValue !== threshold.maxValue) {
          payload[threshold.maxField] = threshold.maxValue;
        }
      });
      
      // Only send request if there are changes
      if (Object.keys(payload).length > 0) {
        await axios.patch(baseUrl, payload, { withCredentials: true });
      }
      
      // Update main thresholds state with pending changes
      setThresholds(pendingThresholds);
      setPendingThresholds(null);
      setThresholdsEditable(false);
      return true;
    } catch (error) {
      console.error('Error saving thresholds:', error);
      return false;
    }
  };

  const cancelThresholds = () => {
    setPendingThresholds(null);
    setThresholdsEditable(false);
  };

  useEffect(() => {
    if (currentLocation) {
      sessionStorage.setItem("location", JSON.stringify(currentLocation));
    }
  }, [currentLocation]);

  useEffect(() => {
    if (currentGreenhouse) {
      sessionStorage.setItem("greenhouse", JSON.stringify(currentGreenhouse));
    }
  }, [currentGreenhouse]);

  return (
    <DashboardContext.Provider value={{ 
      currentLocation, currentGreenhouse, locations, greenhouses, searchedLocations,
      searchedGreenhouses, currentSensorReading,
      setCurrentLocation, setCurrentGreenhouse, setLocations, setGreenhouses,
      setSearchedLocations, setSearchedGreenhouses, setCurrentSensorReading,
      
      // New threshold editing related props
      thresholds,
      thresholdsEditable,
      pendingThresholds,
      setThresholdsEditable,
      updateThreshold,
      saveThresholds,
      cancelThresholds
    }}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = (): DashboardContext => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within an DashboardProvider');
  }
  return context;
};

