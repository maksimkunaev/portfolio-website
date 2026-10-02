<template>
  <ul class="projects-list">
    <li v-for="(project, index) in projects" :key="project.title" class="projects-item"
      :class="{ 'alternate': index % 2 !== 0 }">
      <Project :item="project" :alternate="index % 2 !== 0" />
    </li>
  </ul>
</template>

<script>
import { projects as allProjects } from "~/constants/cv";
import Project from "./Project";

const projects = allProjects.filter((project) => !project.hidden);

export default {
  name: "Projects",
  components: {
    Project,
  },
  data() {
    return {
      projects,
    };
  },
};
</script>

<style lang="stylus">
.projects-list
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
</style>