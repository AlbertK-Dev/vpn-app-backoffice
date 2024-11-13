import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import CountrySelect from 'react-select-country-list';
import { VpnServer } from '../../../api/vpn-server.api';

interface CountryOption {
  value: string; // code du pays (ex: "FR")
  label: string; // nom complet du pays (ex: "France")
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
  const [flag, setFlag] = useState<string>(server?.flag || '');
  const [address, setAddress] = useState<string>(server?.address || '');
  const [speed, setSpeed] = useState<number>(server?.speed || 1);
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [errors, setErrors] = useState<{ address?: string; speed?: string }>({});

  useEffect(() => {
    const countryList = CountrySelect().getData();
    setCountries(countryList);
  }, []);

  useEffect(() => {
    if (mode === 'update' && server) {
      setCountry(server.country);
      setFlag(server.flag);
      setAddress(server.address);
      setSpeed(server.speed);
    }
  }, [mode, server]);

  // Fonction pour valider l'URL (http/https requis, accepte IP avec port)
  const validateAddress = (url: string) => {
    const regex = /^(https?:\/\/)(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[^\s]*)?$/;
    return regex.test(url);
  };

  // Fonction pour gérer la validation des champs
  const validateForm = () => {
    let valid = true;
    const newErrors: { address?: string; speed?: string } = {};

    if (!validateAddress(address)) {
      newErrors.address = 'Please enter a valid HTTP/HTTPS URL or IP address (with optional port).';
      valid = false;
    }
    if (speed < 1 || speed > 5) {
      newErrors.speed = 'Speed must be between 1 and 5.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const vpnServer: Partial<VpnServer> = {
      country,
      address,
      speed,
      flag,
    };

    if (mode === 'create') {
      onCreate(vpnServer);
    } else if (mode === 'update') {
      onUpdate({ ...server, ...vpnServer });
    }
    onClose();
  };

  const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const countryCode = event.target.value as string;
    const selectedCountry = countries.find((c) => c.value === countryCode);
    if (selectedCountry) {
      setCountry(selectedCountry.label); // Nom complet du pays
      setFlag(selectedCountry.value); // Code du pays pour le drapeau
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'address') setAddress(value);
    if (name === 'speed') {
      const parsedSpeed = Number(value);
      setSpeed(parsedSpeed);
      if (parsedSpeed < 1 || parsedSpeed > 5) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          speed: 'Speed must be between 1 and 5.',
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, speed: '' }));
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{mode === 'create' ? 'Add VPN Server' : mode === 'update' ? 'Update VPN Server' : 'View VPN Server'}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            value={flag}
            onChange={handleCountryChange}
            name="country"
            disabled={mode === 'view'}
          >
            {countries.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                <ReactCountryFlag countryCode={item.value} style={{ width: 20, marginRight: 8 }} />
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
          error={!!errors.address}
          helperText={errors.address}
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
          error={!!errors.speed}
          helperText={errors.speed}
          inputProps={{ min: 1, max: 5 }}
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
