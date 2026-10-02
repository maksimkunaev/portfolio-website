<template>
  <div class="bio-root">
    <div class="bio-photo">
      <img :src="bio.photo" alt="" />
    </div>
    <h1 class="bio-name">{{ bio.name }}</h1>
    <p class="bio-occupation">{{ bio.occupation }}</p>
    <p class="bio-meta muted">{{ bio.location }}</p>
    <div class="bio-actions">
      <a class="btn btn-primary" :href="bio.contacts[0].link">Get in touch</a>
      <a v-for="social in bio.socials" :key="social.link" class="btn" :href="social.link" target="_blank">
        {{ social.label }}
      </a>
    </div>
  </div>
</template>

<script>
import { bio } from "~/constants/cv";

export default {
  name: "Bio",
  data() {
    return {
      bio,
    };
  },
};
</script>

<style lang="stylus" scoped>
.bio-root
  display flex
  flex-direction: column
  align-items: center;
  text-align: center;

.bio-photo
  width: 148px;
  height: 148px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid var(--quaternery-color);
  box-shadow: var(--primary-shadow);

.bio-photo img
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

.bio-name
  margin-top: 24px;
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;

  @media (max-width: $mobile-size)
    font-size: 34px;

.bio-occupation
  margin-top: 12px;
  font-size: 20px;
  font-weight: 500;

.bio-meta
  margin-top: 8px;
  font-size: 15px;

.bio-actions
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
</style>
