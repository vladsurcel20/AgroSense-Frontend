import { useState, useEffect, useRef } from 'react';
import { useSocket } from "../../services/WebSocketService";
import SensorGrid from './SensorGrid';
import ControlGrid from './ControlGrid';
import ThresholdCard from './ThresholdCard';
import ThresholdsGrid from './ThresholdsGrid';


const ControlsGrid = () => {
  const tabs = ['sensors', 'controls', 'automation'];
  const [selectedTab, setSelectedTab] = useState("sensors");

  useSocket();

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
        <p className='tab-description'>Monitor the current readings of your sensors.</p>

        <SensorGrid />
      </div>

      <div className={'tab-content ' + (selectedTab==="controls" ? "active" : "")}>
        <p className='tab-description'>Control your devices and actuators.</p>

        <ControlGrid />
      </div>

      <div className={'tab-content ' + (selectedTab==="automation" ? "active" : "")}>
        <p className='tab-description'>Define optimal ranges for your greenhouse parameters.</p>

        <ThresholdsGrid />
      </div>
    </>
  );
};

export default ControlsGrid;