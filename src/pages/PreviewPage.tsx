import { Link, useNavigate } from 'react-router-dom'
import { useCVStore } from '../store/cvStore'
import CVPreview from '../components/CVPreview'

export default function PreviewPage() {
  const cv = useCVStore((s) => s.cv)
  const reset = useCVStore((s) => s.reset)
  const navigate = useNavigate()
  const hasData = cv.personalInfo.firstName || cv.personalInfo.lastName

  if (!hasData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Aucune donnée de CV trouvée.</p>
          <Link to="/create" className="text-blue-600 hover:underline">Créer un CV</Link>
        </div>
      </div>
    )
  }

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80">
            <span className="text-xl">📄</span>
            <span className="font-bold">CV IA PRO</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/create" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">
              Modifier
            </Link>
            <button onClick={handlePrint} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger PDF
            </button>
            <button onClick={() => { reset(); navigate('/create') }} className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Nouveau CV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 print:py-0">
        <CVPreview />
      </main>
    </div>
  )
}
