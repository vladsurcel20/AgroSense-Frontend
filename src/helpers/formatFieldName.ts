export const formatFieldName = (fieldName: string): string => {
  const mappings: Record<string, string> = {
    temp: 'Temperature',
    hum: 'Humidity',
    soil: 'Soil',
    air: 'Air',
    light: 'Light Intensity'
  };

  // Descompune camelCase și înlocuiește abreviere
  const words = fieldName
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .split(' ')
    .map(word => mappings[word] || word.charAt(0).toUpperCase() + word.slice(1));

  let result = words.join(' ');
  
  // Adaugă (Min/Max) la sfârșit dacă e cazul
  if (fieldName.startsWith('min')) result = result.replace('Min ', '') + ' (Min)';
  if (fieldName.startsWith('max')) result = result.replace('Max ', '') + ' (Max)';

  return result;
};

// Teste:
// formatFieldName('maxSoilTemp') → "Soil Temperature (Max)"
// formatFieldName('minLight') → "Light Intensity (Min)"