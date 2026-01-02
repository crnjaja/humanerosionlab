<template>
  <div class="publications-page">
    <!-- TOP HERO (COMPACT / FLAT) -->
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--pubs">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            content
          </div>

          <!-- SAME WORD ANIMATION AS HOMEPAGE -->
          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            OUR <span class="accent">publications</span>
          </h1>

          <p class="hero-subtitle">
            Explore briefs, working papers, reports, datasets and technical notes.
          </p>

          <div class="hero-actions">
            <RouterLink class="btn btn--primary" to="/contact">Any Questions?</RouterLink>
            <RouterLink class="btn btn--ghost" to="/">Back to Home</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <section class="content-block full-bleed">
      <div class="container">
        <!-- ✅ lowered content (no overlap on banner) -->
        <div class="hero-offset pubs-hero-offset">
          <section class="pubs-section" aria-labelledby="pubs-title">
            <h2 id="pubs-title" class="section-heading">Publications</h2>

            <!-- ===== Toolbar: search + filters + sort ===== -->
            <section class="toolbar" aria-label="Filters and Search">
              <label class="search-input" aria-label="Search publications">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  aria-hidden="true"
                >
                  <path
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  />
                </svg>
                <input
                  id="q"
                  v-model="q"
                  type="search"
                  placeholder="Search title, author, keywords…"
                  autocomplete="off"
                />
              </label>

              <label class="select" for="year">
                <span class="pill" aria-hidden="true">Year</span>
                <select id="year" v-model="year" aria-label="Filter by year">
                  <option value="">All years</option>
                  <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>
              </label>

              <label class="select" for="author">
                <span class="pill" aria-hidden="true">Author</span>
                <select id="author" v-model="author" aria-label="Filter by author">
                  <option value="">All authors</option>
                  <option v-for="a in authors" :key="a" :value="a">{{ a }}</option>
                </select>
              </label>

              <label class="sort" for="sort">
                <span class="pill" aria-hidden="true">Sort</span>
                <select id="sort" v-model="sort" aria-label="Sort results">
                  <option value="date-desc">Newest first</option>
                  <option value="date-asc">Oldest first</option>
                  <option value="title-asc">Title A–Z</option>
                  <option value="title-desc">Title Z–A</option>
                </select>
              </label>
            </section>

            <div class="stats-row" aria-live="polite">
              <span>{{ totalCount }} result{{ totalCount === 1 ? '' : 's' }}</span>
              <span>Tip: click “Read more” to expand a summary. Use search to filter quickly.</span>
            </div>

            <!-- ===== Grid ===== -->
            <section class="grid" aria-label="Publications list">
              <article
                v-for="(it, idx) in visibleItems"
                :key="keyOf(it)"
                class="pub-card"
                :data-k="keyOf(it)"
                :class="{ revealed: revealedKeys.has(keyOf(it)) }"
                :aria-labelledby="`p${idx}-title`"
                ref="cardEls"
              >
                <div class="pub-head">
                  <h3 :id="`p${idx}-title`" class="pub-title">{{ it.title }}</h3>

                  <div class="pub-meta">
                    <span class="pub-authors">{{ (it.authors || []).join(', ') }}</span>
                    <span class="pub-date">· {{ formatDate(it.date) }}</span>
                  </div>
                </div>

                <div v-if="(it.tags || []).length" class="left-actions" aria-label="Tags">
                  <span v-for="t in it.tags" :key="t" class="pill" aria-hidden="true">{{ t }}</span>
                </div>

                <div class="summary-wrap" :data-collapsed="isCollapsed(it) ? 'true' : 'false'">
                  <p class="summary" :id="`p${idx}-summary`">{{ it.summary }}</p>
                </div>

                <div class="pub-actions">
                  <div class="left-actions">
                    <button
                      class="expand-btn"
                      type="button"
                      :aria-controls="`p${idx}-summary`"
                      :aria-expanded="String(!isCollapsed(it))"
                      @click="toggle(it)"
                    >
                      <span class="expand-text">{{
                        isCollapsed(it) ? 'Read more' : 'Show less'
                      }}</span>
                      <svg
                        class="expand-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M7 10l5 5 5-5H7z" />
                      </svg>
                    </button>
                  </div>

                  <div class="right-actions">
                    <a v-if="it.url" class="feature-link" :href="it.url"> Open publication → </a>
                  </div>
                </div>
              </article>
            </section>

            <!-- ===== Pagination ===== -->
            <nav class="pager" aria-label="Pagination">
              <button
                class="btn"
                type="button"
                @click="loadMore"
                :disabled="totalCount === 0"
                v-show="canLoadMore || totalCount === 0"
              >
                {{
                  totalCount === 0 ? 'No results' : canLoadMore ? 'Load more' : 'All results shown'
                }}
              </button>
            </nav>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'

/* Same animation settings as homepage */
const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

/** Data (same content as your HTML page) */
const items = ref([
  {
    title: 'Policy Brief: Climate Risk Disclosure Duties',
    authors: ['Jane Roe', 'Alex Smith'],
    date: '2025-10-12',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['policy', 'disclosure', 'corporate'],
  },
  {
    title: 'Working Paper: Corporate Climate Duties',
    authors: ['M. Johnson'],
    date: '2025-10-08',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['corporate', 'governance'],
  },
  {
    title: 'Report: Human Rights Arguments in Climate Litigation (2020–2025)',
    authors: ['A. Patel', 'L. Nguyen', 'C. Rossi'],
    date: '2025-09-28',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['litigation', 'human rights'],
  },
  {
    title: 'Dataset: Global Emissions and Enforcement (v2)',
    authors: ['HEL Team'],
    date: '2025-08-16',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['data', 'enforcement'],
  },
  {
    title: 'Article: Visualizing Climate Claims',
    authors: ['S. Duarte'],
    date: '2025-07-04',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['design', 'visualization'],
  },
  {
    title: 'Guide: Building a Climate Litigation Map',
    authors: ['Human Erosion Lab'],
    date: '2025-06-11',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['guide', 'visualization', 'web'],
  },
  {
    title: 'Technical Note: Data Validation for Case Repositories',
    authors: ['J. Müller', 'P. Alvarez'],
    date: '2025-05-22',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['data', 'validation'],
  },
  {
    title: 'Briefing: Strategic Litigation Pathways',
    authors: ['E. Cornaro'],
    date: '2025-04-10',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['litigation', 'strategy'],
  },
  {
    title: 'Survey: Corporate Net-Zero Claims – A Reality Check',
    authors: ['T. Okafor', 'R. Chen'],
    date: '2025-03-02',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['corporate', 'net-zero'],
  },
  {
    title: 'Memo: Procedural Hurdles in Cross-Border Actions',
    authors: ['K. Dubois'],
    date: '2024-12-14',
    summary:
      'This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions. This brief synthesizes recent developments in mandatory climate risk disclosure for corporations, outlining regulatory baselines, investor expectations, and practical steps for compliance across jurisdictions.',
    url: '#',
    tags: ['procedure', 'cross-border'],
  },
])

/** UI state */
const PAGE_SIZE = 8
const page = ref(1)
const q = ref('')
const year = ref('')
const author = ref('')
const sort = ref('date-desc')

/**
 * ✅ Expand state should be stable across filtering/sorting:
 * store "expanded" by item key, not by index.
 */
const expandedKeys = ref(new Set())

/**
 * ✅ Reveal state should be stable across filtering/sorting:
 * store revealed by item key, not by index.
 */
const revealedKeys = ref(new Set())

/** Dropdown values */
const years = computed(() => {
  const set = new Set(items.value.map((x) => (x.date || '').slice(0, 4)).filter(Boolean))
  return Array.from(set).sort((a, b) => b.localeCompare(a))
})
const authors = computed(() => {
  const set = new Set(items.value.flatMap((x) => x.authors || []))
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})

/** Filter + sort */
const filtered = computed(() => {
  const qq = q.value.trim().toLowerCase()
  const yy = year.value
  const aa = author.value
  const ss = sort.value

  const arr = items.value
    .map((it) => ({ ...it, y: (it.date || '').slice(0, 4) }))
    .filter((it) => {
      const hay = [
        it.title,
        it.summary || '',
        (it.tags || []).join(' '),
        (it.authors || []).join(' '),
      ]
        .join(' ')
        .toLowerCase()

      const matchQ = !qq || hay.includes(qq)
      const matchY = !yy || it.y === yy
      const matchA = !aa || (it.authors || []).includes(aa)
      return matchQ && matchY && matchA
    })

  arr.sort((A, B) => {
    switch (ss) {
      case 'date-asc':
        return (A.date || '').localeCompare(B.date || '')
      case 'title-asc':
        return (A.title || '').localeCompare(B.title || '')
      case 'title-desc':
        return (B.title || '').localeCompare(A.title || '')
      case 'date-desc':
      default:
        return (B.date || '').localeCompare(A.date || '')
    }
  })

  return arr
})

const totalCount = computed(() => filtered.value.length)

const visibleItems = computed(() => {
  return filtered.value.slice(0, PAGE_SIZE * page.value)
})

const canLoadMore = computed(() => visibleItems.value.length < filtered.value.length)

/**
 * ✅ Stable key for each publication card (no index).
 * Add url as a tie-breaker to reduce collisions.
 */
function keyOf(it) {
  return `${it.title}__${it.date}__${it.url || ''}`
}

/** Reset paging/reveal/expand when filters change */
watch([q, year, author, sort], async () => {
  page.value = 1
  expandedKeys.value = new Set()
  revealedKeys.value = new Set()

  await nextTick()
  observeCards()
})

/** Summary expand/collapse (stable by key) */
function isCollapsed(it) {
  return !expandedKeys.value.has(keyOf(it))
}
function toggle(it) {
  const k = keyOf(it)
  const next = new Set(expandedKeys.value)
  if (next.has(k)) next.delete(k)
  else next.add(k)
  expandedKeys.value = next
}

function loadMore() {
  if (canLoadMore.value) {
    page.value += 1
    nextTick(() => observeCards())
  }
}

/** Dates */
function formatDate(iso) {
  const d = new Date(iso)
  if (!Number.isFinite(d.getTime())) return iso
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d)
}

/** Reveal on scroll (IntersectionObserver) */
const cardEls = ref([])
let io = null

function observeCards() {
  if (io) io.disconnect()
  const els = cardEls.value?.filter(Boolean) || []
  if (!els.length) return

  io = new IntersectionObserver(
    (entries) => {
      const next = new Set(revealedKeys.value)
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const k = e.target.dataset.k
          if (k) next.add(k)
          io?.unobserve(e.target)
        }
      })
      revealedKeys.value = next
    },
    { threshold: 0.12 },
  )

  // ✅ No index mapping: the template already has :data-k="keyOf(it)"
  els.forEach((el) => io.observe(el))
}

onMounted(() => nextTick(() => observeCards()))
onBeforeUnmount(() => {
  if (io) io.disconnect()
})
</script>

<style scoped>
/* =========================
   PUBLICATIONS PAGE – your theme (square, panel, accent)
   ========================= */

/* ✅ Lower content (avoid overlapping hero/banner) */
.pubs-hero-offset {
  margin-top: -40px; /* keep content below banner */
  position: relative;
  z-index: 2;
}

/* Section heading like your cards.css big headings */
.section-heading {
  position: relative;
  font-size: clamp(38px, 8vw, 86px);
  line-height: 1;
  letter-spacing: -0.02em;
  color: rgba(11, 42, 74, 0.16);
  font-weight: 800;
  margin: 0 0 clamp(18px, 3vw, 36px);
  display: inline-block;
}
.section-heading::after {
  content: '';
  display: block;
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  margin-top: clamp(6px, 0.9cqw, 10px);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.06);
}

/* Publications section */
.pubs-section {
  padding: clamp(12px, 4vw, 32px) 0;
  container-type: inline-size;
}

/* Toolbar */
.toolbar {
  background: var(--white);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px;
  display: grid;
  gap: 10px;
  align-items: center;
  grid-template-columns: 1fr auto auto auto;
}
@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
}

.search-input {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(10, 34, 59, 0.14);
  border-radius: var(--radius);
  background: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 10px 12px;
}
.search-input input {
  border: 0;
  outline: 0;
  width: 100%;
  font-size: 15px;
  background: transparent;
  color: var(--ink);
}

.select,
.sort {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(10, 34, 59, 0.14);
  border-radius: var(--radius);
  background: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 8px 10px;
  white-space: nowrap;
  font-weight: 800;
  color: var(--ink);
}
.select select,
.sort select {
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  color: var(--ink);
}

/* Pill (same as your theme) */
.pill {
  display: inline-block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 10px;
  border: 1px solid rgba(216, 75, 139, 0.55);
  color: var(--accent);
  background: #fff;
  font-weight: 900;
}

/* Info row */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: clamp(10px, 2vw, 14px);
  color: rgba(11, 31, 51, 0.7);
  font-size: 13px;
}
@media (max-width: 720px) {
  .stats-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* Grid */
.grid {
  margin-top: clamp(14px, 2.6vw, 28px);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(14px, 2.6vw, 28px);
}
@media (min-width: 720px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Card */
.pub-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  background: var(--white);
  box-shadow: var(--shadow-soft);
  border-radius: var(--radius);
  border: 1px solid var(--border);
  padding: clamp(16px, 2.2cqw, 22px);
  gap: 10px;

  opacity: 0;
  transform: translateY(14px);
}
.pub-card.revealed {
  opacity: 1 !important;
  transform: translateY(0) !important;
  transition:
    opacity 0.55s ease,
    transform 0.55s ease;
}

.pub-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.pub-title {
  margin: 0;
  font-size: clamp(18px, 2.6cqw, 22px);
  font-weight: 950;
  color: var(--ink);
}
.pub-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  color: rgba(11, 31, 51, 0.55);
  font-size: 13px;
}
.pub-authors {
  font-weight: 800;
  color: var(--ink);
}
.pub-date {
  white-space: nowrap;
}

/* Justified summary */
.summary {
  color: rgba(11, 31, 51, 0.7);
  font-size: 15px;
  margin: 0;

  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  text-align-last: left;
}

/* Clamp when collapsed */
.summary-wrap[data-collapsed='true'] .summary {
  display: -webkit-box;
  line-clamp: 6;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fade at bottom when collapsed */
.summary-wrap {
  position: relative;
}
.summary-wrap[data-collapsed='true']::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 46px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff 70%);
}

/* Actions */
.pub-actions {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.left-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pubs-section .btn {
  border: 1px solid var(--border);
  background: #fff;
  color: var(--ink);
  padding: 9px 12px;
  font-weight: 950;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.pubs-section .btn:hover {
  background: #f7fbff;
}

.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: clamp(14px, 2.6vw, 28px);
}

/* Read more toggle */
.expand-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  appearance: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  font-weight: 900;
  color: var(--accent);
  text-decoration: none;
  border-bottom: 2px solid transparent;
}
.expand-btn:hover {
  border-bottom-color: var(--accent);
}
.expand-btn:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}

.expand-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  transition: transform 0.2s ease;
  fill: currentColor;
}
.expand-btn[aria-expanded='true'] .expand-icon {
  transform: rotate(180deg);
}

/* Motion preference */
@media (prefers-reduced-motion: reduce) {
  .pub-card {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}

/* Hero tune (same as your inner pages) */
:deep(.stage--top--flat) {
  min-height: clamp(320px, 46vh, 520px);
  padding-top: calc(var(--header-h) + 54px);
  padding-bottom: 54px;
}
:deep(.stage--top--flat::after) {
  content: none !important;
}
</style>
