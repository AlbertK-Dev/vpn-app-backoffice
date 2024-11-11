import React from 'react';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useVpnServer } from '../../../hooks/useVpnServer';

const VpnServerOrder: React.FC = () => {
    const {sortOrder, setSortOrder} = useVpnServer()
  return (
    <IconButton onClick={()=>setSortOrder(sortOrder === "asc"? "desc": "asc")}>
      {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </IconButton>
  );
};

export default VpnServerOrder;
