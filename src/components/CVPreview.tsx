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
