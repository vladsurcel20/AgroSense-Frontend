import { formatFieldName } from "./formatFieldName";

export interface ThresholdConfig {
  type: string;                 // temperature, humidity, light
  displayName: string;          // Air Temperature, Air Humidity, Light Intensity
  unit: string;                 // °C, %, lux
  minField: string;             // minSoilTemp, minAirHum
  maxField: string;             // maxSoilTemp, maxAirHum
  minValue: number;
  maxValue: number;
  cropId: number; 
}

export const transformThresholdsToArray = (culture: any): ThresholdConfig[] => {
  const unitMappings: Record<string, string> = {
    Temp: '°C',
    Hum: '%',
    Light: 'lux',
  };

  const typeMapping: Record<string, string> = {
    temp: 'temperature',
    hum: 'humidity',
    light: 'light'
  };

  const result: ThresholdConfig[] = [];
  // Cheia va fi de forma: temperature_air, temperature_soil, etc.
  const fieldGroups: Record<string, Partial<ThresholdConfig> & {  displayNameBase?: string; localization?: string }> = {};

  for (const [key, value] of Object.entries(culture)) {
    if (key.startsWith('min') || key.startsWith('max')) {
      // Extrage partea de tip (Temp/Hum/Light) si localizarea (Air/Soil)
      const match = key.match(/^(min|max)(Temp|Hum|Light)(Air|Soil)?$/i);
      if (!match) continue;

      const [, minMax, typeShort, loc] = match;
      const type = typeMapping[typeShort.toLowerCase()] || typeShort.toLowerCase();
      const localization = loc ? loc.toLowerCase() : '';
      const groupKey = localization ? `${type}_${localization}` : type;

      if (!fieldGroups[groupKey]) {
        fieldGroups[groupKey] = {
          type,
          localization,
        };
      }

      // Unitate
      if (unitMappings[typeShort]) fieldGroups[groupKey].unit = unitMappings[typeShort];

      // Câmpuri min/max și valori
      if (minMax === 'min') {
        fieldGroups[groupKey].minField = key;
        fieldGroups[groupKey].minValue = typeof value === 'number' ? value : 0;
      } else {
        fieldGroups[groupKey].maxField = key;
        fieldGroups[groupKey].maxValue = typeof value === 'number' ? value : 0;
      }

      // Salvăm un fieldName fără min/max pentru displayName
      if (!fieldGroups[groupKey].displayNameBase) {
        // Elimină prefixul min/max
        const baseField = key.replace(/^(min|max)/, '');
        fieldGroups[groupKey].displayNameBase = baseField;
      }
    }
  }

  // Transformă în array și adaugă displayName fără min/max
  for (const config of Object.values(fieldGroups)) {
    if (config.type && config.minField && config.maxField && config.displayNameBase) {
      result.push({
        type: config.type,
        displayName: formatFieldName(config.displayNameBase as string), // Fără min/max
        unit: config.unit || '',
        minField: config.minField || '',
        maxField: config.maxField || '',
        minValue: config.minValue || 0,
        maxValue: config.maxValue || 0,
        cropId: culture.id,
      });
    }
  }

  return result;
};