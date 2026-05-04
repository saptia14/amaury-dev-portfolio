import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaHeart, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PERSONAL_INFO } from '../../../data/constants'

const Footer = () => {
  const { t } = useTranslation();
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: PERSONAL_INFO.github
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: PERSONAL_INFO.linkedin
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: `mailto:${PERSONAL_INFO.email}`
    }
  ]

  const quickLinks = [
    { name: t('nav.about') || 'About', href: '#about' },
    { name: t('nav.projects') || 'Projects', href: '#projects' },
    { name: t('nav.skills') || 'Tech Stack', href: '#tech-stack' },
    { name: t('nav.contact') || 'Contact', href: '#contact' }
  ]

  return (
    <footer className="relative">
      {/* Subtle top border with gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-xl h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      
      <div className="py-12 px-6">
        <motion.div 
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Logo & Name */}
          <motion.a 
            href="#home"
            className="group flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl font-bold text-neutral-100 tracking-tight">
              {PERSONAL_INFO.fullName}
            </span>
            <span className="text-primary-500 text-2xl">.</span>
          </motion.a>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-primary-400 transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="w-10 h-10 rounded-full bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:border-primary-500/30 hover:bg-neutral-800 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <social.icon className="text-base" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-neutral-800"></div>

          {/* Copyright & Info */}
          <div className="flex flex-col items-center gap-2 text-sm text-neutral-500">
            <span className="flex items-center gap-1.5">
              {t('footer.made_with')}
              <motion.span
                className="text-primary-500"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ 
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <FaHeart className="text-xs" />
              </motion.span>
              {t('footer.by')} <span className="text-neutral-400">{PERSONAL_INFO.fullName}</span>
            </span>
            <span className="text-neutral-600">
              © {currentYear} {t('footer.rights')}
            </span>
          </div>
        </motion.div>
      </div>


    </footer>
  )
}

export default Footer
