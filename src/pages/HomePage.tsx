import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <span className="font-bold text-lg">CV IA PRO</span>
          </div>
          <Link to="/create" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            Créer mon CV
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl font-bold mb-4">
          Créez un CV professionnel en{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            quelques minutes
          </span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Remplissez le formulaire, laissez l&apos;IA optimiser votre contenu, choisissez un modèle et téléchargez votre CV en PDF. 100% gratuit.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/create" className="inline-flex px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg">
            Commencer mon CV →
          </Link>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Tout ce dont vous avez besoin</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500">
        CV IA PRO &mdash; 100% gratuit, sans limite
      </footer>
    </div>
  )
}

const features = [
  { icon: '🤖', title: 'Assistance IA', desc: 'Correction, reformulation, amélioration de vos descriptions par intelligence artificielle.' },
  { icon: '🎨', title: '6 modèles', desc: 'Du classique au créatif, choisissez le style qui vous correspond.' },
  { icon: '🎯', title: 'ATS Friendly', desc: 'Un modèle optimisé pour passer les filtres des recruteurs.' },
  { icon: '🎨', title: 'Personnalisation', desc: 'Couleur, taille de police, sections : adaptez votre CV à vos goûts.' },
  { icon: '📄', title: 'Export PDF', desc: 'Téléchargez votre CV en PDF prêt à être envoyé aux recruteurs.' },
  { icon: '💾', title: 'Sauvegarde automatique', desc: 'Vos données sont sauvegardées dans le navigateur. Revenez quand vous voulez.' },
]
