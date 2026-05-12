<template>
  <article class="clisel-page">
    <div class="clisel-library-shell">
      <template v-if="loading">
        <div class="clisel-empty">
          <div class="clisel-empty__title">Loading…</div>
          <p class="clisel-empty__text">Fetching archive data.</p>
        </div>
      </template>

      <template v-else-if="error">
        <div class="clisel-empty">
          <div class="clisel-empty__title">Error</div>
          <p class="clisel-empty__text">{{ error }}</p>
        </div>
      </template>

      <template v-else>
        <transition name="library-fade" mode="out-in">
          <section v-if="viewMode === 'library'" key="library" class="clisel-library-view">
            <div
              v-for="(row, rowIndex) in shelfRows"
              :key="row.id"
              class="clisel-shelf-row clisel-shelf-row--integrated"
              :style="{ '--row-delay': `${rowIndex * 40}ms` }"
            >
              <div class="clisel-shelf-board clisel-shelf-board--modern">
                <div class="clisel-shelf-label clisel-shelf-label--left">
                  <span>{{ row.left.label }}</span>
                </div>

                <div class="clisel-shelf-label clisel-shelf-label--right">
                  <span>{{ row.right.label }}</span>
                </div>

                <div class="clisel-shelf-side clisel-shelf-side--left">
                  <template v-for="book in row.left.books" :key="book.id">
                    <button
                      v-if="!book.isSpacer"
                      class="clisel-book clisel-book--modern"
                      type="button"
                      :style="bookStyle(book)"
                      @click="openBook(book)"
                    >
                      <span class="clisel-book__edge"></span>
                      <span class="clisel-book__shine"></span>
                      <span class="clisel-book__shadow"></span>
                      <span class="clisel-book__topcap"></span>

<span class="clisel-book__text">
  <span class="clisel-book__country">{{ book.region || book.continent }}</span>
  <strong class="clisel-book__title">{{ book.title }}</strong>
</span>
                    </button>

                    <div
                      v-else
                      class="clisel-book clisel-book--modern clisel-book--spacer"
                      :style="bookStyle(book)"
                      aria-hidden="true"
                    ></div>
                  </template>
                </div>

                <div class="clisel-shelf-center-mark clisel-shelf-center-mark--modern"></div>

                <div class="clisel-shelf-side clisel-shelf-side--right">
                  <template v-for="book in row.right.books" :key="book.id">
                    <button
                      v-if="!book.isSpacer"
                      class="clisel-book clisel-book--modern"
                      type="button"
                      :style="bookStyle(book)"
                      @click="openBook(book)"
                    >
                      <span class="clisel-book__edge"></span>
                      <span class="clisel-book__shine"></span>
                      <span class="clisel-book__shadow"></span>
                      <span class="clisel-book__topcap"></span>

<span class="clisel-book__text">
  <span class="clisel-book__country">{{ book.region || book.continent }}</span>
  <strong class="clisel-book__title">{{ book.title }}</strong>
</span>
                    </button>

                    <div
                      v-else
                      class="clisel-book clisel-book--modern clisel-book--spacer"
                      :style="bookStyle(book)"
                      aria-hidden="true"
                    ></div>
                  </template>
                </div>
              </div>
            </div>
          </section>

          <section v-else key="viewer" class="clisel-viewer-wrap">
            <div class="clisel-doc-display">
              <div class="clisel-doc-shell">
                <div class="clisel-doc-stack clisel-doc-stack--back"></div>
                <div class="clisel-doc-stack clisel-doc-stack--mid"></div>

                <div class="clisel-doc-frame">
                  <transition :name="transitionName" mode="out-in">
                    <section
                      class="clisel-doc-sheet"
                      :key="`${selectedBook?.id || 'doc'}-${currentPage}`"
                    >
                      <div class="clisel-doc-toolbar">
                        <button
                          class="clisel-doc-toolbar__dots"
                          type="button"
                          @click="goToToc"
                          :disabled="currentPage === 0"
                          :aria-label="
                            currentPage === 0
                              ? 'Already on table of contents'
                              : 'Back to table of contents'
                          "
                          :title="
                            currentPage === 0 ? 'Table of contents' : 'Back to table of contents'
                          "
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                        </button>

                        <div class="clisel-doc-toolbar__title">
                          {{ selectedBook?.title || 'Archive document' }}
                        </div>

                        <button
                          class="clisel-doc-toolbar__close"
                          type="button"
                          aria-label="Close"
                          title="Close"
                          @click="closeViewer"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M6.4 6.4L17.6 17.6M17.6 6.4L6.4 17.6"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2.2"
                              stroke-linecap="round"
                            />
                          </svg>
                        </button>
                      </div>

                      <div class="clisel-doc-body">
                        <template v-if="currentPageData.type === 'toc'">
                          <div class="clisel-doc-head">
                            <div>
                              <div class="clisel-doc-kicker">
                                {{ selectedBook?.continent || 'Archive viewer' }}
                              </div>
                              <h2>{{ selectedBook?.title || 'Climate Archive' }}</h2>
                            </div>

                            <div class="clisel-doc-counter">
                              {{ currentPage + 1 }} / {{ pages.length }}
                            </div>
                          </div>

                          <div class="clisel-doc-intro">
                            <p>{{ selectedBook?.subtitle }}</p>
                          </div>

                          <div class="clisel-toc-grid">
                            <button
                              v-for="(item, index) in tocItems"
                              :key="index"
                              class="clisel-toc-card"
                              @click="goToPage(item.page)"
                            >
                              <span class="clisel-toc-card__index">
                                {{ String(index + 1).padStart(2, '0') }}
                              </span>
                              <strong>{{ item.label }}</strong>
                              <span>Page {{ item.page + 1 }}</span>
                            </button>
                          </div>
                        </template>

                        <template v-else>
                          <div class="clisel-doc-head">
                            <div>
                              <div class="clisel-doc-kicker">
                                {{ selectedBook?.continent || 'Archive section' }}
                              </div>
                              <h2>{{ currentPageData.title }}</h2>
                            </div>

                            <div class="clisel-doc-counter">
                              {{ currentPage + 1 }} / {{ pages.length }}
                            </div>
                          </div>

                          <div class="clisel-doc-content">
                            <template v-if="Array.isArray(currentPageData.content)">
                              <ul class="clisel-doc-list">
                                <li v-for="(item, idx) in currentPageData.content" :key="idx">
                                  <template v-if="isObject(item)">
                                    <pre class="clisel-json-block">{{ formatObject(item) }}</pre>
                                  </template>

                                  <template v-else-if="isLinkLine(item)">
                                    <a :href="extractUrl(item)" target="_blank" rel="noopener">
                                      {{ extractLabel(item) || extractUrl(item) }}
                                    </a>
                                  </template>

                                  <template v-else>
                                    {{ item }}
                                  </template>
                                </li>
                              </ul>
                            </template>

                            <template v-else-if="isObject(currentPageData.content)">
                              <pre class="clisel-json-block">{{
                                formatObject(currentPageData.content)
                              }}</pre>
                            </template>

                            <template v-else>
                              <p>{{ currentPageData.content }}</p>
                            </template>
                          </div>
                        </template>
                      </div>
                    </section>
                  </transition>
                </div>
              </div>

              <div class="clisel-doc-controls">
                <button
                  class="clisel-doc-btn clisel-doc-btn--ghost"
                  @click="prevPage"
                  :disabled="currentPage === 0"
                >
                  ← Previous
                </button>

                <button
                  class="clisel-doc-btn clisel-doc-btn--primary"
                  @click="nextPage"
                  :disabled="currentPage === pages.length - 1"
                >
                  Next →
                </button>
              </div>
            </div>
          </section>
        </transition>
      </template>
    </div>
  </article>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const rawDb = ref([])
const loading = ref(true)
const error = ref('')
const currentPage = ref(0)
const direction = ref('forward')
const viewMode = ref('library')
const selectedBook = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('/MarcoDB.json')

    if (!response.ok) {
      throw new Error(`Failed to load MarcoDB.json (${response.status})`)
    }

    rawDb.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error while loading data.'
  } finally {
    loading.value = false
  }
})

const entries = computed(() => {
  if (Array.isArray(rawDb.value)) return rawDb.value
  if (rawDb.value && typeof rawDb.value === 'object') return [rawDb.value]
  return []
})

const record = computed(() => entries.value[0] || {})

const sectionMap = [
  { key: 'location', title: 'Location' },
  { key: 'descriptionTimeframe', title: 'Description & Timeframe' },
  { key: 'actorsInvolved', title: 'Actors Involved' },
  { key: 'environmentalChange', title: 'Environmental Change' },
  { key: 'migrationType', title: 'Migration Type' },
  { key: 'policyResponse', title: 'Policy Response' },
  { key: 'literacyMaterial', title: 'Literacy Material' },
  { key: 'references', title: 'References' },
]

const contentPages = computed(() =>
  sectionMap
    .filter((section) => hasContent(record.value?.[section.key]))
    .map((section) => ({
      type: 'section',
      title: section.title,
      content: record.value[section.key],
    })),
)

const pages = computed(() => [{ type: 'toc', title: 'Table of contents' }, ...contentPages.value])

const tocItems = computed(() =>
  pages.value
    .map((page, index) => ({
      label: page.title,
      page: index,
    }))
    .filter((_, index) => index !== 0),
)

const currentPageData = computed(
  () =>
    pages.value[currentPage.value] || {
      type: 'toc',
      title: 'Table of contents',
    },
)

const transitionName = computed(() => (direction.value === 'forward' ? 'doc-forward' : 'doc-back'))

const continentRows = [
  {
    id: 'asia-north-america',
    left: { label: 'Asia', key: 'asia' },
    right: { label: 'North America', key: 'north-america' },
  },
  {
    id: 'europe-africa',
    left: { label: 'Europe', key: 'europe' },
    right: { label: 'Africa', key: 'africa' },
  },
  {
    id: 'oceania-south-america',
    left: { label: 'Oceania', key: 'oceania' },
    right: { label: 'South America', key: 'south-america' },
  },
]

const continentShelfData = {
  'north-america': {
    continent: 'North America',
    regions: [{ label: 'North America', count: 2 }],
  },
  'south-america': {
    continent: 'South America',
    regions: [{ label: 'Latin America', count: 3 }],
  },
  europe: {
    continent: 'Europe',
    regions: [{ label: 'Europe', count: 5 }],
  },
  africa: {
    continent: 'Africa',
    regions: [{ label: 'Africa', count: 2 }],
  },
  asia: {
    continent: 'Asia',
    regions: [
      { label: 'Bengal', count: 1 },
      { label: 'Nepal', count: 2 },
      { label: 'Indonesia', count: 1 },
      { label: 'Turkey', count: 2 },
    ],
  },
  oceania: {
    continent: 'Oceania',
    regions: [
      { label: 'Marshall Islands', count: 2 },
      { label: 'Fiji', count: 1 },
      { label: 'Papua', count: 1 },
    ],
  },
}

const palette = {
  'north-america': ['#5b6cff', '#7d8aff'],
  'south-america': ['#1b8f6a', '#32b58a'],
  europe: ['#b14cff', '#d175ff'],
  africa: ['#c76816', '#e29a31'],
  asia: ['#b3264a', '#db4a73'],
  oceania: ['#1771b8', '#40a0e8'],
  empty: ['#c9ced6', '#e2e6ec'],
}

const titleVariants = ['Archive', 'Case File', 'Notes', 'Field Log', 'Dossier', 'Record']

const libraryBooks = computed(() => {
  const baseTitle =
    record.value?.title ||
    record.value?.location ||
    record.value?.descriptionTimeframe ||
    'Climate migration dossier'

  let id = 1
  const output = []

  for (const shelfKey of Object.keys(continentShelfData)) {
    const shelf = continentShelfData[shelfKey]
    const accents = palette[shelfKey] || ['#6a6a6a', '#999999']
    let localIndex = 0

    for (const region of shelf.regions) {
      for (let i = 0; i < region.count; i += 1) {
        output.push({
          id: `${shelfKey}-${id}`,
          continent: shelf.continent,
          continentKey: shelfKey,
          region: region.label,
          title: `${region.label} ${titleVariants[localIndex % titleVariants.length]}`,
          subtitle:
            localIndex === 0
              ? truncateText(baseTitle, 46)
              : localIndex === 1
                ? 'Climate migration record'
                : 'Environmental change dossier',
          code: `ARC-${String(id).padStart(3, '0')}`,
          accent1: localIndex % 2 === 0 ? accents[0] : accents[1],
          accent2: localIndex % 2 === 0 ? accents[1] : accents[0],
          width: getBookWidth(localIndex),
          height: getBookHeight(localIndex),
          tilt: getBookTilt(localIndex),
          isSpacer: false,
        })

        id += 1
        localIndex += 1
      }
    }
  }

  return output
})

const shelfRows = computed(() =>
  continentRows.map((row) => {
    const leftBooks = libraryBooks.value.filter((book) => book.continentKey === row.left.key)
    const rightBooks = libraryBooks.value.filter((book) => book.continentKey === row.right.key)
    const maxCount = Math.max(leftBooks.length, rightBooks.length)

    return {
      ...row,
      left: {
        ...row.left,
        books: padShelfBooks(leftBooks, maxCount, row.left.key),
      },
      right: {
        ...row.right,
        books: padShelfBooks(rightBooks, maxCount, row.right.key),
      },
    }
  }),
)

function padShelfBooks(books, targetCount, shelfKey) {
  const padded = [...books]
  const accents = palette[shelfKey] || palette.empty

  while (padded.length < targetCount) {
    const index = padded.length
    padded.push({
      id: `${shelfKey}-spacer-${index}`,
      continent: '',
      continentKey: shelfKey,
      region: '',
      title: '',
      subtitle: '',
      code: '',
      accent1: accents[0],
      accent2: accents[1],
      width: getBookWidth(index),
      height: getBookHeight(index),
      tilt: 0,
      isSpacer: true,
    })
  }

  return padded
}

function getBookWidth(index) {
  const widths = [74, 62, 56, 68, 60, 58]
  return widths[index % widths.length]
}

function getBookHeight(index) {
  const heights = [240, 214, 192, 226, 204, 198]
  return heights[index % heights.length]
}

function getBookTilt(index) {
  const tilts = [-2, 1.5, -1, 1, -1.5, 0.5]
  return tilts[index % tilts.length]
}

function bookStyle(book) {
  return {
    '--book-accent-1': book.accent1,
    '--book-accent-2': book.accent2,
    '--book-w': `${book.width}px`,
    '--book-h': `${book.height}px`,
    '--book-tilt': `${book.tilt}deg`,
    opacity: book.isSpacer ? 0 : 1,
    pointerEvents: book.isSpacer ? 'none' : 'auto',
  }
}

function openBook(book) {
  if (book.isSpacer) return

  selectedBook.value = book
  currentPage.value = 0
  direction.value = 'forward'
  viewMode.value = 'viewer'
}

function closeViewer() {
  viewMode.value = 'library'
}

function hasContent(value) {
  if (Array.isArray(value)) return value.length > 0
  if (isObject(value)) return Object.keys(value).length > 0
  return value !== null && value !== undefined && String(value).trim() !== ''
}

function nextPage() {
  if (currentPage.value < pages.value.length - 1) {
    direction.value = 'forward'
    currentPage.value += 1
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    direction.value = 'back'
    currentPage.value -= 1
  }
}

function goToPage(page) {
  direction.value = page >= currentPage.value ? 'forward' : 'back'
  currentPage.value = page
}

function goToToc() {
  if (currentPage.value > 0) {
    direction.value = 'back'
    currentPage.value = 0
  }
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function formatObject(value) {
  return JSON.stringify(value, null, 2)
}

function isLinkLine(text) {
  return typeof text === 'string' && /https?:\/\//.test(text)
}

function extractUrl(text) {
  if (typeof text !== 'string') return '#'
  const match = text.match(/https?:\/\/\S+/)
  return match ? match[0] : '#'
}

function extractLabel(text) {
  if (typeof text !== 'string') return ''
  return text
    .replace(/https?:\/\/\S+/, '')
    .replace(/,\s*$/, '')
    .trim()
}

function truncateText(text, max = 48) {
  const value = String(text || '').trim()
  if (value.length <= max) return value
  return `${value.slice(0, max - 1)}…`
}
</script>
