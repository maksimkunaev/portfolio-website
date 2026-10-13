<template>
  <div class="cv-layout">
    <NuxtPage />
  </div>
</template>

<style>
/* Print-first layout: white page, no header, no background animation.
   Colors are fixed here on purpose, so the site theme never leaks into the PDF. */
.cv-layout {
  background: #ffffff;
  color: #1a1f2b;
  min-height: 100vh;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
</style>
