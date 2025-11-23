<!-- pages/projects/neuro-orb.vue -->
<template>
    <div class="project-page">
        <div class="project-header">
            <h1>Interactive NeuroOrb Visualization</h1>
            <p class="tech-stack">Three.js • WebGL • Particle Systems</p>
        </div>

        <NeuroOrbWrapper />

        <div class="project-details">
            <h2>About</h2>
            <p>Interactive 3D particle network visualization built with Three.js. Features dynamic connections, mouse
                interaction, and smooth animations.</p>

            <div class="links">
                <a href="https://github.com/maksimkunaev/neuro-orb" target="_blank">GitHub</a>
                <a href="/projects/neuro-orb">Live Demo</a>
            </div>
        </div>
    </div>
</template>

<script>
import NeuroOrbWrapper from '~/components/NeuroOrb/NeuroOrbWrapper.vue'

export default {
    components: { NeuroOrbWrapper }
}
</script>

<style scoped>
.project-page {
    min-height: 100vh;
    padding: 120px 24px 48px;
}

.project-header {
    text-align: center;
    margin-bottom: 48px;
}

.tech-stack {
    color: #888;
    margin-top: 8px;
}

.project-details {
    max-width: 800px;
    margin: 48px auto;
}

.links {
    display: flex;
    gap: 16px;
    margin-top: 24px;
}

.links a {
    padding: 12px 24px;
    background: var(--accent-color);
    border-radius: 4px;
    text-decoration: none;
}
</style>