export interface PersonalInfo {
  firstName: string
  lastName: string
  address: string
  phone: string
  email: string
  photo: string
  title: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

export interface Language {
  id: string
  name: string
  level: 'Débutant' | 'Intermédiaire' | 'Courant' | 'Natif'
}

export type TemplateStyle = 'classic' | 'modern' | 'professional' | 'minimalist' | 'creative' | 'ats-friendly'
export type FontSize = 'small' | 'medium' | 'large'

export interface CVData {
  personalInfo: PersonalInfo
  experiences: Experience[]
  education: Education[]
  skills: string[]
  languages: Language[]
  interests: string[]
  template: TemplateStyle
  color: string
  fontSize: FontSize
  sections: string[]
}

export const templateLabels: Record<TemplateStyle, string> = {
  classic: 'Classique',
  modern: 'Moderne',
  professional: 'Professionnel',
  minimalist: 'Minimaliste',
  creative: 'Créatif',
  'ats-friendly': 'ATS Friendly',
}
