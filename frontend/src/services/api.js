const BASE_URL = 'http://localhost:8000'

export async function apiGetQuotes() {
  const res = await fetch(`${BASE_URL}/quotes`)
  if (!res.ok) throw new Error('Failed to fetch quotes')
  return res.json()
}

export async function apiHealth() {
  const res = await fetch(`${BASE_URL}/health`)
  if (!res.ok) throw new Error('Health check failed')
  return res.json()
}

