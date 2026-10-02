<template>
  <ul class="experience-list">
    <li
      v-for="company in companies"
      :key="company.label"
      class="experience-item"
    >
      <Position :item="company" />
    </li>
  </ul>
</template>

<script>
import { companies } from "~/constants/cv";
import Position from "./Position";

export default {
  name: "Experience",
  components: {
    Position,
  },
  data() {
    return {
      companies,
    };
  },
};
</script>

<style lang="stylus">
.experience-list
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 0 auto;
  flex-wrap wrap

.experience-list {
  list-style: none;
  padding: 0;
}

.experience-item {
  border-bottom: 1px solid var(--quaternery-color);
  padding: 20px 0 12px;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>
