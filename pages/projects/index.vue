<template>
  <div>
    <header class="hero">
      <h1>Projects</h1>
    </header>

    <section class="section">
      <div class="label">Projects</div>
      <div class="body">
        <div class="item">
          <div class="top">
            <h3>{{ research.title }}</h3>
            <span class="when">{{ research.period }}</span>
          </div>
          <p>{{ research.summary }}</p>
          <NuxtLink to="/research/" class="more">Research →</NuxtLink>
        </div>

        <div v-for="project in projects" :key="project.title" class="item">
          <div class="top">
            <h3>{{ project.title }}</h3>
            <span class="when">{{ project.date }}</span>
          </div>
          <p>{{ project.headline }}</p>
          <p class="muted">{{ project.problemStatement }}</p>
          <ul>
            <li v-for="(feature, index) in project.keyFeatures" :key="index">{{ feature }}</li>
          </ul>
          <ul v-if="project.results">
            <li v-for="(result, index) in project.results" :key="index">{{ result }}</li>
          </ul>
          <p class="small">{{ project.technologies.join(" · ") }}</p>
          <a v-if="project.link" :href="project.link" target="_blank" class="more">View live project ↗</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { research, projects as allProjects } from "~/constants/cv";

useHead({ title: "Projects — Maksim Kunaev" });

const projects = allProjects.filter((project) => !project.hidden);
</script>
