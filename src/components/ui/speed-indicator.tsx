import React from 'react';
import { Box, Stack } from '@mui/material';

interface SpeedIndicatorProps {
  speed: number; // Valeur de 1 à 5
}

const SpeedIndicator: React.FC<SpeedIndicatorProps> = ({ speed }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            width: 4 + index * 2, // Chaque barre augmente en taille
            height: 16 + index * 2,
            bgcolor: index < speed ? (speed >= 3 ? 'green' : 'red') : 'grey.300',
            borderRadius: 1,
          }}
        />
      ))}
    </Stack>
  );
};

export default SpeedIndicator