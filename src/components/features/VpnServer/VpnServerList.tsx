import React, { useState } from 'react';
import VpnServerItem from './VpnServerItem';
import { useVpnServer } from '../../../hooks/useVpnServer';
import { VpnServer } from '../../../api/vpn-server.api';
import VpnServerDetail from './VpnServerDetail';
import VpnServerForm from './VpnServerForm';
import ConfirmDialog from '../../ui/confirm-modal';





const VpnServerList: React.FC = () => {
  const { filteredAndSortedServers :servers, addServer, editServer, removeServer } = useVpnServer(); // Utilisation des hooks pour ajouter, mettre à jour et supprimer un serveur
  const [selected, setSelectedServer] = useState<VpnServer | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'update' | 'view'>('create'); // Mode du formulaire
  const [openConfirm, setOpenConfirm] = useState(false); // État pour contrôler la modal de confirmation
  
  // Fonction pour gérer l'ouverture de la modal de confirmation de suppression
  const handleDeleteServer = (server: VpnServer) => {
    setSelectedServer(server);
    setOpenConfirm(true);
  };

  // Fonction pour supprimer le serveur après confirmation
  const handleConfirmDelete = () => {
    if (selected && selected._id) {
      removeServer(selected._id); // Appeler la fonction pour supprimer un serveur
    }
    setOpenConfirm(false); // Fermer la modal de confirmation après suppression
  };

  const handleViewDetail = (server: VpnServer) => {
    setSelectedServer(server);
    setFormMode('view');
    setOpenDetail(true);
  };

  const handleEditServer = (server: VpnServer) => {
    setSelectedServer(server);
    setFormMode('update');
    setOpenForm(true);
  };


  const handleSubmitForm = (server: Partial<VpnServer>) => {
    if (formMode === 'create' && !server._id) {
      addServer(server); // Appeler la fonction pour ajouter un serveur
    } else if (formMode === 'update' && selected && selected._id) {
      editServer(selected._id, { ...selected, ...server }); // Appeler la fonction pour mettre à jour un serveur
    }
    setOpenForm(false);
  };

  return (
    <div>
      {/* Liste des serveurs */}
      {servers.map((server) => (
        <VpnServerItem 
          key={server._id} 
          server={server} 
          onView={handleViewDetail}
          onEdit={handleEditServer} // Passer la méthode pour éditer le serveur
          onDelete={() => handleDeleteServer(server)} // Passer la fonction de suppression
        />
      ))}
      
      {/* Détail du serveur */}
      <VpnServerDetail 
        server={selected} 
        open={openDetail} 
        onClose={() => {
          setSelectedServer(null);
          setOpenDetail(false);
        }} 
      />

      {/* Formulaire d'ajout ou modification de serveur */}
      <VpnServerForm 
        open={openForm}
        onClose={() => {
          setSelectedServer(null);
          setOpenForm(false);
        }}
        onCreate={handleSubmitForm} // Passer la méthode de création
        onUpdate={handleSubmitForm} // Passer la méthode de mise à jour
        mode={formMode} // Passer le mode (create, update ou view)
        server={selected} // Passer le serveur sélectionné si mode "update"
      />
      
      {/* Modal de confirmation pour la suppression */}
      <ConfirmDialog 
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)} // Fermer la modal de confirmation sans supprimer
        onConfirm={handleConfirmDelete} // Appeler la fonction pour supprimer
        title="Delete VPN Server?"
        description={`Are you sure you want to delete the server ${selected?.address}? This action cannot be undone.`}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />

   
    </div>
  );
};

export default VpnServerList;
