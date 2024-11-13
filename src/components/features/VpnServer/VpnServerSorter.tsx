import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import { useVpnServer } from '../../../hooks/useVpnServer';



const VpnServerSorter: React.FC = () => {
const {sortBy, setSortBy} = useVpnServer()

  return (
    <Box>
      <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'speed' | 'createdAt' | 'updatedAt')} displayEmpty>
        <MenuItem value="speed">Speed</MenuItem>
        <MenuItem value="createdAt">Created Date</MenuItem>
        <MenuItem value="updatedAt">Updated Date</MenuItem>
      </Select>
    </Box>
  );
};

export default VpnServerSorter;
