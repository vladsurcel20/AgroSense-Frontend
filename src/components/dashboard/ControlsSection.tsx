import { useState } from 'react';
import { useSocket } from "../../services/WebSocketService";
import SensorGrid from './SensorGrid';
import ControlGrid from './ControlGrid';
import ThresholdsGrid from './ThresholdsGrid';
import { Power, PowerOff, Save, SquarePen } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { toast } from 'sonner';
import axios from 'axios';

const ControlsGrid = () => {
  const tabs = ['sensors', 'controls', 'automation'];
  const [selectedTab, setSelectedTab] = useState("sensors");
  const { 
    thresholdsEditable, 
    setThresholdsEditable, 
    saveThresholds, 
    cancelThresholds,
    setCurrentGreenhouse,
    currentGreenhouse
  } = useDashboard();

  useSocket();

  const handleSaveThresholds = async () => {
    const success = await saveThresholds();
    if (success) {
      toast.success("Threshold values saved successfully");
    } else {
      toast.error("Failed to save threshold values");
    }
  };

  const toggleAutoMode = async (): Promise<boolean> => {
    if (!currentGreenhouse) return false;
    
    try {
      const newAutoMode = !currentGreenhouse.autoControlEnabled;
      
      // Update greenhouse in the backend
      const baseUrl = `${import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api'}/greenhouses/${currentGreenhouse.id}`;
      await axios.patch(baseUrl, { autoControlEnabled: newAutoMode }, { withCredentials: true });
      
      setCurrentGreenhouse(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          autoControlEnabled: newAutoMode
        };
      });
      
      return true;
    } catch (error) {
      console.error('Error toggling auto mode:', error);
      return false;
    }
  };

  const handleToggleAutoMode = async () => {
    const success = await toggleAutoMode();
    if (success) {
      const mode = currentGreenhouse?.autoControlEnabled ? "disabled" : "enabled";
      toast.success(`Auto mode ${mode} successfully`);
    } else {
      toast.error("Failed to toggle auto mode");
    }
  };

  return (
    <>
      <div className='tablist'>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${selectedTab === tab ? 'active' : ''}`}
            id={tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className={"tab-content " + (selectedTab==="sensors" ? "active" : "")}>
        <div className='tab-header'>
          <p className='tab-description'>Monitor the current readings of your sensors.</p>
        </div>
        <SensorGrid />
      </div>

      <div className={'tab-content ' + (selectedTab==="controls" ? "active" : "")}>
        <div className='tab-header'>
          <p>Control your devices and actuators.</p>
        </div>
        <ControlGrid />
      </div>

      <div className={'tab-content ' + (selectedTab==="automation" ? "active" : "")}>
        <div className='tab-header'>
          <p className='tab-description'>Define optimal ranges for your greenhouse parameters.</p>
          <div className='tab-buttons-section'>
            {thresholdsEditable ? (
              <>
                <button 
                  className='tab-content-button secondary-btn' 
                  onClick={cancelThresholds}
                >
                  Cancel
                </button>
                <button 
                  className='tab-content-button main-btn'
                  onClick={handleSaveThresholds}
                >
                  <Save size={14}/> Save Changes
                </button>
              </>
            ) : (
              <>
                <button 
                  className='tab-content-button secondary-btn' 
                  onClick={handleToggleAutoMode}
                >
                  {currentGreenhouse?.autoControlEnabled ? (
                    <><PowerOff size={14} color='red'/> Disable Auto Mode</>
                  ) : (
                    <><Power size={14} color='var(--main-btn-color)'/> Enable Auto Mode</>
                  )}
                </button>
                <button 
                  className='tab-content-button main-btn' 
                  onClick={() => setThresholdsEditable(true)}
                >
                  <SquarePen size={14}/>Edit Thresholds
                </button>
              </>
            )}
          </div>
        </div>
        <ThresholdsGrid />
      </div>
    </>
  );
};

export default ControlsGrid;