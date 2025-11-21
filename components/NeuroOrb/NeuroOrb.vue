<!-- Remove the filter definition and usage -->
<template>
  <div class="orb-container" ref="container">
    <div class="glow-layer" :style="glowLayerStyle"></div>

    <svg class="network-svg" :width="width" :height="height">
      <g v-if="renderData" :transform="`translate(${width / 2}, ${height / 2})`">
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
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'idle' },
  baseRadius: { type: Number, default: 200 },
  nodeCount: { type: Number, default: 150 }
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


const glowLayerStyle = computed(() => {
  if (!renderData.value || !renderData.value.style || !renderData.value.style.glow) {
    return {}
  }
  const { r, g, b } = renderData.value.style.glow
  const glowStrength = renderData.value.glowStrength || 1 // Default to 4 if not provided

  // Use box-shadow for a smooth, performant glow
  return {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    boxShadow: `0 0 ${glowStrength * 0.4}px ${glowStrength * 3}px rgba(${r}, ${g}, ${b}, 0.6)` // Adjust multipliers for desired effect
  }
})


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
  position: relative;
  /* Needed for absolute positioning */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.glow-layer {
  position: absolute;
  width: 300px;
  /* Adjust size */
  height: 300px;
  border-radius: 50%;
  filter: blur(60px);
  /* CSS blur is faster/static */
  opacity: 0.4;
  pointer-events: none;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  transition: background-color 0.2s;
  /* Smooth color transition */
}

.network-svg {
  overflow: visible;
  display: block;
}
</style>
