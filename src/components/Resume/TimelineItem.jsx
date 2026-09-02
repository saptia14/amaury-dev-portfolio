import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AchievementGroup from './AchievementGroup'

/** El acordeón solo se gana su lugar con varios grupos etiquetados. */
const MIN_BULLETS_FOR_ACCORDION = 4

/**
 * Una entrada del timeline.
 *
 * `experience` trae la parte estructural (empresa, ciudad, ids de bullets)
 * desde src/data/resume.js; el copy se resuelve por id contra los locales.
 */
function TimelineItem({ experience, index }) {
  const { t } = useTranslation()
  const base = `resume.experiences.${experience.id}`

  const bullets = useMemo(
    () => experience.bullets.map((bulletId) => ({
      id: bulletId,
      label: t(`${base}.bullets.${bulletId}.label`),
      text: t(`${base}.bullets.${bulletId}.text`),
    })),
    [experience.bullets, base, t]
  )

  const useAccordion = bullets.length >= MIN_BULLETS_FOR_ACCORDION

  // En escritorio abre todo (el reclutador escanea y no cuesta scroll);
  // en móvil solo el primero. Se siembra una vez al montar.
  const [openIds, setOpenIds] = useState(() => {
    if (!useAccordion) return new Set(bullets.map((b) => b.id))
    const isDesktop =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
    return new Set(isDesktop ? bullets.map((b) => b.id) : bullets.slice(0, 1).map((b) => b.id))
  })

  const toggle = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const allOpen = openIds.size === bullets.length
  const toggleAll = () => setOpenIds(allOpen ? new Set() : new Set(bullets.map((b) => b.id)))

  const location = experience.remote
    ? `${experience.city} (${t('resume.location_remote')})`
    : experience.city

  return (
    <motion.li
      className="relative pl-10 md:pl-14 pb-10 last:pb-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {/* Nodo del riel: sólido para el puesto actual, hueco para los pasados */}
      <span
        aria-hidden="true"
        className={`absolute left-[9px] top-1.5 w-3 h-3 rounded-full ring-4 ring-[rgb(var(--background-end-rgb))] ${
          experience.current ? 'bg-primary-500' : 'border-2 border-neutral-600 bg-neutral-900'
        }`}
      />

      <div className="glass-effect rounded-2xl p-6 md:p-8 border border-neutral-700/50">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-neutral-100 mb-1">{t(`${base}.title`)}</h3>
            <p className="text-primary-400 font-semibold">{experience.company}</p>
          </div>
          <div className="text-neutral-400 text-sm md:text-right flex-shrink-0">
            <p>{t(`${base}.period`)}</p>
            <p>{location}</p>
          </div>
        </div>

        {useAccordion && (
          <div className="flex justify-end mb-1">
            <button
              type="button"
              onClick={toggleAll}
              className="text-xs font-medium text-neutral-500 hover:text-primary-400 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
            >
              {allOpen ? t('resume.collapse_all') : t('resume.expand_all')}
            </button>
          </div>
        )}

        {useAccordion ? (
          <ul>
            {bullets.map((bullet) => (
              <AchievementGroup
                key={bullet.id}
                label={bullet.label}
                text={bullet.text}
                isOpen={openIds.has(bullet.id)}
                onToggle={() => toggle(bullet.id)}
              />
            ))}
          </ul>
        ) : (
          // Con uno o dos logros, colapsar es hostil: se muestran siempre.
          <ul className="space-y-3">
            {bullets.map((bullet) => (
              <li key={bullet.id} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2.5 flex-shrink-0"
                />
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                  <span className="font-semibold text-neutral-200">{bullet.label}. </span>
                  {bullet.text}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.li>
  )
}

export default TimelineItem
