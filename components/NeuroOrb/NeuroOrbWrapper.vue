<template>
  <div class="neural-background">

    <NeuroOrb ref="neuroOrbRef" :mode="currentMode" />

    <div class="controls">
      <button @click="setMode('idle')">Idle</button>
      <button @click="setMode('thinking')">Thinking</button>
      <button @click="setMode('error')">Error</button>
      <button @click="triggerTalk">Trigger Talk</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NeuroOrb from '~/components/NeuroOrb/NeuroOrb.vue';

// Reference to the component instance
const neuroOrbRef = ref(null);

// Reactive state for the mode
const currentMode = ref('idle');

/**
 * To change the mode, we simply update the reactive variable.
 * Vue automatically passes the new prop to the child.
 */
const setMode = (mode) => {
  currentMode.value = mode;
  console.log(`Mode set to: ${mode}`);
};

/**
 * For complex animations ('talk'), we access the exposed method via ref.
 */
const triggerTalk = async () => {
  if (neuroOrbRef.value) {
    const sequence = [
      { type: 'color', value: { r: 255, g: 255, b: 0 }, duration: 100 }, // Flash Yellow
      { type: 'talk', strength: 40, duration: 150 },                     // Pop out
      { type: 'talk', strength: 10, duration: 150 },                     // Small bounce
    ];

    // This works because executeSequence IS exposed in NeuroOrb.vue
    await neuroOrbRef.value.executeSequence(sequence);
  } else {
    console.error("NeuroOrb ref is missing!");
  }
};
</script>


<style lang="stylus">
.neural-background
  position relative
  width 100%
  height 100vh
  background-image linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))

.controls
  position absolute
  bottom 20px
  left 50%
  transform translateX(-50%)
  display flex
  gap 10px
  z-index 99999

button
  padding 10px 20px
  background rgba(255,255,255,0.1)
  border 1px solid rgba(255,255,255,0.3)
  color white
  cursor pointer
  backdrop-filter blur(5px)
  
  &:hover
    background rgba(255,255,255,0.2)
</style>