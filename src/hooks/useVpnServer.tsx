import { useContext } from "react";
import { VpnServerContext } from "../providers/vpnServerProvider";

export const useVpnServer = () => {
  const context = useContext(VpnServerContext);
  if (!context) {
    throw new Error('useVpnServer must be used within a VpnServerProvider');
  }
  return context;
};


