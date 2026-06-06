const AI_BASE = '/.netlify/functions/ai'

export async function callAI(prompt: string, text?: string): Promise<string> {
  const res = await fetch(AI_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, text }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || 'Erreur IA')
  }

  const data = await res.json()
  return data.result
}

export const AI_PROMPTS = {
  correct: "Corrige les fautes d'orthographe et de grammaire dans le texte suivant. Réponds uniquement avec le texte corrigé, sans explications.",
  improve: "Améliore et reformule le texte suivant pour le rendre plus professionnel et impactant pour un CV. Réponds uniquement avec le texte amélioré, sans explications.",
  summary: "Génère un résumé professionnel court et percutant (2-3 phrases) pour un CV à partir des informations suivantes. Réponds uniquement avec le résumé.",
  experience: "Reformule l'expérience professionnelle suivante pour la rendre plus attractive pour les recruteurs. Utilise des verbes d'action et des résultats quantifiables si possible. Réponds uniquement avec le texte reformulé.",
}
