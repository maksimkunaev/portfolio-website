<template>
  <div class="contacts-root">
    <p class="contacts-line">{{ bio.openTo }}</p>
    <div class="contacts-buttons">
      <a v-for="contact in bio.contacts" :key="contact.link" :href="contact.link" class="btn btn-primary">
        {{ contact.label }}
      </a>
      <a v-for="social in bio.socials" :key="social.link" :href="social.link" target="_blank" class="btn">
        {{ social.label }}
      </a>
    </div>
  </div>
</template>

<script>
import { bio } from "~/constants/cv";

export default {
  name: "Contact",
  data() {
    return {
      bio,
    };
  },
};
</script>

<style lang="stylus" scoped>
.contacts-line
  font-size: 18px;
  line-height: 1.5;
  color: var(--tertiary-color);
  max-width: 40em;

.contacts-buttons
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
</style>
