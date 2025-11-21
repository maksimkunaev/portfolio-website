<template>
  <div class="orb-container" ref="container">
    <svg class="network-svg" :width="width" :height="height">
      <defs>
        <filter id="orb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur :stdDeviation="renderData.glowStrength" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <!-- 
        Note: We use v-if="renderData" to prevent errors before first frame 
      -->
      <g v-if="renderData" :transform="`translate(${width / 2}, ${height / 2})`" filter="url(#orb-glow)">
        <line v-for="(conn, i) in renderData.connections" :key="`c-${i}`" :x1="conn.x1" :y1="conn.y1" :x2="conn.x2"
          :y2="conn.y2" :stroke="renderData.style.color" :stroke-width="conn.width" :opacity="conn.opacity"
          stroke-linecap="round" />
        <circle v-for="(node, i) in renderData.nodes" :key="`n-${i}`" :cx="node.x" :cy="node.y" :r="node.size"
          :fill="renderData.style.color" :opacity="node.opacity" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, shallowRef } from 'vue'
import { OrbLogic } from './OrbLogic.js' // Make sure path is correct

const props = defineProps({
  mode: { type: String, default: 'idle' },
  baseRadius: { type: Number, default: 200 },
  nodeCount: { type: Number, default: 100 }
})

// --- State ---
const width = ref(1000)
const height = ref(800)
const container = ref(null)

// We use shallowRef because renderData updates 60fps and contains deep objects.
// We don't need Vue's deep reactivity overhead for this.
const renderData = shallowRef({
  nodes: [],
  connections: [],
  style: { color: '#00f3ff' },
  glowStrength: 4
})

// Logic Instance
let orb = null
let animationFrame = null

const animate = () => {
  if (!orb) return

  // Calculate next frame
  renderData.value = orb.tick(props.mode)

  animationFrame = requestAnimationFrame(animate)
}

// --- API Exposed to Parent ---
const executeSequence = (seq) => orb?.executeSequence(seq)
defineExpose({ executeSequence })

// --- Lifecycle ---
onMounted(() => {
  // 1. Measure container
  if (container.value) {
    width.value = container.value.clientWidth
    height.value = container.value.clientHeight
  }

  // 2. Init Logic
  orb = new OrbLogic({
    baseRadius: props.baseRadius,
    nodeCount: props.nodeCount
  })

  // 3. Start Loop
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
})

// --- Watchers ---
// Pass prop changes down to the logic class
watch(() => [props.nodeCount, props.baseRadius], ([newCount, newRadius]) => {
  orb?.updateParams({ nodeCount: newCount, baseRadius: newRadius })
})
</script>

<style scoped>
.orb-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.network-svg {
  overflow: visible;
  display: block;
}
</style>