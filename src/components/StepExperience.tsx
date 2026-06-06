import { useCVStore } from '../store/cvStore'
import AIButton from './AIButton'

export default function StepExperience() {
  const { experiences } = useCVStore((s) => s.cv)
  const add = useCVStore((s) => s.addExperience)
  const update = useCVStore((s) => s.updateExperience)
  const remove = useCVStore((s) => s.removeExperience)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Expériences professionnelles</h2>
        <button type="button" onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Ajouter
        </button>
      </div>

      {experiences.length === 0 && (
        <p className="text-gray-500 text-center py-8">Aucune expérience. Cliquez sur &ldquo;Ajouter&rdquo; pour commencer.</p>
      )}

      {experiences.map((exp) => (
        <div key={exp.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{exp.position || 'Nouvelle expérience'}</h3>
            <button type="button" onClick={() => remove(exp.id)} className="text-red-500 hover:text-red-700 text-sm">
              Supprimer
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Entreprise</label>
              <input value={exp.company} onChange={(e) => update(exp.id, { company: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" placeholder="Nom de l'entreprise" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Poste</label>
              <input value={exp.position} onChange={(e) => update(exp.id, { position: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" placeholder="Intitulé du poste" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date de début</label>
              <input type="month" value={exp.startDate} onChange={(e) => update(exp.id, { startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date de fin</label>
              <input type="month" value={exp.endDate} onChange={(e) => update(exp.id, { endDate: e.target.value })} disabled={exp.current} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 disabled:opacity-50" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={exp.current} onChange={(e) => update(exp.id, { current: e.target.checked, endDate: e.target.checked ? '' : exp.endDate })} className="rounded border-gray-300" />
            Poste actuel
          </label>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium">Description</label>
              {exp.description && (
                <AIButton text={exp.description} mode="experience" onResult={(r) => update(exp.id, { description: r })} />
              )}
            </div>
            <textarea value={exp.description} onChange={(e) => update(exp.id, { description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none" placeholder="Décrivez vos missions et réalisations..." />
          </div>
        </div>
      ))}
    </div>
  )
}
