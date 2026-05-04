import { useMemo } from 'react' // Refreshed
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import { 
  SiReact, 
  SiTailwindcss, 
  SiDocker, 
  SiGit,
  SiPostman,
  SiFramer,
  SiVercel,
  SiGithub,
  SiJavascript,
  SiRubyonrails,
  SiKotlin,
  SiSwift,
  SiApple,
  SiUnity
} from 'react-icons/si'
import { FaDatabase, FaTools, FaCloud, FaRocket, FaCode, FaMobileAlt, FaGamepad, FaAws } from 'react-icons/fa'

function TechStack() {
  const { t } = useTranslation();

  // Tech Stack data organized by categories
  const techCategories = useMemo(() => [
    {
      id: 1,
      title: t('techStack.categories.backend'),
      icon: FaCode,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      technologies: [
        { name: "Ruby on Rails", icon: SiRubyonrails, level: "Expert", color: "#CC0000" },
        { name: "JavaScript", icon: SiJavascript, level: "Expert", color: "#F7DF1E" },
        { name: "React.js", icon: SiReact, level: "Advanced", color: "#61DAFB" }
      ]
    },
    {
      id: 2,
      title: t('techStack.categories.mobile'),
      icon: FaMobileAlt,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      technologies: [
        { name: "Kotlin", icon: SiKotlin, level: "Expert", color: "#7F52FF" },
        { name: "Swift", icon: SiSwift, level: "Expert", color: "#F05138" },
        { name: "iOS", icon: SiApple, level: "Expert", color: "#A3AAAE" },
        { name: "Kotlin Multiplatform (KMP)", icon: SiKotlin, level: "Advanced", color: "#7F52FF" }
      ]
    },
    {
      id: 3,
      title: t('techStack.categories.cloud'),
      icon: FaCloud,
      color: "text-primary-400",
      bgColor: "bg-primary-500/10",
      borderColor: "border-primary-500/20",
      technologies: [
        { name: "AWS", icon: FaAws, level: "Advanced", color: "#232F3E" },
        { name: "Docker", icon: SiDocker, level: "Advanced", color: "#2496ED" },
        { name: "Git", icon: SiGit, level: "Advanced", color: "#F05032" },
        { name: "Vercel", icon: SiVercel, level: "Advanced", color: "#000000" }
      ]
    },
    {
      id: 4,
      title: t('techStack.categories.game'),
      icon: FaGamepad,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      technologies: [
        { name: "Unity", icon: SiUnity, level: "Intermediate", color: "#ffffff" },
        { name: "C#", icon: FaCode, level: "Intermediate", color: "#239120" }
      ]
    }
  ], [t])

  // Project highlights using tech stack
  const projectHighlights = useMemo(() => [
    {
      id: 1,
      name: t('techStack.projects.crm.name'),
      description: t('techStack.projects.crm.description'),
      techUsed: ["Ruby on Rails", "JavaScript", "AWS"],
      highlight: t('techStack.projects.crm.highlight')
    },
    {
      id: 2,
      name: t('techStack.projects.ecommerce.name'),
      description: t('techStack.projects.ecommerce.description'),
      techUsed: ["Ruby on Rails", "React", "APIs"],
      highlight: t('techStack.projects.ecommerce.highlight')
    },
    {
      id: 3,
      name: t('techStack.projects.mobile_apps.name'),
      description: t('techStack.projects.mobile_apps.description'),
      techUsed: ["Kotlin", "Swift", "KMP", "iOS"],
      highlight: t('techStack.projects.mobile_apps.highlight')
    }
  ], [t])

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'text-primary-400'
      case 'Advanced': return 'text-primary-300'
      case 'Intermediate': return 'text-yellow-400'
      case 'Proficient': return 'text-primary-500'
      default: return 'text-neutral-400'
    }
  }

  return (
    <>
      <SEOHead {...SEO_CONFIGS.techStack} />
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
              A comprehensive overview of the technologies, frameworks, and tools I use to build 
              modern, scalable applications. From backend development to cloud deployment.
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
                            {tech.level}
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
                Tech Stack in Action
              </motion.h2>
              <motion.p 
                className="text-neutral-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Real projects showcasing how I apply these technologies to solve problems
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
                      Key Technologies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techUsed.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-neutral-700/50 text-neutral-300 rounded-full text-xs font-medium border border-neutral-600/50"
                        >
                          {tech}
                        </span>
                      ))}
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
