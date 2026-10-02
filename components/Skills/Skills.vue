<template>
  <dl class="skills-root">
    <div v-for="group in skillGroups" :key="group.label" class="skills-group">
      <dt class="skills-label muted">{{ group.label }}</dt>
      <dd>
        <ul class="tag-list">
          <li v-for="item in group.items" :key="item" class="tag">{{ item }}</li>
        </ul>
      </dd>
    </div>
  </dl>
</template>

<script>
import { skillGroups } from "~/constants/cv";

export default {
  name: "Skills",
  data() {
    return {
      skillGroups,
    };
  },
};
</script>

<style lang="stylus" scoped>
.skills-group
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--quaternery-color);

  &:last-child
    border-bottom: none;

  @media (max-width: 600px)
    grid-template-columns: 1fr;
    gap: 8px;

.skills-label
  font-size: 15px;
  padding-top: 3px;
</style>
