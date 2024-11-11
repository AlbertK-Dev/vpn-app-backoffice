import React from 'react';
import { Pagination } from '@mui/material';
import { useVpnServer } from '../../../hooks/useVpnServer';



const VpnServerPagination: React.FC = () => {
    const { currentPage, totalPages, setCurrentPage} = useVpnServer()
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_event, page) => setCurrentPage(page)}
      color="primary"
    />
  );
};

export default VpnServerPagination;
