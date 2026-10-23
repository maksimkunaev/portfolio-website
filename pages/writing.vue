<template>
  <div>
    <header class="hero">
      <p class="small">Article · {{ writing.status.toLowerCase() }}</p>
      <h1>{{ writing.title }}</h1>
      <p class="muted">{{ writing.lede }}</p>
    </header>

    <section class="section">
      <div class="label">Outline</div>
      <div class="body">
        <ol>
          <li v-for="(line, index) in writing.outline" :key="index">{{ line }}</li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script setup>
import { writing } from "~/constants/cv";

useHead({ title: "Writing — Maksim Kunaev" });
</script>
