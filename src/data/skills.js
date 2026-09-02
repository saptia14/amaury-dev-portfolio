/**
 * Matriz de habilidades, marquee del hero y showcase del stack.
 *
 * Solo datos: nombres de tecnologías (nombres propios), colores de marca,
 * claves de icono y claves de nivel. Los títulos de categoría y las etiquetas
 * de nivel se traducen en `techStack.categories.*` y `techStack.levels.*`.
 *
 * `iconKey` se resuelve contra el mapa ICONS de cada componente para que este
 * archivo no importe React ni react-icons.
 *
 * Niveles según el CV: todas las categorías Expert salvo Frontend = Good.
 */

export const SKILL_CATEGORIES = [
  {
    id: 'backend',
    iconKey: 'server',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    technologies: [
      { name: 'Ruby on Rails', iconKey: 'rails', level: 'expert', color: '#CC0000' },
      { name: 'PostgreSQL', iconKey: 'postgres', level: 'expert', color: '#4169E1' },
      { name: 'Sidekiq / Redis', iconKey: 'redis', level: 'expert', color: '#DC382D' },
      { name: 'REST API Design', iconKey: 'server', level: 'expert', color: '#94A3B8' },
      { name: 'RSpec', iconKey: 'code', level: 'expert', color: '#EF4444' },
    ],
  },
  {
    id: 'mobile',
    iconKey: 'mobile',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    technologies: [
      { name: 'Kotlin Multiplatform', iconKey: 'kotlin', level: 'expert', color: '#7F52FF' },
      { name: 'Compose Multiplatform', iconKey: 'compose', level: 'expert', color: '#4285F4' },
      { name: 'Kotlin / Android SDK', iconKey: 'android', level: 'expert', color: '#3DDC84' },
      { name: 'Swift', iconKey: 'swift', level: 'expert', color: '#F05138' },
      { name: 'fastlane', iconKey: 'fastlane', level: 'expert', color: '#00F200' },
    ],
  },
  {
    id: 'frontend',
    iconKey: 'code',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    technologies: [
      { name: 'Ember.js', iconKey: 'ember', level: 'good', color: '#E04E39' },
      { name: 'JavaScript', iconKey: 'js', level: 'good', color: '#F7DF1E' },
      { name: 'TypeScript', iconKey: 'ts', level: 'good', color: '#3178C6' },
      { name: 'Node.js', iconKey: 'node', level: 'good', color: '#5FA04E' },
      { name: 'SCSS', iconKey: 'sass', level: 'good', color: '#CC6699' },
    ],
  },
  {
    id: 'aws',
    iconKey: 'aws',
    color: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
    borderColor: 'border-primary-500/20',
    technologies: [
      { name: 'EC2 & Auto Scaling', iconKey: 'aws', level: 'expert', color: '#FF9900' },
      { name: 'S3 & CloudFront', iconKey: 'cloud', level: 'expert', color: '#569A31' },
      { name: 'RDS (PostgreSQL)', iconKey: 'database', level: 'expert', color: '#4169E1' },
      { name: 'ELB & Route 53', iconKey: 'network', level: 'expert', color: '#8C4FFF' },
      { name: 'VPC, IAM & ACM', iconKey: 'shield', level: 'expert', color: '#DD344C' },
    ],
  },
  {
    id: 'devops',
    iconKey: 'tools',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    technologies: [
      { name: 'Docker', iconKey: 'docker', level: 'expert', color: '#2496ED' },
      { name: 'GitLab CI/CD', iconKey: 'gitlab', level: 'expert', color: '#FC6D26' },
      { name: 'Capistrano', iconKey: 'rocket', level: 'expert', color: '#94A3B8' },
      { name: 'HashiCorp Vault', iconKey: 'vault', level: 'expert', color: '#FFD814' },
      { name: 'CloudWatch & OpenTelemetry', iconKey: 'otel', level: 'expert', color: '#F5A800' },
    ],
  },
  {
    id: 'architecture',
    iconKey: 'sitemap',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    technologies: [
      { name: 'Multi-Tenant SaaS', iconKey: 'layers', level: 'expert', color: '#A78BFA' },
      { name: 'Clean Architecture', iconKey: 'sitemap', level: 'expert', color: '#C084FC' },
      { name: 'Payment Integrations', iconKey: 'card', level: 'expert', color: '#635BFF' },
      { name: 'Technical Leadership', iconKey: 'users', level: 'expert', color: '#F472B6' },
    ],
  },
];

/** Cinta del hero. Solo tecnologías del CV: React es el stack de este sitio, no una skill del CV. */
export const MARQUEE_TECHS = [
  { iconKey: 'rails', name: 'Ruby on Rails', color: 'text-red-500' },
  { iconKey: 'postgres', name: 'PostgreSQL', color: 'text-sky-400' },
  { iconKey: 'kotlin', name: 'Kotlin', color: 'text-purple-500' },
  { iconKey: 'swift', name: 'Swift', color: 'text-orange-500' },
  { iconKey: 'ember', name: 'Ember.js', color: 'text-red-400' },
  { iconKey: 'aws', name: 'AWS', color: 'text-primary-500' },
  { iconKey: 'docker', name: 'Docker', color: 'text-blue-400' },
];

/** "Tech Stack in Action". `extraGateways` se rinde con `techStack.plus_gateways`. */
export const TECH_SHOWCASE = [
  { id: 'crm', tech: ['Ember.js', 'JavaScript', 'AWS'] },
  { id: 'ecommerce', tech: ['Ruby on Rails', 'Stripe', 'Openpay'], extraGateways: 8 },
  { id: 'mobile_apps', tech: ['Kotlin', 'Swift', 'KMP', 'iOS'] },
];
