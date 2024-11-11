import React from 'react';
import { TextField } from '@mui/material';
import { useVpnServer } from '../../../hooks/useVpnServer';


const VpnServerSearch: React.FC = () => {
    const {searchQuery, setSearchQuery} = useVpnServer()
  return (
    <TextField
      label="Search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      fullWidth
    />
  );
};

export default VpnServerSearch;
