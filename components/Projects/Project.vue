<template>
  <div class="card project-card" :class="{ 'alternate': alternate }">
    <div class="project-visual">
      <ImageSlider v-if="item.screenshots" :images="item.screenshots" :alt-prefix="item.title" />
    </div>

    <div class="project-info">
      <span class="project-date muted">{{ item.date }}</span>
      <h3 class="project-title">{{ item.title }}</h3>
      <p class="project-headline">{{ item.headline || item.problemStatement }}</p>

      <ul class="tag-list">
        <li v-for="(tech, index) in item.technologies" :key="index" class="tag">{{ tech }}</li>
      </ul>

      <details class="project-details">
        <summary class="disclosure-toggle">Problem, solution and impact</summary>

        <h4 class="project-label">Problem</h4>
        <p class="project-text">{{ item.problemStatement }}</p>

        <h4 class="project-label">Solution</h4>
        <ul class="project-list">
          <li v-for="(feature, index) in item.keyFeatures" :key="index">{{ feature }}</li>
        </ul>

        <template v-if="item.results">
          <h4 class="project-label">Impact</h4>
          <ul class="project-list">
            <li v-for="(result, index) in item.results" :key="index">{{ result }}</li>
          </ul>
        </template>
      </details>

      <a v-if="item.link" :href="item.link" target="_blank" class="btn project-link">
        View live project
      </a>
    </div>
  </div>
</template>

<script>
import ImageSlider from "~/components/ImageSlider/ImageSlider.vue";

export default {
  name: "ProjectCard",
  components: { ImageSlider },
  props: {
    item: {
      type: Object,
      required: true,
      validator: (value) => {
        return [
          'title',
          'problemStatement',
          'keyFeatures',
          'technologies'
        ].every(field => field in value)
      }
    },
    alternate: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="stylus" scoped>
.project-card {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 28px;
  padding: 24px;
  align-items: start;

  &.alternate {
    grid-template-columns: 1.1fr 0.9fr;

    .project-visual {
      order: 2;
    }
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;

    &.alternate {
      grid-template-columns: 1fr;

      .project-visual {
        order: 0;
      }
    }
  }
}

.project-visual {
  max-height: 420px;
  overflow: hidden;
  border-radius: 10px;
}

.project-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.project-date {
  font-size: 13px;
}

.project-title {
  margin-top: 4px;
  font-size: 22px;
  font-weight: 650;
  line-height: 1.25;
}

.project-headline {
  margin: 10px 0 16px;
  font-size: 17px;
  line-height: 1.45;
  color: var(--tertiary-color);
}

.project-details {
  margin-top: 10px;
  width: 100%;
}

.project-label {
  margin: 12px 0 6px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--secondary-color);
}

.project-text, .project-list {
  font-size: 15px;
  line-height: 1.55;
  color: var(--tertiary-color);
}

.project-list {
  padding-left: 20px;
  list-style: disc;

  li {
    margin-bottom: 6px;
  }
}

.project-link {
  margin-top: 16px;
}
</style>
