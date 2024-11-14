import React, { createContext,  useState, useEffect, useCallback, useMemo, ReactNode, useRef } from 'react';
import { getAllVpnServers, addVpnServer, updateVpnServer, deleteVpnServer } from '../api/vpn-server.api';
import type { VpnServer } from '../api/vpn-server.api';

type SortBy = 'speed' | 'createdAt' | 'updatedAt';
type SortOrder = 'asc' | 'desc';

type VpnServerFilter = {
  country?: string;
  minSpeed?: number;
};

type VpnServerProviderProps = {
  children: ReactNode;
};


type VpnServerContextType = {
  servers: VpnServer[];
  filteredAndSortedServers: VpnServer[];
  loading: boolean;
  error: string | null;
  success: string | null;
  filter: VpnServerFilter;
  sortBy: SortBy;
  sortOrder: SortOrder;
  searchQuery: string;
  setSuccess: (msg: string) => void;
  setFilter: (filter: VpnServerFilter) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (order: SortOrder) => void;
  setSearchQuery: (query: string) => void;
  addServer: (server: Partial<VpnServer>) => Promise<void>;
  editServer: (id: string, server: Partial<VpnServer>) => Promise<void>;
  removeServer: (id: string) => Promise<void>;
  getServers: () => Promise<void>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  totalPages: number;
  retryFunc: () => Promise<void> | null;
};



// eslint-disable-next-line react-refresh/only-export-components
export const VpnServerContext = createContext<VpnServerContextType | undefined>(undefined);

 const VpnServerProvider: React.FC<VpnServerProviderProps> = ({ children }: VpnServerProviderProps) => {
  const [servers, setServers] = useState<VpnServer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [filter, setFilter] = useState<VpnServerFilter>({});
  const [sortBy, setSortBy] = useState<SortBy>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);

  const lastFuncRef = useRef<(() => Promise<void>) | null>(null);

  const executeWithRetry = async (func: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    lastFuncRef.current = func;
    try {
      await func();
    } catch (err) {
      setError((err as Error).message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllServers = useCallback(async () => {
    await executeWithRetry(async () => {
      const data = await getAllVpnServers();
      setServers(data);
      setSuccess('Load server success!');
    });
  }, []);

  useEffect(() => {
    fetchAllServers();
  }, [fetchAllServers]);

  const addServer = async (server: Partial<VpnServer>) => {
    await executeWithRetry(async () => {
      await addVpnServer(server);
      setSuccess('Create server success!');
      await fetchAllServers();
    });
  };

  const editServer = async (id: string, server: Partial<VpnServer>) => {
    await executeWithRetry(async () => {
      await updateVpnServer(id, server);
      setSuccess('Update server success!');
      await fetchAllServers();
    });
  };

  const removeServer = async (id: string) => {
    await executeWithRetry(async () => {
      await deleteVpnServer(id);
      setSuccess('Delete server success!');
      setServers((prev) => prev.filter((server) => server._id !== id));
    });
  };

  // Fonction retry
  const retryFunc = useCallback(async () => {
    if (lastFuncRef.current) {
      await lastFuncRef.current();
    }
  }, []);

  const filteredAndSortedServers = useMemo(() => {
    let filtered = [...servers];
    if (searchQuery) {
      filtered = filtered.filter(
        (server) =>
          server.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          server.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const countryFilter = filter.country?.toLowerCase();
    if (countryFilter) {
      filtered = filtered.filter((server) => server.country.toLowerCase().includes(countryFilter)|| server.flag.toLowerCase().includes(countryFilter));
    }

    const minSpeedFilter = filter.minSpeed;
    if (minSpeedFilter !== undefined) {
      filtered = filtered.filter((server) => server.speed >= minSpeedFilter);
    }

    filtered.sort((a, b) => {
      const fieldA = a[sortBy] ?? '';
      const fieldB = b[sortBy] ?? '';
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOrder === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      }
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      return 0;
    });

    return filtered;
  }, [servers, searchQuery, filter, sortBy, sortOrder]);

  const paginatedServers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedServers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedServers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedServers.length / itemsPerPage);
  useEffect(()=>{
    if (totalPages<=itemsPerPage){
    setCurrentPage(1)
  }
  },[totalPages, itemsPerPage])
  

  return (
    <VpnServerContext.Provider
      value={{
        servers,
        filteredAndSortedServers: paginatedServers,
        loading,
        error,
        success,
        filter,
        sortBy,
        sortOrder,
        searchQuery,
        setFilter,
        setSortBy,
        setSortOrder,
        setSearchQuery,
        addServer,
        editServer,
        removeServer,
        getServers: fetchAllServers,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        totalPages,
        setSuccess,
        retryFunc
      }}
    >
      {children}
    </VpnServerContext.Provider>
  );
};


export default VpnServerProvider