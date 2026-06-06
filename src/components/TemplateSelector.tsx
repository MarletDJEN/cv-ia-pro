import { useCVStore } from '../store/cvStore'
import type { TemplateStyle } from '../types/cv'
import { templateLabels } from '../types/cv'

const templates: { id: TemplateStyle; desc: string }[] = [
  { id: 'classic', desc: 'Intemporel et élégant' },
  { id: 'modern', desc: 'Design contemporain' },
  { id: 'professional', desc: 'Look corporate' },
  { id: 'minimalist', desc: 'Simple et épuré' },
  { id: 'creative', desc: 'Original et coloré' },
  { id: 'ats-friendly', desc: 'Optimisé ATS' },
]

export default function TemplateSelector() {
  const template = useCVStore((s) => s.cv.template)
  const color = useCVStore((s) => s.cv.color)
  const fontSize = useCVStore((s) => s.cv.fontSize)
  const sections = useCVStore((s) => s.cv.sections)
  const setTemplate = useCVStore((s) => s.setTemplate)
  const setColor = useCVStore((s) => s.setColor)
  const setFontSize = useCVStore((s) => s.setFontSize)
  const toggleSection = useCVStore((s) => s.toggleSection)

  const allSections = [
    { id: 'summary', label: 'Résumé' },
    { id: 'experiences', label: 'Expériences' },
    { id: 'education', label: 'Formations' },
    { id: 'skills', label: 'Compétences' },
    { id: 'languages', label: 'Langues' },
    { id: 'interests', label: 'Centres d\'intérêt' },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Personnalisation</h2>

      <div>
        <label className="block text-sm font-medium mb-3">Modèle de CV</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {templates.map((t) => (
            <button key={t.id} type="button" onClick={() => setTemplate(t.id)} className={`p-4 rounded-xl border-2 text-left transition-all ${template === t.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
              <div className={`w-full h-16 rounded-lg mb-2 ${
                t.id === 'classic' ? 'bg-gray-100 border border-gray-300' :
                t.id === 'modern' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200' :
                t.id === 'professional' ? 'bg-gray-900 border border-gray-700' :
                t.id === 'minimalist' ? 'bg-white border border-gray-200' :
                t.id === 'creative' ? 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200' :
                'bg-green-50 border border-green-200'
              }`}>
                <div className="p-2 space-y-1">
                  <div className={`h-1.5 rounded w-1/2 ${t.id === 'classic' ? 'bg-gray-400' : t.id === 'modern' ? 'bg-blue-500' : t.id === 'professional' ? 'bg-gray-600' : t.id === 'minimalist' ? 'bg-gray-300' : t.id === 'creative' ? 'bg-purple-500' : 'bg-green-500'}`} />
                  <div className="h-1 rounded bg-gray-200 w-3/4" />
                  <div className="h-1 rounded bg-gray-200 w-1/2" />
                </div>
              </div>
              <div className="font-medium text-sm">{templateLabels[t.id]}</div>
              <div className="text-xs text-gray-500">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Couleur principale</label>
        <div className="flex items-center gap-3">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border border-gray-300" />
          <span className="text-sm text-gray-500">{color}</span>
          {['#2563eb', '#dc2626', '#059669', '#7c3aed', '#d97706', '#0891b2'].map((c) => (
            <button key={c} type="button" onClick={() => setColor(c)} className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-gray-900 dark:border-white' : 'border-transparent'}`} style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Taille de police</label>
        <div className="flex gap-2">
          {(['small', 'medium', 'large'] as const).map((size) => (
            <button key={size} type="button" onClick={() => setFontSize(size)} className={`px-4 py-2 rounded-lg border transition-all ${fontSize === size ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700' : 'border-gray-300 dark:border-gray-600'}`}>
              {size === 'small' ? 'Petite' : size === 'medium' ? 'Moyenne' : 'Grande'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Sections à afficher</label>
        <div className="space-y-2">
          {allSections.map((s) => (
            <label key={s.id} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={sections.includes(s.id)} onChange={() => toggleSection(s.id)} className="rounded border-gray-300 text-blue-600" />
              <span className="text-sm">{s.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
