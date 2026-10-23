<template>
  <div>
    <header class="hero">
      <p class="small">{{ research.title }} · {{ research.period }}</p>
      <h1>{{ question }}</h1>
      <p class="muted">{{ questionRest }}</p>
    </header>

    <section class="section">
      <div class="label">Recorded run</div>
      <div class="body">
        <div class="run">
          <iframe :src="research.demo" title="Aion demo: a goal planned and executed in a 3D world" loading="lazy" />
        </div>
        <p class="small">
          {{ research.demoCaption }}
          <a :href="research.demo" target="_blank" class="more">Open full screen ↗</a>
        </p>
      </div>
    </section>

    <section class="section">
      <div class="label">Approach</div>
      <div class="body">
        <ul>
          <li v-for="(line, index) in research.approach" :key="index">{{ line }}</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="label">What worked</div>
      <div class="body">
        <ul>
          <li v-for="(line, index) in research.worked" :key="index">{{ line }}</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="label">Experiments</div>
      <div class="body">
        <div v-for="item in research.experiments" :key="item.name" class="item">
          <div class="top">
            <h3>{{ item.name }}</h3>
            <span class="verdict" :class="{ keep: item.verdict === 'Kept the lesson' || item.verdict === 'Current' }">{{ item.verdict }}</span>
          </div>
          <p class="muted">{{ item.did }}</p>
          <p>{{ item.result }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="label">What I rejected</div>
      <div class="body">
        <p v-for="(line, index) in research.rejected" :key="index">{{ line }}</p>
      </div>
    </section>

    <section class="section">
      <div class="label">Open</div>
      <div class="body">
        <p>{{ research.open }}</p>
        <a :href="research.link" target="_blank" class="more">GitHub ↗</a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { research } from "~/constants/cv";

useHead({ title: "Research — Maksim Kunaev" });

// The first sentence of the question is the headline; the rest sits under it.
const [question, questionRest] = research.question.split(/(?<=\?) /);
</script>
