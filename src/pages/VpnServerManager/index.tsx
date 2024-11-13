import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  
  useMediaQuery,

} from '@mui/material';
import { Logout } from '@mui/icons-material';
import VpnServerSearch from '../../components/features/VpnServer/VpnServerSearch';
import VpnServerFilter from '../../components/features/VpnServer/VpnServerFilter';
import VpnServerSorter from '../../components/features/VpnServer/VpnServerSorter';
import VpnServerOrder from '../../components/features/VpnServer/VpnServerOrder';
import VpnServerAdd from '../../components/features/VpnServer/VpnServerAdd';
import VpnServerList from '../../components/features/VpnServer/VpnServerList';
import VpnServerPagination from '../../components/features/VpnServer/VpnServerPagination';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../hooks/useAuth';
import { useVpnServer } from '../../hooks/useVpnServer';
import VpnServerState from '../../components/features/VpnServer/VpnServerState';
import logo from "../../assets/icon.png"

const VpnServerManager: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {logout} = useAuth()
  const {loading, success} = useVpnServer()


  const handleLogout = () => {
    // Ajoute ici ta logique de déconnexion
    logout()
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Header Section (Fixed) */}
      <Box
        position="sticky"
        top={0}
        zIndex={10}
        bgcolor="background.paper"
        boxShadow={2}
        py={2}
        px={isMobile ? 2 : 4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={isMobile ? 1 : 0}
        marginBottom={2}
      >
        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"}>
          <img src={logo} height={"64px"}  width={"64px"}/>
           <Typography variant="h5" component="h1">
          VPN Server Manager
        </Typography>
        </Box>
       
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Logout />}
          onClick={handleLogout}
          size={isMobile ? 'small' : 'medium'}
        >
          Logout
        </Button>
      </Box>

      {/* Divider
      <Divider sx={{ my: 2 }} /> */}

       {/* Search Box - Takes full width on mobile */}
       <Box flex={1} width='100%' marginBottom={2}>
          <VpnServerSearch />
        </Box>

      {/* Filter, Search, and Sort Section */}
      <Box
        display="flex"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={2}
        mb={3}
        alignItems="center"
        width={"100%"}
      >
        <VpnServerFilter />

        <Box
        width={"100%"}
        display="flex"
        flexDirection="row"
        justifyContent={"flex-start"}
        alignItems="center"
        gap={2}>
        <VpnServerSorter />
        <VpnServerOrder />
        </Box>
        
      </Box>

      {/* Add Server Button */}
      <Box
        display="flex"
        justifyContent={isMobile ? 'center' : loading || success ? "space-between" : "flex-end"}
        mb={3}
        px={isMobile ? 2 : 0}
      >
        <VpnServerState />
        <VpnServerAdd />
      </Box>

      {/* Server List */}
      <Box
        sx={{
          overflowX: 'auto',
          pb: isMobile ? 2 : 0,
        }}
      >
        <VpnServerList />
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <VpnServerPagination />
      </Box>
    </Container>
  );
};

export default VpnServerManager;
