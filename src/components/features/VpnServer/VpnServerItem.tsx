import React from 'react';
import { Box, Typography, Stack, Divider, useMediaQuery } from '@mui/material';
import VpnServerActions from './VpnServerActions';
import { VpnServer } from '../../../api/vpn-server.api';
import { useVpnServer } from '../../../hooks/useVpnServer';

interface Props {
  server: VpnServer;
  onEdit: (server: VpnServer) => void;
  onDelete: (server: VpnServer) => void;
  onView: (server: VpnServer) => void;
}

const highlightSearchTerm = (text: string, term: string) => {
  if (!term) return text;
  const regex = new RegExp(`(${term})`, 'gi');
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === term.toLowerCase() ? <span style={{ color: "green", fontWeight: 'bolder' }} key={index}>{part}</span> : part
  );
};

const VpnServerItem: React.FC<Props> = ({ server, onEdit, onDelete, onView }) => {
  const handleEdit = () => onEdit(server);
  const handleDelete = () => onDelete(server);
  const handleView = () => onView(server);
  const { searchQuery } = useVpnServer();

  // Utilisation d'une chaîne pour le point de rupture au lieu de theme.breakpoints
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      border={1}
      borderColor="grey.300"
      borderRadius={1}
      p={2}
      display="flex"
      flexDirection={isSmallScreen ? 'column' : 'row'}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack
        direction={isSmallScreen ? 'column' : 'row'}
        spacing={3}
        alignItems="center"
        flex={1}
        sx={{ width: '100%', textAlign: isSmallScreen ? 'center' : 'inherit' }}
      >
        {/* Country information */}
        <Stack direction="column" alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            {highlightSearchTerm(server.country, searchQuery)}
          </Typography>
        </Stack>

        {/* Server address */}
        <Stack direction="column" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            {highlightSearchTerm(server.address, searchQuery)}
          </Typography>
        </Stack>

        {/* Server speed */}
        <Stack direction="column" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            Speed: {server.speed}
          </Typography>
        </Stack>
      </Stack>

      {!isSmallScreen && (
        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
      )}

      {/* Action buttons */}
      <Box sx={{ mt: isSmallScreen ? 2 : 0, width: isSmallScreen ? '100%' : 'auto', textAlign: 'center' }}>
        <VpnServerActions
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </Box>
    </Box>
  );
};

export default VpnServerItem;
