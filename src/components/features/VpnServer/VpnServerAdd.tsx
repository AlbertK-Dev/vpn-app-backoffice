import React, { useState } from 'react';
import { Fab, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VpnServerForm from './VpnServerForm';
import { useVpnServer } from '../../../hooks/useVpnServer';
import { VpnServer } from '../../../api/vpn-server.api';

const VpnServerAdd: React.FC = () => {
  const { addServer } = useVpnServer();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleCreateServer = (server: Partial<VpnServer>) => {
    addServer(server);
    setOpen(false);
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir le formulaire */}
      <Fab
        color="primary"
        onClick={() => setOpen(true)}
        sx={{
          position: isSmallScreen ? 'fixed' : 'static',
          bottom: isSmallScreen ? 16 : 'auto',
          right: isSmallScreen ? 16 : 'auto',
        }}
      >
        <AddIcon />
      </Fab>

      {/* Formulaire d'ajout de serveur */}
      <VpnServerForm
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreateServer}
        onUpdate={() => {}}
        mode="create"
      />
    </>
  );
};

export default VpnServerAdd;
