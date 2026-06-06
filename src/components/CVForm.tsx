import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore'
import StepIndicator from './StepIndicator'
import StepPersonalInfo from './StepPersonalInfo'
import StepExperience from './StepExperience'
import StepEducation from './StepEducation'
import StepSkills from './StepSkills'
import TemplateSelector from './TemplateSelector'

export default function CVForm() {
  const step = useCVStore((s) => s.step)
  const setStep = useCVStore((s) => s.setStep)
  const cv = useCVStore((s) => s.cv)
  const navigate = useNavigate()

  const steps = [
    <StepPersonalInfo key="personal" />,
    <StepExperience key="experience" />,
    <StepEducation key="education" />,
    <StepSkills key="skills" />,
    <TemplateSelector key="template" />,
  ]

  const canNext = () => {
    if (step === 0) return !!cv.personalInfo.firstName && !!cv.personalInfo.lastName && !!cv.personalInfo.email
    return true
  }

  return (
    <div>
      <StepIndicator />

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Précédent
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Suivant
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/preview')}
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Voir le CV →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
