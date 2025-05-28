import { useState, useEffect, useRef } from 'react';
import { useSocket } from "../../services/WebSocketService";
import SensorGrid from './SensorGrid';
import ControlGrid from './ControlGrid';
import ThresholdsGrid from './ThresholdsGrid';
import { Save, SquarePen } from 'lucide-react';


const ControlsGrid = () => {
  const tabs = ['sensors', 'controls', 'automation'];
  const [selectedTab, setSelectedTab] = useState("sensors");
  const [thresholdsEditable, setThresholdsEditable] = useState(false)

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
                <button className='tab-content-button secondary-btn' onClick={() => setThresholdsEditable(false)}>Cancel</button>
                <button className='tab-content-button main-btn'><Save size={14}/> Save Changes</button>
              </>
            ) : (
              <button className='tab-content-button main-btn' onClick={() => setThresholdsEditable(true)}><SquarePen size={14}/>Edit Thresholds</button>
            )}
          </div>
        </div>
        <ThresholdsGrid />
      </div>
    </>
  );
};

export default ControlsGrid;