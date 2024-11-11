const BASE_URL = import.meta.env.VITE_BACKEND_URL;
const VPN_SERVER_URL = BASE_URL + "/vpn-server";

export interface VpnServer {
  _id?: string;
  country: string;
  address: string;
  speed: number; // Speed range from 1 to 5
  flag: string;  // ISO country code (e.g., 'FR' for France)
  _createdAt?: string; // Date de création au format ISO
  _updatedAt?: string; // Date de mise à jour au format ISO
}

// Helper function to handle fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

// Get all VPN servers
export const getAllVpnServers = async (): Promise<VpnServer[]> => {
  const response = await fetch(`${VPN_SERVER_URL}`, {
    method: 'GET',
  });
  return handleResponse(response);
};

// Get a single VPN server by ID
export const getVpnServerById = async (id: string): Promise<VpnServer> => {
  const response = await fetch(`${VPN_SERVER_URL}/${id}`, {
    method: 'GET',
  });
  return handleResponse(response);
};

// Add a new VPN server
export const addVpnServer = async (serverData: Partial<VpnServer>): Promise<VpnServer> => {
  const response = await fetch(`${VPN_SERVER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serverData),
  });
  return handleResponse(response);
};

// Update an existing VPN server
export const updateVpnServer = async (id: string, serverData: Partial<VpnServer>): Promise<VpnServer> => {
  const response = await fetch(`${VPN_SERVER_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(serverData),
  });
  return handleResponse(response);
};

// Delete a VPN server
export const deleteVpnServer = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${VPN_SERVER_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};
