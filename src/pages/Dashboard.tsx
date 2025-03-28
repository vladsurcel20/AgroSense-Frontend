import { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import SensorCard from '../components/SensorCard'
import ExpandedSensorCard from '../components/ExpandedSensorCard'
import Modal from '@mui/material/Modal'
import Sensor from '../Models/Sensor'

const Dashboard = () => {

  const [selectedTab, setSelectedTab] = useState("sensors")
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>()
  const [isExpanded, setIsExpanded] = useState(false)

  const modalRef = useRef<HTMLDivElement | null>(null);

  const tabs = ['sensors', 'controls', 'analytics']

  return (
    <>
      <Navbar />

      <div className='dashboard-page page'>
        <div className='dashboard-header'>
          <h2>Greenhouse A</h2>
          <p className='secondary-text'>Last updated: 2 minutes ago 🟢</p>
        </div>

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
      </div>

      <Modal open={isExpanded} onClose={() => setIsExpanded(false)}>
        <ExpandedSensorCard ref={modalRef}  setIsExpanded={setIsExpanded} type='temperature'/>
      </Modal>
    </>
  )
}

export default Dashboard