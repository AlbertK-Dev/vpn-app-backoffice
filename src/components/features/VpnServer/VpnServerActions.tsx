import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack, useMediaQuery} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface VpnServerActionProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const VpnServerAction: React.FC<VpnServerActionProps> = ({ onEdit, onDelete, onView }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isMobile ? (
        <Stack direction="row" spacing={1} justifyContent={"center"}>
          <IconButton onClick={onView} color="primary" aria-label="view">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={onEdit} color="secondary" aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={onDelete} color="error" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ) : (
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
      )}
    </>
  );
};

export default VpnServerAction;
