import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useIsMobile } from '../../hooks/useMobile'

/**
 * Contador animado.
 *
 * Usa motion values en vez de estado de React: `useTransform` escribe directo
 * al nodo del DOM, así que la animación no provoca ni un re-render por frame.
 * Importa porque HexagonGrid ya mantiene un requestAnimationFrame permanente
 * que invalida un composite de viewport completo en cada frame; cuatro
 * contadores con setState encima se notarían en Android de gama baja.
 *
 * Se salta el tween con "reducir movimiento" y en móvil, igual que el resto
 * de las animaciones de entrada del hero.
 */
function CountUp({ value, duration = 1.4, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const { i18n } = useTranslation()

  const count = useMotionValue(0)
  const text = useTransform(count, (v) => Math.round(v).toLocaleString(i18n.language))

  useEffect(() => {
    if (!inView) return undefined

    if (prefersReducedMotion || isMobile) {
      count.set(value)
      return undefined
    }

    const controls = animate(count, value, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, prefersReducedMotion, isMobile, value, duration, count])

  return (
    // El lector de pantalla anuncia el valor final una vez, no el ticker.
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {/* `color: inherit` explícito: la capa base pinta todo `span` de
          neutral-300, así que sin esto el número perdería el color del padre. */}
      <span aria-hidden="true" className="text-[inherit]">
        {prefix}
        <motion.span>{text}</motion.span>
        {suffix}
      </span>
    </span>
  )
}

export default CountUp
