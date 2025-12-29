import { useMemo } from 'react';

interface AvatarOptions {
  name: string;
  size?: number;
  fontSize?: number;
}

const pastelColors = [
  '#FFB3BA', // Rosa pastel
  '#BAFFC9', // Verde pastel
  '#BAE1FF', // Azul pastel
  '#FFFFBA', // Amarillo pastel
  '#FFDFBA', // Naranja pastel
  '#E0BBE4', // Lavanda pastel
  '#FFB3E6', // Rosa claro pastel
  '#C1E1C1', // Verde menta pastel
  '#FFDAB9', // Melocotón pastel
  '#E6E6FA', // Lila pastel
];

export function useUserAvatar({ name, size = 200, fontSize = 80 }: AvatarOptions) {
  const avatarData = useMemo(() => {
    // Extraer la primera letra del nombre y convertirla a mayúscula
    const initial = name.trim().charAt(0).toUpperCase();
    
    // Generar un color consistente basado en el nombre
    const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % pastelColors.length;
    const backgroundColor = pastelColors[colorIndex];
    
    // Generar el SVG del avatar
    const svgContent = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size/2}"/>
        <text 
          x="50%" 
          y="50%" 
          text-anchor="middle" 
          dominant-baseline="central" 
          fill="#333333" 
          font-family="Arial, sans-serif" 
          font-size="${fontSize}" 
          font-weight="bold"
        >
          ${initial}
        </text>
      </svg>
    `;
    
    // Convertir SVG a data URL
    const dataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
    
    return {
      initial,
      backgroundColor,
      dataUrl,
      svgContent
    };
  }, [name, size, fontSize]);

  return avatarData;
}

// Función helper para generar avatar directamente (sin usar hooks)
export function generateUserAvatar(name: string, size: number = 200): string {
  // Extraer la primera letra del nombre y convertirla a mayúscula
  const initial = name.trim().charAt(0).toUpperCase();
  
  // Generar un color consistente basado en el nombre
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % pastelColors.length;
  const backgroundColor = pastelColors[colorIndex];
  
  // Generar el SVG del avatar
  const svgContent = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="${size/2}"/>
      <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        dominant-baseline="central" 
        fill="#333333" 
        font-family="Arial, sans-serif" 
        font-size="${size/2.5}" 
        font-weight="bold"
      >
        ${initial}
      </text>
    </svg>
  `;
  
  // Convertir SVG a data URL
  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
}
