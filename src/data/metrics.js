import { STATS } from './resume';

/**
 * Métricas de la banda de impacto, bajo el hero.
 *
 * Los números son datos (viven en resume.js). Las etiquetas son copy y se
 * resuelven con `t('home.impact.<id>.label')`. `prefix` y `suffix` son
 * símbolos, no palabras, así que no requieren traducción.
 */
export const IMPACT_METRICS = [
  { id: 'brands', value: STATS.brands, prefix: '~', suffix: '' },
  { id: 'endpoints', value: STATS.endpoints, prefix: '', suffix: '' },
  { id: 'gateways', value: STATS.gateways, prefix: '', suffix: '' },
  { id: 'years', value: STATS.yearsExperience, prefix: '', suffix: '+' },
];
