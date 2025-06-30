import { formatFieldName } from "./formatFieldName";
import i18n from 'i18next';

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
        fieldGroups[groupKey].minValue = typeof value === 'number' ? value : undefined;
      } else {
        fieldGroups[groupKey].maxField = key;
        fieldGroups[groupKey].maxValue = typeof value === 'number' ? value : undefined;
      }

      // Salvăm un fieldName fără min/max pentru displayName
      if (!fieldGroups[groupKey].displayNameBase) {
        // Elimină prefixul min/max
        const baseField = key.replace(/^(min|max)/, '');
        fieldGroups[groupKey].displayNameBase = baseField;
      }
    }
  }

  // Transformă în array și adaugă displayName fără min/max, doar dacă valorile nu sunt null
  for (const config of Object.values(fieldGroups)) {
    if (
      config.type &&
      config.minField &&
      config.maxField &&
      config.displayNameBase &&
      config.minValue !== undefined &&
      config.maxValue !== undefined
    ) {
      let displayName = '';
      const typeLabel = i18n.t(`deviceNames.${config.type}`, formatFieldName(config.displayNameBase as string));
      if (config.localization) {
        const locLabel = i18n.t(`sensorLocalization.${config.localization}`, config.localization.charAt(0).toUpperCase() + config.localization.slice(1));
        if (i18n.language === 'ro') {
          displayName = `${typeLabel} ${locLabel}`;
        } else {
          displayName = `${locLabel} ${typeLabel}`;
        }
      } else {
        displayName = typeLabel;
      }
      result.push({
        type: config.type,
        displayName,
        unit: config.unit || '',
        minField: config.minField || '',
        maxField: config.maxField || '',
        minValue: config.minValue as number,
        maxValue: config.maxValue as number,
        cropId: culture.id,
      });
    }
  }

  return result;
};