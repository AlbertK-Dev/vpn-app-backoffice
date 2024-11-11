import React, { useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VpnServerForm from './VpnServerForm';
import { useVpnServer } from '../../../hooks/useVpnServer'; // Assurez-vous que le hook est correctement importé
import { VpnServer } from '../../../api/vpn-server.api';

const VpnServerAdd: React.FC = () => {
  const { addServer } = useVpnServer(); // Utilisation du hook pour ajouter un serveur
  const [open, setOpen] = useState(false);

  // Fonction pour gérer la soumission du formulaire
  const handleCreateServer = (server: Partial<VpnServer>) => {
    addServer(server); // Ajouter le serveur
    setOpen(false); // Fermer le formulaire après soumission
  };

  return (
    <>
      {/* Bouton flottant pour ouvrir le formulaire */}
      <Fab color="primary" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>

      {/* Formulaire d'ajout de serveur */}
      <VpnServerForm
        open={open}
        onClose={() => setOpen(false)} // Fermer le formulaire
        onCreate={handleCreateServer} // Passer la fonction de création
        onUpdate={() => {}} // Passer une fonction vide pour `onUpdate` car ce n'est pas nécessaire ici
        mode="create" // Assurer que le formulaire est en mode création
      />
    </>
  );
};

export default VpnServerAdd;
