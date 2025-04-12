import { useRef, useState } from "react";
import Sensor from "../Models/Sensor";
import Modal from "@mui/material/Modal";
import ExpandedSensorCard from "./ExpandedSensorCard";
import SensorCard from "./SensorCard";

const ControlsGrid = () => {

    const [selectedTab, setSelectedTab] = useState("sensors")
    const [selectedSensor, setSelectedSensor] = useState<Sensor | null>();
    const [isExpanded, setIsExpanded] = useState(false);

    const modalRef = useRef<HTMLDivElement | null>(null);
    const tabs = ['sensors', 'controls', 'analytics'];

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

        <div className='sensor-cards-grid'>
            <SensorCard setIsExpanded={setIsExpanded} type='temperature'/>
            <SensorCard setIsExpanded={setIsExpanded} type='temperature'/>
            <SensorCard setIsExpanded={setIsExpanded} type='temperature'/>
            <SensorCard setIsExpanded={setIsExpanded} type='humidity'/>
            <SensorCard setIsExpanded={setIsExpanded} type='light'/>
            <SensorCard setIsExpanded={setIsExpanded} type='light'/>
            <SensorCard setIsExpanded={setIsExpanded} type='light'/>
        </div>

        <Modal open={isExpanded} onClose={() => setIsExpanded(false)}>
            <ExpandedSensorCard ref={modalRef}  setIsExpanded={setIsExpanded} type='temperature'/>
        </Modal>
      </>

  )
}

export default ControlsGrid