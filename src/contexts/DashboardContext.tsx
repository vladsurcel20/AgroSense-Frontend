import React, { useContext, useState, createContext, ReactNode, useEffect} from "react";
import { Location } from "../types/location";
import { Greenhouse } from "../types/greenhouse";

interface DashboardContext{
    currentLocation: Location | null
    currentGreenhouse: Greenhouse | null
    locations: Location[]
    greenhouses: Greenhouse[]
    searchedLocations: Location[]
    searchedGreenhouses: Greenhouse[]
    setLocations: React.Dispatch<React.SetStateAction<Location[]>>
    setGreenhouses: React.Dispatch<React.SetStateAction<Greenhouse[]>>
    setSearchedLocations: React.Dispatch<React.SetStateAction<Location[]>>
    setSearchedGreenhouses: React.Dispatch<React.SetStateAction<Greenhouse[]>>
    setCurrentLocation: React.Dispatch<React.SetStateAction<Location>>
    setCurrentGreenhouse: React.Dispatch<React.SetStateAction<Greenhouse>>
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
      searchedGreenhouses,
      setCurrentLocation, setCurrentGreenhouse, setLocations, setGreenhouses,
      setSearchedLocations,
      setSearchedGreenhouses
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

