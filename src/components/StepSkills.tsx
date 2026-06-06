import { useState } from 'react'
import { useCVStore } from '../store/cvStore'

export default function StepSkills() {
  const { skills, languages, interests } = useCVStore((s) => s.cv)
  const setSkills = useCVStore((s) => s.setSkills)
  const addLang = useCVStore((s) => s.addLanguage)
  const updateLang = useCVStore((s) => s.updateLanguage)
  const removeLang = useCVStore((s) => s.removeLanguage)
  const setInterests = useCVStore((s) => s.setInterests)

  const [skillInput, setSkillInput] = useState('')

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !skills.includes(s)) {
      setSkills([...skills, s])
      setSkillInput('')
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Compétences</h2>
        <div className="flex gap-2 mb-3">
          <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSkill()} placeholder="Ajouter une compétence..." className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
          <button type="button" onClick={addSkill} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Ajouter</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              {skill}
              <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500">×</button>
            </span>
          ))}
        </div>
        {skills.length === 0 && <p className="text-gray-500 text-sm mt-2">Ajoutez vos compétences (techniques, personnelles...)</p>}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Langues</h2>
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center gap-3 mb-3">
            <input value={lang.name} onChange={(e) => updateLang(lang.id, { name: e.target.value })} placeholder="Langue" className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
            <select value={lang.level} onChange={(e) => updateLang(lang.id, { level: e.target.value as any })} className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Courant">Courant</option>
              <option value="Natif">Natif</option>
            </select>
            <button type="button" onClick={() => removeLang(lang.id)} className="text-red-500 hover:text-red-700">×</button>
          </div>
        ))}
        <button type="button" onClick={addLang} className="text-blue-600 hover:text-blue-800 text-sm font-medium">+ Ajouter une langue</button>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Centres d&apos;intérêt</h2>
        <textarea value={interests.join(', ')} onChange={(e) => setInterests(e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none" placeholder="Voyages, sport, lecture... (séparés par des virgules)" />
      </div>
    </div>
  )
}
