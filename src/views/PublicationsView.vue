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
            <!-- ✅ Events-like head (title + actions) -->
            <div class="section-head">
              <h2 id="pubs-title" class="section-heading">Publications</h2>

              <div class="section-actions" aria-label="View options">
                <!-- ✅ Compact/comfort toggle (same UX as Events page) -->
                <button
                  class="chip chip--ghost"
                  type="button"
                  @click="toggleCompact"
                  :aria-pressed="String(compact)"
                  title="Toggle compact/comfort view"
                >
                  {{ compact ? 'Comfort view' : 'Compact view' }}
                </button>

                <button
                  class="chip chip--ghost"
                  type="button"
                  @click="clearAll"
                  :disabled="!hasActiveFilters"
                  title="Clear filters"
                >
                  Direct link
                </button>
              </div>
            </div>

            <!-- ===== Toolbar: search + filters + sort (same as Events block) ===== -->
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
                  @keydown.esc.prevent="q = ''"
                />

                <button
                  v-if="q"
                  class="icon-btn"
                  type="button"
                  aria-label="Clear search"
                  @click="q = ''"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path
                      d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29l6.3 6.31 6.3-6.31z"
                    />
                  </svg>
                </button>
              </label>

              <label class="select" for="year">
                <span class="pill" aria-hidden="true">Year</span>
                <select id="year" v-model="year" aria-label="Filter by year">
                  <option value="">All years</option>
                  <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                </select>
              </label>

              <!-- ✅ Authors (instead of location) -->
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

            <!-- ✅ Active filters chips (same behavior as Events) -->
            <div v-if="hasActiveFilters" class="active-filters" aria-label="Active filters">
              <button v-if="year" class="chip" type="button" @click="year = ''">
                Year: {{ year }} <span class="chip-x" aria-hidden="true">×</span>
              </button>
              <button v-if="author" class="chip" type="button" @click="author = ''">
                Author: {{ author }} <span class="chip-x" aria-hidden="true">×</span>
              </button>
              <button v-if="q" class="chip" type="button" @click="q = ''">
                Search: “{{ q }}” <span class="chip-x" aria-hidden="true">×</span>
              </button>
            </div>

            <!-- ✅ Stats row -->
            <div class="stats-row" aria-live="polite">
              <span class="stat">
                <strong>{{ totalCount }}</strong>
                result{{ totalCount === 1 ? '' : 's' }}
              </span>
              <span class="hint"
                >Tip: click “Read more” to expand a summary. Use search to filter quickly.</span
              >
            </div>

            <!-- ===== Grid ===== -->
            <section class="grid" :class="{ compact }" aria-label="Publications list">
              <article
                v-for="(it, idx) in visibleItems"
                :key="keyOf(it)"
                class="pub-card"
                :data-k="keyOf(it)"
                :class="{ revealed: revealedKeys.has(keyOf(it)) }"
                :aria-labelledby="`p${idx}-title`"
                ref="cardEls"
              >
                <!-- ✅ Colored header band (title + meta) -->
                <div class="pub-header">
                  <div class="pub-head">
                    <h3 :id="`p${idx}-title`" class="pub-title">{{ it.title }}</h3>

                    <div class="pub-meta">
                      <span class="pub-authors">{{ (it.authors || []).join(', ') }}</span>
                      <span class="pub-date">· {{ formatDate(it.date) }}</span>
                    </div>
                  </div>
                </div>

                <div v-if="(it.tags || []).length" class="left-actions" aria-label="Tags">
                  <span v-for="t in it.tags" :key="t" class="pill" aria-hidden="true">{{ t }}</span>
                </div>

                <div class="summary-wrap" :data-collapsed="isCollapsed(it) ? 'true' : 'false'">
                  <p class="summary" :id="`p${idx}-summary`">{{ it.summary }}</p>
                </div>

                <footer class="pub-actions pub-actions--split" aria-label="Publication actions">
                  <button
                    class="action action--read"
                    type="button"
                    :aria-controls="`p${idx}-summary`"
                    :aria-expanded="String(!isCollapsed(it))"
                    @click="toggle(it)"
                  >
                    <span class="action-label">{{
                      isCollapsed(it) ? 'Read more' : 'Show less'
                    }}</span>
                    <svg
                      class="action-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </button>

                  <a
                    v-if="it.url"
                    class="action action--link"
                    :href="it.url"
                    target="_blank"
                    rel="noopener"
                  >
                    <span class="action-label">Read online</span>
                    <svg
                      class="action-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <!-- external link icon -->
                      <path
                        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
                      />
                    </svg>
                  </a>

                  <!-- Optional: if no url, keep layout balanced -->
                  <span v-else class="action action--link action--disabled" aria-disabled="true">
                    <span class="action-label">No link</span>
                  </span>
                </footer>
              </article>
            </section>

            <!-- ===== Pagination ===== -->
            <nav class="pager" aria-label="Pagination">
              <button
                class="btn"
                type="button"
                @click="loadMore"
                :disabled="totalCount === 0 || !canLoadMore"
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

/** ✅ Density toggle (same as Events) */
const compact = ref(false)
function toggleCompact() {
  compact.value = !compact.value
}

/** Active filters (events-like) */
const hasActiveFilters = computed(() => !!q.value || !!year.value || !!author.value)
function clearAll() {
  q.value = ''
  year.value = ''
  author.value = ''
  sort.value = 'date-desc'
  page.value = 1
}

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

  els.forEach((el) => io.observe(el))
}

onMounted(() => nextTick(() => observeCards()))
onBeforeUnmount(() => {
  if (io) io.disconnect()
})
</script>
