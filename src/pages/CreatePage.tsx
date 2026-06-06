import { Link } from 'react-router-dom'
import CVForm from '../components/CVForm'

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl">📄</span>
            <span className="font-bold">CV IA PRO</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <CVForm />
      </main>
    </div>
  )
}
