import { Gauge } from "lucide-react"
import { TextField } from '@mui/material'
import { useEffect, useState } from "react";
import ThresholdSlider from "../material/ThresholdSlider";
import { ThresholdConfig } from "../../helpers/thresholdToArray";
import { useDashboard } from "../../contexts/DashboardContext";

interface ThresholdCardProps {
  threshold: ThresholdConfig
}

const ThresholdCard = ({ threshold }: ThresholdCardProps) => {
  const { thresholdsEditable, updateThreshold } = useDashboard();
  
  const { type, unit, displayName, minValue, maxValue } = threshold;
  const [localMin, setLocalMin] = useState(minValue);
  const [localMax, setLocalMax] = useState(maxValue);
  const [sliderValue, setSliderValue] = useState<number[]>([minValue, maxValue]);

  // Resetare valori locale când se schimbă threshold extern
  useEffect(() => {
    setLocalMin(minValue);
    setLocalMax(maxValue);
    setSliderValue([minValue, maxValue]);
  }, [minValue, maxValue, thresholdsEditable]);

  const getBuffer = (type: string) => {
    if (type.includes("Light")) return 5000;
    if (type.includes("Temp")) return 5;
    if (type.includes("Hum")) return 10;
    return 10;
  };

  const buffer = getBuffer(type);
  const minSlider = Math.floor(minValue - buffer);
  const maxSlider = Math.ceil(maxValue + buffer);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;
    
    setSliderValue(newValue);
    setLocalMin(newValue[0]);
    setLocalMax(newValue[1]);
    
    // Update in context
    if (thresholdsEditable) {
      updateThreshold({
        ...threshold,
        minValue: newValue[0],
        maxValue: newValue[1]
      });
    }
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setLocalMin(newValue);
    setSliderValue([newValue, localMax]);
    
    if (thresholdsEditable) {
      updateThreshold({
        ...threshold,
        minValue: newValue
      });
    }
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setLocalMax(newValue);
    setSliderValue([localMin, newValue]);
    
    if (thresholdsEditable) {
      updateThreshold({
        ...threshold,
        maxValue: newValue
      });
    }
  };

  return (
    <div className="card threshold-card">
      <div className="card-header">
        <Gauge size={24} color={`var(--${type}-color)`}/>
        <h4>{displayName}</h4>
      </div>
      <div className="card-body">
        <div className="slider-container">
          <ThresholdSlider 
            className="slider" 
            value={sliderValue}
            min={minSlider}
            max={maxSlider}
            marks={[
              { value: minSlider, label: `${minSlider}` },
              { value: maxSlider, label: `${maxSlider}` },
            ]}
            onChange={handleSliderChange} 
            disabled={!thresholdsEditable} />
        </div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          {!thresholdsEditable ? (
            <>
              <p>Min: {minValue}{unit}</p>
              <p>Max: {maxValue}{unit}</p>
            </>
          ) : (
            <>
              <TextField
                id="min"
                type="number"
                label={"Min value (" + unit + ")"}
                size='small'
                aria-valuemin={0}
                variant="outlined"
                className="threshold-input"
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: 0.5
                  }
                }}  
                value={localMin}
                onChange={handleMinChange}
              />
              <TextField
                id="max"
                type="number"
                label={"Max value (" + unit + ")"}
                size='small'
                variant="outlined"
                className="threshold-input"
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: 0.5
                  }
                }}
                value={localMax}
                onChange={handleMaxChange}  
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThresholdCard;