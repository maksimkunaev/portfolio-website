<template>
  <svg class="work-visual" viewBox="0 0 320 180" role="img" :aria-label="label">
    <defs>
      <!-- the AI agent: the same figure in every diagram -->
      <g id="wv-agent">
        <line class="ln" x1="0" y1="-16" x2="0" y2="-24" />
        <circle class="dot" cx="0" cy="-26" r="2.5" />
        <rect class="box" x="-19" y="-16" width="38" height="32" rx="9" />
        <circle class="eye" cx="-7" cy="-2" r="2.8" />
        <circle class="eye" cx="7" cy="-2" r="2.8" />
        <line class="ln" x1="-6" y1="8" x2="6" y2="8" />
      </g>
      <marker id="wv-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M1 1 L9 5 L1 9" class="arrowhead" />
      </marker>
    </defs>

    <!-- AI agent -> TV frame -->
    <g v-if="kind === 'video'">
      <use href="#wv-agent" x="62" y="92" />
      <path class="flow" d="M90 92 H150" marker-end="url(#wv-arrow)" />
      <rect class="box" x="160" y="42" width="124" height="80" rx="8" />
      <path class="play" d="M212 68 L236 82 L212 96 Z" />
      <line class="ln" x1="222" y1="122" x2="222" y2="136" />
      <line class="ln" x1="196" y1="137" x2="248" y2="137" />
    </g>

    <!-- AI agent reaches for its tools -->
    <g v-else-if="kind === 'tools'">
      <use href="#wv-agent" x="70" y="90" />
      <path class="ln" d="M90 84 C140 84 160 40 222 40" />
      <path class="flow" d="M90 90 H222" marker-end="url(#wv-arrow)" />
      <path class="ln" d="M90 96 C140 96 160 140 222 140" />
      <g v-for="y in [22, 72, 122]" :key="y">
        <rect class="box" :class="{ on: y === 72 }" x="230" :y="y" width="36" height="36" rx="9" />
      </g>
      <text class="glyph" x="248" y="44">{ }</text>
      <!-- wrench -->
      <path class="ln on" d="M254 82 a6 6 0 1 0 2 8 l-4 -1 l-1 -4 z M250 91 L241 100" />
      <!-- database -->
      <ellipse class="ln" cx="248" cy="133" rx="8" ry="3" />
      <path class="ln" d="M240 133 V147 A8 3 0 0 0 256 147 V133" />
    </g>

    <!-- chat window on top, retrieved files underneath -->
    <g v-else-if="kind === 'rag'">
      <rect class="box" x="92" y="12" width="136" height="64" rx="9" />
      <rect class="bubble" x="150" y="22" width="66" height="12" rx="6" />
      <rect class="bubble on" x="104" y="42" width="92" height="12" rx="6" />
      <rect class="bubble on" x="104" y="58" width="56" height="8" rx="4" />
      <rect class="box dashed" x="38" y="112" width="244" height="56" rx="9" />
      <g v-for="(x, index) in [56, 102, 148, 194, 240]" :key="x">
        <path class="file" :class="{ on: index === 1 || index === 3 }"
          :d="`M${x} 122 h16 l8 8 v28 h-24 z M${x + 16} 122 v8 h8`" />
        <line class="ln thin" :class="{ on: index === 1 || index === 3 }" :x1="x + 5" y1="140" :x2="x + 19" y2="140" />
        <line class="ln thin" :class="{ on: index === 1 || index === 3 }" :x1="x + 5" y1="147" :x2="x + 15" y2="147" />
      </g>
      <path class="flow" d="M114 120 C114 100 160 104 160 80" />
      <path class="flow" d="M206 120 C206 100 160 104 160 80" marker-end="url(#wv-arrow)" />
    </g>

    <!-- code -> prod, and a line that stays flat -->
    <g v-else-if="kind === 'extension'">
      <rect class="box" x="36" y="34" width="72" height="52" rx="9" />
      <text class="glyph" x="72" y="65">&lt;/&gt;</text>
      <path class="flow" d="M116 60 H204" marker-end="url(#wv-arrow)" />
      <rect class="box on" x="212" y="34" width="72" height="52" rx="9" />
      <path class="check" d="M236 60 l8 8 l16 -17" />
      <line class="ln thin" x1="36" y1="150" x2="284" y2="150" />
      <path class="flow steady" d="M36 124 H284" />
      <text class="caption" x="160" y="113">stable in production</text>
    </g>

    <!-- a trend chart, and the agent looking at it -->
    <g v-else-if="kind === 'trading'">
      <rect class="box" x="24" y="28" width="176" height="124" rx="9" />
      <line class="ln thin" x1="36" y1="64" x2="188" y2="64" />
      <line class="ln thin" x1="36" y1="96" x2="188" y2="96" />
      <line class="ln thin" x1="36" y1="128" x2="188" y2="128" />
      <path class="trend" d="M38 126 L62 110 L82 118 L104 88 L124 98 L148 66 L166 74 L186 46" />
      <circle class="eye" cx="186" cy="46" r="3.5" />
      <path class="ln dashed" d="M236 86 L194 52" />
      <use href="#wv-agent" x="258" y="100" />
      <circle class="dot" cx="268" cy="62" r="2" />
      <circle class="dot" cx="276" cy="52" r="3" />
      <circle class="dot" cx="287" cy="40" r="4" />
    </g>

    <!-- artwork in, classification out -->
    <g v-else-if="kind === 'mobile'">
      <rect class="box" x="34" y="30" width="92" height="120" rx="6" />
      <rect class="ln thin" x="42" y="38" width="76" height="104" rx="3" />
      <!-- vase -->
      <path class="ln on" d="M72 60 h16 M74 60 c0 12 -12 18 -12 36 c0 16 8 24 18 24 c10 0 18 -8 18 -24 c0 -18 -12 -24 -12 -36" />
      <path class="flow" d="M136 90 H184" marker-end="url(#wv-arrow)" />
      <rect class="box" x="194" y="42" width="96" height="96" rx="9" />
      <g v-for="(row, index) in [[62, 64], [84, 40], [106, 24]]" :key="row[0]">
        <circle class="dot" :class="{ on: index === 0 }" cx="208" :cy="row[0]" r="3" />
        <rect class="bar" :class="{ on: index === 0 }" x="218" :y="row[0] - 4" :width="row[1]" height="8" rx="4" />
      </g>
      <path class="check" d="M262 116 l5 5 l10 -11" />
    </g>

    <!-- one rule: a state goes in, a changed state comes out -->
    <g v-else-if="kind === 'rule'">
      <line class="ln" x1="40" y1="64" x2="76" y2="64" />
      <line class="ln" x1="40" y1="64" x2="58" y2="112" />
      <line class="ln" x1="76" y1="64" x2="58" y2="112" />
      <circle class="node" cx="40" cy="64" r="8" />
      <circle class="node" cx="76" cy="64" r="8" />
      <circle class="node" cx="58" cy="112" r="8" />
      <text class="caption" x="58" y="146">state</text>

      <path class="flow" d="M92 88 H106" marker-end="url(#wv-arrow)" />
      <rect class="box on" x="114" y="66" width="92" height="44" rx="9" />
      <text class="glyph small" x="160" y="92">if → then</text>
      <text class="caption" x="160" y="146">rule</text>
      <path class="flow" d="M214 88 H228" marker-end="url(#wv-arrow)" />

      <line class="ln" x1="244" y1="64" x2="280" y2="64" />
      <line class="ln" x1="244" y1="64" x2="262" y2="112" />
      <line class="ln on" x1="280" y1="64" x2="262" y2="112" />
      <circle class="node" cx="244" cy="64" r="8" />
      <circle class="node" cx="280" cy="64" r="8" />
      <circle class="node on" cx="262" cy="112" r="8" />
      <text class="caption" x="262" y="146">new state</text>
    </g>
  </svg>
</template>

<script>
// Line diagrams for the work cards and the article cover. One visual language: grey lines for the
// system, the accent colour for the path the data takes.
export default {
  name: "WorkVisual",
  props: {
    kind: { type: String, required: true },
    label: { type: String, default: "" },
  },
};
</script>

<style lang="stylus" scoped>
.work-visual
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  border: 1px solid var(--quaternery-color);
  background: rgba(255, 255, 255, 0.02);

.ln, .box, .file, .flow, .trend, .check, .arrowhead
  fill: none;
  stroke: var(--secondary-color);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;

.box
  fill: rgba(255, 255, 255, 0.03);

.thin
  stroke-width: 1;
  opacity: 0.45;

.dashed
  stroke-dasharray: 4 4;

.on, .flow, .trend, .check, .arrowhead
  stroke: var(--accent-color);

.flow
  stroke-dasharray: 5 5;
  animation: wv-flow 1.2s linear infinite;

.steady
  stroke-dasharray: none;
  animation: none;
  stroke-width: 2;

.trend, .check
  stroke-width: 2;

.eye, .play
  fill: var(--accent-color);

.dot
  fill: var(--secondary-color);

.node
  fill: var(--secondary-bg-color);
  stroke: var(--secondary-color);
  stroke-width: 1.5;

.node.on
  fill: var(--accent-color);
  stroke: var(--accent-color);

.bubble, .bar
  fill: var(--secondary-color);
  opacity: 0.35;

.bubble.on, .bar.on, .dot.on
  fill: var(--accent-color);
  opacity: 0.85;

.glyph, .caption
  fill: var(--tertiary-color);
  font-size: 15px;
  font-weight: 600;
  text-anchor: middle;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;

.glyph.small
  font-size: 13px;

.caption
  font-size: 11px;
  font-weight: 500;
  fill: var(--secondary-color);
  font-family: inherit;

@keyframes wv-flow
  to
    stroke-dashoffset: -10;

@media (prefers-reduced-motion: reduce)
  .flow
    animation: none;
</style>
