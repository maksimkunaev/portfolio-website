<template>
  <div class="media-placeholder" :class="{ wide }">
    <span class="media-placeholder-tag">Placeholder</span>
    <span class="media-placeholder-label">{{ label }}</span>
  </div>
</template>

<script>
// A mock picture: marks where a diagram, screenshot or demo goes, and says
// which one. Replace the component with the real media when it exists.
export default {
  name: "MediaPlaceholder",
  props: {
    label: { type: String, required: true },
    wide: { type: Boolean, default: false },
  },
};
</script>

<style lang="stylus" scoped>
.media-placeholder
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  aspect-ratio: 16 / 9;
  padding: 16px;
  text-align: center;
  border-radius: 10px;
  border: 1px dashed var(--quaternery-color);
  background: rgba(255, 255, 255, 0.02);

  &.wide
    aspect-ratio: 21 / 9;

.media-placeholder-tag
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--secondary-color);

.media-placeholder-label
  font-size: 13px;
  line-height: 1.4;
  color: var(--secondary-color);
  max-width: 36ch;
</style>
