import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';  // Pour afficher les drapeaux
import CountrySelect from 'react-select-country-list';  // Pour obtenir la liste des pays
import { VpnServer } from '../../../api/vpn-server.api';

// Définition manuelle du type Option pour chaque pays
interface CountryOption {
    value: string; // Code ISO du pays
    label: string; // Nom du pays
  }
  

interface VpnServerFormProps {
  open: boolean;
  onClose: () => void;
  onCreate: (server: Partial<VpnServer>) => void;
  onUpdate: (server: Partial<VpnServer>) => void;
  mode: 'create' | 'update' | 'view';
  server?: VpnServer | null;
}

const VpnServerForm: React.FC<VpnServerFormProps> = ({ open, onClose, onCreate, onUpdate, mode, server }) => {
  const [country, setCountry] = useState<string>(server?.country || '');
  const [address, setAddress] = useState<string>(server?.address || '');
  const [speed, setSpeed] = useState<number>(server?.speed || 1);
  const [countries, setCountries] = useState<CountryOption[]>([]); // Liste des pays

  // Charger la liste des pays depuis react-select-country-list
  useEffect(() => {
    const countryList = CountrySelect().getData();
    setCountries(countryList);
  }, []);

  // Reset form when server changes (for update mode)
  useEffect(() => {
    if (mode === 'update' && server) {
      setCountry(server.country);
      setAddress(server.address);
      setSpeed(server.speed);
    }
  }, [mode, server]);

  const handleSubmit = () => {
    const vpnServer: Partial<VpnServer> = { 
      country, 
      address, 
      speed, 
      flag: country.toUpperCase() // Le flag est le code ISO du pays (ex: 'FR' pour la France)
    };
    if (mode === 'create') {
      onCreate(vpnServer);
    } else if (mode === 'update') {
      onUpdate({ ...server, ...vpnServer });  // Inclut l'ID pour la mise à jour
    }
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'country') setCountry(value);
    if (name === 'address') setAddress(value);
    if (name === 'speed') setSpeed(Number(value));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'create' ? 'Add VPN Server' : mode === 'update' ? 'Update VPN Server' : 'View VPN Server'}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            name="country"
            disabled={mode === 'view'}
          >
            {countries.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                <ReactCountryFlag countryCode={item.value} style={{ width: 20, marginLeft: 8 }} />
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Address"
          value={address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          name="address"
          disabled={mode === 'view'}
        />
        
        <TextField
          label="Speed (1-5)"
          type="number"
          value={speed}
          onChange={handleChange}
          fullWidth
          margin="normal"
          name="speed"
          disabled={mode === 'view'}
        />

        {mode !== 'view' && (
          <Button onClick={handleSubmit} fullWidth variant="contained" color="primary">
            {mode === 'create' ? 'Add Server' : 'Update Server'}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VpnServerForm;
