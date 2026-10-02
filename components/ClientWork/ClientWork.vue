<template>
  <div class="work-root">
    <ul class="work-list">
      <li v-for="item in clientWork.items" :key="item.title" class="card work-card">
        <WorkVisual :kind="item.diagram" :label="item.visual" />
        <p class="work-period muted">{{ item.period }}</p>
        <h3 class="work-title">{{ item.title }}</h3>
        <p class="work-headline">{{ item.headline }}</p>
        <ul class="tag-list">
          <li v-for="tech in item.stack" :key="tech" class="tag">{{ tech }}</li>
        </ul>
        <details class="work-details">
          <summary class="disclosure-toggle">What I built</summary>
          <p class="work-text">{{ item.what }}</p>
          <p class="work-text">{{ item.built }}</p>
        </details>
      </li>
    </ul>

    <blockquote v-for="quote in clientWork.quotes" :key="quote" class="work-quote">
      “{{ quote }}”
      <span class="work-quote-by muted">— client review</span>
    </blockquote>
  </div>
</template>

<script>
import { clientWork } from "~/constants/cv";
import WorkVisual from "~/components/WorkVisual/WorkVisual.vue";

export default {
  name: "ClientWork",
  components: { WorkVisual },
  data() {
    return {
      clientWork,
    };
  },
};
</script>

<style lang="stylus" scoped>
.work-list
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

.work-card
  display: flex;
  flex-direction: column;

.work-period
  margin-top: 16px;
  font-size: 13px;

.work-title
  margin-top: 4px;
  font-size: 18px;
  font-weight: 650;
  line-height: 1.3;

.work-headline
  margin: 8px 0 14px;
  font-size: 16px;
  line-height: 1.45;
  color: var(--tertiary-color);

.work-details
  margin-top: auto;
  padding-top: 8px;

.work-text
  font-size: 15px;
  line-height: 1.55;
  color: var(--tertiary-color);
  margin-bottom: 8px;

.work-quote
  margin: 40px auto 0;
  max-width: 560px;
  text-align: center;
  font-size: 20px;
  line-height: 1.4;

.work-quote-by
  display: block;
  margin-top: 8px;
  font-size: 14px;
</style>
