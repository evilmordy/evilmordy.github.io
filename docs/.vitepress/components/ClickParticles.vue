<template>
  <canvas ref="canvasRef" class="click-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()

const TRAIL = {
  maxLength: 48,
  maxWidth: 6,
  minWidth: 1.2,
  decay: 0.03,
  spacing: 2,
  glowBlur: 10,
} as const

const BLUE_COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#38bdf8', '#0ea5e9'] as const
const MAX_TRIANGLES = 80
const MAX_RIPPLES = 10

interface TrailPoint {
  x: number
  y: number
  alpha: number
}

interface Ripple {
  x: number
  y: number
  birthTime: number
  duration: number
  maxRadius: number
  hue: number
  waveFreq: number
  phase: number
}

interface TriangleBurst {
  x: number
  y: number
  angle: number
  birthTime: number
  duration: number
  size: number
  speed: number
  color: string
  spin: number
}

let ctx: CanvasRenderingContext2D | null = null
let animId = 0
let reducedMotion = false

const trailPoints: TrailPoint[] = []
const ripples: Ripple[] = []
const triangles: TriangleBurst[] = []

let lastTrailX = 0
let lastTrailY = 0
let hasTrail = false

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3
}

function pickBlueColor(): string {
  return BLUE_COLORS[Math.floor(Math.random() * BLUE_COLORS.length)]
}

function onResize() {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
}

function onMouseMove(e: MouseEvent) {
  if (reducedMotion) return

  if (!hasTrail) {
    lastTrailX = e.clientX
    lastTrailY = e.clientY
    hasTrail = true
    trailPoints.push({ x: e.clientX, y: e.clientY, alpha: 1 })
    return
  }

  const dx = e.clientX - lastTrailX
  const dy = e.clientY - lastTrailY
  const dist = Math.hypot(dx, dy)
  if (dist < TRAIL.spacing) return

  const steps = Math.max(1, Math.ceil(dist / TRAIL.spacing))
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    trailPoints.push({
      x: lastTrailX + dx * t,
      y: lastTrailY + dy * t,
      alpha: 1,
    })
  }

  while (trailPoints.length > TRAIL.maxLength) {
    trailPoints.shift()
  }

  lastTrailX = e.clientX
  lastTrailY = e.clientY
}

function onClick(e: MouseEvent) {
  if (reducedMotion) return

  const now = performance.now()

  const rippleConfigs = [
    { maxRadius: 70, duration: 520, hue: 210, waveFreq: 6 },
    { maxRadius: 100, duration: 580, hue: 220, waveFreq: 8 },
  ]

  for (const cfg of rippleConfigs) {
    if (ripples.length >= MAX_RIPPLES) ripples.shift()
    ripples.push({
      x: e.clientX,
      y: e.clientY,
      birthTime: now,
      duration: cfg.duration,
      maxRadius: cfg.maxRadius,
      hue: cfg.hue,
      waveFreq: cfg.waveFreq,
      phase: Math.random() * Math.PI * 2,
    })
  }

  const count = 14
  for (let i = 0; i < count; i++) {
    if (triangles.length >= MAX_TRIANGLES) triangles.shift()
    triangles.push({
      x: e.clientX,
      y: e.clientY,
      angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4,
      birthTime: now,
      duration: 650 + Math.random() * 200,
      size: 4 + Math.random() * 8,
      speed: 2.5 + Math.random() * 3.5,
      color: pickBlueColor(),
      spin: (Math.random() - 0.5) * 0.2,
    })
  }
}

function updateTrail() {
  for (let i = trailPoints.length - 1; i >= 0; i--) {
    trailPoints[i].alpha -= TRAIL.decay
    if (trailPoints[i].alpha <= 0.01) trailPoints.splice(i, 1)
  }
}

function drawTrail() {
  if (!ctx || trailPoints.length < 2) return

  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  const count = trailPoints.length
  for (let i = 1; i < count; i++) {
    const prev = trailPoints[i - 1]
    const curr = trailPoints[i]
    const ratio = i / (count - 1)
    const alpha = curr.alpha * ratio
    if (alpha <= 0.01) continue

    const width = TRAIL.minWidth + (TRAIL.maxWidth - TRAIL.minWidth) * ratio * curr.alpha
    const gradient = ctx.createLinearGradient(prev.x, prev.y, curr.x, curr.y)
    gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha * 0.4})`)
    gradient.addColorStop(0.5, `rgba(96, 165, 250, ${alpha * 0.85})`)
    gradient.addColorStop(1, `rgba(191, 219, 254, ${alpha})`)

    ctx.beginPath()
    ctx.moveTo(prev.x, prev.y)

    if (i < count - 1) {
      const next = trailPoints[i + 1]
      const midX = (curr.x + next.x) * 0.5
      const midY = (curr.y + next.y) * 0.5
      ctx.quadraticCurveTo(curr.x, curr.y, midX, midY)
    } else {
      ctx.lineTo(curr.x, curr.y)
    }

    ctx.strokeStyle = gradient
    ctx.lineWidth = width

    if (i === count - 1) {
      ctx.shadowColor = 'rgba(96, 165, 250, 0.95)'
      ctx.shadowBlur = TRAIL.glowBlur
    } else {
      ctx.shadowBlur = 0
    }

    ctx.stroke()
  }

  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
}

function drawRipple(ripple: Ripple, now: number) {
  if (!ctx) return

  const progress = (now - ripple.birthTime) / ripple.duration
  if (progress >= 1) return

  const radius = ripple.maxRadius * easeOutCubic(progress)
  const alpha = (1 - progress) * 0.6
  const segments = 64

  ctx.beginPath()
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const wobble = Math.sin(angle * ripple.waveFreq + ripple.phase + progress * 6) * (3 + progress * 4)
    const r = radius + wobble
    const x = ripple.x + Math.cos(angle) * r
    const y = ripple.y + Math.sin(angle) * r
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.strokeStyle = `hsla(${ripple.hue}, 88%, 62%, ${alpha})`
  ctx.lineWidth = 1.5 * (1 - progress * 0.5)
  ctx.stroke()
}

function drawTriangle(burst: TriangleBurst, now: number) {
  if (!ctx) return

  const progress = (now - burst.birthTime) / burst.duration
  if (progress >= 1) return

  const eased = easeOutCubic(progress)
  const distance = eased * burst.speed * 40
  const alpha = 1 - progress
  const size = burst.size * (1 - progress * 0.7)
  const rotation = burst.angle + burst.spin * progress * 10

  const cx = burst.x + Math.cos(burst.angle) * distance
  const cy = burst.y + Math.sin(burst.angle) * distance

  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rotation)
  ctx.globalAlpha = alpha
  ctx.fillStyle = burst.color
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.lineTo(size * 0.866, size * 0.5)
  ctx.lineTo(-size * 0.866, size * 0.5)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
  ctx.globalAlpha = 1
}

function tick(now: number) {
  if (!ctx || !canvasRef.value) return

  const w = canvasRef.value.width
  const h = canvasRef.value.height
  ctx.clearRect(0, 0, w, h)

  if (!reducedMotion) {
    updateTrail()
    drawTrail()

    for (let i = ripples.length - 1; i >= 0; i--) {
      const progress = (now - ripples[i].birthTime) / ripples[i].duration
      if (progress >= 1) {
        ripples.splice(i, 1)
        continue
      }
      drawRipple(ripples[i], now)
    }

    for (let i = triangles.length - 1; i >= 0; i--) {
      const progress = (now - triangles[i].birthTime) / triangles[i].duration
      if (progress >= 1) {
        triangles.splice(i, 1)
        continue
      }
      drawTriangle(triangles[i], now)
    }
  }

  animId = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!canvasRef.value) return

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ctx = canvasRef.value.getContext('2d')
  onResize()

  window.addEventListener('resize', onResize)
  if (!reducedMotion) {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)
  }

  animId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('click', onClick)
  trailPoints.length = 0
  ripples.length = 0
  triangles.length = 0
  hasTrail = false
})
</script>

<style scoped>
.click-canvas {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}
</style>
