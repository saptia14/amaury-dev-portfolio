import { EXPERIENCES } from '../../data/resume'
import TimelineItem from './TimelineItem'

/**
 * Timeline vertical de experiencia.
 *
 * El riel va a la izquierda en todos los breakpoints: un riel central alternado
 * duplica el CSS responsive y deja un orden de lectura confuso en el DOM, y no
 * lo vale para tres entradas.
 *
 * El orden lo manda src/data/resume.js, no los locales: así ningún idioma
 * puede renderizar un currículo distinto que el otro.
 */
function ExperienceTimeline({ experiences = EXPERIENCES }) {
  const items = Array.isArray(experiences) ? experiences : []
  if (items.length === 0) return null

  return (
    // El riel va fuera del <ol>: un <ol> solo admite <li> como hijo directo.
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary-500/60 via-neutral-700 to-transparent"
      />
      <ol>
        {items.map((experience, index) => (
          <TimelineItem key={experience.id} experience={experience} index={index} />
        ))}
      </ol>
    </div>
  )
}

export default ExperienceTimeline
