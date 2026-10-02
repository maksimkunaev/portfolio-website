<template>
  <details class="position-root">
    <summary class="position-head">
      <span class="position-line">
        <span class="position-name">{{ item.position }}</span>
        <span class="position-date muted">{{ item.startDate }} – {{ item.endDate }}</span>
      </span>
      <span class="position-company muted">{{ item.label }}</span>
      <span v-if="item.summary" class="position-summary">{{ item.summary }}</span>
      <span class="disclosure-toggle">Details</span>
    </summary>

    <ul class="position-responsibilities">
      <li v-for="(responsibility, index) in item.responsibilities" :key="index" class="position-responsibility-item">
        {{ responsibility }}
      </li>
    </ul>
  </details>
</template>

<script>
export default {
  name: "Company",
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="stylus">
.position-head {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.position-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
}

.position-name {
  font-size: 18px;
  font-weight: 650;
}

.position-date {
  flex-shrink: 0;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.position-company {
  font-size: 15px;
}

.position-summary {
  margin-top: 6px;
  font-size: 16px;
  line-height: 1.5;
  color: var(--tertiary-color);
}

.position-responsibilities {
  padding: 4px 0 8px 20px;
  list-style: disc;
  max-width: 75ch;
}

.position-responsibility-item {
  font-size: 15px;
  line-height: 1.55;
  color: var(--tertiary-color);
  margin-bottom: 8px;
}
</style>
