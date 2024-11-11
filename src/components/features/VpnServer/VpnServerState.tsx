import React, { useEffect, useState } from 'react';
import { CircularProgress, Alert, Button } from '@mui/material';
import { useVpnServer } from '../../../hooks/useVpnServer';



const VpnServerState: React.FC = () => {
  const { loading, success, error, retryFunc, setSuccess } = useVpnServer();

  // État local pour contrôler l'affichage du message de succès
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true); // Affiche le message de succès
      const timeoutId = setTimeout(() => {
        setShowSuccess(false); // Cache le message après 2 secondes
        setSuccess(''); // Réinitialise le succès global
      }, 2000);

      // Nettoyage pour éviter les fuites de mémoire
      return () => clearTimeout(timeoutId);
    }
  }, [success, setSuccess]);

  return (
    <>
      {loading && <CircularProgress />}
      {showSuccess && (
        <Alert severity="success">
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" action={<Button onClick={retryFunc}>Retry</Button>}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default VpnServerState;
