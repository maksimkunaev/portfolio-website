<template>
  <div class="card writing-root">
    <WorkVisual :kind="writing.diagram" :label="writing.visual" />
    <div class="writing-body">
      <span class="writing-status muted">Article · {{ writing.status }}</span>
      <h3 class="writing-title">{{ writing.title }}</h3>
      <p class="writing-lede">{{ writing.lede }}</p>
      <details>
        <summary class="disclosure-toggle">Outline</summary>
        <ol class="writing-outline">
          <li v-for="(item, index) in writing.outline" :key="index">{{ item }}</li>
        </ol>
      </details>
    </div>
  </div>
</template>

<script>
import { writing } from "~/constants/cv";
import WorkVisual from "~/components/WorkVisual/WorkVisual.vue";

export default {
  name: "Writing",
  components: { WorkVisual },
  data() {
    return {
      writing,
    };
  },
};
</script>

<style lang="stylus" scoped>
.writing-root
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 760px)
    grid-template-columns: 1fr;

.writing-status
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;

.writing-title
  margin-top: 8px;
  font-size: 22px;
  font-weight: 650;
  line-height: 1.25;
  text-wrap: balance;

.writing-lede
  margin: 12px 0 8px;
  font-size: 16px;
  line-height: 1.55;
  color: var(--tertiary-color);

.writing-outline
  padding-left: 20px;
  font-size: 15px;
  line-height: 1.55;
  color: var(--tertiary-color);

  li
    margin-bottom: 8px;
</style>
