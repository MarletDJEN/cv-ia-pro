import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export const handler = async (event: { body?: string }) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' }
  }

  try {
    const { prompt, text } = JSON.parse(event.body || '{}')

    if (!prompt) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Prompt requis' }) }
    }

    const messages: { role: string; content: string }[] = [
      { role: 'system', content: "Tu es un assistant expert en rédaction de CV. Tu réponds uniquement en français. Tu fournis des réponses concises et professionnelles." },
      { role: 'user', content: prompt },
    ]

    if (text) {
      messages.push({ role: 'user', content: text })
    }

    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    })

    const result = completion.choices[0]?.message?.content || ''

    return { statusCode: 200, headers, body: JSON.stringify({ result }) }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur'
    return { statusCode: 500, headers, body: JSON.stringify({ error: message }) }
  }
}
