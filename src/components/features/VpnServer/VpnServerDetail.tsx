import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { VpnServer } from '../../../api/vpn-server.api';


interface VpnServerDetailProps {
  open: boolean;
  onClose: () => void;
  server: VpnServer | null;
}

const VpnServerDetail: React.FC<VpnServerDetailProps> = ({ open, onClose, server }) => {
  if (!server) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>VPN Server Details</DialogTitle>
      <DialogContent>
        <Typography>Country: {server.country}</Typography>
        <Typography>Address: {server.address}</Typography>
        <Typography>Speed: {server.speed}</Typography>
        <Typography>Created At: {server._createdAt ? new Date(server._createdAt).toLocaleDateString() : 'N/A'}</Typography>
<Typography>Updated At: {server._updatedAt ? new Date(server._updatedAt).toLocaleDateString() : 'N/A'}</Typography>

      </DialogContent>
    </Dialog>
  );
};

export default VpnServerDetail;
