import { onMounted, onUnmounted } from 'vue'

/**
 * 用户点击或滑动时跳过/加速 intro 动画
 */
export function useIntroSkip(onSkip: () => void, isActive: () => boolean = () => true) {
  let consumed = false

  function trySkip() {
    if (consumed || !isActive()) return
    consumed = true
    onSkip()
  }

  function onClick() {
    trySkip()
  }

  function onWheel(e: WheelEvent) {
    if (Math.abs(e.deltaY) > 0 || Math.abs(e.deltaX) > 0) {
      trySkip()
    }
  }

  function onTouchMove() {
    trySkip()
  }

  onMounted(() => {
    window.addEventListener('click', onClick, true)
    window.addEventListener('wheel', onWheel, { passive: true, capture: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true, capture: true })
  })

  onUnmounted(() => {
    window.removeEventListener('click', onClick, true)
    window.removeEventListener('wheel', onWheel, true)
    window.removeEventListener('touchmove', onTouchMove, true)
  })

  return { trySkip }
}
