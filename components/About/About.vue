<template>
  <div class="about-root">
    <p class="about-intro">{{ bio.intro }}</p>
    <ul class="tag-list about-shipped">
      <li v-for="item in bio.shipped" :key="item" class="tag">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { bio } from "~/constants/cv";

export default {
  name: "About",
  data() {
    return {
      bio,
    };
  },
};
</script>

<style lang="stylus" scoped>
.about-root
  max-width: 680px;
  margin: 0 auto;
  text-align: center;

.about-intro
  font-size: 18px;
  line-height: 1.6;
  color: var(--tertiary-color);
  text-wrap: pretty;

.about-shipped
  margin-top: 24px;
  justify-content: center;
</style>
