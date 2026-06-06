import { useRef } from 'react'
import { useCVStore } from '../store/cvStore'
import AIButton from './AIButton'

export default function StepPersonalInfo() {
  const { personalInfo } = useCVStore((s) => s.cv)
  const update = useCVStore((s) => s.updatePersonalInfo)
  const photoRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update({ photo: reader.result as string })
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Informations personnelles</h2>

      <div className="flex items-center gap-4">
        <div className="relative">
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl text-gray-400">
              📷
            </div>
          )}
          <button
            type="button"
            onClick={() => photoRef.current?.click()}
            className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
          >
            +
          </button>
          <input ref={photoRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
        </div>
        <p className="text-sm text-gray-500">Photo optionnelle</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Prénom" value={personalInfo.firstName} onChange={(v) => update({ firstName: v })} />
        <Input label="Nom" value={personalInfo.lastName} onChange={(v) => update({ lastName: v })} />
      </div>

      <Input label="Titre professionnel" value={personalInfo.title} onChange={(v) => update({ title: v })} placeholder="Ex: Développeur Full Stack" />
      <Input label="Adresse e-mail" type="email" value={personalInfo.email} onChange={(v) => update({ email: v })} />
      <Input label="Téléphone" type="tel" value={personalInfo.phone} onChange={(v) => update({ phone: v })} />
      <Input label="Adresse" value={personalInfo.address} onChange={(v) => update({ address: v })} />

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Résumé professionnel</label>
          <AIButton
            text={`Titre: ${personalInfo.title}. Compétences: ${personalInfo.summary}`}
            mode="summary"
            onResult={(r) => update({ summary: r })}
            label="Générer avec IA"
          />
        </div>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => update({ summary: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Décrivez votre profil professionnel..."
        />
        <div className="flex justify-end mt-1">
          {personalInfo.summary && (
            <AIButton text={personalInfo.summary} mode="improve" onResult={(r) => update({ summary: r })} label="Améliorer" />
          )}
        </div>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', placeholder }: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}
