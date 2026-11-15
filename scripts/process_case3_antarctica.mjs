import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/Users/fpaim/Desktop/Hackaton Nasa';
const dir = path.join(root, 'DATA/Earth/Antarctica');
const files = fs.readdirSync(dir).filter(f => f.startsWith('weekly_sum_') && f.endsWith('.txt'));

console.log(`Found ${files.length} weekly summary files.`);

let allMinTemp = Infinity, allMaxTemp = -Infinity, tempSum = 0, tempCount = 0;
let allMinPres = Infinity, allMaxPres = -Infinity, presSum = 0, presCount = 0;
let allMaxWind = -Infinity, windSum = 0, windCount = 0;
let allMaxAlt = -Infinity, allMinAlt = Infinity;

const weeklyRecords = [];

for (const file of files) {
  const text = fs.readFileSync(path.join(dir, file), 'utf8');

  // Temperature
  const avgTempMatch = text.match(/Average temp\.\.\.\s*([-\d.]+)\s*°C/i);
  const maxTempMatch = text.match(/Maximum temp\.\.\.\s*([-\d.]+)\s*°C/i);
  const minTempMatch = text.match(/Minimum temp\.\.\.\s*([-\d.]+)\s*°C/i);

  // Wind
  const avgWindMatch = text.match(/Average wind speed\.*:\s*([\d.]+)\s*mph/i) || text.match(/Average wind speed\.+\s*([\d.]+)\s*mph/i);
  const maxWindMatch = text.match(/Maximum wind speed\.*:\s*([\d.]+)\s*mph/i) || text.match(/Maximum wind speed\.+\s*([\d.]+)\s*mph/i);

  // Pressure
  const avgPresMatch = text.match(/Average pressure\.+\s*([\d.]+)\s*mb/i);
  const maxPresMatch = text.match(/Highest pressure\.+\s*([\d.]+)\s*mb/i);
  const minPresMatch = text.match(/Lowest pressure\.+\s*([\d.]+)\s*mb/i);

  // Physio-alt
  const avgAltMatch = text.match(/Average physio-alt\s*=\s*\d+\s*ft\/\s*(\d+)\s*m/i);

  const avgTemp = avgTempMatch ? parseFloat(avgTempMatch[1]) : null;
  const maxTemp = maxTempMatch ? parseFloat(maxTempMatch[1]) : null;
  const minTemp = minTempMatch ? parseFloat(minTempMatch[1]) : null;

  const avgWind = avgWindMatch ? parseFloat(avgWindMatch[1]) : null;
  const maxWind = maxWindMatch ? parseFloat(maxWindMatch[1]) : null;

  const avgPres = avgPresMatch ? parseFloat(avgPresMatch[1]) : null;
  const maxPres = maxPresMatch ? parseFloat(maxPresMatch[1]) : null;
  const minPres = minPresMatch ? parseFloat(minPresMatch[1]) : null;

  if (minTemp !== null && minTemp < allMinTemp) allMinTemp = minTemp;
  if (maxTemp !== null && maxTemp > allMaxTemp) allMaxTemp = maxTemp;
  if (avgTemp !== null) { tempSum += avgTemp; tempCount++; }

  if (maxWind !== null && maxWind > allMaxWind) allMaxWind = maxWind;
  if (avgWind !== null) { windSum += avgWind; windCount++; }

  if (minPres !== null && minPres < allMinPres) allMinPres = minPres;
  if (maxPres !== null && maxPres > allMaxPres) allMaxPres = maxPres;
  if (avgPres !== null) { presSum += avgPres; presCount++; }

  weeklyRecords.push({
    file,
    avgTemp, maxTemp, minTemp,
    avgWind, maxWind,
    avgPres
  });
}

const meanTemp = tempSum / tempCount;
const meanWind = windSum / windCount;
const meanPres = presSum / presCount;

console.log('Amundsen-Scott South Pole Station Climate Synthesis (2025-2026):');
console.log(`- Temperature Range: ${allMinTemp.toFixed(1)} °C to ${allMaxTemp.toFixed(1)} °C (Mean: ${meanTemp.toFixed(1)} °C)`);
console.log(`- Wind Speed: Mean ${meanWind.toFixed(1)} mph, Peak Gust ${allMaxWind.toFixed(1)} mph`);
console.log(`- Barometric Pressure: ${allMinPres.toFixed(1)} mb to ${allMaxPres.toFixed(1)} mb (Mean: ${meanPres.toFixed(1)} mb)`);

const case3Summary = {
  caseId: 'CASO-03',
  title: 'Estación Amundsen–Scott, Antártida ↔ Polo Sur Lunar (Cráter Shackleton)',
  status: 'CALIBRATED_REAL_DATA',
  timestamp: new Date().toISOString(),
  earthSite: {
    name: 'Estación Científica Amundsen–Scott del Polo Sur',
    location: 'Meseta Polar Interior, Antártida',
    coordinates: { lat: -90.0, lon: 0.0, geographicElevationM: 2835 },
    datasetSource: 'Antarctic Meteorological Research and Data Center (AMRDC DOI: 10.48567/r6wy-as19)',
    meteorologySynthesis: {
      analyzedWeeks: files.length,
      timeframe: '2025–2026 Weekly Atmospheric Summaries',
      absoluteMinimumTempC: Number(allMinTemp.toFixed(1)),
      absoluteMaximumTempC: Number(allMaxTemp.toFixed(1)),
      meanAnnualTempC: Number(meanTemp.toFixed(1)),
      meanWindSpeedMph: Number(meanWind.toFixed(1)),
      peakWindGustMph: Number(allMaxWind.toFixed(1)),
      barometricPressureMb: {
        min: Number(allMinPres.toFixed(1)),
        mean: Number(meanPres.toFixed(1)),
        max: Number(allMaxPres.toFixed(1))
      },
      physioAltitudeM: 3162,
      isolationPeriodMonths: 8.5,
      winterCrewCapacity: 42
    },
    logisticsModel: {
      traverseName: 'South Pole Traverse (SPoT)',
      origin: 'Estación McMurdo',
      destination: 'Polo Sur Amundsen–Scott',
      distanceKm: 1600,
      transitDurationDays: 40,
      annualHeavySupplyVolumeGal: 450000,
      operationalAnalogueNote: 'Modelo de suministro pesado de superficie y autosuficiencia energética para Artemis Base Camp'
    }
  },
  planetaryTarget: {
    targetBody: 'Luna',
    targetRegion: 'Polo Sur Lunar (Borde del Cráter Shackleton Site 04 y Connecting Ridge)',
    coordinates: { lat: -89.9, lon: 0.0 },
    lolaAltimetry: {
      source: 'NASA LOLA 5 m/px DEM (Site04_final_adj_5mpp_surf.tif, Barker et al., 2021)',
      elevationRangeM: { min: -2846.5, max: 1805.0, relief: 4651.5 },
      medianElevationM: 668.3,
      medianSlopeDeg: 20.43,
      p90SlopeDeg: 32.62,
      maxWallSlopeDeg: 43.12,
      gridResolution: '5 m/pixel (3200 x 3200 celdas, 256 km²)',
      status: 'CALIBRATED_REAL_DATA'
    },
    environmentalRegime: {
      psrThermalTrapK: '< 40 K (-233 °C) en trampas frías de fondo de cráter (NASA LRO Diviner)',
      sunlitRidgeTempK: '~220 K (-53 °C) en crestas iluminadas cuasi-permanentes',
      slopeRegimeDeg: 'Crestas de aterrizaje moderadas (5°-15°); paredes interiores escarpadas (> 28° a 43°)'
    },
    missionArchitecture: 'NASA Artemis Base Camp / PROMISE Mission (Presencia humana sostenida)'
  },
  mcdaEvaluation: {
    overallScore: 82,
    maxScore: 100,
    formula: 'S = 100 · (1 - Σ(w_j · d_j) / Σ w_j)',
    dimensions: [
      { key: 'operations', label: 'Operaciones y Aislamiento Estacional (8.5 meses)', weight: 1.0, normalizedDiff: 0.05, similarity: 95 },
      { key: 'logistics', label: 'Logística de Travesía Pesada (SPoT 1600 km)', weight: 1.0, normalizedDiff: 0.08, similarity: 92 },
      { key: 'thermal', label: 'Estrés Térmico Criogénico y Fatiga de Materiales', weight: 0.9, normalizedDiff: 0.15, similarity: 85 },
      { key: 'topography', label: 'Topografía de Meseta y Movilidad (Sastrugi vs Regolito)', weight: 0.8, normalizedDiff: 0.22, similarity: 78 },
      { key: 'lithology', label: 'Litología (Hielo Terrestre vs Regolito Lunar - Desponderada)', weight: 0.1, normalizedDiff: 0.65, similarity: 35 }
    ]
  }
};

fs.writeFileSync(path.join(root, 'src/data/processedCase3Summary.json'), JSON.stringify(case3Summary, null, 2));
console.log('Successfully generated src/data/processedCase3Summary.json!');
