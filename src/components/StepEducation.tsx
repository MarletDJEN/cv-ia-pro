import { useCVStore } from '../store/cvStore'

export default function StepEducation() {
  const { education } = useCVStore((s) => s.cv)
  const add = useCVStore((s) => s.addEducation)
  const update = useCVStore((s) => s.updateEducation)
  const remove = useCVStore((s) => s.removeEducation)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Formations</h2>
        <button type="button" onClick={add} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + Ajouter
        </button>
      </div>

      {education.length === 0 && (
        <p className="text-gray-500 text-center py-8">Aucune formation. Cliquez sur &ldquo;Ajouter&rdquo; pour commencer.</p>
      )}

      {education.map((edu) => (
        <div key={edu.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{edu.degree || 'Nouvelle formation'}</h3>
            <button type="button" onClick={() => remove(edu.id)} className="text-red-500 hover:text-red-700 text-sm">
              Supprimer
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Établissement</label>
              <input value={edu.institution} onChange={(e) => update(edu.id, { institution: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" placeholder="Nom de l'établissement" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Diplôme</label>
              <input value={edu.degree} onChange={(e) => update(edu.id, { degree: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" placeholder="Ex: Master, Licence" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Domaine</label>
              <input value={edu.field} onChange={(e) => update(edu.id, { field: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" placeholder="Ex: Informatique" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Année de début</label>
              <input type="month" value={edu.startDate} onChange={(e) => update(edu.id, { startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Année de fin</label>
              <input type="month" value={edu.endDate} onChange={(e) => update(edu.id, { endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description (optionnelle)</label>
            <textarea value={edu.description} onChange={(e) => update(edu.id, { description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 resize-none" placeholder="Matières, mentions, projets..." />
          </div>
        </div>
      ))}
    </div>
  )
}
