let introPlayedThisSession = false

export function shouldPlayIntro(): boolean {
  if (typeof window === 'undefined') return false
  if (introPlayedThisSession) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function markIntroPlayed(): void {
  introPlayedThisSession = true
}
