/**
 * Datos estructurales del CV.
 *
 * La regla: si traducirlo sería incorrecto, va aquí; si dejarlo en inglés
 * sería incorrecto, va a src/locales/{en,es}/translation.json.
 *
 * Aquí viven nombres de empresas, ciudades, tecnologías, números e ids.
 * Los títulos de puesto, los bullets, los periodos (llevan nombre de mes) y
 * cualquier etiqueta visible viven en los locales, indexados por estos ids.
 *
 * Fuente: public/documents/Emmanuel-Amaury-Fuentes-Venegas-CV-Resume.pdf
 */

/** Números del CV. Se usan en el hero, en About y en el JSON-LD. */
export const STATS = {
  yearsExperience: 6,
  brands: 28,
  endpoints: 371,
  gateways: 10,
  projects: 7,
  mobileApps: 17,
  technologies: 20,
  deployments: 100,
};

/** Stack destacado. Nombres propios de tecnologías: nunca se traducen. */
export const PRIMARY_STACK = 'Ruby on Rails, Kotlin & Swift';
export const FOCUS_STACK = ['Ruby on Rails', 'KMP', 'AWS'];
export const ABOUT_STACK = {
  backend: 'Ruby on Rails',
  mobile: 'Kotlin Multiplatform & Swift',
};

/**
 * Experiencia laboral, en orden de presentación.
 * `bullets` lista los ids de logros; el texto vive en
 * `resume.experiences.<id>.bullets.<bulletId>` de cada locale.
 */
export const EXPERIENCES = [
  {
    id: 'koonol_tech_lead',
    company: 'Koonol México',
    city: 'Zapopan, Jal.',
    remote: true,
    current: true,
    bullets: ['platform', 'payments', 'carriers', 'reliability', 'aws', 'mobile', 'standards'],
  },
  {
    id: 'gurucomm_dev',
    company: 'Gurúcomm',
    city: 'Querétaro, Qro.',
    remote: false,
    current: false,
    bullets: ['platform', 'mobile'],
  },
  {
    id: 'gurucomm_trainee',
    company: 'Gurúcomm',
    city: 'Querétaro, Qro.',
    remote: false,
    current: false,
    bullets: ['onboarding'],
  },
];

export const EDUCATION = [
  {
    id: 'itq',
    institution: 'Instituto Tecnológico de Querétaro (ITQ)',
    city: 'Querétaro, Qro.',
  },
];

/** `level` es la proporción del medidor de 5 puntos; el nombre y la fluidez se traducen. */
export const LANGUAGES = [
  { id: 'es', level: 5 },
  { id: 'en', level: 4 },
];
