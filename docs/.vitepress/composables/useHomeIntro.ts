import { ref } from 'vue'

export const homeIntroActive = ref(false)
export const homeRevealProgress = ref(0)

export function startHomeIntro() {
  homeIntroActive.value = true
  homeRevealProgress.value = 0
}

export function setHomeRevealProgress(progress: number) {
  homeRevealProgress.value = Math.min(1, Math.max(0, progress))
}

export function finishHomeIntro() {
  homeIntroActive.value = false
  homeRevealProgress.value = 1
}

export function resetHomeIntro() {
  homeIntroActive.value = false
  homeRevealProgress.value = 0
}
