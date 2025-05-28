export const convertDistanceToLiters = (
  distanceCm: number,
  heightCm: number,
  widthCm?: number | null,
  lengthCm?: number | null,
  radiusCm?: number | null
): number => {
  const waterHeight = Math.max(0, heightCm - distanceCm); // câtă apă e efectiv

   if (radiusCm) {
    const volumeCm3 = Math.PI * Math.pow(radiusCm, 2) * waterHeight;
    return parseFloat((volumeCm3 / 1000).toFixed(1)); // 1L = 1000 cm^3
  }

  if (widthCm && lengthCm) {
    const volumeCm3 = waterHeight * widthCm * lengthCm;
    return parseFloat((volumeCm3 / 1000).toFixed(1));
  }                  

 return parseFloat(distanceCm.toFixed(1));
};
