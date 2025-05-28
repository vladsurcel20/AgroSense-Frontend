import { MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CompactSelect = styled(Select)(({ theme }) => ({
    minHeight: '36px',
    height: '36px',
    marginTop: '30px',
    
    // Outline colors
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--secondary-text-color)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--hover-text-color)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'var(--main-btn-color)',
        border: '1px solid var(--main-btn-color)',
    },
    
    // Select text styling
    '& .MuiSelect-select': {
        padding: '8px 32px 8px 12px',
        fontSize: '14px',
        lineHeight: '1.2',
        minHeight: 'auto',
    },
    
    // Dropdown icon styling
    '& .MuiSelect-icon': {
        right: '8px',
        fontSize: '20px',
    }
}));


export const CompactMenuItem = styled(MenuItem)({
    fontSize: '14px',
    padding: '8px 16px',
    minHeight: 'auto',
    lineHeight: '1.2'
});