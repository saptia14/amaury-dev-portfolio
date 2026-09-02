import { useMemo } from 'react' // Refreshed
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SKILL_CATEGORIES, TECH_SHOWCASE } from '../../data/skills'
import {
  SiDocker,
  SiJavascript,
  SiRubyonrails,
  SiKotlin,
  SiSwift,
  SiPostgresql,
  SiRedis,
  SiEmberdotjs,
  SiTypescript,
  SiNodedotjs,
  SiSass,
  SiGitlab,
  SiVault,
  SiFastlane,
  SiJetpackcompose,
  SiOpentelemetry,
  SiAndroid
} from 'react-icons/si'
import { FaDatabase, FaTools, FaCloud, FaRocket, FaCode, FaMobileAlt, FaAws, FaServer, FaNetworkWired, FaShieldAlt, FaLayerGroup, FaSitemap, FaCreditCard, FaUsers } from 'react-icons/fa'

// Los datos guardan `iconKey`; el componente resuelve el componente de icono.
const ICONS = {
  server: FaServer,
  mobile: FaMobileAlt,
  code: FaCode,
  aws: FaAws,
  tools: FaTools,
  sitemap: FaSitemap,
  rails: SiRubyonrails,
  postgres: SiPostgresql,
  redis: SiRedis,
  kotlin: SiKotlin,
  compose: SiJetpackcompose,
  android: SiAndroid,
  swift: SiSwift,
  fastlane: SiFastlane,
  ember: SiEmberdotjs,
  js: SiJavascript,
  ts: SiTypescript,
  node: SiNodedotjs,
  sass: SiSass,
  cloud: FaCloud,
  database: FaDatabase,
  network: FaNetworkWired,
  shield: FaShieldAlt,
  docker: SiDocker,
  gitlab: SiGitlab,
  rocket: FaRocket,
  vault: SiVault,
  otel: SiOpentelemetry,
  layers: FaLayerGroup,
  card: FaCreditCard,
  users: FaUsers,
}

const LEVEL_CLASS = {
  expert: 'text-primary-400',
  good: 'text-primary-300',
}

function TechStack() {
  const { t } = useTranslation();

  // Los datos viven en src/data/skills.js; aqui solo se resuelven iconos y copy.
  const techCategories = useMemo(
    () => SKILL_CATEGORIES.map((category) => ({
      ...category,
      title: t(`techStack.categories.${category.id}`),
      icon: ICONS[category.iconKey],
      technologies: category.technologies.map((tech) => ({
        ...tech,
        icon: ICONS[tech.iconKey],
      })),
    })),
    [t]
  )

  const projectHighlights = useMemo(
    () => TECH_SHOWCASE.map((item) => ({
      ...item,
      name: t(`techStack.projects.${item.id}.name`),
      description: t(`techStack.projects.${item.id}.description`),
      highlight: t(`techStack.projects.${item.id}.highlight`),
    })),
    [t]
  )

  const getLevelColor = (level) => LEVEL_CLASS[level] || 'text-neutral-400'

  return (
    <>
      <section className="section-padding pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-neutral-700/50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaCode className="w-6 h-6 text-primary-400" />
              <span className="text-lg font-semibold text-neutral-300">
                {t('techStack.title')}
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="gradient-text">{t('techStack.subtitle_1')}</span> {t('techStack.subtitle_2')}
            </motion.h1>

            <motion.p 
              className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('techStack.description')}
            </motion.p>
          </div>

          {/* Tech Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {techCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  className={`glass-effect rounded-2xl p-6 border ${category.borderColor} ${category.bgColor}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-100">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.technologies.map((tech, techIndex) => {
                      const TechIcon = tech.icon
                      return (
                        <motion.div
                          key={techIndex}
                          className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg border border-neutral-700/30"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + techIndex * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            x: 5,
                            backgroundColor: "rgba(38, 38, 38, 0.5)"
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <TechIcon 
                              className="w-5 h-5" 
                              style={{ color: tech.color }}
                            />
                            <span className="font-medium text-neutral-200">
                              {tech.name}
                            </span>
                          </div>
                          <span className={`text-sm font-semibold ${getLevelColor(tech.level)}`}>
                            {t(`techStack.levels.${tech.level}`)}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Project Highlights */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold gradient-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t('techStack.action_title')}
              </motion.h2>
              <motion.p 
                className="text-neutral-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {t('techStack.action_desc')}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectHighlights.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass-effect rounded-2xl p-6 border border-neutral-700/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <h3 className="text-xl font-bold text-neutral-100 mb-3">
                    {project.name}
                  </h3>
                  <p className="text-neutral-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-primary-400 font-medium text-sm mb-2">
                      {t('techStack.key_tech')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-neutral-700/50 text-neutral-300 rounded-full text-xs font-medium border border-neutral-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.extraGateways && (
                        <span className="px-3 py-1 bg-neutral-700/50 text-neutral-300 rounded-full text-xs font-medium border border-neutral-600/50">
                          {t('techStack.plus_gateways', { count: project.extraGateways })}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-700/50">
                    <p className="text-primary-400 font-medium text-sm">
                      💡 {project.highlight}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


        </div>
      </section>
    </>
  )
}

export default TechStack
