import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import CountrySelect from 'react-select-country-list';
import { useVpnServer } from '../../../hooks/useVpnServer';

// Type pour les options de pays
interface CountryOption {
  value: string; // Code ISO du pays
  label: string; // Nom du pays
}

const VpnServerFilter: React.FC = () => {
  const {  setFilter } = useVpnServer();
  const [country, setCountry] = useState<string>('');
  const [minSpeed, setMinSpeed] = useState<string>('');
  const [countries, setCountries] = useState<CountryOption[]>([]);

  // Charger la liste des pays au montage
  useEffect(() => {
    const countryList = CountrySelect().getData() as CountryOption[];
    setCountries(countryList);
  }, []);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const newCountry = event.target.value;
    setCountry(newCountry);
    setFilter({ country: newCountry, minSpeed:+minSpeed });
  };

  const handleMinSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinSpeed = event.target.value;
    setMinSpeed(newMinSpeed);
    setFilter({ country, minSpeed: +newMinSpeed });
  };

  return (
    <Box display="flex" gap={2}>
      <Select value={country} onChange={handleCountryChange} displayEmpty>
        <MenuItem value="">
          <em>All Countries</em>
        </MenuItem>
        {countries.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <ReactCountryFlag countryCode={item.value} style={{ width: 20, marginRight: 8 }} />
            {item.label}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Min Speed"
        value={minSpeed}
        onChange={handleMinSpeedChange}
        type="number"
      />
    </Box>
  );
};

export default VpnServerFilter;