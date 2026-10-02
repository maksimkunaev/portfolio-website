<template>
  <div class="layout-wrapper">
    <TheHeader />
    <!-- Background Layer -->
    <div class="background-layer">
      <div class="gradient-background"></div>
      <div class="neural-background">
        <NeuralVisualization primary-color="#00f3ff" secondary-color="rgba(0, 243, 255, 0.3)" :node-count="30"
          :speed="0.7" :glow="true" />
      </div>
    </div>


    <!-- Content Layer -->
    <div class="content-layer">
      <div class="container">
        <main class="main-content">
          <NuxtPage />
        </main>
        <ScrollToTop />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
html, body, #__nuxt, #__layout
  min-height 100%
  margin 0
  padding 0

.layout-wrapper
  position relative
  min-height 100vh
  width 100%

// Background Layer (z-index: 0)
.background-layer
  position absolute
  top 0
  left 0
  width 100%
  min-height 100%
  z-index 0

.gradient-background
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  background radial-gradient(1200px 600px at 50% -200px, rgba(95, 212, 232, 0.10), transparent 70%), var(--primary-bg-color)

.neural-background
  position absolute
  top 0
  left 0
  width 100%
  height 100vh
  opacity 0.5
  mask-image linear-gradient(to bottom, #000 55%, transparent)
  pointer-events none

// Content Layer (z-index: 1)
.content-layer
  position relative
  z-index 1
  min-height 100vh

.container
  display flex
  flex-direction column
  min-height 100vh
  color var(--primary-color)
  transition color 0.2s, background-color 0.2s
  padding-bottom 48px
  // No background - transparent to show neural animation

.main-content
  flex 1
  // Main content area - transparent background
</style>