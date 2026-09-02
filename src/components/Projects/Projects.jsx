import { useState, useMemo, useCallback } from 'react'
import { useProjects, getProjectCategories } from '../../hooks/useProjects'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ProjectCard from './ProjectCard'

function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all')
  const { projects = [], loading, error, filteredProjects = [] } = useProjects(filter)
  const categories = useMemo(() => getProjectCategories(Array.isArray(projects) ? projects : []), [projects])

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  // Loading state
  if (loading) {
    return (
      <section className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-48 h-10 bg-neutral-800/50 rounded-xl mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-neutral-800/50 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-800/30 rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">{t('projects.error')}</p>
          <p className="text-neutral-400">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('projects.title')} <span className="gradient-text">{t('projects.subtitle')}</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              {/* Optional translation key for subtitle */}
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categories.map((category) => {
              return (
                <button
                  key={category.value}
                  onClick={() => handleFilterChange(category.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    filter === category.value
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/20'
                      : 'bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-700/50 border border-neutral-700/50'
                  }`}
                >
                  {t(`projects.filter_${category.value}`)}
                </button>
              );
            })}
          </motion.div>

          {/* Projects List */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-neutral-400">{t('projects.empty')}</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

export default Projects
