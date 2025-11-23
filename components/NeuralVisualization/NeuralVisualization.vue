<template>
  <svg class="network-svg" :width="width" :height="height">
    <defs>

    </defs>

    <line v-for="(conn, i) in connections" :key="`conn-${i}`" :x1="conn.x1" :y1="conn.y1" :x2="conn.x2" :y2="conn.y2"
      :stroke="secondaryColor" stroke-width="1" :opacity="conn.opacity" />

    <circle v-for="(node, i) in nodes" :key="`node-${i}`" :cx="node.x" :cy="node.y" :r="node.size" :fill="primaryColor"
      :class="{ 'glow-circle': glow }" />
  </svg>
</template>

<script>
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'

export default {
  // Renamed to match the usage example
  name: 'NeuralVisualization',
  props: {
    primaryColor: { type: String, default: '#00bcd4' },
    secondaryColor: { type: String, default: '#ffc107' },
    nodeCount: { type: Number, default: 50 },
    connectionDistance: { type: Number, default: 150 },
    speed: { type: Number, default: 0.5 },
    glow: { type: Boolean, default: false }
  },
  setup(props) {
    const instance = getCurrentInstance()
    const _uid = instance.uid

    const nodes = ref([])
    const connections = ref([])
    const animationRef = ref(null)
    const nodeData = ref([])
    // Use reactivity for width/height if you need responsiveness, 
    // but for initial setup, this is fine.
    const width = window.innerWidth
    const height = window.innerHeight

    const initNodes = () => {
      nodeData.value = Array.from({ length: props.nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * props.speed,
        vy: (Math.random() - 0.5) * props.speed,
        size: Math.random() * 3 + 2
      }))
    }

    const animate = () => {
      nodeData.value.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        // Corrected boundary logic for smoother bounce
        if (node.x <= 0 || node.x >= width) node.vx *= -1
        if (node.y <= 0 || node.y >= height) node.vy *= -1

        // Enforce boundary limits
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
      })

      const newConnections = []
      for (let i = 0; i < nodeData.value.length; i++) {
        for (let j = i + 1; j < nodeData.value.length; j++) {
          const dx = nodeData.value[i].x - nodeData.value[j].x
          const dy = nodeData.value[i].y - nodeData.value[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < props.connectionDistance) {
            const opacity = (1 - (distance / props.connectionDistance)) * 0.5
            newConnections.push({
              x1: nodeData.value[i].x,
              y1: nodeData.value[i].y,
              x2: nodeData.value[j].x,
              y2: nodeData.value[j].y,
              opacity
            })
          }
        }
      }

      nodes.value = [...nodeData.value]
      connections.value = newConnections
      animationRef.value = requestAnimationFrame(animate)
    }

    onMounted(() => {
      initNodes()
      animate()
    })

    onUnmounted(() => {
      if (animationRef.value) {
        cancelAnimationFrame(animationRef.value)
      }
    })

    return {
      nodes,
      connections,
      width,
      height,
      _uid
    }
  }
}
</script>

<style scoped>
.network-svg {
  /* Ensuring it covers the full viewport */
  width: 100%;
  height: 100%;
  display: block;
  /* Add z-index if other elements are interfering */
}

.glow-circle {
  filter: drop-shadow(0 0 6px currentColor);
}
</style>