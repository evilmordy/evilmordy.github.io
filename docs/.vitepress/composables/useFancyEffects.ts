import { onMounted, ref } from 'vue'

const STORAGE_KEY = 'vp-fancy-effects'

const fancyEnabled = ref(true)

function applyFancyClass(enabled: boolean): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('fancy-effects-off', !enabled)
}

function readStoredPreference(): boolean {
  if (typeof localStorage === 'undefined') return true
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === '0') return false
  if (stored === '1') return true
  return true
}

export function useFancyEffects() {
  onMounted(() => {
    fancyEnabled.value = readStoredPreference()
    applyFancyClass(fancyEnabled.value)
  })

  function toggleFancy(): void {
    fancyEnabled.value = !fancyEnabled.value
    applyFancyClass(fancyEnabled.value)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, fancyEnabled.value ? '1' : '0')
    }
  }

  return {
    fancyEnabled,
    toggleFancy,
  }
}
