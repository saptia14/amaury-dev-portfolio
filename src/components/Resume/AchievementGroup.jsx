import { useId } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

/**
 * Un logro temático colapsable.
 *
 * Patrón heading-wraps-button: el <h4> envuelve el <button>, de modo que un
 * lector de pantalla puede saltar de grupo en grupo por encabezado. No se usa
 * <details>/<summary> porque animar su altura con framer-motion no es
 * confiable entre navegadores.
 *
 * El anillo de foco va en el botón, nunca en el contenido del panel: el
 * `overflow-hidden` que necesita la animación de altura lo recortaría.
 */
function AchievementGroup({ label, text, isOpen, onToggle }) {
  const id = useId()
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`
  const prefersReducedMotion = useReducedMotion()

  return (
    <li className="border-b border-neutral-800/70 last:border-b-0">
      <h4>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-3 py-3 text-left rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 group"
        >
          <span className="flex items-center gap-3 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />
            <span className="font-semibold text-neutral-200 group-hover:text-primary-300 transition-colors">
              {label}
            </span>
          </span>
          <FaChevronDown
            aria-hidden="true"
            className={`w-3 h-3 flex-shrink-0 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </h4>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-[18px] pr-1 text-neutral-400 text-sm md:text-base leading-relaxed">
              {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default AchievementGroup
