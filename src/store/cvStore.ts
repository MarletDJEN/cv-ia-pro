import { create } from 'zustand'
import type { CVData, PersonalInfo, Experience, Education, Language, TemplateStyle, FontSize } from '../types/cv'

const defaultCVData: CVData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    photo: '',
    title: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  interests: [],
  template: 'modern',
  color: '#2563eb',
  fontSize: 'medium',
  sections: ['summary', 'experiences', 'education', 'skills', 'languages', 'interests'],
}

interface CVStore {
  cv: CVData
  step: number
  setStep: (step: number) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addExperience: () => void
  updateExperience: (id: string, data: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, data: Partial<Education>) => void
  removeEducation: (id: string) => void
  setSkills: (skills: string[]) => void
  addLanguage: () => void
  updateLanguage: (id: string, data: Partial<Language>) => void
  removeLanguage: (id: string) => void
  setInterests: (interests: string[]) => void
  setTemplate: (template: TemplateStyle) => void
  setColor: (color: string) => void
  setFontSize: (size: FontSize) => void
  toggleSection: (section: string) => void
  reset: () => void
}

const STORAGE_KEY = 'cv-ia-pro-data'

const loadFromStorage = (): CVData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { ...defaultCVData }
}

export const useCVStore = create<CVStore>((set) => ({
  cv: loadFromStorage(),
  step: 0,

  setStep: (step) => set({ step }),

  updatePersonalInfo: (info) =>
    set((state) => {
      const cv = { ...state.cv, personalInfo: { ...state.cv.personalInfo, ...info } }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  addExperience: () =>
    set((state) => {
      const id = crypto.randomUUID()
      const cv = {
        ...state.cv,
        experiences: [...state.cv.experiences, { id, company: '', position: '', startDate: '', endDate: '', current: false, description: '' }],
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  updateExperience: (id, data) =>
    set((state) => {
      const cv = { ...state.cv, experiences: state.cv.experiences.map((e) => (e.id === id ? { ...e, ...data } : e)) }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  removeExperience: (id) =>
    set((state) => {
      const cv = { ...state.cv, experiences: state.cv.experiences.filter((e) => e.id !== id) }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  addEducation: () =>
    set((state) => {
      const id = crypto.randomUUID()
      const cv = {
        ...state.cv,
        education: [...state.cv.education, { id, institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }],
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  updateEducation: (id, data) =>
    set((state) => {
      const cv = { ...state.cv, education: state.cv.education.map((e) => (e.id === id ? { ...e, ...data } : e)) }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  removeEducation: (id) =>
    set((state) => {
      const cv = { ...state.cv, education: state.cv.education.filter((e) => e.id !== id) }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  setSkills: (skills) =>
    set((state) => {
      const cv = { ...state.cv, skills }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  addLanguage: () =>
    set((state) => {
      const id = crypto.randomUUID()
      const cv = { ...state.cv, languages: [...state.cv.languages, { id, name: '', level: 'Intermédiaire' as const }] }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  updateLanguage: (id, data) =>
    set((state) => {
      const cv = { ...state.cv, languages: state.cv.languages.map((l) => (l.id === id ? { ...l, ...data } : l)) }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  removeLanguage: (id) =>
    set((state) => {
      const cv = { ...state.cv, languages: state.cv.languages.filter((l) => l.id !== id) }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  setInterests: (interests) =>
    set((state) => {
      const cv = { ...state.cv, interests }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  setTemplate: (template) =>
    set((state) => {
      const cv = { ...state.cv, template }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  setColor: (color) =>
    set((state) => {
      const cv = { ...state.cv, color }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  setFontSize: (fontSize) =>
    set((state) => {
      const cv = { ...state.cv, fontSize }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  toggleSection: (section) =>
    set((state) => {
      const sections = state.cv.sections.includes(section)
        ? state.cv.sections.filter((s) => s !== section)
        : [...state.cv.sections, section]
      const cv = { ...state.cv, sections }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv))
      return { cv }
    }),

  reset: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ cv: { ...defaultCVData }, step: 0 })
  },
}))
