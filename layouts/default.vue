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
  background-image linear-gradient(to right, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))

.neural-background
  position absolute
  top 0
  left 0
  width 100%
  height 100%

// Content Layer (z-index: 1)
.content-layer
  position relative
  z-index 1
  min-height 100vh

.container
  display flex
  flex-direction column
  min-height 100vh
  font-family sans-serif
  color var(--primary-color)
  transition color 0.2s, background-color 0.2s
  padding-bottom 48px
  // No background - transparent to show neural animation

.main-content
  flex 1
  text-shadow: 4px 4px 3px #0000005e, 8px 8px 12px #0000003b
  // Main content area - transparent background
</style>