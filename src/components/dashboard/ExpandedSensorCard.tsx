import { Thermometer, Droplets, Sun, X} from 'lucide-react'
import { LineChart } from '@mui/x-charts/LineChart';
import React, { useState } from 'react';
import { Sensor } from '../../types/sensor';
import { useSensorChartData, useSensorMinMax } from '../../hooks/DashboardHooks';
import { useDashboard } from '../../contexts/DashboardContext';
import { CompactMenuItem, CompactSelect } from '../material/CustomSelect';

interface SensorCardProps{
    expandedSensor: Sensor,
    setExpandedSensor: (value: Sensor | null) => void
    value:number
  }

const ExpandedSensorCard = React.forwardRef<HTMLDivElement, SensorCardProps>(({expandedSensor, setExpandedSensor, value }, ref) => {

    const {type, unit} = expandedSensor;
    const formatType = type.charAt(0).toUpperCase() + type.slice(1);
    const {currentGreenhouse} = useDashboard();

    const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
    const { chartData, loading } = useSensorChartData(expandedSensor.id, timeRange);
    const { minMaxData } = useSensorMinMax(currentGreenhouse!.id, expandedSensor.id, timeRange, false);

    const formatTimeLabel = (timestamp: string) => {
        const date = new Date(timestamp);
        return timeRange === '24h' 
        ? date.toLocaleTimeString(['ro-RO'], { hour: '2-digit' }) 
        : date.toLocaleDateString(['ro-RO'], { day: 'numeric', month: 'short' });
    };

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
                        <h3>{formatType} - {expandedSensor.name}</h3>
                    </div>
                    <X
                        size='18'
                        onClick={() => {
                            setExpandedSensor(null)
                        }}
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
                                {minMaxData?.min || 0}{unit}
                            </h2>
                            <h5 className='secondary-text'>Min (24h)</h5>
                        </div>
                        <div>
                            <h2>
                                {minMaxData?.max || 100}{unit}
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
                            showMark: true,
                            color: getTypeColor(),
                        }]}  
                        xAxis={[{
                            data: chartData.map(d => formatTimeLabel(d.time)),
                            scaleType: 'point',
                        }]}
                        yAxis={[{
                            valueFormatter: (value) => `${value} ${expandedSensor.unit}`,
                            min: 0,
                            max: 100,
                        }]}                 
                        sx={{
                            '& .MuiChartsAxis-tickLabel': {
                                fontSize: '12px',
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
                    <CompactSelect
                        labelId="time-range-select-label"
                        id="time-range-select"
                        value={timeRange}
                        label="Time Range"
                        onChange={(e) => setTimeRange(e.target.value as '24h' | '7d' | '30d')}
                    >
                        <CompactMenuItem value="24h">24 Hours</CompactMenuItem>
                        <CompactMenuItem value="7d">7 Days</CompactMenuItem>
                        <CompactMenuItem value="30d">30 Days</CompactMenuItem>
                    </CompactSelect>
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