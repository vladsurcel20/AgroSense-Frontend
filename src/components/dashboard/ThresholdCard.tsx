import { Gauge } from "lucide-react"
import { TextField } from '@mui/material'
import { useEffect, useState } from "react";
import ThresholdSlider from "../material/ThresholdSlider";
import { ThresholdConfig } from "../../helpers/thresholdToArray";

interface ThresholdCardProps {
  threshold: ThresholdConfig,
  // handleSave: () => void
}


const ThresholdCard = ({ threshold }: ThresholdCardProps) => {

  const [isEditable, setIsEditable] = useState<boolean>(true);
  const { type, unit, displayName, minField, maxField, minValue, maxValue} = threshold
  const [valueMin, setValueMin] = useState(minValue);
  const [valueMax, setValueMax] = useState(maxValue);
  const [sliderValue, setSliderValue] = useState<number[]>([valueMin || 0, valueMin || 100]);


  // const getStep = (min: number, max: number) => {
  //   const range = max - min;
  //   if (range <= 10) return 1;
  //   if (range <= 100) return 10;
  //   if (range <= 1000) return 100;
  //   if (range <= 10000) return 1000;
  //   return 2000;
  // };

  const getBuffer = (type: string) => {
    if (type.includes("Light")) return 5000; // lumină are valori mari
    if (type.includes("Temp")) return 5;
    if (type.includes("Hum")) return 10;
    return 10;
  };

  const buffer = getBuffer(type);
  const minSlider = Math.floor(minValue - buffer);
  const maxSlider = Math.ceil(maxValue + buffer);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSliderValue(newValue);
      setValueMin(newValue[0]);
      setValueMax(newValue[1]);
    }
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValueMin(newValue);
    setSliderValue([newValue, sliderValue[1]]);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValueMax(newValue);
    setSliderValue([sliderValue[0], newValue]);
  };

  useEffect(() => {
    setSliderValue([valueMin, valueMax]);
  }, []);

  // const handleSave = () => {
  //   onSave({
  //     ...config,
  //     minValue: values.min,
  //     maxValue: values.max
  //   });
  //   setIsEditing(false);
  // };

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
                // step={getStep(minSlider, maxSlider)} 
                marks={[
                  { value: minSlider, label: `${minSlider}` },
                  { value: maxSlider, label: `${maxSlider}` },
                ]}
                onChange={handleSliderChange} 
                disabled={!isEditable} />
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              {!isEditable ? (
                <>
                  <p>Min: {minValue}{unit}</p>
                  <p>Max: {maxValue}{unit}</p>
                </>
              ) : (
              <>
                <TextField
                  id="min"
                  type="number"
                   label={"Min value (" + unit  +")"}
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
                  value={valueMin}
                  onChange={handleMinChange}
                />
                <TextField
                  id="max"
                  type="number"
                  label={"Max value (" + unit  +")"}
                  size='small'
                  variant="outlined"
                  className="threshold-input"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      step: 0.5
                    }
                  }}
                  value={valueMax}
                  onChange={handleMaxChange}  
                />
              </>
              )}
            </div>
        </div>
    </div>
  )
}

export default ThresholdCard