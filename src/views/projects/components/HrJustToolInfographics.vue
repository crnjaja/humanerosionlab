<template>
  <div class="hrjust-content hrjust-infographics">
    <!-- Sticky toolbar: ONLY tabs (+ optional menu toggle). KPIs moved below. -->
    <div
      ref="chartsTopEl"
      class="hrjust-ig-toolbar"
      role="region"
      aria-label="Infographic families"
    >
      <div class="hrjust-ig-tabsWrap">
        <nav ref="tabsEl" class="hrjust-ig-tabs" role="tablist" aria-label="Infographic families">
          <button
            v-for="f in families"
            :key="f.id"
            class="hrjust-ig-tab"
            role="tab"
            type="button"
            :aria-selected="activeFamily === f.id"
            :data-family="f.id"
            @click="setFamily(f.id)"
          >
            {{ f.label }}
          </button>

          <span class="hrjust-ig-indicator" aria-hidden="true" :style="indicatorStyle"></span>
        </nav>
      </div>

      <!-- Menu toggle kept, but compact so tabs keep space -->
      <button class="hrjust-ig-toggle" type="button" :aria-pressed="isSideOpen" @click="toggleSide">
        <span class="hrjust-ig-toggle__icon" aria-hidden="true">{{ isSideOpen ? '⟨' : '⟩' }}</span>
        <span class="hrjust-ig-toggle__label">{{
          isSideOpen ? 'Collapse menu' : 'Expand menu'
        }}</span>
      </button>
    </div>

    <!-- KPIs moved out of toolbar so tabs have room -->
    <div class="hrjust-ig-kpisRow" aria-live="polite" aria-atomic="true">
      <span class="hrjust-ig-kpi">
        <span class="hrjust-ig-kpi__label">Years</span>
        <span class="hrjust-ig-kpi__value">{{ years[0] }} – {{ years[years.length - 1] }}</span>
      </span>
      <span class="hrjust-ig-kpi">
        <span class="hrjust-ig-kpi__label">Cases</span>
        <span class="hrjust-ig-kpi__value">285 documented</span>
      </span>
    </div>

    <!-- Two-column: subnav + stage -->
    <div class="hrjust-ig-body" :class="{ 'is-collapsed': !isSideOpen }">
      <!-- Left: sub navigation -->
      <aside v-show="isSideOpen" class="hrjust-ig-side" aria-label="Chart views">
        <div class="hrjust-ig-subnav">
          <button
            v-for="s in activeSubnav"
            :key="s.id"
            class="hrjust-ig-sub"
            type="button"
            :class="{ 'is-active': activeSub === s.id }"
            @click="setSub(s.id)"
          >
            <span class="hrjust-ig-sub__mark" aria-hidden="true"></span>
            <span class="hrjust-ig-sub__text">
              <span class="hrjust-ig-sub__title">{{ s.title }}</span>
              <span class="hrjust-ig-sub__desc">{{ s.desc }}</span>
            </span>
            <span class="hrjust-ig-sub__chev" aria-hidden="true">›</span>
          </button>
        </div>
      </aside>

      <!-- Right: chart stage -->
      <main class="hrjust-ig-main">
        <!-- CIVIL -->
        <section
          v-show="activeFamily === 'civil'"
          class="hrjust-ig-pane"
          aria-label="Civil Society charts"
        >
          <div v-show="activeSub === 'civil-bar'" class="hrjust-ig-chart">
            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--tall">
              <canvas ref="civilStackedEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              Stacked bars show, for each year (2009–2025), the
              <span class="accent">number of cases</span>
              involving civil society, split by category. Total bar height = sum of categories for
              that year. A case may appear in multiple categories. X-axis: year. Y-axis: counts.
              Tooltips compare category shares within the same year.
            </ChartCaption>
          </div>

          <div v-show="activeSub === 'civil-area'" class="hrjust-ig-chart">
            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--tall">
              <canvas ref="civilAreaEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              One line per civil-society category (2009–2025), showing the
              <span class="accent">annual count of occurrences</span>. X-axis: year. Y-axis: counts.
              Tooltips reveal exact values for each series and year.
            </ChartCaption>
          </div>

          <div v-show="activeSub === 'civil-amicus'" class="hrjust-ig-chart">
            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--tall">
              <canvas ref="civilAmicusEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              Two measures per year: <span class="accent">bars</span> = number of cases with ≥1
              amicus; <span class="accent">line</span> = total amicus briefs filed across all cases.
              The line can exceed the bars because one case may have multiple amici. Tooltip
              summarizes: “X cases, Y total amicus.”
            </ChartCaption>
          </div>
        </section>

        <!-- RIGHTS -->
        <section
          v-show="activeFamily === 'rights'"
          class="hrjust-ig-pane"
          aria-label="Invoked Rights charts"
        >
          <div v-show="activeSub === 'rights-horizontal'" class="hrjust-ig-chart">
            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--tall">
              <canvas ref="rightsBarEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              Ranking of the <span class="accent">most frequently invoked rights</span>. Each bar is
              the number of cases where that right was cited (a case can cite multiple rights).
              X-axis: number of cases. Y-axis: right label. Tooltip shows “N cases.”
            </ChartCaption>
          </div>

          <div v-show="activeSub === 'rights-radar'" class="hrjust-ig-chart">
            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--square">
              <canvas ref="rightsRadarEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              Radar shows the <span class="accent">relative balance</span> of invoked rights.
              Display values use a <em>square-root transform</em> for readability; tooltips show
              original counts. Center = 0. Labels wrap across lines for clarity.
            </ChartCaption>
          </div>
        </section>

        <!-- JUSTIFICATION -->
        <section
          v-show="activeFamily === 'justification'"
          class="hrjust-ig-pane"
          aria-label="Justification charts"
        >
          <div v-show="activeSub === 'just-polar'" class="hrjust-ig-chart">
            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--square">
              <canvas ref="justPolarEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              Polar area comparing <span class="accent">justification typologies</span>. Sector area
              is proportional to the number of cases in each typology; tooltips show exact counts.
            </ChartCaption>
          </div>

          <div v-show="activeSub === 'just-rings'" class="hrjust-ig-chart">
            <div
              class="hrjust-ig-overlayNote"
              role="note"
              aria-label="Provisional sub-typology data"
            >
              <span class="hrjust-ig-overlayNote__icon" aria-hidden="true">!</span>
              <span
                >Sub-typology figures are illustrative only. Final data pending validation.</span
              >
            </div>

            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--square">
              <canvas ref="justRingsEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              Two concentric rings: the <span class="accent">outer ring</span> shows the three main
              typologies (case counts); the <span class="accent">inner ring</span> splits each
              typology into sub-typologies (lighter tints). Tooltips display “Parent › Sub-typology”
              for inner slices, and totals for outer slices.
            </ChartCaption>
          </div>
        </section>

        <!-- INSTRUMENTS -->
        <section
          v-show="activeFamily === 'instruments'"
          class="hrjust-ig-pane"
          aria-label="Instruments charts"
        >
          <div v-show="activeSub === 'instruments-bar'" class="hrjust-ig-chart">
            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--tall">
              <canvas ref="instrumentsLollipopEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              Horizontal “lollipop” ranking of <span class="accent">legal instruments</span> by
              occurrences (n = 285 mentions). Dots mark counts; dashed stems trace to zero; labels
              show exact values. Tooltip gives the instrument name and its count.
            </ChartCaption>
          </div>

          <div v-show="activeSub === 'instruments-bubble'" class="hrjust-ig-chart">
            <div class="hrjust-ig-chart__canvas hrjust-ig-chart__canvas--tall">
              <canvas ref="instrumentsBubbleEl"></canvas>
            </div>

            <!-- ✅ EXPLANATORY TEXT -->
            <ChartCaption title="How to read this chart">
              Each bubble is an instrument positioned by <span class="accent">occurrences</span> (X)
              and <span class="accent">share of all mentions</span> (Y). Bubble size scales with
              occurrences. Tooltip reports: “Name — X occurrences • Y% share.”
            </ChartCaption>
          </div>
        </section>

        <div v-if="!activeFamily || !activeSub" class="hrjust-empty">
          <div class="hrjust-empty__title">Choose a chart</div>
          <p class="hrjust-empty__text">Select a family and a view on the left.</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  defineComponent,
  h,
} from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

/**
 * ✅ FIXED: Real component (no runtime template string)
 * This guarantees slots render (your explanatory text).
 */
const ChartCaption = defineComponent({
  name: 'ChartCaption',
  props: { title: { type: String, default: '' } },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'hrjust-ig-caption', role: 'note', 'aria-label': 'Chart explanation' }, [
        h('div', { class: 'hrjust-ig-caption__icon', 'aria-hidden': 'true' }, 'i'),
        h('div', { class: 'hrjust-ig-caption__text' }, [
          h('div', { class: 'hrjust-ig-caption__title' }, props.title),
          h('div', { class: 'hrjust-ig-caption__body' }, slots.default ? slots.default() : ''),
        ]),
      ])
  },
})

/* =========================
   State
   ========================= */
const families = [
  { id: 'civil', label: 'Civil Society' },
  { id: 'rights', label: 'Invoked Rights' },
  { id: 'justification', label: 'Justification Typology' },
  { id: 'instruments', label: 'Instruments' },
]

const subnav = {
  civil: [
    { id: 'civil-bar', title: 'Engagement Distribution', desc: 'Stacked counts per year' },
    { id: 'civil-area', title: 'Engagement Trends', desc: 'Multi-series time trends' },
    { id: 'civil-amicus', title: 'Amicus Curiae Focus', desc: 'Cases vs. total amici' },
  ],
  rights: [
    { id: 'rights-horizontal', title: 'Rights Distribution', desc: 'Horizontal ranking' },
    { id: 'rights-radar', title: 'Rights Balance', desc: 'Scaled radar view' },
  ],
  justification: [
    { id: 'just-polar', title: 'Typologies Distribution', desc: 'Polar area' },
    { id: 'just-rings', title: 'Subtypologies Distribution', desc: 'Nested rings' },
  ],
  instruments: [
    { id: 'instruments-bar', title: 'Instruments Comparison', desc: 'Lollipop ranking' },
    { id: 'instruments-bubble', title: 'Instruments Shares', desc: 'Bubble (occ. vs share)' },
  ],
}

const activeFamily = ref('civil')
const activeSub = ref('civil-bar')
const activeSubnav = computed(() => subnav[activeFamily.value] ?? [])

/* Sidebar open/close */
const isSideOpen = ref(true)
function toggleSide() {
  isSideOpen.value = !isSideOpen.value
  nextTick(() => {
    moveIndicator()
    resizeCharts(true)
  })
}

/* =========================
   Refs
   ========================= */
const chartsTopEl = ref(null)
const tabsEl = ref(null)

const civilStackedEl = ref(null)
const civilAreaEl = ref(null)
const civilAmicusEl = ref(null)

const rightsBarEl = ref(null)
const rightsRadarEl = ref(null)

const justPolarEl = ref(null)
const justRingsEl = ref(null)

const instrumentsLollipopEl = ref(null)
const instrumentsBubbleEl = ref(null)

/* =========================
   Indicator (tab underline)
   ========================= */
const indicator = reactive({ left: 0, width: 40 })
const indicatorStyle = computed(() => ({
  width: `${indicator.width}px`,
  transform: `translateX(${indicator.left}px)`,
}))

function moveIndicator() {
  const tabs = tabsEl.value
  if (!tabs) return
  const btn = tabs.querySelector(`.hrjust-ig-tab[aria-selected="true"]`)
  if (!btn) return

  const btnRect = btn.getBoundingClientRect()
  const tabsRect = tabs.getBoundingClientRect()
  indicator.left = Math.round(btnRect.left - tabsRect.left + tabs.scrollLeft)
  indicator.width = Math.round(btnRect.width)
}

/* =========================
   Actions
   ========================= */
function setFamily(id) {
  activeFamily.value = id
  const first = subnav[id]?.[0]?.id
  activeSub.value = first || ''
  nextTick(() => {
    moveIndicator()
    buildChartsIfNeeded()
    resizeCharts(true)
  })
}

function setSub(id) {
  activeSub.value = id
  nextTick(() => {
    buildChartsIfNeeded()
    resizeCharts(true)
  })
}

/* =========================
   Data
   ========================= */
const rightsLabels = [
  'Right to life',
  'Right to a healthy environment',
  'Right to health',
  'Rights of Indigenous Peoples',
  "Children's rights",
  'Rights of Future Generations',
  'Right to participation',
  'Right to access to information',
  'Right to private and family life',
  'Right to property',
  'Right to equality, non-discrimination',
  'Right to development',
  'Freedom of expression',
  'Right to remedy, access to justice',
  'Right to water',
  'Right to food, food sovereignty',
  'Human dignity',
  'Right to housing, adequate shelter',
  'Freedom of occupation',
]
const rightsCases = [102, 133, 38, 27, 11, 19, 12, 11, 41, 30, 34, 4, 4, 10, 8, 13, 19, 9, 12]

const years = Array.from({ length: 2025 - 2009 + 1 }, (_, i) => 2009 + i)

const rawCivilKnown = {
  amicus: [0, 0, 0, 0, 2, 0, 4, 3, 2, 3, 3, 7, 5, 4, 1, 0, 0],
  ngosClaimants: [1, 0, 1, 0, 3, 1, 1, 3, 4, 5, 6, 14, 21, 16, 17, 8, 1],
  supported: [0, 1, 0, 1, 0, 1, 2, 1, 1, 4, 8, 10, 15, 14, 4, 6, 0],
  public: [1, 0, 1, 0, 0, 2, 1, 1, 1, 4, 1, 6, 5, 3, 4, 2, 0],
  strategic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 17, 3, 0, 2, 0],
  youthActivism: [0, 0, 0, 0, 0, 0, 1, 2, 3, 3, 3, 7, 15, 6, 4, 3, 0],
}

const dsCivilLines = [
  {
    label: 'Amicus Curiae',
    data: rawCivilKnown.amicus,
    borderColor: '#ae0c36',
    backgroundColor: 'rgba(174, 12, 54, 0.12)',
  },
  {
    label: 'NGOs as Claimants',
    data: rawCivilKnown.ngosClaimants,
    borderColor: '#002d47',
    backgroundColor: 'rgba(0, 45, 71, 0.12)',
  },
  {
    label: 'Supported by NGOs',
    data: rawCivilKnown.supported,
    borderColor: '#205072',
    backgroundColor: 'rgba(32, 80, 114, 0.12)',
  },
  {
    label: 'Public support',
    data: rawCivilKnown.public,
    borderColor: '#5DA6A7',
    backgroundColor: 'rgba(93, 166, 167, 0.12)',
  },
  {
    label: 'Strategic Litigation',
    data: rawCivilKnown.strategic,
    borderColor: '#32936F',
    backgroundColor: 'rgba(50, 147, 111, 0.12)',
  },
  {
    label: 'Youth Activism',
    data: rawCivilKnown.youthActivism,
    borderColor: '#FFD166',
    backgroundColor: 'rgba(255, 209, 102, 0.20)',
  },
].map((d) => ({ ...d, fill: false, tension: 0.35 }))

const justificationLabels = ['Promotive', 'Defensive', 'Boundaries-checking']
const justificationData = [30, 96, 39] // placeholder

const instrumentRaw = [
  { label: 'Paris Agreement', occurrences: 123 },
  { label: 'European Convention on Human Rights', occurrences: 43 },
  { label: 'United Nations Framework Convention on Climate Change', occurrences: 29 },
  { label: 'Energy Charter Treaty', occurrences: 18 },
  { label: 'Charter of Fundamental Rights of the European Union', occurrences: 16 },
  { label: 'International Labour Organization Conventions', occurrences: 14 },
  { label: 'Inter-American Convention on Human Rights', occurrences: 11 },
  { label: 'Kyoto Protocol', occurrences: 9 },
  { label: 'International Covenant on Economic, Social and Cultural Rights', occurrences: 21 },
  { label: 'Rio Declaration', occurrences: 7 },
].sort((a, b) => b.occurrences - a.occurrences)

/* =========================
   Chart instances
   ========================= */
const charts = reactive({
  civilStacked: null,
  civilArea: null,
  civilAmicus: null,
  rightsBar: null,
  rightsRadar: null,
  justPolar: null,
  justRings: null,
  instrumentsLollipop: null,
  instrumentsBubble: null,
})

function destroyChart(key) {
  if (charts[key]) {
    charts[key].destroy()
    charts[key] = null
  }
}
function destroyAll() {
  Object.keys(charts).forEach((k) => destroyChart(k))
}

/* Helpers */
function wrapLabel(label, maxLen = 16) {
  const words = String(label).split(' ')
  const lines = []
  let cur = []
  let len = 0
  for (const w of words) {
    const add = (len ? 1 : 0) + w.length
    if (len + add <= maxLen) {
      cur.push(w)
      len += add
    } else {
      lines.push(cur.join(' '))
      cur = [w]
      len = w.length
    }
  }
  if (cur.length) lines.push(cur.join(' '))
  return lines
}
function withAlpha(hex, a) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!m) return hex
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  return `rgba(${r},${g},${b},${a})`
}
function baseOptions() {
  return { responsive: true, maintainAspectRatio: false }
}

/* =========================
   Build charts (lazy)
   ========================= */
function buildChartsIfNeeded() {
  Chart.defaults.plugins.tooltip.boxPadding = 4

  if (!charts.civilStacked && civilStackedEl.value) {
    charts.civilStacked = new Chart(civilStackedEl.value.getContext('2d'), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          { label: 'Amicus Curiae', data: rawCivilKnown.amicus, backgroundColor: '#ae0c36' },
          {
            label: 'NGOs as Claimants',
            data: rawCivilKnown.ngosClaimants,
            backgroundColor: '#002d47',
          },
          { label: 'Supported by NGOs', data: rawCivilKnown.supported, backgroundColor: '#205072' },
          { label: 'Public support', data: rawCivilKnown.public, backgroundColor: '#5DA6A7' },
          {
            label: 'Strategic Litigation',
            data: rawCivilKnown.strategic,
            backgroundColor: '#32936F',
          },
          {
            label: 'Youth Activism',
            data: rawCivilKnown.youthActivism,
            backgroundColor: '#FFD166',
          },
        ],
      },
      options: {
        ...baseOptions(),
        plugins: { legend: { position: 'bottom' }, tooltip: { mode: 'index', intersect: false } },
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: { stacked: true, title: { display: true, text: 'Year' } },
          y: {
            stacked: true,
            beginAtZero: true,
            title: { display: true, text: 'Number of cases' },
          },
        },
      },
    })
  }

  if (!charts.civilArea && civilAreaEl.value) {
    charts.civilArea = new Chart(civilAreaEl.value.getContext('2d'), {
      type: 'line',
      data: { labels: years, datasets: dsCivilLines },
      options: {
        ...baseOptions(),
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}` },
          },
        },
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: { title: { display: true, text: 'Year' } },
          y: { beginAtZero: true, title: { display: true, text: 'Number of cases' } },
        },
      },
    })
  }

  if (!charts.civilAmicus && civilAmicusEl.value) {
    const amicusCasesPerYear = [0, 0, 0, 0, 2, 0, 4, 3, 2, 3, 3, 7, 5, 4, 1, 0, 0]
    const amicusTotalsPerYear = [0, 0, 0, 0, 2, 0, 20, 4, 4, 3, 4, 38, 13, 6, 1, 0, 0]

    charts.civilAmicus = new Chart(civilAmicusEl.value.getContext('2d'), {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            type: 'bar',
            label: 'Amicus Curiae cases (per year)',
            data: amicusCasesPerYear,
            backgroundColor: '#ae0c36',
            barPercentage: 0.6,
            order: 1,
          },
          {
            type: 'line',
            label: 'Total of Amicus Curiae (for all cases per year)',
            data: amicusTotalsPerYear,
            borderColor: '#002d47',
            backgroundColor: 'rgba(0,45,71,0.10)',
            tension: 0.25,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: '#002d47',
            order: 0,
          },
        ],
      },
      options: {
        ...baseOptions(),
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            mode: 'index',
            intersect: false,
            displayColors: false,
            callbacks: {
              title: (items) => (items?.length ? `Year ${items[0].label}` : ''),
              footer: (items) => {
                if (!items?.length) return ''
                const i = items[0].dataIndex
                return `→ ${amicusCasesPerYear[i]} cases, ${amicusTotalsPerYear[i]} total amicus curiae`
              },
              label: () => '',
            },
          },
        },
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: { title: { display: true, text: 'Year' } },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Counts' },
            ticks: { precision: 0 },
          },
        },
      },
    })
  }

  if (!charts.rightsBar && rightsBarEl.value) {
    charts.rightsBar = new Chart(rightsBarEl.value.getContext('2d'), {
      type: 'bar',
      data: {
        labels: rightsLabels,
        datasets: [{ label: 'Number of cases', data: rightsCases, backgroundColor: '#205072' }],
      },
      options: {
        ...baseOptions(),
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.x} cases` } },
        },
        scales: {
          x: { beginAtZero: true, title: { display: true, text: 'Number of cases' } },
          y: { ticks: { autoSkip: false } },
        },
      },
    })
  }

  if (!charts.rightsRadar && rightsRadarEl.value) {
    const display = rightsCases.map((x) => Math.sqrt(x))
    const suggestedMax = Math.max(...display) * 1.1

    charts.rightsRadar = new Chart(rightsRadarEl.value.getContext('2d'), {
      type: 'radar',
      data: {
        labels: rightsLabels,
        datasets: [
          {
            label: 'Number of cases',
            data: display,
            backgroundColor: 'rgba(32,80,114,0.18)',
            borderColor: '#205072',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#ae0c36',
            pointBorderColor: '#fff',
          },
        ],
      },
      options: {
        ...baseOptions(),
        scales: {
          r: {
            beginAtZero: true,
            suggestedMax,
            grid: { circular: true },
            ticks: { display: false, backdropColor: 'transparent' },
            pointLabels: {
              callback: (v) => wrapLabel(v, 16),
              padding: 6,
              font: { size: 11 },
              color: '#002d47',
            },
          },
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 10, usePointStyle: true, boxWidth: 10 },
          },
          tooltip: { callbacks: { label: (ctx) => `${rightsCases[ctx.dataIndex]} cases` } },
        },
      },
    })
  }

  if (!charts.justPolar && justPolarEl.value) {
    charts.justPolar = new Chart(justPolarEl.value.getContext('2d'), {
      type: 'polarArea',
      data: {
        labels: justificationLabels,
        datasets: [
          {
            data: justificationData,
            backgroundColor: ['#FFD166', '#205072', '#ae0c36'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        ...baseOptions(),
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: (ctx) => ` ${ctx.formattedValue} cases` } },
        },
        scales: { r: { beginAtZero: true, grid: { circular: true } } },
      },
    })
  }

  if (!charts.justRings && justRingsEl.value) {
    const outerLabels = justificationLabels
    const outerData = justificationData
    const outerColors = ['#FFD166', '#205072', '#ae0c36']

    const subLabelsPerParent = [
      ['Rights-based', 'Policy-forward', 'Other'],
      ['Defence on merits', 'Procedural', 'Jurisdictional'],
      ['Separation of powers', 'Standing/justiciability', 'Other'],
    ]
    function splitIntoSubs(total) {
      const a = Math.round(total * 0.6)
      const b = Math.round(total * 0.25)
      const c = Math.max(0, total - a - b)
      return [a, b, c]
    }

    const innerData = outerData.flatMap(splitIntoSubs)
    const innerLabels = outerLabels.flatMap((parent, i) =>
      subLabelsPerParent[i].map((s) => `${parent} › ${s}`),
    )
    const innerColors = outerLabels.flatMap((_, i) => [
      withAlpha(outerColors[i], 0.55),
      withAlpha(outerColors[i], 0.35),
      withAlpha(outerColors[i], 0.22),
    ])

    charts.justRings = new Chart(justRingsEl.value.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: outerLabels,
        datasets: [
          {
            label: 'Typologies',
            data: outerData,
            backgroundColor: outerColors,
            borderWidth: 1,
            weight: 1,
          },
          {
            label: 'Sub-typologies',
            data: innerData,
            backgroundColor: innerColors,
            borderWidth: 1,
            weight: 0.7,
          },
        ],
      },
      options: {
        ...baseOptions(),
        cutout: '45%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, boxWidth: 10, padding: 12 },
          },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                ctx.datasetIndex === 1
                  ? `${innerLabels[ctx.dataIndex]} — ${ctx.parsed} cases`
                  : `${outerLabels[ctx.dataIndex]}: ${outerData[ctx.dataIndex]} cases (total)`,
            },
          },
        },
      },
    })
  }

  if (!charts.instrumentsLollipop && instrumentsLollipopEl.value) {
    const labelsRaw = instrumentRaw.map((d) => d.label)
    const values = instrumentRaw.map((d) => d.occurrences)

    function wrapLabelHoriz(label, maxLen = 44) {
      const words = String(label).split(' ')
      const lines = []
      let cur = []
      let len = 0
      for (const w of words) {
        const add = (len ? 1 : 0) + w.length
        if (len + add <= maxLen) {
          cur.push(w)
          len += add
        } else {
          lines.push(cur.join(' '))
          cur = [w]
          len = w.length
        }
      }
      if (cur.length) lines.push(cur.join(' '))
      return lines.join('\n')
    }

    const labels = labelsRaw.map((l) => wrapLabelHoriz(l, 44))
    const neutralStem = 'rgba(0,0,0,0.08)'

    const dots = {
      type: 'scatter',
      data: values.map((v, i) => ({ x: v, y: labels[i] })),
      pointRadius: 7,
      pointHoverRadius: 9,
      pointBackgroundColor: '#205072',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    }

    const lollipopStems = {
      id: 'lollipopStems',
      beforeDatasetsDraw(chart) {
        const { ctx, chartArea, scales } = chart
        const x = scales.x
        const y = scales.y
        ctx.save()
        ctx.lineWidth = 2
        ctx.strokeStyle = neutralStem
        ctx.setLineDash([3, 4])
        values.forEach((val, i) => {
          const yc = y.getPixelForValue(chart.data.labels[i])
          const x0 = x.getPixelForValue(0)
          const x1 = x.getPixelForValue(val)
          const xs = Math.max(x0, chartArea.left)
          const xe = Math.min(x1, chartArea.right)
          ctx.beginPath()
          ctx.moveTo(xs, yc)
          ctx.lineTo(xe, yc)
          ctx.stroke()
        })
        ctx.restore()
      },
    }

    const lollipopLabels = {
      id: 'lollipopLabels',
      afterDatasetsDraw(chart) {
        const { ctx, scales } = chart
        const x = scales.x
        const y = scales.y
        ctx.save()
        ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Arial'
        ctx.fillStyle = '#002d47'
        ctx.textBaseline = 'middle'
        values.forEach((val, i) => {
          const px = x.getPixelForValue(val)
          const py = y.getPixelForValue(chart.data.labels[i])
          ctx.fillText(`${val}`, px + 10, py)
        })
        ctx.restore()
      },
    }

    charts.instrumentsLollipop = new Chart(instrumentsLollipopEl.value.getContext('2d'), {
      type: 'bar',
      data: { labels, datasets: [dots] },
      options: {
        ...baseOptions(),
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Legal Instruments by Occurrence (n = 285)' },
        },
        scales: {
          x: { beginAtZero: true, title: { display: true, text: 'Occurrences' } },
          y: { ticks: { autoSkip: false } },
        },
        layout: { padding: { right: 24 } },
      },
      plugins: [lollipopStems, lollipopLabels],
    })
  }

  if (!charts.instrumentsBubble && instrumentsBubbleEl.value) {
    const values = instrumentRaw.map((d) => d.occurrences)
    const total = values.reduce((a, b) => a + b, 0)
    const maxOcc = Math.max(...values)
    const rScale = (v) => 6 + (v / maxOcc) * 14
    const palette = [
      '#205072',
      '#ae0c36',
      '#FFD166',
      '#32936F',
      '#5DA6A7',
      '#9B59B6',
      '#E67E22',
      '#16A085',
      '#F39C12',
      '#34495E',
    ]

    charts.instrumentsBubble = new Chart(instrumentsBubbleEl.value.getContext('2d'), {
      type: 'bubble',
      data: {
        datasets: instrumentRaw.map((inst, i) => ({
          label: inst.label,
          data: [
            {
              x: inst.occurrences,
              y: +((inst.occurrences * 100) / total).toFixed(2),
              r: rScale(inst.occurrences),
            },
          ],
          backgroundColor: palette[i % palette.length],
          borderColor: '#ffffff',
          borderWidth: 1,
        })),
      },
      options: {
        ...baseOptions(),
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) =>
                `${ctx.dataset.label}: ${ctx.raw.x} occurrences • ${ctx.raw.y}% share`,
            },
          },
        },
        scales: {
          x: { title: { display: true, text: 'Occurrences' }, beginAtZero: true },
          y: {
            title: { display: true, text: 'Share (%)' },
            beginAtZero: true,
            ticks: { callback: (v) => `${v}%` },
          },
        },
      },
    })
  }
}

function resizeCharts(forceAll = false) {
  const list = forceAll ? Object.values(charts).filter(Boolean) : []
  list.forEach((c) => c.resize())
}

/* Lifecycle */
onMounted(async () => {
  await nextTick()
  moveIndicator()
  buildChartsIfNeeded()
  resizeCharts(true)

  const onResize = () => {
    moveIndicator()
    resizeCharts(true)
  }
  window.addEventListener('resize', onResize, { passive: true })

  const tabs = tabsEl.value
  const onScroll = () => moveIndicator()
  tabs?.addEventListener('scroll', onScroll, { passive: true })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize)
    tabs?.removeEventListener('scroll', onScroll)
  })
})

watch([activeFamily, activeSub], async () => {
  await nextTick()
  buildChartsIfNeeded()
  resizeCharts(true)
})

onBeforeUnmount(() => destroyAll())
</script>

<style scoped>
.hrjust-infographics {
  --ig-border: var(--hrjust-border, rgba(10, 34, 59, 0.12));
  --ig-border-soft: var(--hrjust-border-soft, rgba(10, 34, 59, 0.08));
  --ig-text: var(--hrjust-text, rgba(11, 31, 51, 0.92));
  --ig-muted: var(--hrjust-muted, rgba(11, 31, 51, 0.62));
  --ig-muted-2: var(--hrjust-muted-2, rgba(11, 31, 51, 0.48));
  --ig-hover: var(--hrjust-hover, rgba(10, 34, 59, 0.035));
  --ig-active: var(--hrjust-active, rgba(174, 12, 54, 0.08));
  --ig-accent: var(--hrjust-accent, #ae0c36);
  --ig-accent-2: var(--hrjust-accent-2, #002d47);

  --ig-side-w: 280px;
  --ig-gap: 16px;
  --ig-stage-h: clamp(380px, 48vh, 560px);
  --ig-stage-square: clamp(360px, 46vh, 560px);
}

/* Toolbar */
.hrjust-ig-toolbar {
  position: sticky;
  top: 0;
  z-index: 6;
  background: #fff;

  /* ✅ remove the top separator, keep only the bottom */
  border-bottom: 1px solid var(--ig-border-soft);

  padding: 10px 0 8px;
  margin: 0 0 10px;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
}

/* Tabs */
.hrjust-ig-tabsWrap {
  overflow: auto hidden;
  scrollbar-width: none;
}
.hrjust-ig-tabsWrap::-webkit-scrollbar {
  display: none;
}
.hrjust-ig-tabs {
  position: relative;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  white-space: nowrap;
  padding: 0 0 6px;
  min-height: 44px;
}
.hrjust-ig-tab {
  appearance: none;
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  color: rgba(11, 31, 51, 0.78);
  font-weight: 850;
  font-size: 13px;
  letter-spacing: 0.01em;
  padding: 10px 14px;
  border-radius: 0;
  cursor: pointer;
}
.hrjust-ig-tab[aria-selected='true'] {
  border-color: rgba(174, 12, 54, 0.28);
  color: var(--ig-text);
}
.hrjust-ig-tab:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
.hrjust-ig-indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--ig-accent), var(--ig-accent-2));
  transition:
    transform 180ms ease,
    width 180ms ease;
}

/* Toggle */
/* Toggle (smaller + compact) */
.hrjust-ig-toggle {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;

  /* ✅ smaller */
  padding: 5px 8px;
  min-height: 32px;

  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  color: rgba(11, 31, 51, 0.86);
  font-weight: 900;
  white-space: nowrap;
}

.hrjust-ig-toggle:hover {
  background: var(--ig-hover);
  border-color: var(--ig-border);
}

.hrjust-ig-toggle__icon {
  width: 16px;
  height: 16px;
  display: inline-grid;
  place-items: center;

  /* ✅ smaller icon */
  font-size: 14px;
  line-height: 1;

  color: rgba(11, 31, 51, 0.55);
}

.hrjust-ig-toggle__label {
  /* ✅ smaller label */
  font-size: 11.5px;
  line-height: 1;
}

/* ✅ Optional: on small screens, keep only the icon */
@media (max-width: 520px) {
  .hrjust-ig-toggle__label {
    display: none;
  }
}

/* KPIs row */
.hrjust-ig-kpisRow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  margin: 0 0 14px;
}
.hrjust-ig-kpi {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  padding: 7px 10px;
  border-radius: 0;
}
.hrjust-ig-kpi__label {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  font-size: 10px;
  color: var(--ig-muted-2);
}
.hrjust-ig-kpi__value {
  font-weight: 950;
  color: var(--ig-text);
  font-size: 12.5px;
}

/* Layout */
.hrjust-ig-body {
  display: grid;
  grid-template-columns: var(--ig-side-w) minmax(0, 1fr);
  gap: var(--ig-gap);
  align-items: start;
}
.hrjust-ig-body.is-collapsed {
  grid-template-columns: 1fr;
}

/* Side */
.hrjust-ig-side {
  position: sticky;
  top: 64px;
  align-self: start;
}
.hrjust-ig-subnav {
  display: grid;
  gap: 8px;
}
.hrjust-ig-sub {
  width: 100%;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 0;
  padding: 10px 10px;
  cursor: pointer;
  text-align: left;
  display: grid;
  grid-template-columns: 6px 1fr auto;
  gap: 10px;
  align-items: center;
  transition:
    background 140ms ease,
    border-color 140ms ease;
}
.hrjust-ig-sub__mark {
  width: 4px;
  height: 34px;
  background: rgba(10, 34, 59, 0.08);
}
.hrjust-ig-sub__text {
  display: grid;
  gap: 2px;
  min-width: 0;
}
.hrjust-ig-sub__title {
  font-weight: 950;
  color: var(--ig-text);
  line-height: 1.12;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hrjust-ig-sub__desc {
  font-weight: 750;
  font-size: 12.5px;
  color: var(--ig-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hrjust-ig-sub__chev {
  color: rgba(11, 31, 51, 0.38);
  font-weight: 900;
  transition:
    transform 140ms ease,
    color 140ms ease;
}
.hrjust-ig-sub:hover {
  background: var(--ig-hover);
  border-color: var(--ig-border-soft);
}
.hrjust-ig-sub:hover .hrjust-ig-sub__chev {
  transform: translateX(2px);
  color: rgba(11, 31, 51, 0.6);
}
.hrjust-ig-sub.is-active {
  background: var(--ig-active);
  border-color: rgba(174, 12, 54, 0.28);
}
.hrjust-ig-sub.is-active .hrjust-ig-sub__mark {
  background: linear-gradient(180deg, var(--ig-accent), var(--ig-accent-2));
}

/* Main */
.hrjust-ig-main {
  min-width: 0;
  display: grid;
  gap: 14px;
}
.hrjust-ig-pane {
  display: grid;
  gap: 14px;
}

/* Chart card */
.hrjust-ig-chart {
  border: 1px solid var(--ig-border);
  background: #fff;
  border-radius: 0;
  padding: 14px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
  position: relative;
}
.hrjust-ig-chart__canvas {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  padding: 12px;
}
.hrjust-ig-chart__canvas--tall {
  height: var(--ig-stage-h);
}
.hrjust-ig-chart__canvas--square {
  height: var(--ig-stage-square);
  width: min(700px, 100%);
  margin-inline: auto;
}
.hrjust-ig-chart__canvas canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

/* Caption block */
.hrjust-ig-caption {
  margin-top: 12px;
  border: 1px solid var(--ig-border-soft);
  background: linear-gradient(180deg, rgba(10, 34, 59, 0.03) 0%, rgba(10, 34, 59, 0.015) 100%);
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 10px;
  align-items: start;
  padding: 12px 12px;
}
.hrjust-ig-caption__icon {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border: 1px solid var(--ig-border-soft);
  color: var(--ig-accent-2);
  font-weight: 950;
  border-radius: 0;
}
.hrjust-ig-caption__title {
  font-weight: 950;
  color: var(--ig-accent-2);
  font-size: 13px;
}
.hrjust-ig-caption__body {
  font-size: 11px;
  color: rgba(11, 31, 51, 0.84);
  line-height: 1.6;
}
.accent {
  color: var(--ig-accent);
  font-weight: 950;
}

/* Overlay note */
.hrjust-ig-overlayNote {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 3;
  background: rgba(174, 12, 54, 0.08);
  border: 1px solid rgba(174, 12, 54, 0.35);
  color: rgba(11, 31, 51, 0.92);
  padding: 7px 10px;
  font-size: 12px;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  max-width: 420px;
  backdrop-filter: blur(2px);
}
.hrjust-ig-overlayNote__icon {
  width: 18px;
  height: 18px;
  display: inline-grid;
  place-items: center;
  border: 1px solid rgba(174, 12, 54, 0.35);
  color: var(--ig-accent);
  font-weight: 950;
}

/* Responsive */
@media (max-width: 980px) {
  .hrjust-ig-toolbar {
    grid-template-columns: 1fr;
  }
  .hrjust-ig-kpisRow {
    justify-content: flex-start;
  }
  .hrjust-ig-body {
    grid-template-columns: 1fr;
  }
  .hrjust-ig-side {
    position: static;
  }
}

/* ✅ Explanatory text */
:deep(.hrjust-ig-caption__body) {
  font-size: 13px;
}

/* optional: caption title */
:deep(.hrjust-ig-caption__title) {
  font-size: 13px;
}
:deep(.hrjust-ig-caption__icon) {
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;

  background: var(--ig-accent); /* 🔴 main color */
  color: #fff; /* white "i" */
  font-weight: 900;
  font-size: 12px;

  border-radius: 50%; /* circle */
  border: none;
}
</style>
