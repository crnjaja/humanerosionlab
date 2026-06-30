<template>
  <div class="publications-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--pubs">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            content
          </div>

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

    <section class="content-block full-bleed">
      <div class="container">
        <section class="pubs-section" aria-labelledby="pubs-title">
          <div class="section-head">
            <h2 id="pubs-title" class="section-heading">Publications</h2>

            <div class="section-actions" aria-label="View options">
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
                Clear filters
              </button>
            </div>
          </div>

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

          <div class="stats-row" aria-live="polite">
            <span class="stat">
              <strong>{{ totalCount }}</strong>
              result{{ totalCount === 1 ? '' : 's' }}
            </span>
            <span class="hint"
              >Tip: click “Read more” to expand a summary. Use search to filter quickly.</span
            >
          </div>

          <section class="grid" :class="{ compact }" aria-label="Publications list">
            <article
              v-for="(it, idx) in visibleItems"
              :key="keyOf(it)"
              class="pub-card"
              :data-k="keyOf(it)"
              :class="{
                revealed: revealedKeys.has(keyOf(it)),
                expanded: isExpanded(it),
              }"
              :aria-labelledby="`p${idx}-title`"
              ref="cardEls"
            >
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

              <div class="summary-wrap" :class="{ open: isExpanded(it) }">
                <p class="summary" :id="`p${idx}-summary`">{{ it.summary }}</p>
              </div>

              <footer class="pub-actions pub-actions--split" aria-label="Publication actions">
                <button
                  class="action action--read read-more-btn"
                  type="button"
                  :aria-controls="`p${idx}-summary`"
                  :aria-expanded="String(isExpanded(it))"
                  @click="toggle(it)"
                >
                  <span class="action-label">{{ isExpanded(it) ? 'Show less' : 'Read more' }}</span>
                  <span class="resource-arrow" :class="{ 'resource-arrow--open': isExpanded(it) }">
                    <svg
                      class="action-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </span>
                </button>

                <a
                  v-if="it.url"
                  class="action action--link resource-btn resource-btn--external"
                  :href="it.url"
                  target="_blank"
                  rel="noopener"
                >
                  <span class="action-label">Direct link</span>
                  <span class="resource-icon">
                    <svg
                      class="action-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"
                      />
                    </svg>
                  </span>
                </a>

                <span v-else class="action action--link action--disabled" aria-disabled="true">
                  <span class="action-label">No link</span>
                </span>
              </footer>
            </article>
          </section>

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
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'
import { publications } from '@/data/publications.data'
import { PublicationsService } from '@/services/PublicationsService'
import '@/assets/pages/publications.css'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

const PAGE_SIZE = 8

const items = ref(publications)
const page = ref(1)
const q = ref('')
const year = ref('')
const author = ref('')
const sort = ref('date-desc')
const compact = ref(false)
const expandedKeys = ref(new Set())
const expandedOrder = ref([])
const revealedKeys = ref(new Set())
const cardEls = ref([])

let io = null

const filters = computed(() => ({
  q: q.value,
  year: year.value,
  author: author.value,
  sort: sort.value,
}))

const hasActiveFilters = computed(() => PublicationsService.hasActiveFilters(filters.value))
const years = computed(() => PublicationsService.getYears(items.value))
const authors = computed(() => PublicationsService.getAuthors(items.value))
const filtered = computed(() => PublicationsService.filterAndSort(items.value, filters.value))
const totalCount = computed(() => filtered.value.length)
const baseVisibleItems = computed(() =>
  PublicationsService.paginate(filtered.value, page.value, PAGE_SIZE),
)
const visibleItems = computed(() =>
  PublicationsService.putExpandedFirst(baseVisibleItems.value, expandedOrder.value),
)
const canLoadMore = computed(() => baseVisibleItems.value.length < filtered.value.length)

function keyOf(publication) {
  return PublicationsService.keyOf(publication)
}

function formatDate(iso) {
  return PublicationsService.formatDate(iso)
}

function isExpanded(publication) {
  return PublicationsService.isExpanded(publication, expandedKeys.value)
}

function isCollapsed(publication) {
  return PublicationsService.isCollapsed(publication, expandedKeys.value)
}

async function toggle(publication) {
  const k = keyOf(publication)
  const next = new Set(expandedKeys.value)

  if (next.has(k)) {
    next.delete(k)
    expandedOrder.value = expandedOrder.value.filter((item) => item !== k)
  } else {
    next.add(k)
    expandedOrder.value = [k, ...expandedOrder.value.filter((item) => item !== k)]
  }

  expandedKeys.value = next

  await nextTick()
  observeCards()

  if (next.has(k)) {
    scrollToCard(k)
  }
}

function scrollToCard(k, extraOffset = 60) {
  const selector = `[data-k="${CSS.escape(k)}"]`
  const el = document.querySelector(selector)
  if (!el) return

  const headerOffset =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 72

  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset - extraOffset

  window.scrollTo({
    top,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}

function toggleCompact() {
  compact.value = !compact.value
}

function clearAll() {
  q.value = ''
  year.value = ''
  author.value = ''
  sort.value = 'date-desc'
  page.value = 1
}

function loadMore() {
  if (!canLoadMore.value) return

  page.value += 1
  nextTick(observeCards)
}

function resetViewState() {
  page.value = 1
  expandedKeys.value = new Set()
  expandedOrder.value = []
  revealedKeys.value = new Set()
}

function observeCards() {
  io?.disconnect()

  const elements = cardEls.value?.filter(Boolean) || []
  if (!elements.length) return

  io = new IntersectionObserver(
    (entries) => {
      const next = new Set(revealedKeys.value)

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        const key = entry.target.dataset.k
        if (key) next.add(key)
        io?.unobserve(entry.target)
      })

      revealedKeys.value = next
    },
    { threshold: 0.12 },
  )

  elements.forEach((element) => io.observe(element))
}

watch([q, year, author, sort], async () => {
  resetViewState()
  await nextTick()
  observeCards()
})

onMounted(() => nextTick(observeCards))

onBeforeUnmount(() => {
  io?.disconnect()
})
</script>
