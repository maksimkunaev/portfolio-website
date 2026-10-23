<template>
  <div class="item">
    <div class="top">
      <h3>{{ job.position }}</h3>
      <span class="when">{{ job.startDate }} – {{ job.endDate }}</span>
    </div>
    <div class="where">{{ job.label }} · {{ job.location }}</div>
    <p v-if="job.summary">{{ job.summary }}</p>
    <ul>
      <li v-for="(line, index) in job.responsibilities" :key="index">{{ line }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Job",
  props: {
    job: { type: Object, required: true },
  },
};
</script>
