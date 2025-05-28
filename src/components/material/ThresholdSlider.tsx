import { styled } from '@mui/material/styles';
import Slider, { SliderProps } from '@mui/material/Slider';

interface CustomRangeSliderProps extends SliderProps {
  innerColor?: string;
  outerColor?: string;
  thumbColor?: string;
}

const ThresholdSlider = styled(Slider)<CustomRangeSliderProps>(
  ({ theme, innerColor = '#bbf7d0', outerColor = '#fecaca', thumbColor = '#fff' }) => ({
    color: outerColor, // Culoarea de bază (pentru exteriorul intervalului)
    height: 8,
    '& .MuiSlider-thumb': {
      width: 20,
      height: 20,
      backgroundColor: thumbColor, // Punctele de tragere
      border: '2px solid var(--seccondary-text-color)',
      '&:hover': {
        boxShadow: `0 0 0 8px rgba(255, 255, 255, 0.16)`,
      },
      '&.Mui-active': {
        boxShadow: `0 0 0 14px rgba(255, 255, 255, 0.16)`,
      },
    },
    '& .MuiSlider-track': {
      backgroundColor: innerColor, // Culoarea pentru interval
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity: 1,
      backgroundColor: outerColor, // Culoarea pentru exteriorul intervalului
    },
  })
);

export default ThresholdSlider;