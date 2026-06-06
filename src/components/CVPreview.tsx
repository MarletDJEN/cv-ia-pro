import { motion } from 'framer-motion'
import { useCVStore } from '../store/cvStore'
import type { FontSize } from '../types/cv'

const fontSizes: Record<FontSize, string> = {
  small: 'text-[9px]',
  medium: 'text-[10px]',
  large: 'text-[11px]',
}

export default function CVPreview() {
  const cv = useCVStore((s) => s.cv)

  const templates: Record<string, React.ReactNode> = {
    classic: <ClassicTemplate />,
    modern: <ModernTemplate />,
    professional: <ProfessionalTemplate />,
    minimalist: <MinimalistTemplate />,
    creative: <CreativeTemplate />,
    'ats-friendly': <ATSFriendlyTemplate />,
    'motion-gradient': <MotionGradientTemplate />,
    'motion-slide': <MotionSlideTemplate />,
    'motion-cards': <MotionCardsTemplate />,
  }

  return (
    <div id="cv-preview" className={`${fontSizes[cv.fontSize]} w-[210mm] min-h-[297mm] mx-auto`}>
      {templates[cv.template] || templates.modern}
    </div>
  )
}

const dateFormat = (d: string) => {
  if (!d) return ''
  const [y, m] = d.split('-')
  const months = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juill.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.']
  return `${months[parseInt(m) - 1]} ${y}`
}

function ClassicTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, interests, sections, color } = cv

  return (
    <div className="bg-white min-h-[297mm]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <div className="px-[20mm] py-[15mm]">
        <div className="text-center mb-8 pb-6" style={{ borderBottom: `2px solid ${color}` }}>
          <h1 className="text-[22pt] font-bold tracking-[3px] uppercase" style={{ color }}>
            {p.firstName} {p.lastName}
          </h1>
          {p.title && <p className="text-[10pt] text-gray-600 mt-1 italic">{p.title}</p>}
          <div className="flex justify-center gap-4 mt-3 text-[8.5pt] text-gray-500">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.address && <span>{p.address}</span>}
          </div>
        </div>

        <div className="space-y-5">
          <Section title="Profil" visible={sections.includes('summary')}>
            <p className="text-[9pt] text-gray-700 leading-[1.6] italic">{p.summary}</p>
          </Section>

          <Section title="Expériences Professionnelles" visible={sections.includes('experiences')}>
            {exps.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-[10pt]" style={{ color }}>{exp.position}</span>
                    <span className="text-gray-600"> — {exp.company}</span>
                  </div>
                  <span className="text-[8pt] text-gray-400 whitespace-nowrap ml-2">{dateFormat(exp.startDate)} — {exp.current ? 'Aujourd\'hui' : dateFormat(exp.endDate)}</span>
                </div>
                <p className="text-[9pt] text-gray-700 mt-1 leading-[1.5]">{exp.description}</p>
              </div>
            ))}
          </Section>

          <Section title="Formation" visible={sections.includes('education')}>
            {edus.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <span className="font-bold text-[10pt]" style={{ color }}>{edu.degree}</span>
                    <span className="text-gray-600"> — {edu.institution}</span>
                  </div>
                  <span className="text-[8pt] text-gray-400">{dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</span>
                </div>
                {edu.field && <p className="text-[9pt] text-gray-600 mt-0.5">{edu.field}</p>}
              </div>
            ))}
          </Section>

          <div className="grid grid-cols-3 gap-6">
            <Section title="Compétences" visible={sections.includes('skills')}>
              <ul className="list-none space-y-1">
                {skills.map((s, i) => (
                  <li key={i} className="text-[9pt] text-gray-700 before:content-['▸'] before:mr-2" style={{ color: `before:${color}` }}>{s}</li>
                ))}
              </ul>
            </Section>

            <Section title="Langues" visible={sections.includes('languages')}>
              <div className="space-y-1.5">
                {languages.map((l) => (
                  <div key={l.id}>
                    <div className="flex justify-between text-[9pt]">
                      <span className="font-medium">{l.name}</span>
                      <span className="text-gray-500 text-[8pt]">{l.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Centres d'intérêt" visible={sections.includes('interests')}>
              <div className="flex flex-wrap gap-1">
                {interests.map((i, idx) => (
                  <span key={idx} className="text-[9pt] text-gray-700">{i}{idx < interests.length - 1 ? ',' : ''}</span>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

function ModernTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, interests, sections, color } = cv

  return (
    <div className="bg-white min-h-[297mm]" style={{ fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif' }}>
      <div className="px-[18mm] py-[12mm]">
        <div className="flex items-start gap-6 mb-6" style={{ paddingBottom: 10, borderBottom: `3px solid ${color}` }}>
          <div className="flex-1">
            <h1 className="text-[26pt] font-light tracking-tight" style={{ color }}>{p.firstName} <span className="font-bold">{p.lastName}</span></h1>
            {p.title && <p className="text-[10pt] text-gray-500 mt-0.5 font-medium">{p.title}</p>}
          </div>
          <div className="text-right text-[8pt] text-gray-500 space-y-1">
            {p.email && <p>{p.email}</p>}
            {p.phone && <p>{p.phone}</p>}
            {p.address && <p className="max-w-[180px]">{p.address}</p>}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_2.5fr] gap-8">
          <div className="space-y-5">
            <Section2 title="Profil" visible={sections.includes('summary')}>
              <p className="text-[9pt] text-gray-600 leading-[1.6]">{p.summary}</p>
            </Section2>

            <Section2 title="Compétences" visible={sections.includes('skills')}>
              <div className="space-y-2">
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[8.5pt] mb-0.5">
                      <span className="text-gray-700">{s}</span>
                    </div>
                    <div className="h-[4px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ backgroundColor: color, width: `${70 + Math.random() * 25}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Section2>

            <Section2 title="Langues" visible={sections.includes('languages')}>
              <div className="space-y-2">
                {languages.map((l) => (
                  <div key={l.id}>
                    <div className="flex justify-between text-[9pt]">
                      <span className="text-gray-700">{l.name}</span>
                      <span className="text-gray-400 text-[8pt]">{l.level}</span>
                    </div>
                    <div className="h-[4px] bg-gray-100 rounded-full mt-0.5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ backgroundColor: color, width: l.level === 'Natif' ? '100%' : l.level === 'Courant' ? '80%' : l.level === 'Intermédiaire' ? '60%' : '40%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </Section2>

            <Section2 title="Centres d'intérêt" visible={sections.includes('interests')}>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((i, idx) => (
                  <span key={idx} className="text-[8.5pt] text-gray-600 bg-gray-50 px-2.5 py-1 rounded">{i}</span>
                ))}
              </div>
            </Section2>
          </div>

          <div className="space-y-5">
            <Section2 title="Expériences Professionnelles" visible={sections.includes('experiences')}>
              <div className="space-y-4">
                {exps.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[10pt] font-bold text-gray-800">{exp.position}</h3>
                      <span className="text-[8pt] text-gray-400">{dateFormat(exp.startDate)} — {exp.current ? 'Présent' : dateFormat(exp.endDate)}</span>
                    </div>
                    <p className="text-[9pt]" style={{ color: `${color}d0` }}>{exp.company}</p>
                    <p className="text-[9pt] text-gray-600 mt-1 leading-[1.5]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Section2>

            <Section2 title="Formation" visible={sections.includes('education')}>
              <div className="space-y-3">
                {edus.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[10pt] font-bold text-gray-800">{edu.degree}</h3>
                      <span className="text-[8pt] text-gray-400">{dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</span>
                    </div>
                    <p className="text-[9pt] text-gray-500">{edu.institution} — {edu.field}</p>
                  </div>
                ))}
              </div>
            </Section2>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfessionalTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, interests, sections, color } = cv

  return (
    <div className="flex min-h-[297mm]" style={{ fontFamily: '"Inter", "Segoe UI", Arial, sans-serif' }}>
      <div className="w-[35%] text-white p-[8mm]" style={{ backgroundColor: color }}>
        <div className="text-center mb-6">
          {p.photo && (
            <img src={p.photo} alt="" className="w-[50mm] h-[50mm] rounded-full mx-auto mb-4 object-cover border-[3px] border-white/40" />
          )}
          <h1 className="text-[16pt] font-bold leading-tight">{p.firstName}<br />{p.lastName}</h1>
          {p.title && <p className="text-[8pt] mt-1 opacity-80 font-light">{p.title}</p>}
        </div>

        <div className="space-y-1 text-[8pt] opacity-80 mb-6">
          {p.email && <p className="flex items-center gap-2">✉ {p.email}</p>}
          {p.phone && <p className="flex items-center gap-2">📞 {p.phone}</p>}
          {p.address && <p className="flex items-center gap-2">📍 {p.address}</p>}
        </div>

        <hr className="border-white/20 mb-5" />

        <div className="space-y-5">
          <div>
            <h2 className="text-[9pt] font-semibold uppercase tracking-[2px] mb-2 text-white/80">Compétences</h2>
            <div className="space-y-2">
              {skills.map((s, i) => (
                <div key={i}>
                  <p className="text-[8.5pt] mb-0.5">{s}</p>
                  <div className="h-[3px] bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-white/60" style={{ width: `${70 + Math.random() * 25}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[9pt] font-semibold uppercase tracking-[2px] mb-2 text-white/80">Langues</h2>
            <div className="space-y-1.5">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between text-[8.5pt]">
                  <span>{l.name}</span>
                  <span className="opacity-60">{l.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[9pt] font-semibold uppercase tracking-[2px] mb-2 text-white/80">Centres d'intérêt</h2>
            <div className="space-y-1">
              {interests.map((i, idx) => (
                <p key={idx} className="text-[8.5pt] opacity-80">{i}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[65%] p-[10mm] space-y-5">
        {p.summary && sections.includes('summary') && (
          <div>
            <h2 className="text-[10pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Profil</h2>
            <p className="text-[9pt] text-gray-600 leading-[1.6]">{p.summary}</p>
          </div>
        )}

        <div>
          <h2 className="text-[10pt] font-bold uppercase tracking-[2px] mb-3" style={{ color }}>Expériences</h2>
          <div className="space-y-3">
            {exps.map((exp) => (
              <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: color }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[10pt] font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-[7.5pt] text-gray-400">{dateFormat(exp.startDate)} — {exp.current ? 'Présent' : dateFormat(exp.endDate)}</span>
                </div>
                <p className="text-[9pt] text-gray-500">{exp.company}</p>
                <p className="text-[9pt] text-gray-600 mt-1 leading-[1.5]">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-[10pt] font-bold uppercase tracking-[2px] mb-3" style={{ color }}>Formation</h2>
          <div className="space-y-2">
            {edus.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[10pt] font-bold text-gray-800">{edu.degree}</h3>
                  <span className="text-[7.5pt] text-gray-400">{dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</span>
                </div>
                <p className="text-[9pt] text-gray-500">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MinimalistTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, interests, sections } = cv

  return (
    <div className="bg-white min-h-[297mm]" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <div className="px-[22mm] py-[18mm]">
        <div className="text-center mb-10">
          <h1 className="text-[20pt] font-light tracking-[5px] uppercase text-gray-800">{p.firstName} {p.lastName}</h1>
          {p.title && <p className="text-[8pt] text-gray-400 mt-2 tracking-[2px] uppercase">{p.title}</p>}
          <div className="flex justify-center gap-3 mt-4 text-[7.5pt] text-gray-400">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.address && <span>{p.address}</span>}
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        <div className="space-y-7">
          {p.summary && sections.includes('summary') && (
            <p className="text-[9pt] text-gray-500 leading-[1.8] text-center max-w-[80%] mx-auto">{p.summary}</p>
          )}

          <Section3 title="Expériences" visible={sections.includes('experiences')}>
            {exps.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[9.5pt] font-semibold text-gray-800">{exp.position}</span>
                    <span className="text-[8.5pt] text-gray-400"> — {exp.company}</span>
                  </div>
                  <span className="text-[7.5pt] text-gray-300">{dateFormat(exp.startDate)} — {exp.current ? 'Aujourd\'hui' : dateFormat(exp.endDate)}</span>
                </div>
                <p className="text-[8.5pt] text-gray-500 mt-1 leading-[1.6]">{exp.description}</p>
              </div>
            ))}
          </Section3>

          <Section3 title="Formation" visible={sections.includes('education')}>
            {edus.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline mb-2">
                <div>
                  <span className="text-[9.5pt] font-semibold text-gray-800">{edu.degree}</span>
                  <span className="text-[8.5pt] text-gray-400">, {edu.institution}</span>
                </div>
                <span className="text-[7.5pt] text-gray-300">{dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</span>
              </div>
            ))}
          </Section3>

          <Section3 title="Compétences" visible={sections.includes('skills')}>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {skills.map((s, i) => (
                <span key={i} className="text-[8.5pt] text-gray-600">{s}</span>
              ))}
            </div>
          </Section3>

          <div className="grid grid-cols-2 gap-8">
            <Section3 title="Langues" visible={sections.includes('languages')}>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-[8.5pt]">
                    <span className="text-gray-700">{l.name}</span>
                    <span className="text-gray-400">{l.level}</span>
                  </div>
                ))}
              </div>
            </Section3>

            <Section3 title="Centres d'intérêt" visible={sections.includes('interests')}>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {interests.map((i, idx) => (
                  <span key={idx} className="text-[8.5pt] text-gray-600">{i}</span>
                ))}
              </div>
            </Section3>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreativeTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, interests, sections, color } = cv

  return (
    <div className="bg-white min-h-[297mm] relative" style={{ fontFamily: '"Poppins", "Segoe UI", Arial, sans-serif' }}>
      <div className="absolute top-0 left-0 w-[50mm] h-full" style={{ backgroundColor: color }}>
        <div className="p-[6mm] text-white text-center mt-[30mm]">
          <div className="mb-6">
            <div className="w-[35mm] h-[35mm] mx-auto rounded-full border-[3px] border-white/40 flex items-center justify-center overflow-hidden">
              {p.photo ? (
                <img src={p.photo} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[24pt] font-bold">{p.firstName[0]}{p.lastName[0]}</span>
              )}
            </div>
          </div>
          <div className="space-y-3 text-[8pt] opacity-90">
            {p.email && <p className="break-all">{p.email}</p>}
            {p.phone && <p>{p.phone}</p>}
            {p.address && <p>{p.address}</p>}
          </div>
        </div>
      </div>

      <div className="ml-[50mm] p-[10mm]">
        <div className="mb-6">
          <h1 className="text-[28pt] font-black leading-none" style={{ color }}>{p.firstName}</h1>
          <h1 className="text-[28pt] font-light text-gray-300 mt-[-2px]">{p.lastName}</h1>
          {p.title && <p className="text-[9pt] text-gray-500 mt-1 font-medium">{p.title}</p>}
        </div>

        <div className="space-y-5">
          {p.summary && sections.includes('summary') && (
            <p className="text-[9pt] text-gray-600 leading-[1.6] italic border-l-2 pl-3" style={{ borderColor: color }}>{p.summary}</p>
          )}

          <Section4 title="Expériences" visible={sections.includes('experiences')} color={color}>
            {exps.map((exp) => (
              <div key={exp.id} className="mb-3 flex gap-3">
                <div className="w-[2px] bg-gray-200 shrink-0 relative mt-2">
                  <div className="w-[8px] h-[8px] rounded-full absolute -left-[3px] -top-[2px]" style={{ backgroundColor: color }} />
                </div>
                <div>
                  <h3 className="text-[10pt] font-bold text-gray-800">{exp.position}</h3>
                  <p className="text-[8.5pt]" style={{ color: `${color}d0` }}>{exp.company} <span className="text-gray-400">| {dateFormat(exp.startDate)} — {exp.current ? 'Présent' : dateFormat(exp.endDate)}</span></p>
                  <p className="text-[8.5pt] text-gray-600 mt-1 leading-[1.5]">{exp.description}</p>
                </div>
              </div>
            ))}
          </Section4>

          <Section4 title="Formation" visible={sections.includes('education')} color={color}>
            {edus.map((edu) => (
              <div key={edu.id} className="mb-2 flex gap-3">
                <div className="w-[2px] bg-gray-200 shrink-0 relative mt-2">
                  <div className="w-[8px] h-[8px] rounded-full absolute -left-[3px] -top-[2px]" style={{ backgroundColor: color }} />
                </div>
                <div>
                  <h3 className="text-[10pt] font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-[8.5pt] text-gray-500">{edu.institution} — {edu.field} <span className="text-gray-400">| {dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</span></p>
                </div>
              </div>
            ))}
          </Section4>

          <div className="grid grid-cols-2 gap-4">
            <Section4 title="Compétences" visible={sections.includes('skills')} color={color}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span key={i} className="text-[8pt] px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: color }}>{s}</span>
                ))}
              </div>
            </Section4>

            <Section4 title="Langues" visible={sections.includes('languages')} color={color}>
              <div className="space-y-1.5">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-[9pt]">
                    <span className="text-gray-700">{l.name}</span>
                    <span className="text-gray-400 text-[8pt] bg-gray-50 px-2 py-0.5 rounded">{l.level}</span>
                  </div>
                ))}
              </div>
            </Section4>
          </div>

          {interests.length > 0 && sections.includes('interests') && (
            <div>
              <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Centres d'intérêt</h2>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((i, idx) => (
                  <span key={idx} className="text-[8pt] px-2.5 py-1 bg-gray-50 text-gray-600 rounded">{i}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ATSFriendlyTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, interests, sections } = cv

  return (
    <div className="bg-white min-h-[297mm] p-[20mm]" style={{ fontFamily: 'Arial, "Helvetica Neue", sans-serif', fontSize: '11pt', lineHeight: 1.4 }}>
      <div className="mb-4">
        <h1 className="text-[18pt] font-bold">{p.firstName} {p.lastName}</h1>
        <div className="text-[9pt] text-gray-600 mt-1">
          {[p.email, p.phone, p.address].filter(Boolean).join(' | ')}
        </div>
        {p.title && <p className="text-[10pt] font-medium mt-1 text-gray-700">{p.title}</p>}
      </div>

      <hr className="border-gray-300 mb-3" />

      {p.summary && sections.includes('summary') && (
        <div className="mb-3">
          <p className="text-[10pt] text-gray-700">{p.summary}</p>
        </div>
      )}

      {sections.includes('experiences') && exps.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10pt] font-bold uppercase mb-1">Expériences Professionnelles</h2>
          {exps.map((exp) => (
            <div key={exp.id} className="mb-2">
              <p className="font-bold text-[10pt]">{exp.position}</p>
              <p className="text-[9pt] text-gray-600">{exp.company} | {dateFormat(exp.startDate)} — {exp.current ? 'Présent' : dateFormat(exp.endDate)}</p>
              <p className="text-[9.5pt] mt-0.5">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {sections.includes('education') && edus.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10pt] font-bold uppercase mb-1">Formation</h2>
          {edus.map((edu) => (
            <div key={edu.id} className="mb-1">
              <p className="font-bold text-[10pt]">{edu.degree} en {edu.field}</p>
              <p className="text-[9pt] text-gray-600">{edu.institution} | {dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</p>
            </div>
          ))}
        </div>
      )}

      {sections.includes('skills') && skills.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10pt] font-bold uppercase mb-1">Compétences</h2>
          <p className="text-[9.5pt]">{skills.join(' | ')}</p>
        </div>
      )}

      {sections.includes('languages') && languages.length > 0 && (
        <div className="mb-3">
          <h2 className="text-[10pt] font-bold uppercase mb-1">Langues</h2>
          <p className="text-[9.5pt]">{languages.map((l) => `${l.name} (${l.level})`).join(' | ')}</p>
        </div>
      )}

      {sections.includes('interests') && interests.length > 0 && (
        <div>
          <h2 className="text-[10pt] font-bold uppercase mb-1">Centres d'intérêt</h2>
          <p className="text-[9.5pt]">{interests.join(' | ')}</p>
        </div>
      )}
    </div>
  )
}

function Section({ title, children, visible }: { title: string; children: React.ReactNode; visible: boolean }) {
  if (!visible) return null
  return (
    <div>
      <h2 className="text-[10pt] font-bold tracking-[1px] uppercase mb-2" style={{ color: 'inherit' }}>{title}</h2>
      {children}
    </div>
  )
}

function MotionGradientTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, sections, color } = cv

  return (
    <div className="bg-white min-h-[297mm] relative overflow-hidden" style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ background: `linear-gradient(135deg, ${color} 0%, #a855f7 50%, #f97316 100%)` }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-15"
        style={{ background: color }}
        animate={{ x: [0, 100, 50, 0], y: [0, 50, 100, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full blur-3xl opacity-10"
        style={{ background: '#a855f7', right: 0, bottom: 0 }}
        animate={{ x: [0, -50, -100, 0], y: [0, -100, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative px-[18mm] py-[14mm]">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h1 className="text-[24pt] font-bold" style={{ color }}>{p.firstName} {p.lastName}</h1>
          {p.title && <p className="text-[10pt] text-gray-500 mt-1">{p.title}</p>}
          <div className="flex justify-center gap-4 mt-3 text-[8pt] text-gray-400">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.address && <span>{p.address}</span>}
          </div>
        </motion.div>

        <div className="grid grid-cols-[1fr_2fr] gap-6">
          <div className="space-y-5">
            <MotionBlock>
              <h2 className="text-[8pt] font-bold uppercase tracking-[2px]" style={{ color }}>Profil</h2>
              {sections.includes('summary') && <p className="text-[9pt] text-gray-600 mt-1 leading-[1.6]">{p.summary}</p>}
            </MotionBlock>
            <MotionBlock>
              <h2 className="text-[8pt] font-bold uppercase tracking-[2px]" style={{ color }}>Compétences</h2>
              <div className="mt-2 space-y-2">
                {skills.map((s, i) => (
                  <motion.div key={i} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}>
                    <div className="flex justify-between text-[8.5pt] mb-0.5"><span>{s}</span></div>
                    <div className="h-[4px] bg-gray-100 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: color }} initial={{ width: 0 }} animate={{ width: `${70 + Math.random() * 25}%` }} transition={{ delay: 0.8 + i * 0.1, duration: 1 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </MotionBlock>
            <MotionBlock>
              <h2 className="text-[8pt] font-bold uppercase tracking-[2px]" style={{ color }}>Langues</h2>
              <div className="mt-2 space-y-1.5">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-[9pt]"><span>{l.name}</span><span className="text-gray-400">{l.level}</span></div>
                ))}
              </div>
            </MotionBlock>
          </div>

          <div className="space-y-5">
            <MotionBlock>
              <h2 className="text-[8pt] font-bold uppercase tracking-[2px]" style={{ color }}>Expériences</h2>
              <div className="mt-2 space-y-3">
                {exps.map((exp, i) => (
                  <motion.div key={exp.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-[10pt] font-bold text-gray-800">{exp.position}</h3>
                      <span className="text-[7.5pt] text-gray-400">{dateFormat(exp.startDate)} — {exp.current ? 'Présent' : dateFormat(exp.endDate)}</span>
                    </div>
                    <p className="text-[8.5pt]" style={{ color: `${color}e0` }}>{exp.company}</p>
                    <p className="text-[8.5pt] text-gray-600 mt-0.5">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </MotionBlock>
            <MotionBlock>
              <h2 className="text-[8pt] font-bold uppercase tracking-[2px]" style={{ color }}>Formation</h2>
              <div className="mt-2 space-y-2">
                {edus.map((edu, i) => (
                  <motion.div key={edu.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                    <div className="flex justify-between items-baseline"><h3 className="text-[10pt] font-bold text-gray-800">{edu.degree}</h3><span className="text-[7.5pt] text-gray-400">{dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</span></div>
                    <p className="text-[8.5pt] text-gray-500">{edu.institution} — {edu.field}</p>
                  </motion.div>
                ))}
              </div>
            </MotionBlock>
          </div>
        </div>
      </div>
    </div>
  )
}

function MotionSlideTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, interests, sections, color } = cv

  return (
    <div className="bg-white min-h-[297mm]" style={{ fontFamily: '"Inter", system-ui, sans-serif' }}>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
        style={{ backgroundColor: color }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="px-[18mm] py-[12mm] text-white"
        >
          <h1 className="text-[22pt] font-bold">{p.firstName} {p.lastName}</h1>
          {p.title && <p className="text-[9pt] opacity-80 mt-1">{p.title}</p>}
          <div className="flex gap-4 mt-2 text-[8pt] opacity-70">
            {p.email && <span>{p.email}</span>}
            {p.phone && <span>{p.phone}</span>}
            {p.address && <span>{p.address}</span>}
          </div>
        </motion.div>
      </motion.div>

      <div className="px-[18mm] py-[10mm] space-y-5">
        {sections.includes('summary') && p.summary && (
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
            <p className="text-[9.5pt] text-gray-600 leading-[1.7] italic border-l-[3px] pl-3" style={{ borderColor: color }}>{p.summary}</p>
          </motion.div>
        )}

        {sections.includes('experiences') && exps.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
            <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-3" style={{ color }}>Expériences</h2>
            <div className="space-y-3">
              {exps.map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative pl-4 border-l-2"
                  style={{ borderColor: color }}
                >
                  <motion.div
                    className="absolute -left-[5px] top-1 w-[8px] h-[8px] rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                  />
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[10pt] font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-[7.5pt] text-gray-400">{dateFormat(exp.startDate)} — {exp.current ? 'Présent' : dateFormat(exp.endDate)}</span>
                  </div>
                  <p className="text-[8.5pt] text-gray-500">{exp.company}</p>
                  <p className="text-[8.5pt] text-gray-600 mt-0.5">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {sections.includes('education') && edus.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}>
            <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-3" style={{ color }}>Formation</h2>
            <div className="space-y-2">
              {edus.map((edu) => (
                <motion.div key={edu.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-between items-baseline">
                  <div><span className="text-[10pt] font-bold text-gray-800">{edu.degree}</span><span className="text-[8.5pt] text-gray-500"> — {edu.institution}</span></div>
                  <span className="text-[7.5pt] text-gray-400">{dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {sections.includes('skills') && skills.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
              <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Compétences</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((s, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 + i * 0.05, type: 'spring' }} className="text-[8pt] px-2 py-0.5 rounded" style={{ backgroundColor: `${color}15`, color }}>{s}</motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {sections.includes('languages') && languages.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.5 }}>
              <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Langues</h2>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-[9pt]"><span>{l.name}</span><span className="text-gray-400 text-[8pt]">{l.level}</span></div>
                ))}
              </div>
            </motion.div>
          )}

          {sections.includes('interests') && interests.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.5 }}>
              <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Centres d'intérêt</h2>
              <div className="space-y-1">
                {interests.map((i, idx) => (
                  <p key={idx} className="text-[9pt] text-gray-600">{i}</p>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function MotionCardsTemplate() {
  const cv = useCVStore((s) => s.cv)
  const { personalInfo: p, experiences: exps, education: edus, skills, languages, interests, sections, color } = cv

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-[297mm] p-[10mm]" style={{ fontFamily: '"Poppins", system-ui, sans-serif' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-[22pt] font-black" style={{ color }}>{p.firstName} <span className="text-gray-800">{p.lastName}</span></h1>
        {p.title && <p className="text-[9pt] text-gray-500 mt-1">{p.title}</p>}
        <motion.div className="flex justify-center gap-4 mt-2 text-[8pt] text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.address && <span>{p.address}</span>}
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {sections.includes('summary') && p.summary && (
          <motion.div
            className="col-span-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            initial={{ opacity: 0, rotateX: -5, y: 20 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          >
            <p className="text-[9pt] text-gray-600 leading-[1.6]">{p.summary}</p>
          </motion.div>
        )}

        {sections.includes('experiences') && exps.length > 0 && (
          <motion.div
            className="col-span-2 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          >
            <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-3" style={{ color }}>Expériences</h2>
            <div className="space-y-3">
              {exps.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-[10pt] font-bold text-gray-800">{exp.position}</h3>
                    <span className="text-[7.5pt] text-gray-400">{dateFormat(exp.startDate)} — {exp.current ? 'Présent' : dateFormat(exp.endDate)}</span>
                  </div>
                  <p className="text-[8.5pt] text-gray-500">{exp.company}</p>
                  <p className="text-[8.5pt] text-gray-600 mt-0.5">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="space-y-3">
          {sections.includes('skills') && skills.length > 0 && (
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
            >
              <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Compétences</h2>
              <div className="space-y-1.5">
                {skills.map((s, i) => (
                  <motion.div key={i} whileHover={{ x: 3 }} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-[8.5pt] text-gray-600">{s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {sections.includes('languages') && languages.length > 0 && (
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
            >
              <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Langues</h2>
              <div className="space-y-1">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-[9pt]"><span className="text-gray-700">{l.name}</span><span className="text-gray-400 text-[8pt]">{l.level}</span></div>
                ))}
              </div>
            </motion.div>
          )}

          {sections.includes('education') && edus.length > 0 && (
            <motion.div
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
            >
              <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Formation</h2>
              {edus.map((edu) => (
                <div key={edu.id} className="mb-2"><div className="text-[9.5pt] font-semibold text-gray-800">{edu.degree}</div><div className="text-[8pt] text-gray-500">{edu.institution}</div><div className="text-[7.5pt] text-gray-400">{dateFormat(edu.startDate)} — {dateFormat(edu.endDate)}</div></div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {sections.includes('interests') && interests.length > 0 && (
        <motion.div
          className="mt-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
        >
          <h2 className="text-[9pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>Centres d'intérêt</h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((i, idx) => (
              <motion.span key={idx} whileHover={{ scale: 1.05 }} className="text-[8.5pt] px-3 py-1 rounded-full text-white" style={{ backgroundColor: color }}>{i}</motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function MotionBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

function Section2({ title, children, visible }: { title: string; children: React.ReactNode; visible: boolean }) {
  if (!visible) return null
  const cv = useCVStore((s) => s.cv)
  return (
    <div>
      <h2 className="text-[8pt] font-bold uppercase tracking-[2px] mb-2" style={{ color: cv.color }}>{title}</h2>
      {children}
    </div>
  )
}

function Section3({ title, children, visible }: { title: string; children: React.ReactNode; visible: boolean }) {
  if (!visible) return null
  return (
    <div>
      <h2 className="text-[7.5pt] font-semibold uppercase tracking-[3px] text-gray-300 mb-2">{title}</h2>
      {children}
    </div>
  )
}

function Section4({ title, children, visible, color }: { title: string; children: React.ReactNode; visible: boolean; color: string }) {
  if (!visible) return null
  return (
    <div>
      <h2 className="text-[8pt] font-bold uppercase tracking-[2px] mb-2" style={{ color }}>{title}</h2>
      {children}
    </div>
  )
}
