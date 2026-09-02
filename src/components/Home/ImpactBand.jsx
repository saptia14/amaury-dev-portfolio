import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaBuilding, FaClock, FaCreditCard, FaPlug } from 'react-icons/fa'
import { IMPACT_METRICS } from '../../data/metrics'
import CountUp from './CountUp'

const ICONS = {
  brands: FaBuilding,
  endpoints: FaPlug,
  gateways: FaCreditCard,
  years: FaClock,
}

/**
 * Franja de métricas reales del CV, justo debajo del hero.
 *
 * Los números vienen de src/data/metrics.js; las etiquetas de i18n. Se monta
 * dentro de Home (sección `priority`, import eager) para que entre en el
 * primer paint sin Suspense ni chunk extra, y para no romper el contrato de
 * ids en el que se apoya el scroll-spy del Navbar.
 */
function ImpactBand({ metrics = IMPACT_METRICS, className = '' }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full ${className}`}
    >
      <p className="text-center text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-5">
        {t('home.impact.title')}
      </p>

      <dl className="bg-neutral-900/85 backdrop-blur-md border border-neutral-800/80 rounded-2xl grid grid-cols-2 md:grid-cols-4 divide-y divide-x divide-neutral-800/70 md:divide-y-0 overflow-hidden">
        {metrics.map(({ id, value, prefix, suffix }) => {
          const Icon = ICONS[id]
          return (
            <div key={id} className="flex flex-col items-center gap-1.5 px-4 py-6 text-center">
              {Icon && <Icon className="text-primary-500/70 text-base mb-0.5" aria-hidden="true" />}
              <dd className="order-2 text-[11px] md:text-xs uppercase tracking-widest text-neutral-500 font-medium leading-snug">
                {t(`home.impact.${id}.label`)}
              </dd>
              <dt className="order-1 text-3xl md:text-4xl font-black tabular-nums">
                <CountUp
                  value={value}
                  prefix={prefix}
                  suffix={suffix}
                  className="text-primary-400"
                />
              </dt>
            </div>
          )
        })}
      </dl>
    </motion.div>
  )
}

export default ImpactBand
