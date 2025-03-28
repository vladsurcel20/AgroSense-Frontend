import { Thermometer, Droplets, Sun, X} from 'lucide-react'
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import React from 'react';


interface SensorCardProps{
    type: string,
    setIsExpanded: (value: boolean) => void
  }

const ExpandedSensorCard = React.forwardRef<HTMLDivElement, SensorCardProps>(({ type, setIsExpanded }, ref) => {
    
    const value = 25;
    const unit = '°C';
    const formatType = type.charAt(0).toUpperCase() + type.slice(1);

    const chartData = [
        { label: '12:00', value: 22 },
        { label: '13:00', value: 24 },
        { label: '14:00', value: 23 },
        { label: '15:00', value: 25 },
      ];

    const selectIcon = (type: string) => {
        switch(type){
            case 'temperature':
                return <Thermometer size='24' color={`var(--${type}-color)`}/>;
            case 'humidity':
                return <Droplets size='24' color={`var(--${type}-color)`}/>;
            case 'light':
                return <Sun size='24' color={`var(--${type}-color)`}/>;
            default:
                return <Thermometer size='24' color={`var(--${type}-color)`}/>;
        }
    }

    const getTypeColor = () => {
        if (!type) return "gray";
        else {
            switch (type) {
                case "temperature": return "#f84111";
                case "humidity": return "#3b84ff";
                case "light": return "#f59e0b";
                default: return "gray";
            }
        }
    }

  return (
    <div ref={ref} className='expanded-card expanded-sensor-card'>
            <div className='card-header'>
                <div className='first-row'>
                    <div className="left">
                        {selectIcon(type)}
                        <h3>{formatType} - Sensor 1</h3>
                    </div>
                    <X
                        size='18'
                        onClick={() => setIsExpanded(false)}
                        className="close-icon"
                    >
                    </X>
                </div>
                <div className='readings'>
                    <div> 
                        <h1 style={{color: type ?  `var(--${type}-color)` : "#ff0000"}}>
                            {value}{unit}
                        </h1>
                        <h4 className='secondary-text' style={{textAlign: 'left'}}>Current value</h4>
                    </div>
                    <div className='right'>
                        <div>
                            <h2>
                                {value-1}{unit}
                            </h2>
                            <h5 className='secondary-text'>Min (24h)</h5>
                        </div>
                        <div>
                            <h2>
                                {value+3}{unit}
                            </h2>
                            <h5 className='secondary-text'>Max (24h)</h5>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='card-body'>
                <div className='chart-wrapper'>
                <LineChart
                className='chart'
                series={[{ 
                    data: chartData.map(d => d.value),
                    area: false,
                    showMark: false,
                    color: getTypeColor(),
                }]}  
                xAxis={[{ scaleType: "point" , data: chartData.map(d => d.label),}]}                
                sx={{
                    '& .MuiChartsAxis-tickLabel': {
                        fontSize: '12px',
                        fill: getTypeColor(),  
                        fontWeight: '400',
                    },
                    '& .MuiChartsAxis-root': {
                        strokeWidth: 2,
                        fill: getTypeColor(),
                    },
                '& svg': {
                    overflow: 'visible'
                },
                }}
                />
                </div>
                <div className='info-section'>
                    <div className='section'>
                        <p>Status</p>
                        <p>Normal</p>
                    </div>
                    <div className='section'>
                        <p>Last updated</p>
                        <p>Today</p>
                    </div>
                </div>
            </div>
            <div className='card-footer'>
                <button className='main-btn'>More Details</button>
                {/* <button className='main-btn' onClick={() => setIsExpanded(false)}>Close</button> */}
            </div>
    </div>
  )
})

export default ExpandedSensorCard