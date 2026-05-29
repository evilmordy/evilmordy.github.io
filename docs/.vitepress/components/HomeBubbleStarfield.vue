<template>
  <canvas ref="canvasRef" class="home-bubble-starfield" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntroSkip } from '../composables/useIntroSkip'

const props = withDefaults(
  defineProps<{
    duration?: number
  }>(),
  {
    duration: 5000,
  },
)

const emit = defineEmits<{
  progress: [value: number]
  introComplete: []
}>()

const BUBBLE_COLORS = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a29bfe', '#60a5fa', '#f472b6'] as const
const STAR_COLORS = ['#ffffff', '#93bbfd', '#fde68a', '#a5f3fc', '#f0abfc', '#c4b5fd'] as const

interface Bubble {
  x: number
  y: number
  radius: number
  color: string
  alpha: number
  vx: number
  vy: number
  phase: number
}

interface Star {
  x: number
  y: number
  radius: number
  color: string
  twinkle: number
  twinkleSpeed: number
  vx: number
  vy: number
  glow: boolean
}

const canvasRef = ref<HTMLCanvasElement>()

let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let reducedMotion = false
let startTime = 0
let width = 0
let height = 0
let bubbles: Bubble[] = []
let stars: Star[] = []
let bgImage: HTMLImageElement | null = null
let introCompleteEmitted = false

function pickBubbleColor(): string {
  return BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)]
}

function pickStarColor(): string {
  return STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
}

function initBubbles() {
  bubbles = []
  const count = width <= 640 ? 5 : 7
  for (let i = 0; i < count; i++) {
    const radius = 70 + Math.random() * 130
    bubbles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius,
      color: pickBubbleColor(),
      alpha: 0.1 + Math.random() * 0.12,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
    })
  }
}

function initStars() {
  stars = []
  const count = width <= 640 ? 130 : 200
  for (let i = 0; i < count; i++) {
    const radius = 0.5 + Math.random() * 2.2
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius,
      color: pickStarColor(),
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.015 + Math.random() * 0.028,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.06,
      glow: radius > 1.4 && Math.random() > 0.55,
    })
  }
}

function loadBackground() {
  bgImage = new Image()
  bgImage.src = '/uzquneen.jpg'
}

function onResize() {
  if (!canvasRef.value) return
  width = canvasRef.value.offsetWidth || window.innerWidth
  height = canvasRef.value.offsetHeight || window.innerHeight
  canvasRef.value.width = width
  canvasRef.value.height = height
  initBubbles()
  initStars()
}

function getProgress(now: number): number {
  return Math.min(1, (now - startTime) / props.duration)
}

function drawBackground() {
  if (!ctx) return

  ctx.fillStyle = '#060810'
  ctx.fillRect(0, 0, width, height)

  const nebula = ctx.createRadialGradient(
    width * 0.35,
    height * 0.3,
    0,
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.55,
  )
  nebula.addColorStop(0, 'rgba(45, 27, 105, 0.35)')
  nebula.addColorStop(0.5, 'rgba(26, 16, 53, 0.2)')
  nebula.addColorStop(1, 'rgba(6, 8, 16, 0)')
  ctx.fillStyle = nebula
  ctx.fillRect(0, 0, width, height)
}

function drawHeroImageBubble(now: number, progress: number) {
  if (!ctx || !bgImage?.complete || bgImage.naturalWidth === 0) return

  const t = now * 0.001
  const cx = width / 2
  const cy = height * 0.46
  const baseRadius = Math.min(width, height) * (width <= 640 ? 0.26 : 0.22)
  const breathe = 1 + Math.sin(t * 0.8) * 0.035
  const r = baseRadius * breathe * (0.85 + progress * 0.15)

  const bubbleAlpha = 0.92 + Math.sin(t * 1.2) * 0.04

  ctx.save()

  ctx.beginPath()
  ctx.arc(cx, cy, r + 14, 0, Math.PI * 2)
  const outerGlow = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r + 14)
  outerGlow.addColorStop(0, 'rgba(147, 187, 253, 0.15)')
  outerGlow.addColorStop(0.6, 'rgba(240, 171, 252, 0.08)')
  outerGlow.addColorStop(1, 'rgba(147, 187, 253, 0)')
  ctx.fillStyle = outerGlow
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()

  const scale = Math.max((r * 2) / bgImage.width, (r * 2) / bgImage.height) * 1.15
  const iw = bgImage.width * scale
  const ih = bgImage.height * scale
  ctx.globalAlpha = bubbleAlpha
  ctx.filter = 'brightness(0.55) saturate(1.1)'
  ctx.drawImage(bgImage, cx - iw / 2, cy - ih / 2, iw, ih)
  ctx.filter = 'none'
  ctx.globalAlpha = 1

  ctx.restore()

  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  const rim = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r)
  rim.addColorStop(0, 'rgba(255, 255, 255, 0.45)')
  rim.addColorStop(0.35, 'rgba(147, 187, 253, 0.25)')
  rim.addColorStop(0.65, 'rgba(240, 171, 252, 0.2)')
  rim.addColorStop(1, 'rgba(255, 255, 255, 0.35)')
  ctx.strokeStyle = rim
  ctx.lineWidth = 2.5
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx - r * 0.28, cy - r * 0.32, r * 0.18, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
  ctx.fill()
  ctx.restore()
}

function drawStars(now: number) {
  if (!ctx) return

  for (const star of stars) {
    star.twinkle += star.twinkleSpeed
    star.x += star.vx
    star.y += star.vy

    if (star.x < -4) star.x = width + 4
    if (star.x > width + 4) star.x = -4
    if (star.y < -4) star.y = height + 4
    if (star.y > height + 4) star.y = -4

    const alpha = 0.38 + Math.sin(star.twinkle) * 0.48

    ctx.globalAlpha = alpha
    ctx.fillStyle = star.color
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fill()

    if (star.glow) {
      ctx.shadowColor = star.color
      ctx.shadowBlur = star.radius * 4
      ctx.fill()
      ctx.shadowBlur = 0
    }

    if (star.radius > 1.6 && alpha > 0.55) {
      const rayLen = star.radius * 2.8
      ctx.strokeStyle = `${star.color}${Math.floor(alpha * 160).toString(16).padStart(2, '0')}`
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(star.x - rayLen, star.y)
      ctx.lineTo(star.x + rayLen, star.y)
      ctx.moveTo(star.x, star.y - rayLen)
      ctx.lineTo(star.x, star.y + rayLen)
      ctx.stroke()
    }
  }

  ctx.globalAlpha = 1
}

function drawBubbles(now: number) {
  if (!ctx) return

  const t = now * 0.001

  for (const bubble of bubbles) {
    bubble.x += bubble.vx
    bubble.y += bubble.vy
    bubble.phase += 0.005

    if (bubble.x < -bubble.radius) bubble.x = width + bubble.radius
    if (bubble.x > width + bubble.radius) bubble.x = -bubble.radius
    if (bubble.y < -bubble.radius) bubble.y = height + bubble.radius
    if (bubble.y > height + bubble.radius) bubble.y = -bubble.radius

    const pulse = bubble.alpha + Math.sin(bubble.phase + t) * 0.04
    const r = bubble.radius * (1 + Math.sin(bubble.phase * 0.7) * 0.08)

    const grad = ctx.createRadialGradient(
      bubble.x,
      bubble.y,
      0,
      bubble.x,
      bubble.y,
      r,
    )
    grad.addColorStop(0, `${bubble.color}${Math.floor(pulse * 255).toString(16).padStart(2, '0')}`)
    grad.addColorStop(0.45, `${bubble.color}${Math.floor(pulse * 0.45 * 255).toString(16).padStart(2, '0')}`)
    grad.addColorStop(1, `${bubble.color}00`)

    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(bubble.x, bubble.y, r, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = `rgba(255, 255, 255, ${pulse * 0.35})`
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.arc(bubble.x, bubble.y, r * 0.92, 0, Math.PI * 2)
    ctx.stroke()
  }
}

function tick(now: number) {
  if (!ctx || !canvasRef.value) return

  if (startTime === 0) startTime = now
  const progress = getProgress(now)

  emit('progress', progress)

  drawBackground()
  drawStars(now)
  drawBubbles(now)
  drawHeroImageBubble(now, progress)

  if (progress >= 1 && !introCompleteEmitted) {
    introCompleteEmitted = true
    emit('introComplete')
  }

  if (progress < 1 || !introCompleteEmitted) {
    animId = requestAnimationFrame(tick)
  }
}

function skipToEnd() {
  if (introCompleteEmitted || reducedMotion) return
  introCompleteEmitted = true
  emit('progress', 1)
  emit('introComplete')
}

function finishReducedMotion() {
  emit('progress', 1)
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
  loadBackground()
  onResize()
  window.addEventListener('resize', onResize)
  animId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  bubbles = []
  stars = []
  bgImage = null
})
</script>

<style scoped>
.home-bubble-starfield {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
