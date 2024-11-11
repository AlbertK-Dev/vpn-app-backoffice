import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface VpnServerActionProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const VpnServerAction: React.FC<VpnServerActionProps> = ({ onEdit, onDelete, onView }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => { handleCloseMenu(); onView(); }}>View</MenuItem>
        <MenuItem onClick={() => { handleCloseMenu(); onEdit(); }}>Edit</MenuItem>
        <MenuItem onClick={() => { handleCloseMenu(); onDelete(); }}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default VpnServerAction;
