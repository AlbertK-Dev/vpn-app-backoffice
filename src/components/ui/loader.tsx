import React from 'react';

interface LoaderProps {
  size?: number; // Taille du loader en pixels
  color?: string; // Couleur du loader
  speed?: number; // Durée de l'animation en secondes
}

const Loader: React.FC<LoaderProps> = ({ size = 40, color = '#3498db', speed = 1 }) => {
  const style = {
    width: size,
    height: size,
    border: `${size / 8}px solid ${color}`,
    borderTop: `${size / 8}px solid transparent`,
    borderRadius: '50%',
    animation: `spin ${speed}s linear infinite`,
  } as React.CSSProperties;

  return <div style={style}></div>;
};

export default Loader;

// Styles globaux pour l'animation de rotation
const globalStyles = document.createElement('style');
globalStyles.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(globalStyles);
