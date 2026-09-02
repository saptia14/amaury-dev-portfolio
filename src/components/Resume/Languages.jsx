import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaLanguage } from 'react-icons/fa'
import { LANGUAGES } from '../../data/resume'

const METER_STEPS = 5

/**
 * Idiomas. Va dentro de la sección CV, entre Educación y el CTA de descarga,
 * igual que en el PDF: Experiencia → Educación → Idiomas → Descargar.
 *
 * `level` es un dato (proporción del medidor); el nombre del idioma y la
 * fluidez son copy.
 */
function Languages() {
  const { t } = useTranslation()

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-neutral-700/50 mb-4">
          <FaLanguage className="w-5 h-5 text-primary-400" />
          <span className="text-lg font-semibold text-neutral-300">{t('languages.badge')}</span>
        </div>
        <h2 className="text-2xl font-bold gradient-text">{t('languages.title')}</h2>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LANGUAGES.map((language, index) => (
          <motion.div
            key={language.id}
            className="glass-effect rounded-2xl p-6 border border-neutral-700/50 flex items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="min-w-0">
              <dt className="text-lg font-bold text-neutral-100">
                {t(`languages.items.${language.id}.name`)}
              </dt>
              <dd className="text-primary-400 text-sm font-medium">
                {t(`languages.items.${language.id}.fluency`)}
              </dd>
            </div>

            <div className="flex gap-1.5 flex-shrink-0" aria-hidden="true">
              {Array.from({ length: METER_STEPS }, (_, step) => (
                <span
                  key={step}
                  className={`w-2.5 h-2.5 rounded-full ${
                    step < language.level ? 'bg-primary-500' : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </dl>
    </div>
  )
}

export default Languages
