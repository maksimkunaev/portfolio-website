<template>
  <article class="cv">
    <header class="cv-head">
      <h1>{{ bio.name }}</h1>
      <p class="cv-title">{{ bio.occupation }}</p>
      <p class="cv-contact">
        <span>{{ bio.location }}</span>
        <span v-if="phone">{{ phone }}</span>
        <span>{{ email }}</span>
        <span>maksimkunaev.com</span>
        <span>github.com/maksimkunaev</span>
        <span>linkedin.com/in/maksim-k-1a9451163</span>
      </p>
    </header>

    <section class="cv-section">
      <h2>Summary</h2>
      <p v-for="(para, i) in summary" :key="i" class="cv-para">{{ para }}</p>
    </section>

    <section class="cv-section">
      <h2>Skills</h2>
      <dl class="cv-skills">
        <template v-for="group in skillGroups" :key="group.label">
          <dt>{{ group.label }}</dt>
          <dd>{{ group.items.join(", ") }}</dd>
        </template>
      </dl>
    </section>

    <section class="cv-section">
      <h2>Experience</h2>
      <div v-for="job in companies" :key="job.label + job.startDate" class="cv-job">
        <div class="cv-job-head">
          <span class="cv-job-title">{{ job.position }}</span>
          <span class="cv-job-where">· {{ job.label }} · {{ job.location }}</span>
          <span class="cv-job-dates">{{ job.startDate }} – {{ job.endDate }}</span>
        </div>
        <ul>
          <li v-for="(line, i) in job.responsibilities" :key="i">{{ line }}</li>
        </ul>
      </div>
    </section>

    <section class="cv-section">
      <h2>Research</h2>
      <div class="cv-job">
        <div class="cv-job-head">
          <span class="cv-job-title">{{ research.title }}</span>
          <span class="cv-job-where">· maksimkunaev.com/#research</span>
          <span class="cv-job-dates">{{ research.period }}</span>
        </div>
        <p class="cv-para">{{ researchLine }}</p>
      </div>
    </section>

    <section class="cv-section">
      <h2>Education</h2>
      <p class="cv-para" v-for="e in education" :key="e.institution">
        {{ e.institution }} — {{ e.degree }}, {{ e.endDate }}
      </p>
    </section>
  </article>
</template>

<script setup>
import { bio, bioDescription, companies, skillGroups, research, education, contacts } from "~/constants/cv";

definePageMeta({ layout: "cv" });
useHead({ title: `${bio.name} — CV`, htmlAttrs: { class: "cv-page" } });

// The phone number is not stored in the repo: pass it at print time as ?phone=...
// so the public /cv page stays without it and only the PDF carries it.
const route = useRoute();
const phone = route.query.phone || "";
const email = contacts[0].label;

const summary = bioDescription.split("\n\n");
const researchLine =
  "Side research since 2024: the world is executable code that judges the model, and every answer is a trace. " +
  "Six experiments, each with a verdict; the current one accepts candidate rules only by execution, in a 3D world. " +
  "Live demo on the site.";
</script>

<style>
html.cv-page, html.cv-page body { background: #ffffff; }
.cv {
  max-width: 820px;
  margin: 0 auto;
  padding: 40px 32px 56px;
  font-size: 10.6pt;
  line-height: 1.42;
}
.cv h1 { font-size: 22pt; font-weight: 700; margin: 0 0 2px; letter-spacing: -0.01em; }
.cv-title { font-size: 11.5pt; color: #2a3346; margin: 0 0 4px; }
.cv-contact { margin: 0; color: #4a5468; font-size: 9.6pt; display: flex; flex-wrap: wrap; gap: 0 6px; }
.cv-contact span + span::before { content: "·"; margin-right: 6px; color: #9aa3b5; }

.cv-section { margin-top: 14px; break-inside: auto; }
.cv h2 {
  font-size: 9.2pt; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700;
  color: #1a1f2b; border-bottom: 1px solid #d5dae4; padding-bottom: 3px; margin: 0 0 7px;
}
.cv-para { margin: 0 0 6px; }

.cv-skills { display: grid; grid-template-columns: 92px 1fr; gap: 3px 12px; margin: 0; }
.cv-skills dt { font-weight: 600; color: #2a3346; }
.cv-skills dd { margin: 0; }

.cv-job { margin-bottom: 9px; break-inside: avoid; }
.cv-job-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 6px; margin-bottom: 2px; }
.cv-job-title { font-weight: 700; }
.cv-job-where { color: #4a5468; }
.cv-job-dates { margin-left: auto; color: #4a5468; font-variant-numeric: tabular-nums; }
.cv ul { margin: 0; padding-left: 16px; list-style: disc; }
.cv li { margin: 0 0 2px; }

@page { size: A4; margin: 12mm 13mm; }
@media print {
  .cv { max-width: none; padding: 0; font-size: 10pt; }
  a { color: inherit; text-decoration: none; }
}
</style>
