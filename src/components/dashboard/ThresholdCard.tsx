import { Gauge } from "lucide-react"
import { TextField, InputAdornment} from '@mui/material'
import { useEffect, useState } from "react";
import ThresholdSlider from "../material/ThresholdSlider";

interface ThresholdCardProps {
  type: string;
}


const ThresholdCard = ({ type }: ThresholdCardProps) => {

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [value1, setValue1] = useState<number>(0);
  const [value2, setValue2] = useState<number>(100);
  const [sliderValue, setSliderValue] = useState<number[]>([value1 || 0, value2 || 100]);

  const typeDisplay = type.charAt(0).toUpperCase() + type.slice(1);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSliderValue(newValue);
      setValue1(newValue[0]);
      setValue2(newValue[1]);
    }
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue1(newValue);
    setSliderValue([newValue, sliderValue[1]]);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue2(newValue);
    setSliderValue([sliderValue[0], newValue]);
  };

  useEffect(() => {
    setSliderValue([value1, value2]);
  }, []);

  return (
    <div className="card threshold-card">
        <div className="card-header">
            <Gauge size={24} color={`var(--${type}-color)`}/>
            <h4>{typeDisplay}</h4>
        </div>
        <div className="card-body">
            <div className="slider-container">
              <ThresholdSlider className="slider" value={sliderValue} onChange={handleSliderChange} disabled={!isEditable} />
            </div>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              {!isEditable ? (
                <>
                  <p>Min: {value1}°C</p>
                  <p>Max: {value2}°C</p>
                </>
              ) : (
              <>
                <TextField
                  id="min"
                  type="number"
                  label="Min temperature"
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
                  value={value1}
                  onChange={handleMinChange}
                />
                <TextField
                  id="max"
                  type="number"
                  label="Max temperature"
                  size='small'
                  variant="outlined"
                  className="threshold-input"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      step: 0.5
                    }
                  }}
                  value={value2}
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