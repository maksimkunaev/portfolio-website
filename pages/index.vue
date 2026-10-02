<template>
  <div class="index-page-container">
    <section v-for="section in sections" :id="section.link" :key="section.link" class="wrapper">
      <div class="component">
        <h2 v-if="section.heading" class="section-heading">{{ section.heading }}</h2>
        <component :is="section.componentName" />
      </div>
    </section>
  </div>
</template>

<script>
import { sections } from "~/constants/cv";

import Bio from '~/components/Bio/Bio.vue'
import About from '~/components/About/About.vue'
import Experience from '~/components/Experience/Experience.vue'
import Skills from '~/components/Skills/Skills.vue'
import Projects from '~/components/Projects/Projects.vue'
import Research from '~/components/Research/Research.vue'
import ClientWork from '~/components/ClientWork/ClientWork.vue'
import Writing from '~/components/Writing/Writing.vue'
import Contact from '~/components/Contact/Contact.vue'

export default {
  name: 'IndexPage',
  components: {
    Bio,
    About,
    Experience,
    Skills,
    Projects,
    Research,
    ClientWork,
    Writing,
    Contact,
  },
  data() {
    return {
      sections,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../assets/css/stylus-variables.styl"

.wrapper
  padding: 72px 24px 0;
  scroll-margin-top: 40px;

  &:first-child
    padding-top: 120px;

  &:nth-child(2)
    padding-top: 32px;

  @media (max-width: $mobile-size)
    padding: 56px 16px 0;

.component
  width: $layout-width;
  max-width: 100%;
  margin 0 auto
</style>
