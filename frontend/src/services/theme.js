export function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('light')
    document.body.classList.remove('bg-bg')
  } else {
    document.documentElement.classList.remove('light')
    document.body.classList.add('bg-bg')
  }
}

