<template>
  <header class="site-nav">
    <NuxtLink to="/" class="site-brand">
      <img :src="bio.photo" alt="" />
      {{ bio.name }}
    </NuxtLink>
    <nav aria-label="Site">
      <ul>
        <li v-for="page in nav" :key="page.path">
          <NuxtLink :to="page.path">{{ page.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { bio, nav } from "~/constants/cv";

export default {
  name: "TheHeader",
  data() {
    return { bio, nav };
  },
};
</script>
