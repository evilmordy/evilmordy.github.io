<!--
  ============================================
  ClickParticles.vue — 鼠标点击产生粒子爆炸动效
  蔚蓝色系，canvas 渲染，60fps 流畅
  ============================================
-->
<template>
  <canvas ref="canvasRef" class="click-canvas" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animId = 0
let running = false

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number
  hue: number
}

function onResize() {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
}

function onClick(e: MouseEvent) {
  const count = 12 + Math.floor(Math.random() * 7)
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
    const speed = 2 + Math.random() * 4
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 0.5 + Math.random() * 0.7,
      size: 2 + Math.random() * 4,
      hue: 200 + Math.random() * 40,
    })
  }
  if (!running) {
    running = true
    animId = requestAnimationFrame(animate)
  }
}

function animate() {
  if (!ctx || !canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height
  ctx.clearRect(0, 0, w, h)

  particles = particles.filter((p) => {
    p.x += p.vx
    p.y += p.vy
    p.life -= 0.016
    if (p.life <= 0) return false

    const alpha = p.life / p.maxLife
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
    ctx!.fillStyle = `hsla(${p.hue}, 70%, 70%, ${alpha})`
    ctx!.fill()
    return true
  })

  if (particles.length === 0) {
    running = false
    return
  }
  animId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  onResize()
  window.addEventListener('resize', onResize)
  window.addEventListener('click', onClick)
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('click', onClick)
})
</script>

<style scoped>
.click-canvas {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none; /* 不阻挡任何点击 */
}
</style>
