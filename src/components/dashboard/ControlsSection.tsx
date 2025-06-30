import { useState } from 'react';
import { useSocket } from "../../services/WebSocketService";
import SensorGrid from './SensorGrid';
import ControlGrid from './ControlGrid';
import ThresholdsGrid from './ThresholdsGrid';
import { Power, PowerOff, Save, SquarePen } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { toast } from 'sonner';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const ControlsGrid = () => {
  const { t } = useTranslation();
  const tabsDisplay = [
    t("sensorsTab"),
    t("controlsTab"),
    t("automationTab")
  ];
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
      
      const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/greenhouses/${currentGreenhouse.id}`;
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
      const mode = currentGreenhouse?.autoControlEnabled ? t("disableAutoMode") : t("enableAutoMode");
      toast.success(`${mode} successfully`);
    } else {
      toast.error("Failed to toggle auto mode");
    }
  };

  return (
    <>
      <div className='tablist'>
        {tabsDisplay.map((tabLabel, idx) => (
          <button
            key={tabs[idx]}
            className={`tab-btn ${selectedTab === tabs[idx] ? 'active' : ''}`}
            id={tabs[idx]}
            onClick={() => setSelectedTab(tabs[idx])}
          >
            {tabLabel}
          </button>
        ))}
      </div>

      <div className={"tab-content " + (selectedTab==="sensors" ? "active" : "")}>
        <div className='tab-header'>
          <p className='tab-description'>{t("sensorsTabDescription")}</p>
        </div>
        <SensorGrid />
      </div>

      <div className={'tab-content ' + (selectedTab==="controls" ? "active" : "")}>
        <div className='tab-header'>
          <p>{t("controlsTabDescription")}</p>
        </div>
        <ControlGrid />
      </div>

      <div className={'tab-content ' + (selectedTab==="automation" ? "active" : "")}>
        <div className='tab-header'>
          <p className='tab-description'>{t("automationTabDescription")}</p>
          <div className='tab-buttons-section'>
            {thresholdsEditable ? (
              <>
                <button 
                  className='tab-content-button secondary-btn' 
                  onClick={cancelThresholds}
                >
                  {t("cancel")}
                </button>
                <button 
                  className='tab-content-button main-btn'
                  onClick={handleSaveThresholds}
                >
                  <Save size={14}/> {t("saveChanges")}
                </button>
              </>
            ) : (
              <>
                <button 
                  className='tab-content-button secondary-btn' 
                  onClick={handleToggleAutoMode}
                >
                  {currentGreenhouse?.autoControlEnabled ? (
                    <><PowerOff size={14} color='red'/> {t("disableAutoMode")}</>
                  ) : (
                    <><Power size={14} color='var(--main-btn-color)'/> {t("enableAutoMode")}</>
                  )}
                </button>
                <button 
                  className='tab-content-button main-btn' 
                  onClick={() => setThresholdsEditable(true)}
                >
                  <SquarePen size={14}/> {t("editThresholds")}
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