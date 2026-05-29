<template>
  <div
    class="warp-tunnel"
    :class="{
      'warp-tunnel--fullscreen': fullscreen,
      'warp-tunnel--fading': fading,
      'warp-tunnel--reduced': reducedMotion,
    }"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" class="warp-tunnel__canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntroSkip } from '../composables/useIntroSkip'

const props = withDefaults(
  defineProps<{
    fullscreen?: boolean
    duration?: number
    starCount?: number
    fading?: boolean
  }>(),
  {
    fullscreen: false,
    duration: 2800,
    starCount: 0,
    fading: false,
  },
)

const emit = defineEmits<{
  introComplete: []
}>()

const STAR_COLORS = ['#93bbfd', '#f0abfc', '#a5f3fc', '#fde68a', '#ffffff', '#c4b5fd'] as const

interface WarpStar {
  x: number
  y: number
  z: number
  color: string
}

const canvasRef = ref<HTMLCanvasElement>()

let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let reducedMotion = false
let startTime = 0
let width = 0
let height = 0
let centerX = 0
let centerY = 0
let fov = 320
let stars: WarpStar[] = []
let introCompleteEmitted = false
let effectiveStarCount = 300

function pickColor(): string {
  return STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
}

function createStar(): WarpStar {
  return {
    x: (Math.random() - 0.5) * 2.4,
    y: (Math.random() - 0.5) * 2.4,
    z: Math.random() * 1.5 + 0.2,
    color: pickColor(),
  }
}

function resetStar(star: WarpStar) {
  star.x = (Math.random() - 0.5) * 2.4
  star.y = (Math.random() - 0.5) * 2.4
  star.z = 1.8 + Math.random() * 0.8
}

function initStars() {
  stars = []
  for (let i = 0; i < effectiveStarCount; i++) {
    stars.push(createStar())
  }
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function getProgress(now: number): number {
  return Math.min(1, (now - startTime) / props.duration)
}

function onResize() {
  if (!canvasRef.value) return
  width = canvasRef.value.offsetWidth || window.innerWidth
  height = canvasRef.value.offsetHeight || window.innerHeight
  canvasRef.value.width = width
  canvasRef.value.height = height
  centerX = width / 2
  centerY = height / 2
  fov = Math.min(width, height) * 0.45
  effectiveStarCount = props.starCount || (width <= 640 ? 150 : 300)
  if (stars.length === 0) initStars()
}

function drawBackground(progress: number) {
  if (!ctx) return

  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.7)
  gradient.addColorStop(0, '#3d2a7a')
  gradient.addColorStop(0.35, '#2d1b69')
  gradient.addColorStop(0.7, '#1a1035')
  gradient.addColorStop(1, '#0a0618')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  const glowAlpha = 0.08 + progress * 0.12
  const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.25)
  glow.addColorStop(0, `rgba(240, 171, 252, ${glowAlpha})`)
  glow.addColorStop(0.4, `rgba(147, 187, 253, ${glowAlpha * 0.5})`)
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)
}

function drawStars(progress: number) {
  if (!ctx) return

  const warpFactor = easeInOutCubic(progress)
  const speed = 0.012 + warpFactor * 0.045

  ctx.lineCap = 'round'

  for (const star of stars) {
    const prevZ = star.z
    star.z -= speed * (0.6 + warpFactor * 1.4)

    if (star.z <= 0.05) {
      resetStar(star)
      continue
    }

    const px = centerX + (star.x / star.z) * fov
    const py = centerY + (star.y / star.z) * fov

    const prevPx = centerX + (star.x / prevZ) * fov
    const prevPy = centerY + (star.y / prevZ) * fov

    const streakLen = Math.hypot(px - prevPx, py - prevPy)
    if (streakLen < 0.5) continue

    const alpha = Math.min(1, (1 - star.z / 2.5) * 0.85 + 0.15)
    const lineWidth = Math.min(2.8, streakLen * 0.15 + 0.4)

    const grad = ctx.createLinearGradient(prevPx, prevPy, px, py)
    grad.addColorStop(0, `${star.color}00`)
    grad.addColorStop(0.4, `${star.color}${Math.floor(alpha * 180).toString(16).padStart(2, '0')}`)
    grad.addColorStop(1, `${star.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`)

    ctx.strokeStyle = grad
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    ctx.moveTo(prevPx, prevPy)
    ctx.lineTo(px, py)
    ctx.stroke()

    if (streakLen > 8 && alpha > 0.6) {
      ctx.fillStyle = star.color
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.arc(px, py, lineWidth * 0.6, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }
}

function skipToEnd() {
  if (introCompleteEmitted || reducedMotion) return
  introCompleteEmitted = true
  emit('introComplete')
}

function tick(now: number) {
  if (!ctx || !canvasRef.value) return

  if (startTime === 0) startTime = now
  const progress = getProgress(now)

  drawBackground(progress)
  drawStars(progress)

  if (progress >= 1 && !introCompleteEmitted) {
    introCompleteEmitted = true
    emit('introComplete')
  }

  if (progress < 1 || !introCompleteEmitted) {
    animId = requestAnimationFrame(tick)
  }
}

function finishReducedMotion() {
  reducedMotion = true
  setTimeout(() => emit('introComplete'), 300)
}

useIntroSkip(skipToEnd, () => !introCompleteEmitted && !reducedMotion)

onMounted(() => {
  if (!canvasRef.value) return

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) {
    finishReducedMotion()
    return
  }

  ctx = canvasRef.value.getContext('2d')
  onResize()
  window.addEventListener('resize', onResize)
  animId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  stars = []
})
</script>

<style scoped>
.warp-tunnel {
  position: absolute;
  inset: 0;
  overflow: hidden;
  transition: opacity 0.6s ease;
}

.warp-tunnel--fullscreen {
  position: fixed;
  inset: 0;
  z-index: 100;
}

.warp-tunnel--fading {
  opacity: 0;
  pointer-events: none;
}

.warp-tunnel__canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
