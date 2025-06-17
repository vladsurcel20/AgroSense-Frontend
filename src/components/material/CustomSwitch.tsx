import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const CustomSwitch = styled(Switch)(() => ({
  width: 60,          
  height: 38,           
  padding: 8,

  '& .MuiSwitch-switchBase': {
    padding: 6,
    '&.Mui-checked': {
      transform: 'translateX(26px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#4caf50', // culoare linie activă
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 24,
    height: 24,
  },
  '& .MuiSwitch-track': {
    borderRadius: 20,
    backgroundColor: '#ccc', // culoare linie inactivă
    opacity: 1,
  },
}));

export default CustomSwitch;