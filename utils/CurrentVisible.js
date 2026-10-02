import { sections } from "~/constants/cv";

const headerOffset = 140;

export default {
  data() {
    return {
      computedActiveTab: null,
    };
  },
  mounted() {
    this.updateActiveTab();
    window.addEventListener("scroll", this.updateActiveTab, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.updateActiveTab);
  },
  methods: {
    updateActiveTab() {
      let current = null;
      sections.forEach(({ link }) => {
        const element = document.getElementById(link);
        if (element && element.getBoundingClientRect().top <= headerOffset) {
          current = link;
        }
      });
      this.computedActiveTab = current;
    },
  },
};
