export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePassword(password) {
  if (typeof password !== 'string') return false
  return password.length >= 6
}

export function validateRequired(value) {
  return String(value ?? '').trim().length > 0
}

