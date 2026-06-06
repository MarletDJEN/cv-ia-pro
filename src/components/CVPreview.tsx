import { useCVStore } from '../store/cvStore'
import type { FontSize } from '../types/cv'

const fontSizes: Record<FontSize, string> = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
}

export default function CVPreview() {
  const cv = useCVStore((s) => s.cv)

  const renderTemplate = () => {
    switch (cv.template) {
      case 'classic': return <ClassicTemplate cv={cv} />
      case 'modern': return <ModernTemplate cv={cv} />
      case 'professional': return <ProfessionalTemplate cv={cv} />
      case 'minimalist': return <MinimalistTemplate cv={cv} />
      case 'creative': return <CreativeTemplate cv={cv} />
      case 'ats-friendly': return <ATSFriendlyTemplate cv={cv} />
      default: return <ModernTemplate cv={cv} />
    }
  }

  return (
    <div id="cv-preview" className={`${fontSizes[cv.fontSize]} max-w-[210mm] mx-auto`}>
      {renderTemplate()}
    </div>
  )
}

function Section({ title, children, color, visible }: { title: string; children: React.ReactNode; color: string; visible: boolean }) {
  if (!visible) return null
  return (
    <div className="mb-4">
      <h3 className="text-base font-bold mb-2" style={{ color, borderBottom: `2px solid ${color}`, paddingBottom: 4 }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function ClassicTemplate({ cv: c }: any) {
  const s = c.sections
  return (
    <div className="bg-white p-8 shadow-sm border border-gray-200">
      <HeaderSection cv={c} />
      <Section title="Résumé" color={c.color} visible={s.includes('summary')}>
        <p className="text-gray-700 leading-relaxed">{c.personalInfo.summary}</p>
      </Section>
      <Section title="Expériences professionnelles" color={c.color} visible={s.includes('experiences')}>
        {c.experiences.map((exp: any) => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-semibold">{exp.position}</span>
                <span className="text-gray-600"> &mdash; {exp.company}</span>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
              </span>
            </div>
            <p className="text-gray-700 mt-1 text-sm">{exp.description}</p>
          </div>
        ))}
      </Section>
      <Section title="Formations" color={c.color} visible={s.includes('education')}>
        {c.education.map((edu: any) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between">
              <div>
                <span className="font-semibold">{edu.degree}</span>
                <span className="text-gray-600"> &mdash; {edu.institution}</span>
              </div>
              <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
            </div>
            {edu.field && <p className="text-sm text-gray-600">{edu.field}</p>}
            {edu.description && <p className="text-sm text-gray-700 mt-1">{edu.description}</p>}
          </div>
        ))}
      </Section>
      <Section title="Compétences" color={c.color} visible={s.includes('skills')}>
        <div className="flex flex-wrap gap-2">
          {c.skills.map((skill: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{skill}</span>
          ))}
        </div>
      </Section>
      <Section title="Langues" color={c.color} visible={s.includes('languages')}>
        <div className="space-y-1">
          {c.languages.map((lang: any) => (
            <div key={lang.id} className="flex justify-between text-sm">
              <span>{lang.name}</span>
              <span className="text-gray-500">{lang.level}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Centres d'intérêt" color={c.color} visible={s.includes('interests')}>
        <p className="text-gray-700 text-sm">{c.interests.join(', ')}</p>
      </Section>
    </div>
  )
}

function ModernTemplate({ cv: c }: any) {
  const s = c.sections
  return (
    <div className="bg-white shadow-sm border border-gray-200">
      <div className="p-8 text-white" style={{ backgroundColor: c.color }}>
        <h1 className="text-2xl font-bold">{c.personalInfo.firstName} {c.personalInfo.lastName}</h1>
        {c.personalInfo.title && <p className="text-sm opacity-90 mt-1">{c.personalInfo.title}</p>}
        <div className="flex gap-4 mt-2 text-xs opacity-80">
          {c.personalInfo.email && <span>{c.personalInfo.email}</span>}
          {c.personalInfo.phone && <span>{c.personalInfo.phone}</span>}
          {c.personalInfo.address && <span>{c.personalInfo.address}</span>}
        </div>
      </div>
      <div className="p-6">
        {s.includes('summary') && c.personalInfo.summary && (
          <p className="text-gray-700 leading-relaxed mb-4">{c.personalInfo.summary}</p>
        )}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <Section title="Expériences" color={c.color} visible={s.includes('experiences')}>
              {c.experiences.map((exp: any) => (
                <div key={exp.id} className="mb-3">
                  <div className="font-semibold">{exp.position}</div>
                  <div className="text-sm text-gray-500">{exp.company} | {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}</div>
                  <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </Section>
            <Section title="Formations" color={c.color} visible={s.includes('education')}>
              {c.education.map((edu: any) => (
                <div key={edu.id} className="mb-2">
                  <div className="font-semibold">{edu.degree}</div>
                  <div className="text-sm text-gray-500">{edu.institution} | {edu.startDate} - {edu.endDate}</div>
                  {edu.description && <p className="text-sm text-gray-700">{edu.description}</p>}
                </div>
              ))}
            </Section>
          </div>
          <div className="space-y-4">
            <Section title="Compétences" color={c.color} visible={s.includes('skills')}>
              <div className="space-y-1">
                {c.skills.map((skill: string, i: number) => (
                  <div key={i} className="text-sm">{skill}</div>
                ))}
              </div>
            </Section>
            <Section title="Langues" color={c.color} visible={s.includes('languages')}>
              {c.languages.map((lang: any) => (
                <div key={lang.id} className="flex justify-between text-sm mb-1">
                  <span>{lang.name}</span>
                  <span className="text-gray-500 text-xs">{lang.level}</span>
                </div>
              ))}
            </Section>
            <Section title="Centres d'intérêt" color={c.color} visible={s.includes('interests')}>
              <p className="text-sm text-gray-700">{c.interests.join(', ')}</p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfessionalTemplate({ cv: c }: any) {
  const s = c.sections
  return (
    <div className="bg-white shadow-sm border border-gray-200 flex">
      <div className="w-1/3 p-6" style={{ backgroundColor: c.color }}>
        <div className="text-white">
          {c.personalInfo.photo && (
            <img src={c.personalInfo.photo} alt="" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-white" />
          )}
          <h2 className="text-lg font-bold">{c.personalInfo.firstName} {c.personalInfo.lastName}</h2>
          {c.personalInfo.title && <p className="text-sm opacity-80 mt-1">{c.personalInfo.title}</p>}
          <div className="mt-4 space-y-2 text-xs opacity-80">
            {c.personalInfo.email && <p>{c.personalInfo.email}</p>}
            {c.personalInfo.phone && <p>{c.personalInfo.phone}</p>}
            {c.personalInfo.address && <p>{c.personalInfo.address}</p>}
          </div>
        </div>
        <div className="mt-6 text-white text-sm">
          <Section title="Compétences" color="white" visible={s.includes('skills')}>
            <div className="space-y-1 mt-2">
              {c.skills.map((skill: string, i: number) => (
                <div key={i} className="text-xs opacity-90">{skill}</div>
              ))}
            </div>
          </Section>
          <Section title="Langues" color="white" visible={s.includes('languages')}>
            <div className="space-y-1 mt-2">
              {c.languages.map((lang: any) => (
                <div key={lang.id} className="flex justify-between text-xs">
                  <span>{lang.name}</span>
                  <span className="opacity-70">{lang.level}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
      <div className="w-2/3 p-6 space-y-4">
        <Section title="Résumé" color={c.color} visible={s.includes('summary')}>
          <p className="text-sm text-gray-700 leading-relaxed">{c.personalInfo.summary}</p>
        </Section>
        <Section title="Expériences" color={c.color} visible={s.includes('experiences')}>
          {c.experiences.map((exp: any) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-semibold text-sm">{exp.position}</span>
                <span className="text-xs text-gray-500">{exp.startDate} - {exp.current ? 'Présent' : exp.endDate}</span>
              </div>
              <p className="text-xs text-gray-500">{exp.company}</p>
              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
            </div>
          ))}
        </Section>
        <Section title="Formations" color={c.color} visible={s.includes('education')}>
          {c.education.map((edu: any) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold text-sm">{edu.degree}</span>
                <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-xs text-gray-500">{edu.institution}</p>
            </div>
          ))}
        </Section>
      </div>
    </div>
  )
}

function MinimalistTemplate({ cv: c }: any) {
  const s = c.sections
  return (
    <div className="bg-white p-10 shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-light tracking-wider uppercase">{c.personalInfo.firstName} {c.personalInfo.lastName}</h1>
        {c.personalInfo.title && <p className="text-sm text-gray-500 mt-1 tracking-wide">{c.personalInfo.title}</p>}
        <div className="flex justify-center gap-4 mt-3 text-xs text-gray-400">
          {c.personalInfo.email && <span>{c.personalInfo.email}</span>}
          {c.personalInfo.phone && <span>{c.personalInfo.phone}</span>}
        </div>
      </div>
      <hr className="mb-6 border-gray-200" />
      <div className="space-y-5 text-sm">
        {s.includes('summary') && c.personalInfo.summary && (
          <p className="text-gray-600 leading-relaxed text-center italic">{c.personalInfo.summary}</p>
        )}
        <Section title="Expériences" color="black" visible={s.includes('experiences')}>
          {c.experiences.map((exp: any) => (
            <div key={exp.id} className="mb-3">
              <div className="font-medium">{exp.position}</div>
              <div className="text-gray-500 text-xs">{exp.company} | {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}</div>
              <p className="text-gray-600 mt-0.5">{exp.description}</p>
            </div>
          ))}
        </Section>
        <Section title="Formations" color="black" visible={s.includes('education')}>
          {c.education.map((edu: any) => (
            <div key={edu.id} className="mb-2">
              <div className="font-medium">{edu.degree}</div>
              <div className="text-gray-500 text-xs">{edu.institution} | {edu.startDate} - {edu.endDate}</div>
            </div>
          ))}
        </Section>
        <Section title="Compétences" color="black" visible={s.includes('skills')}>
          <div className="flex flex-wrap gap-1">
            {c.skills.map((skill: string, i: number) => (
              <span key={i} className="text-gray-700 after:content-[','] last:after:content-none">{skill}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

function CreativeTemplate({ cv: c }: any) {
  const s = c.sections
  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
      <div className="h-2" style={{ backgroundColor: c.color }} />
      <div className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black tracking-tight" style={{ color: c.color }}>{c.personalInfo.firstName} <br />{c.personalInfo.lastName}</h1>
          {c.personalInfo.title && <p className="text-sm text-gray-500 mt-1 font-medium">{c.personalInfo.title}</p>}
          <div className="flex justify-center gap-3 mt-3 text-xs text-gray-500">
            {c.personalInfo.email && <span>{c.personalInfo.email}</span>}
            {c.personalInfo.phone && <span>{c.personalInfo.phone}</span>}
            {c.personalInfo.address && <span>{c.personalInfo.address}</span>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Section title="Profil" color={c.color} visible={s.includes('summary')}>
              <p className="text-sm text-gray-700 leading-relaxed">{c.personalInfo.summary}</p>
            </Section>
            <Section title="Expériences" color={c.color} visible={s.includes('experiences')}>
              {c.experiences.map((exp: any) => (
                <div key={exp.id} className="mb-3 border-l-2 pl-3" style={{ borderColor: c.color }}>
                  <div className="font-bold text-sm">{exp.position}</div>
                  <div className="text-xs text-gray-500">{exp.company}</div>
                  <div className="text-xs text-gray-400">{exp.startDate} - {exp.current ? 'Présent' : exp.endDate}</div>
                  <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                </div>
              ))}
            </Section>
          </div>
          <div className="space-y-4">
            <Section title="Compétences" color={c.color} visible={s.includes('skills')}>
              <div className="space-y-2">
                {c.skills.map((skill: string, i: number) => (
                  <div key={i}>
                    <div className="text-sm mb-1">{skill}</div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ backgroundColor: c.color, width: `${60 + Math.random() * 35}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Formations" color={c.color} visible={s.includes('education')}>
              {c.education.map((edu: any) => (
                <div key={edu.id} className="mb-2">
                  <div className="font-semibold text-sm">{edu.degree}</div>
                  <div className="text-xs text-gray-500">{edu.institution}</div>
                  <div className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </Section>
            <Section title="Langues" color={c.color} visible={s.includes('languages')}>
              {c.languages.map((lang: any) => (
                <div key={lang.id} className="flex justify-between text-sm mb-1">
                  <span>{lang.name}</span>
                  <span className="text-xs text-gray-500">{lang.level}</span>
                </div>
              ))}
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

function ATSFriendlyTemplate({ cv: c }: any) {
  const s = c.sections
  return (
    <div className="bg-white p-8 border border-gray-200" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      <div className="mb-4">
        <h1 className="text-xl font-bold">{c.personalInfo.firstName} {c.personalInfo.lastName}</h1>
        <div className="text-sm text-gray-600 mt-1">
          {[c.personalInfo.email, c.personalInfo.phone, c.personalInfo.address].filter(Boolean).join(' | ')}
        </div>
        {c.personalInfo.title && <p className="text-sm font-medium mt-1">{c.personalInfo.title}</p>}
      </div>
      <Section title="RÉSUMÉ" color="black" visible={s.includes('summary')}>
        <p className="text-sm leading-relaxed">{c.personalInfo.summary}</p>
      </Section>
      <Section title="EXPÉRIENCES PROFESSIONNELLES" color="black" visible={s.includes('experiences')}>
        {c.experiences.map((exp: any) => (
          <div key={exp.id} className="mb-3">
            <p className="font-bold text-sm">{exp.position}, {exp.company}</p>
            <p className="text-xs text-gray-500">{exp.startDate} - {exp.current ? 'Présent' : exp.endDate}</p>
            <p className="text-sm mt-1">{exp.description}</p>
          </div>
        ))}
      </Section>
      <Section title="FORMATIONS" color="black" visible={s.includes('education')}>
        {c.education.map((edu: any) => (
          <div key={edu.id} className="mb-2">
            <p className="font-bold text-sm">{edu.degree} en {edu.field}</p>
            <p className="text-xs text-gray-500">{edu.institution}, {edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </Section>
      <Section title="COMPÉTENCES" color="black" visible={s.includes('skills')}>
        <p className="text-sm">{c.skills.join(' | ')}</p>
      </Section>
      <Section title="LANGUES" color="black" visible={s.includes('languages')}>
        <div className="text-sm">{c.languages.map((lang: any) => `${lang.name} (${lang.level})`).join(' | ')}</div>
      </Section>
      {s.includes('interests') && c.interests.length > 0 && (
        <div className="mt-2">
          <p className="text-sm font-bold mb-1">CENTRES D'INTÉRÊT</p>
          <p className="text-sm">{c.interests.join(' | ')}</p>
        </div>
      )}
    </div>
  )
}

function HeaderSection({ cv: c }: any) {
  return (
    <div className="mb-6 flex items-start gap-4">
      {c.personalInfo.photo && (
        <img src={c.personalInfo.photo} alt="" className="w-16 h-16 rounded-full object-cover" />
      )}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{c.personalInfo.firstName} {c.personalInfo.lastName}</h1>
        {c.personalInfo.title && <p className="text-sm text-gray-500">{c.personalInfo.title}</p>}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
          {c.personalInfo.email && <span>{c.personalInfo.email}</span>}
          {c.personalInfo.phone && <span>{c.personalInfo.phone}</span>}
          {c.personalInfo.address && <span>{c.personalInfo.address}</span>}
        </div>
      </div>
    </div>
  )
}
