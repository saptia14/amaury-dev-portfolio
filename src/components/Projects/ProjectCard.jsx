import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaCalendarAlt, FaExternalLinkAlt, FaGithub, FaStar, FaUsers } from 'react-icons/fa'

/**
 * Tarjeta de proyecto.
 *
 * Todo el copy sale de `projects.items.<id>.*`; projects.json solo guarda
 * datos (imagen, tags, periodo, métricas, enlaces). Los badges de métrica
 * separan el número (dato) de la unidad (copy traducible).
 */
function ProjectCard({ project, index }) {
  const { t } = useTranslation()
  const [imageError, setImageError] = useState(false)

  const title = t(`projects.items.${project.id}.title`)
  const metrics = project.metrics?.slice(0, 3) ?? []

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`relative bg-neutral-900/60 backdrop-blur-sm rounded-2xl border transition-all duration-500 overflow-hidden ${
        project.featured
          ? 'border-primary-500/20 hover:border-primary-400/40 shadow-lg shadow-primary-500/5'
          : 'border-neutral-800 hover:border-neutral-700'
      }`}>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-medium">
              <FaStar className="w-3 h-3" />
              {t('projects.featured')}
            </span>
          </div>
        )}

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-72 lg:w-80 flex-shrink-0">
            <div className="relative h-48 md:h-full overflow-hidden bg-neutral-800/50">
              {!imageError ? (
                <img
                  src={project.image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImageError(true)}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                  <span className="text-4xl font-bold text-neutral-600">{title.charAt(0)}</span>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 md:p-8 flex flex-col">
            {/* Title & Role */}
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
                {title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt className="w-3.5 h-3.5 text-primary-400" />
                  {project.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaUsers className="w-3.5 h-3.5 text-primary-500" />
                  {t(`projects.items.${project.id}.role`)}
                </span>
                {project.teamSize > 1 && (
                  <span className="text-neutral-500">
                    {t('projects.team_of', { count: project.teamSize })}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-5 flex-grow">
              {t(`projects.items.${project.id}.desc`)}
            </p>

            {/* Metric badges: los números duros del CV, antes del stack */}
            {metrics.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-5">
                {metrics.map((metric) => (
                  <li
                    key={metric.id}
                    className="inline-flex items-baseline gap-1.5 px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/25"
                  >
                    <span className="font-mono tabular-nums text-sm font-semibold text-primary-300">
                      {metric.value}
                    </span>
                    <span className="text-[11px] uppercase tracking-wide text-neutral-400">
                      {t(`projects.metrics.${metric.id}`)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium bg-neutral-800/80 text-neutral-300 rounded-lg border border-neutral-700/50"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 6 && (
                <span className="px-2.5 py-1 text-xs font-medium text-neutral-500">
                  {t('projects.more_tags', { count: project.tags.length - 6 })}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/50 hover:border-neutral-600 text-sm font-medium transition-all duration-300"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>{t('projects.btn_code')}</span>
                </a>
              )}
              {project.demoUrl && project.demoUrl !== project.githubUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-primary-500/15 hover:shadow-primary-500/25"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  <span>{t('projects.btn_live')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
