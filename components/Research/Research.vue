<template>
  <div class="research-root">
    <p class="research-period muted">{{ research.title }} · {{ research.period }}</p>
    <p class="research-question">{{ research.question }}</p>

    <div class="research-demo">
      <iframe :src="research.demo" title="Aion demo: a goal planned and executed in a 3D world" loading="lazy" />
    </div>
    <p class="research-demo-caption muted">
      {{ research.demoCaption }}
      <a :href="research.demo" target="_blank">Open full screen</a>
    </p>

    <h3 class="research-label">Experiments, each with a verdict</h3>
    <ul class="experiments">
      <li v-for="(item, index) in research.experiments" :key="index" class="card experiment">
        <span class="verdict" :class="verdictClass(item.verdict)">{{ item.verdict }}</span>
        <h4 class="experiment-name">{{ item.name }}</h4>
        <p class="experiment-headline">{{ item.headline }}</p>
        <details>
          <summary class="disclosure-toggle">Details</summary>
          <p class="experiment-text muted">{{ item.did }}</p>
          <p class="experiment-text">{{ item.result }}</p>
        </details>
      </li>
    </ul>

    <details class="research-more">
      <summary class="disclosure-toggle">How it works, what worked, what I rejected</summary>

      <h3 class="research-label">Approach</h3>
      <ul class="research-list">
        <li v-for="(item, index) in research.approach" :key="index">{{ item }}</li>
      </ul>

      <h3 class="research-label">What worked</h3>
      <ul class="research-list">
        <li v-for="(item, index) in research.worked" :key="index">{{ item }}</li>
      </ul>

      <h3 class="research-label">What I rejected</h3>
      <ul class="research-list">
        <li v-for="(item, index) in research.rejected" :key="index">{{ item }}</li>
      </ul>

      <h3 class="research-label">Still open</h3>
      <p class="research-open">{{ research.open }}</p>
    </details>

    <a v-if="research.link" :href="research.link" target="_blank" class="btn research-link">
      View on GitHub
    </a>
  </div>
</template>

<script>
import { research } from "~/constants/cv";

// Verdict colour carries meaning: stopped, learned from, still running.
const verdictClasses = {
  Rejected: "verdict-stopped",
  Killed: "verdict-stopped",
  "Kept the lesson": "verdict-lesson",
  Current: "verdict-current",
};

export default {
  name: "Research",
  data() {
    return {
      research,
    };
  },
  methods: {
    verdictClass(verdict) {
      return verdictClasses[verdict];
    },
  },
};
</script>

<style lang="stylus" scoped>
.research-root
  display flex
  flex-direction column
  align-items: flex-start;

.research-period
  font-size: 15px;

.research-question
  margin-top: 12px;
  max-width: 30em;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.01em;
  text-wrap: balance;

.research-demo
  margin-top: 32px;
  width: 100%;
  height: 600px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--quaternery-color);

  iframe
    display: block;
    width: 100%;
    height: 100%;
    border: 0;

.research-demo-caption
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 75ch;

.research-label
  margin: 32px 0 14px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--secondary-color);

.experiments
  list-style: none;
  padding: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

.experiment
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  details
    margin-top: auto;
    width: 100%;

.experiment-name
  margin-top: 12px;
  font-size: 17px;
  font-weight: 650;
  line-height: 1.3;

.experiment-headline
  margin: 8px 0 4px;
  font-size: 16px;
  line-height: 1.45;
  color: var(--tertiary-color);

.experiment-text
  font-size: 15px;
  line-height: 1.55;
  margin-bottom: 8px;

.verdict
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid currentColor;

.verdict-stopped
  color: #f08a8a;

.verdict-lesson
  color: #e8c06a;

.verdict-current
  color: #7bdc9a;

.research-more
  margin-top: 24px;
  width: 100%;

.research-list
  padding-left: 20px;
  list-style: disc;
  max-width: 75ch;
  font-size: 15px;
  line-height: 1.55;
  color: var(--tertiary-color);

  li
    margin-bottom: 8px;

.research-open
  max-width: 75ch;
  font-size: 15px;
  line-height: 1.55;
  color: var(--tertiary-color);

.research-link
  margin-top: 24px;
</style>
