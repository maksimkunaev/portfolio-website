<template>
  <div>
    <header class="hero">
      <h1>Experience</h1>
      <div class="about">
        <p v-for="(paragraph, index) in about" :key="index">{{ paragraph }}</p>
      </div>
    </header>

    <section class="section">
      <div class="label">{{ freelance.label }}</div>
      <div class="body">
        <Job :job="freelance" />
      </div>
    </section>

    <section class="section">
      <div class="label">Freelance projects in detail</div>
      <div class="body">
        <div v-for="item in clientWork.items" :key="item.title" class="item">
          <div class="top">
            <h3>{{ item.title }}</h3>
            <span class="when">{{ item.period }}</span>
          </div>
          <p class="muted">{{ item.what }}</p>
          <p>{{ item.built }}</p>
        </div>
        <blockquote v-for="quote in clientWork.quotes" :key="quote">
          “{{ quote }}”
          <footer>client review</footer>
        </blockquote>
      </div>
    </section>

    <section class="section">
      <div class="label">Earlier</div>
      <div class="body">
        <Job v-for="job in earlier" :key="job.label + job.startDate" :job="job" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { linkedin, companies, clientWork } from "~/constants/cv";
import Job from "~/components/Job.vue";

useHead({ title: "Experience — Maksim Kunaev" });

// The LinkedIn About without its last line (location and open-to), which the front page carries.
const about = linkedin.about.split("\n\n").slice(0, -1);
const [freelance, ...earlier] = companies;
</script>
