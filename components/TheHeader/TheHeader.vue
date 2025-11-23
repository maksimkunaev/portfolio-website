<template>
  <div class="header-wrapper">
    <header class="header-root">
      <nav class="header-tabs">
        <a class="header-button header-S" :class="{ 'header-active': activeTab === section.link }"
          v-for="section in filteredSections" :key="section.link" :href="`/#${section.link}`"
          @click="handleTabClick($event, section.link)">
          {{ section.label }}
        </a>
      </nav>
      <Theme class="header-theme" />
    </header>
  </div>
</template>

<script>
import { sections } from "~/constants/cv";
import CurrentVisibleTab from "@/utils/CurrentVisible.js";
const preventObserverDelay = 800;

export default {
  name: "TheHeader",
  mixins: [CurrentVisibleTab],

  data() {
    return {
      sections,
      activeTab: "",
      isScrolling: false,
    };
  },
  methods: {
    handleTabClick(event, tabName) {
      if (this.$route.path === '/') {
        event.preventDefault();
        this.isScrolling = true;
        this.activeTab = tabName;

        document.getElementById(tabName)?.scrollIntoView({
          behavior: 'smooth'
        });

        setTimeout(() => {
          this.isScrolling = false;
        }, 800);
      }
    },
  },
  computed: {
    filteredSections() {
      return sections.filter((section) => section.showLink);
    },
  },
  watch: {
    computedActiveTab: {
      handler: function (tabName) {
        if (this.isScrolling) return;

        this.activeTab = tabName;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="stylus">
@import "../../assets/css/stylus-variables.styl"
.header-wrapper
  scrollbar(0)
  position sticky
  z-index: 99;
  font-family: sans-serif;
  
.header-root
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--quaternery-color);
  background-color: var(--opacity-bg-color);
  backdrop-filter: blur(10px);
  position: fixed;
  right: 0;
  left: 0;
  overflow auto
  z-index 9

.header-tabs
  display: flex;
  flex: 1;
  justify-content: center;
  margin-left 16px

.header-button
  padding: 24px 40px;

  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  color: var(--tertiary-color);
  border-bottom: 1px solid var(--tertiary-color);

  display: flex;
  align-items: center;
  justify-content: center;

  border-width: 0;
  opacity: 0.7;
  white-space: nowrap;

  transition: all 0.2s, opacity 0.2s;

  &:hover, &:focus {
    border-width: 1px;
    opacity: 1;
  }

  @media (max-width: $mobile-size) {
    padding: 16px;
  }

.header-active
  border-width: 1px;
  opacity: 1;

.header-theme
  position: relative;
  margin-right 16px
</style>
