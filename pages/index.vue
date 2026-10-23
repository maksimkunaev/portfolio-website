<template>
  <div>
    <header class="hero">
      <h1>{{ headline }} <em>{{ headlineAccent }}</em></h1>
      <p class="muted">{{ aboutFirst }}</p>
      <p class="small">{{ bio.location }} · <a :href="bio.contacts[0].link">{{ bio.contacts[0].label }}</a></p>
    </header>

    <section class="section">
      <div class="label">Experience</div>
      <div class="body">
        <div class="rows">
          <NuxtLink v-for="job in companies" :key="job.label + job.startDate" to="/experience/" class="row">
            <span class="title">{{ job.position }} · {{ job.label }}</span>
            <span class="when">{{ job.startDate }} – {{ job.endDate }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="label">Projects</div>
      <div class="body">
        <div class="rows">
          <NuxtLink to="/research/" class="row">
            <span class="title">{{ research.title }}</span>
            <span class="when">{{ research.period }}</span>
          </NuxtLink>
          <NuxtLink v-for="project in projects" :key="project.title" to="/projects/" class="row">
            <span class="title">{{ project.title }}</span>
            <span class="when">{{ project.date }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="label">Writing</div>
      <div class="body">
        <div class="rows">
          <NuxtLink to="/writing/" class="row">
            <span class="title">{{ writing.title }}</span>
            <span class="when">article · {{ writing.status.toLowerCase() }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="label">Contact</div>
      <div class="body">
        <div class="links">
          <a v-for="contact in bio.contacts" :key="contact.link" :href="contact.link">{{ contact.label }}</a>
          <a v-for="social in bio.socials" :key="social.link" :href="social.link" target="_blank">{{ social.label }} ↗</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { bio, linkedin, companies, research, projects as allProjects, writing } from "~/constants/cv";

const projects = allProjects.filter((project) => !project.hidden);

// The headline is bio.occupation; its last words carry the accent.
const headlineAccent = "end-to-end";
const headline = bio.occupation.replace(headlineAccent, "").trim();
const aboutFirst = linkedin.about.split("\n\n")[0];
</script>
