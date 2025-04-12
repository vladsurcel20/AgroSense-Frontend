import React, { useContext, useState, createContext, ReactNode, useEffect} from "react";

interface DashboardContext{
    currentLocation: any,
    currentGreenhouse: any
    locations: any,
    greenhouses: any,
    setCurrentLocation: React.Dispatch<React.SetStateAction<any>>
    setCurrentGreenhouse: React.Dispatch<React.SetStateAction<any>>
}

export const DashboardContext = createContext<DashboardContext | undefined>(undefined);


export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(() => {
    const saved = sessionStorage.getItem("location");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentGreenhouse, setCurrentGreenhouse] = useState(() => {
    const saved = sessionStorage.getItem("greenhouse");
    return saved ? JSON.parse(saved) : null;
  });

  const [locations, setlocations] = useState<any[]>([])
  const [greenhouses, setGreenhouses] = useState<any[]>([])

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
    <DashboardContext.Provider value={{ currentLocation, currentGreenhouse, locations, greenhouses, setCurrentLocation, setCurrentGreenhouse }}>
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

