import { onMounted, onUnmounted, type Ref } from 'vue'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useScrollReveal(
  containerRef: Ref<HTMLElement | null | undefined>,
  options: ScrollRevealOptions = {},
) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const container = containerRef.value
    if (!container) return

    const targets = container.querySelectorAll<HTMLElement>('[data-reveal]')
    if (targets.length === 0) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin },
    )

    for (const target of targets) {
      observer.observe(target)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })
}
