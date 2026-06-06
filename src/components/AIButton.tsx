import { useState } from 'react'
import { motion } from 'framer-motion'
import { AI_PROMPTS, callAI } from '../lib/ai'

interface AIButtonProps {
  text: string
  mode: keyof typeof AI_PROMPTS
  onResult: (text: string) => void
  label?: string
}

export default function AIButton({ text, mode, onResult, label }: AIButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!text.trim() || loading) return
    setLoading(true)
    try {
      const result = await callAI(AI_PROMPTS[mode], text)
      onResult(result)
    } catch {} finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading || !text.trim()}
      className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      <motion.span
        animate={loading ? { rotate: 360 } : {}}
        transition={loading ? { repeat: Infinity, duration: 1, ease: 'linear' } : {}}
        className="inline-block"
      >
        ✨
      </motion.span>
      {loading ? 'IA en cours...' : (label || 'Améliorer avec IA')}
    </button>
  )
}
