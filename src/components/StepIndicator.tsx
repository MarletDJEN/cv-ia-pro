import { useCVStore } from '../store/cvStore'
import { motion } from 'framer-motion'

export default function StepIndicator() {
  const step = useCVStore((s) => s.step)

  const steps = [
    { label: 'Infos', num: 0 },
    { label: 'Expériences', num: 1 },
    { label: 'Formations', num: 2 },
    { label: 'Compétences', num: 3 },
    { label: 'Template', num: 4 },
  ]

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center gap-2">
          <motion.div
            animate={step === s.num ? { scale: 1.1 } : {}}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step === s.num
                ? 'bg-blue-600 text-white'
                : step > s.num
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
            }`}
          >
            {step > s.num ? '✓' : s.num + 1}
          </motion.div>
          <span className={`text-sm hidden sm:inline ${step === s.num ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500'}`}>
            {s.label}
          </span>
          {i < steps.length - 1 && (
            <div className={`w-8 h-0.5 ${step > s.num ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
