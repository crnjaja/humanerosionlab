<template>
  <div class="hrjust-content hrjust-db">
    <header class="hrjust-content__head"></header>

    <div class="hrjust-tool hrjust-tool--db">
      <div class="hrjust-tool__head">
        <div class="hrjust-tool__titleWrap">
          <h4 class="hrjust-tool__title">Case Law Database</h4>
        </div>

        <p class="hrjust-tool__note">
          Note: use the filters to narrow down results. “Advanced filters” are collapsed by default.
        </p>
      </div>

      <!-- Filters toolbar (horizontal) -->
      <div class="hrjust-db__filters" role="region" aria-label="Database filters">
        <div class="hrjust-db__filtersRow">
          <div class="hrjust-db__field">
            <label class="hrjust-db__label" for="f-country">Country</label>
            <select id="f-country" v-model="filters.country" class="hrjust-db__select">
              <option value="">All</option>
              <option v-for="c in options.countries" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>

          <div class="hrjust-db__field">
            <label class="hrjust-db__label" for="f-scope">Scope</label>
            <select id="f-scope" v-model="filters.nature" class="hrjust-db__select">
              <option value="">All</option>
              <option v-for="n in options.natures" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <div class="hrjust-db__field">
            <label class="hrjust-db__label" for="f-claimant">Claimant type</label>
            <select id="f-claimant" v-model="filters.claimantType" class="hrjust-db__select">
              <option value="">All</option>
              <option v-for="v in options.claimantTypes" :key="v" :value="v">{{ v }}</option>
            </select>
          </div>

          <div class="hrjust-db__field">
            <label class="hrjust-db__label" for="f-respondent">Respondent type</label>
            <select id="f-respondent" v-model="filters.respondentType" class="hrjust-db__select">
              <option value="">All</option>
              <option v-for="v in options.respondentTypes" :key="v" :value="v">{{ v }}</option>
            </select>
          </div>

          <div class="hrjust-db__field hrjust-db__field--search">
            <label class="hrjust-db__label" for="f-search">Search</label>
            <div class="hrjust-db__searchWrap">
              <input
                id="f-search"
                v-model.trim="filters.search"
                class="hrjust-db__input"
                type="text"
                placeholder="Search by key words..."
              />
              <span class="hrjust-db__searchIcon" aria-hidden="true">⌕</span>
            </div>
          </div>

          <label class="hrjust-db__toggle">
            <input type="checkbox" v-model="filters.decisionOnly" />
            <span>Only cases with a <strong>Decision</strong></span>
          </label>

          <button type="button" class="hrjust-db__btn" @click="toggleAdvanced">
            {{ showAdvanced ? 'Hide' : 'Show' }} advanced
          </button>

          <button type="button" class="hrjust-db__btn hrjust-db__btn--ghost" @click="resetAll">
            Reset
          </button>
        </div>

        <!-- Advanced (chips + clickable options, no search) -->
        <div v-show="showAdvanced" class="hrjust-db__advanced">
          <div class="hrjust-db__advancedGrid">
            <!-- Civil Society -->
            <div class="hrjust-db__advCard">
              <div class="hrjust-db__advHead">
                <div class="hrjust-db__advTitle">Civil society engagement</div>
                <button
                  type="button"
                  class="hrjust-db__advClear"
                  @click="filters.civilSociety = []"
                >
                  Clear
                </button>
              </div>

              <div class="hrjust-db__chips">
                <button
                  v-for="chip in filters.civilSociety"
                  :key="chip"
                  type="button"
                  class="hrjust-db__chip"
                  @click="removeChip('civilSociety', chip)"
                  :title="`Remove ${chip}`"
                >
                  {{ chip }} <span aria-hidden="true">×</span>
                </button>
                <span v-if="!filters.civilSociety.length" class="hrjust-db__chipsEmpty"
                  >No selection</span
                >
              </div>

              <div class="hrjust-db__options">
                <button
                  v-for="o in remainingOptions('civilSociety')"
                  :key="o"
                  type="button"
                  class="hrjust-db__opt"
                  @click="addChip('civilSociety', o)"
                  :title="`Add ${o}`"
                >
                  + {{ o }}
                </button>
                <div v-if="!remainingOptions('civilSociety').length" class="hrjust-db__pickerEmpty">
                  All selected.
                </div>
              </div>
            </div>

            <!-- Human Rights -->
            <div class="hrjust-db__advCard">
              <div class="hrjust-db__advHead">
                <div class="hrjust-db__advTitle">Human rights</div>
                <button type="button" class="hrjust-db__advClear" @click="filters.humanRights = []">
                  Clear
                </button>
              </div>

              <div class="hrjust-db__chips">
                <button
                  v-for="chip in filters.humanRights"
                  :key="chip"
                  type="button"
                  class="hrjust-db__chip"
                  @click="removeChip('humanRights', chip)"
                  :title="`Remove ${chip}`"
                >
                  {{ chip }} <span aria-hidden="true">×</span>
                </button>
                <span v-if="!filters.humanRights.length" class="hrjust-db__chipsEmpty"
                  >No selection</span
                >
              </div>

              <div class="hrjust-db__options">
                <button
                  v-for="o in remainingOptions('humanRights')"
                  :key="o"
                  type="button"
                  class="hrjust-db__opt"
                  @click="addChip('humanRights', o)"
                  :title="`Add ${o}`"
                >
                  + {{ o }}
                </button>
                <div v-if="!remainingOptions('humanRights').length" class="hrjust-db__pickerEmpty">
                  All selected.
                </div>
              </div>
            </div>

            <!-- Justification Typology -->
            <div class="hrjust-db__advCard">
              <div class="hrjust-db__advHead">
                <div class="hrjust-db__advTitle">Justification typology</div>
                <button
                  type="button"
                  class="hrjust-db__advClear"
                  @click="filters.justifications = []"
                >
                  Clear
                </button>
              </div>

              <div class="hrjust-db__chips">
                <button
                  v-for="chip in filters.justifications"
                  :key="chip"
                  type="button"
                  class="hrjust-db__chip"
                  @click="removeChip('justifications', chip)"
                  :title="`Remove ${chip}`"
                >
                  {{ chip }} <span aria-hidden="true">×</span>
                </button>
                <span v-if="!filters.justifications.length" class="hrjust-db__chipsEmpty"
                  >No selection</span
                >
              </div>

              <div class="hrjust-db__options">
                <button
                  v-for="o in remainingOptions('justifications')"
                  :key="o"
                  type="button"
                  class="hrjust-db__opt"
                  @click="addChip('justifications', o)"
                  :title="`Add ${o}`"
                >
                  + {{ o }}
                </button>
                <div
                  v-if="!remainingOptions('justifications').length"
                  class="hrjust-db__pickerEmpty"
                >
                  All selected.
                </div>
              </div>
            </div>

            <!-- Subtopics -->
            <div class="hrjust-db__advCard">
              <div class="hrjust-db__advHead">
                <div class="hrjust-db__advTitle">Subtopics</div>
                <button type="button" class="hrjust-db__advClear" @click="filters.subtopics = []">
                  Clear
                </button>
              </div>

              <div class="hrjust-db__chips">
                <button
                  v-for="chip in filters.subtopics"
                  :key="chip"
                  type="button"
                  class="hrjust-db__chip"
                  @click="removeChip('subtopics', chip)"
                  :title="`Remove ${chip}`"
                >
                  {{ chip }} <span aria-hidden="true">×</span>
                </button>
                <span v-if="!filters.subtopics.length" class="hrjust-db__chipsEmpty"
                  >No selection</span
                >
              </div>

              <div class="hrjust-db__options">
                <button
                  v-for="o in remainingOptions('subtopics')"
                  :key="o"
                  type="button"
                  class="hrjust-db__opt"
                  @click="addChip('subtopics', o)"
                  :title="`Add ${o}`"
                >
                  + {{ o }}
                </button>
                <div v-if="!remainingOptions('subtopics').length" class="hrjust-db__pickerEmpty">
                  All selected.
                </div>
              </div>

              <div class="hrjust-db__advFoot">
                <span class="hrjust-db__hint">
                  The advanced filters allow you to select multiple options. Click on a selected
                  option to remove it.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary + pagination -->
      <div class="hrjust-db__summaryBar" aria-live="polite">
        <div class="hrjust-db__summaryText">
          Displaying {{ pageCountShown }} case notes of {{ filteredCases.length }} (Page
          {{ currentPage }} of {{ totalPages }})
        </div>

        <div class="hrjust-db__pager" v-if="totalPages > 1">
          <button class="hrjust-db__pagerBtn" :disabled="currentPage === 1" @click="currentPage--">
            Previous
          </button>
          <div class="hrjust-db__pagerMid">Page {{ currentPage }} / {{ totalPages }}</div>
          <button
            class="hrjust-db__pagerBtn"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Results -->
      <div v-if="!paginatedCases.length" class="hrjust-db__empty">No cases found.</div>

      <div v-for="c in paginatedCases" :key="c.__key" class="hrjust-case">
        <div class="hrjust-case__title">
          {{ c.case_name || 'Untitled' }},
          <span class="hrjust-case__country">{{ c.respondent_country || 'Unknown' }}</span>
        </div>

        <div class="hrjust-case__section">
          <div class="hrjust-case__sectionTitle">Summary</div>
          <div class="hrjust-case__highlight">
            {{ c.summary || 'No summary provided.' }}
          </div>
        </div>

        <div class="hrjust-case__divider"></div>

        <button class="hrjust-db__toggleBtn" type="button" @click="toggleOpen(c.__key)">
          {{ openMap[c.__key] ? 'Show less' : 'Show more' }}
        </button>

        <div v-show="openMap[c.__key]" class="hrjust-db__details">
          <div class="hrjust-case__section">
            <div class="hrjust-case__sectionTitle">Parties involved</div>
            <div class="hrjust-case__grid">
              <div class="hrjust-case__party">
                <div class="hrjust-case__partyRole">Claimant</div>
                <div class="hrjust-case__partyType">{{ c.claimant_type || 'N/A' }}</div>
                <div class="hrjust-case__partyName">{{ c.claimant || 'N/A' }}</div>
              </div>
              <div class="hrjust-case__party">
                <div class="hrjust-case__partyRole">Respondent</div>
                <div class="hrjust-case__partyType">{{ c.respondent_type || 'N/A' }}</div>
                <div class="hrjust-case__partyName">{{ c.respondent || 'N/A' }}</div>
              </div>
            </div>
          </div>

          <template v-if="hasProceedings(c)">
            <div class="hrjust-case__divider"></div>
            <div class="hrjust-case__section">
              <div class="hrjust-case__sectionTitle">Proceedings details</div>
              <div class="hrjust-case__grid">
                <div v-if="c.submission_year" class="hrjust-case__highlight">
                  <strong>Submission Year:</strong> {{ c.submission_year }}
                </div>
                <div v-if="c.decision_date" class="hrjust-case__highlight">
                  <strong>Decision Date:</strong> {{ c.decision_date }}
                </div>
                <div v-if="c.court_type" class="hrjust-case__highlight">
                  <strong>Court Type:</strong> {{ c.court_type }}
                </div>
                <div v-if="c.proceedings_status" class="hrjust-case__highlight">
                  <strong>Proceedings Status:</strong> {{ c.proceedings_status }}
                </div>
              </div>
            </div>
          </template>

          <div class="hrjust-case__divider"></div>
          <div class="hrjust-case__section">
            <div class="hrjust-case__sectionTitle">Civil society engagement</div>
            <div class="hrjust-case__highlight">{{ c.civil_society_engagement || 'N/A' }}</div>
          </div>

          <div class="hrjust-case__divider"></div>
          <div class="hrjust-case__section">
            <div class="hrjust-case__sectionTitle">Human rights</div>
            <div class="hrjust-case__highlight">
              <strong>Catalogue:</strong> {{ c.rights_catalogue || 'N/A' }}
            </div>
            <div class="hrjust-case__highlight">
              <strong>Violated Rights:</strong> {{ c.humanrights_violated || 'N/A' }}
            </div>
          </div>

          <div class="hrjust-case__divider"></div>
          <div class="hrjust-case__section">
            <div class="hrjust-case__sectionTitle">Typology</div>
            <div class="hrjust-case__highlight">
              <strong>Justification Typology:</strong>
              {{ formatJustifications(c.justification_typology) }}
            </div>
            <div v-if="c.justification_subtypology" class="hrjust-case__highlight">
              <strong>Subtypology:</strong> {{ c.justification_subtypology }}
            </div>
          </div>

          <template v-if="c.external_case_link || c.literature_reference">
            <div class="hrjust-case__divider"></div>
            <div class="hrjust-case__section">
              <div class="hrjust-case__sectionTitle">References</div>

              <div v-if="c.external_case_link" class="hrjust-case__highlight">
                <strong>External Case Link:</strong>
                <code class="hrjust-case__code">{{ String(c.external_case_link).trim() }}</code>
              </div>

              <div v-if="c.literature_reference" class="hrjust-case__highlight">
                <strong>Literature Reference:</strong>
                <code class="hrjust-case__code">{{ String(c.literature_reference).trim() }}</code>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- Bottom summary + pagination -->
      <div class="hrjust-db__summaryBar hrjust-db__summaryBar--bottom" aria-live="polite">
        <div class="hrjust-db__summaryText">
          Displaying {{ pageCountShown }} case notes of {{ filteredCases.length }} (Page
          {{ currentPage }} of {{ totalPages }})
        </div>

        <div class="hrjust-db__pager" v-if="totalPages > 1">
          <button class="hrjust-db__pagerBtn" :disabled="currentPage === 1" @click="currentPage--">
            Previous
          </button>
          <div class="hrjust-db__pagerMid">Page {{ currentPage }} / {{ totalPages }}</div>
          <button
            class="hrjust-db__pagerBtn"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'

/* =========================
   Constants copied from your Joomla logic
   ========================= */
const HUMAN_RIGHTS_KEYWORDS = {
  'Right to Life': ['right to life'],
  'Right to a Healthy Environment': ['healthy environment'],
  'Right to Health': ['right to health'],
  'Rights of Indigenous Peoples': ['indigenous'],
  "Children's Rights": ['children'],
  'Rights of Future Generations': ['future generations'],
  'Right to Participation': ['participation'],
  'Right to access to Information': ['access to information'],
  'Right to Private and Family Life': ['private and family life'],
  'Right to Property': ['property'],
  'Right to Equality': ['equality', 'non-discrimination', 'non discrimination'],
  'Right to Development': ['right to development'],
  'Freedom of Expression': ['freedom of expression'],
  'Right to Remedy': ['remedy', 'access to justice'],
  'Right to Water': ['right to water'],
  'Right to Food': ['right to food', 'food sovereignty'],
  'Human Dignity': ['human dignity'],
  'Right to Housing': ['right to housing', 'adequate shelter'],
}

const CIVIL_SOCIETY_OPTIONS = [
  'Amicus Curiae',
  'NGOs as Claimants',
  'Supported by NGOs',
  'Public support',
  'Strategic Litigation',
  'Youth Activism',
]

const SUBTOPICS = ['Trade & HR', 'Climate Change & HR']

/* =========================
   State
   ========================= */
const allCases = ref([])

const showAdvanced = ref(false)
function toggleAdvanced() {
  showAdvanced.value = !showAdvanced.value
}

const filters = reactive({
  country: '',
  nature: '',
  claimantType: '',
  respondentType: '',
  civilSociety: [],
  humanRights: [],
  justifications: [],
  subtopics: [],
  decisionOnly: false,
  search: '',
})

function addChip(field, value) {
  if (!value) return
  const arr = filters[field]
  if (!Array.isArray(arr)) return
  if (arr.includes(value)) return
  arr.push(value)
}

function removeChip(field, value) {
  const arr = filters[field]
  if (!Array.isArray(arr)) return
  const idx = arr.indexOf(value)
  if (idx >= 0) arr.splice(idx, 1)
}

function remainingOptions(field) {
  const selected = new Set((filters[field] || []).map(String))

  let source
  if (field === 'civilSociety') {
    source = options.value.civilSociety
  } else if (field === 'humanRights') {
    source = options.value.humanRights
  } else if (field === 'justifications') {
    source = options.value.justifications
  } else {
    source = options.value.subtopics
  }

  return source.filter((x) => !selected.has(x))
}

const casesPerPage = ref(10)
const currentPage = ref(1)

const openMap = reactive({}) // key -> boolean
function toggleOpen(key) {
  openMap[key] = !openMap[key]
}

function resetAll() {
  filters.country = ''
  filters.nature = ''
  filters.claimantType = ''
  filters.respondentType = ''
  filters.civilSociety = []
  filters.humanRights = []
  filters.justifications = []
  filters.subtopics = []
  filters.decisionOnly = false
  filters.search = ''
  currentPage.value = 1
}

/* =========================
   Helpers
   ========================= */
function normalizeClaimantType(val = '') {
  const v = String(val).toLowerCase()
  return v.replace('individuals', 'individual')
}

function formatJustifications(input) {
  if (!input)
    return 'This case lacks guiding document or explicit argument from the state concerning the allegations made.'
  return String(input)
    .split(',')
    .map((j) => j.trim().toLowerCase())
    .filter(Boolean)
    .map((j) => j.charAt(0).toUpperCase() + j.slice(1))
    .join(', ')
}

function hasProceedings(c) {
  return !!(c.submission_year || c.decision_date || c.court_type || c.proceedings_status)
}

function decisionIsValid(val) {
  const v = String(val || '')
    .toLowerCase()
    .trim()
  return v && v !== 'n/a' && v !== 'null' && v !== 'pending'
}

/* =========================
   Options computed from dataset
   ========================= */
const options = computed(() => {
  const countries = new Set()
  const claimantTypes = new Set()
  const respondentTypes = new Set()
  const justifications = new Set()

  for (const c of allCases.value) {
    // Countries: respondent_country can be comma-separated
    String(c.respondent_country || '')
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((x) => countries.add(x))

    // claimant_type / respondent_type can be comma-separated in your data
    String(c.claimant_type || '')
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((x) => claimantTypes.add(capitalize(normalizeClaimantType(x))))

    String(c.respondent_type || '')
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((x) => respondentTypes.add(capitalize(String(x).toLowerCase())))

    String(c.justification_typology || '')
      .split(',')
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean)
      .forEach((x) => justifications.add(capitalize(x)))
  }

  return {
    countries: [...countries].sort(alphaSort),
    claimantTypes: [...claimantTypes].sort(alphaSort),
    respondentTypes: [...respondentTypes].sort(alphaSort),
    justifications: [...justifications].sort(alphaSort),
    civilSociety: CIVIL_SOCIETY_OPTIONS,
    humanRights: Object.keys(HUMAN_RIGHTS_KEYWORDS),
    natures: ['Domestic', 'Regional', 'International'],
    subtopics: SUBTOPICS,
  }
})

function alphaSort(a, b) {
  return String(a).localeCompare(String(b))
}

function capitalize(s = '') {
  const str = String(s)
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

/* =========================
   Filtering (keeps your Joomla logic)
   ========================= */
const filteredCases = computed(() => {
  const country = filters.country.trim().toLowerCase()
  const nature = filters.nature.trim().toLowerCase()
  const claimant = filters.claimantType.trim().toLowerCase()
  const respondent = filters.respondentType.trim().toLowerCase()
  const cs = filters.civilSociety.map((x) => String(x).toLowerCase())
  const rights = filters.humanRights
  const justs = filters.justifications.map((x) => String(x).toLowerCase())
  const subtopics = filters.subtopics.map((x) => String(x).toLowerCase())
  const search = filters.search.trim().toLowerCase()
  const decisionOnly = filters.decisionOnly

  return allCases.value.filter((c) => {
    // Quick search (same as Joomla: name or summary)
    if (search) {
      const name = String(c.case_name || '').toLowerCase()
      const sum = String(c.summary || '').toLowerCase()
      if (!name.includes(search) && !sum.includes(search)) return false
    }

    if (decisionOnly && !decisionIsValid(c.decision_date)) return false

    const matchCountry =
      !country ||
      String(c.respondent_country || '')
        .toLowerCase()
        .includes(country)

    const claimantType = normalizeClaimantType(c.claimant_type || '')
    const matchClaimant = !claimant || claimantType.includes(claimant)

    const matchRespondent =
      !respondent ||
      String(c.respondent_type || '')
        .toLowerCase()
        .includes(respondent)

    const matchNature =
      !nature ||
      String(c.nature_of_case || '')
        .toLowerCase()
        .includes(nature)

    const matchCS = cs.every((needle) =>
      String(c.civil_society_engagement || '')
        .toLowerCase()
        .includes(needle),
    )

    // Human rights keyword catalogue match (same logic)
    const rightsCatalogue = String(c.rights_catalogue || '').toLowerCase()
    const matchRights = rights.every((label) => {
      const keywords = HUMAN_RIGHTS_KEYWORDS[label] || []
      return keywords.some((kw) => rightsCatalogue.includes(kw))
    })

    const justificationField = String(c.justification_typology || '').toLowerCase()
    const matchJustification = justs.every((j) => justificationField.includes(j))

    // Subtopics logic (same as your Joomla code)
    const isInternational = String(c.nature_of_case || '')
      .toLowerCase()
      .includes('international')
    let matchSubtopics = true
    if (subtopics.length === 1) {
      if (subtopics.includes('trade & hr')) matchSubtopics = isInternational
      else if (subtopics.includes('climate change & hr')) matchSubtopics = !isInternational
    } else if (subtopics.length === 2) {
      // matchSubtopics is already true by default, no assignment needed
    }

    return (
      matchCountry &&
      matchClaimant &&
      matchRespondent &&
      matchCS &&
      matchRights &&
      matchNature &&
      matchJustification &&
      matchSubtopics
    )
  })
})

watch(
  () => ({
    ...filters,
    civilSociety: [...filters.civilSociety],
    humanRights: [...filters.humanRights],
    justifications: [...filters.justifications],
    subtopics: [...filters.subtopics],
  }),
  () => {
    currentPage.value = 1
  },
  { deep: true },
)

/* =========================
   Pagination
   ========================= */
const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredCases.value.length / casesPerPage.value)),
)

watch(currentPage, (v) => {
  if (v < 1) currentPage.value = 1
  if (v > totalPages.value) currentPage.value = totalPages.value
})

const paginatedCases = computed(() => {
  const start = (currentPage.value - 1) * casesPerPage.value
  const end = start + casesPerPage.value
  return filteredCases.value.slice(start, end).map((c, idx) => ({
    ...c,
    __key: `${start + idx}-${String(c.case_name || 'Untitled')}`,
  }))
})

const pageCountShown = computed(() => paginatedCases.value.length)

/* =========================
   Load JSON from public/
   ========================= */
async function fetchCases() {
  const base = import.meta.env.BASE_URL
  const url = `${base}climate_cases2.json`
  const res = await fetch(url)
  const db = await res.json()

  // same pattern as your map page
  const table = Array.isArray(db)
    ? db.find((d) => d.type === 'table' && d.name === 'climate_cases2')
    : null
  const rows = table?.data ?? []

  // filter out header row-style artifacts
  allCases.value = rows.filter((c) => c?.case_name && c.case_name !== 'case_name')
}

onMounted(async () => {
  await fetchCases()
})
</script>

<style scoped>
/* =========================
   Match your hrjust look (square corners)
   ========================= */
.hrjust-db {
  --accent: var(--hrjust-accent-3, #d84b8b);
  --ig-border: var(--hrjust-border, rgba(10, 34, 59, 0.12));
  --ig-border-soft: var(--hrjust-border-soft, rgba(10, 34, 59, 0.08));
  --ig-accent: var(--accent);
  --ig-accent-2: var(--hrjust-accent-2, #002d47);
}

.hrjust-tool--db {
  border: none;
  background: transparent;
  padding: 0;
  box-shadow: none;
}

.hrjust-tool__head {
  display: grid;
  gap: 8px;
  margin-bottom: 14px;
}

.hrjust-tool__titleWrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.hrjust-tool__title {
  margin: 0;
}

.hrjust-tool__icon {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  background: var(--ig-accent);
  color: #fff;
  font-weight: 900;
  font-size: 13px;
  border-radius: 50%;
}

.hrjust-tool__note {
  margin: 0;
  font-size: 13px;
  color: rgba(11, 31, 51, 0.78);
}

/* =========================
   Horizontal filters toolbar
   ========================= */
.hrjust-db__filters {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 12px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
}

.hrjust-db__filtersRow {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  align-items: flex-end;
}

.hrjust-db__field {
  display: grid;
  gap: 6px;
  min-width: 160px;
  flex: 1 1 160px;
}

.hrjust-db__field--search {
  flex: 999 1 320px; /* grow a lot, still wrap on small screens */
  min-width: 260px;
}

.hrjust-db__label {
  font-size: 12.5px;
  font-weight: 950;
  color: rgba(11, 31, 51, 0.8);
}

.hrjust-db__select,
.hrjust-db__input {
  border: 1px solid var(--ig-border);
  border-radius: 0;
  background: #fff;
  padding: 8px 10px;
  font: inherit;
  font-size: 13.5px;
  line-height: 1.2;
  min-height: 36px;
}

.hrjust-db__select:focus,
.hrjust-db__input:focus {
  outline: none;
  border-color: color-mix(in srgb, var(--ig-accent) 55%, #0000);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ig-accent) 18%, #0000);
}

.hrjust-db__searchWrap {
  position: relative;
  width: 100%;
}

.hrjust-db__field--search .hrjust-db__input {
  width: 100%;
  padding-right: 44px; /* was 34px */
}

.hrjust-db__searchIcon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px; /* bigger */
  line-height: 1;
  color: rgba(11, 31, 51, 0.45);
  pointer-events: none;
}

.hrjust-db__toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(11, 31, 51, 0.8);
  user-select: none;
  padding: 6px 8px;
  border: 1px solid var(--ig-border-soft);
  background: rgba(10, 34, 59, 0.02);
}
.hrjust-db__toggle input {
  accent-color: var(--ig-accent);
  width: 16px;
  height: 16px;
}

/* Make buttons less flashy by default */
.hrjust-db__btn {
  border: 1px solid color-mix(in srgb, var(--ig-accent-2) 35%, transparent);
  background: color-mix(in srgb, var(--ig-accent-2) 6%, transparent);
  color: rgba(11, 31, 51, 0.86);
  border-radius: 0;
  padding: 9px 12px;
  font-size: 13px;
  cursor: pointer;
  height: 36px;
}

.hrjust-db__btn:hover {
  background: color-mix(in srgb, var(--ig-accent-2) 10%, transparent);
}

.hrjust-db__btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--ig-accent) 18%, transparent);
}

/* Keep Reset as a "ghost" but consistent */
.hrjust-db__btn--ghost {
  border: 1px solid var(--ig-border-soft);
  background: transparent;
  color: rgba(11, 31, 51, 0.78);
}
.hrjust-db__btn--ghost:hover {
  background: rgba(10, 34, 59, 0.03);
}

.hrjust-db__advanced {
  margin-top: 10px;
  border-top: 1px solid var(--ig-border-soft);
  padding-top: 10px;
}

.hrjust-db__hint {
  font-size: 12px;
  color: rgba(11, 31, 51, 0.6);
}

/* =========================
   Summary + pager
   ========================= */
.hrjust-db__summaryBar {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  justify-content: space-between;
  align-items: center;
}

.hrjust-db__summaryText {
  font-size: 13px;
  color: rgba(11, 31, 51, 0.78);
  border-left: 4px solid var(--ig-accent);
  padding: 8px 10px;
  background: rgba(10, 34, 59, 0.03);
}

.hrjust-db__pager {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.hrjust-db__pagerBtn {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 8px 10px;
  cursor: pointer;
}
.hrjust-db__pagerBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.hrjust-db__pagerMid {
  font-size: 12.5px;
  color: rgba(11, 31, 51, 0.65);
}

/* =========================
   Cases (reuse your map style)
   ========================= */
.hrjust-db__empty {
  margin-top: 12px;
  font-size: 13px;
  color: rgba(11, 31, 51, 0.65);
}

:deep(.hrjust-case) {
  margin-top: 12px;
  border: 1px solid var(--ig-border);
  background: #fff;
  border-radius: 0;
  padding: 14px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.06);
}

:deep(.hrjust-case__title) {
  font-size: 18px;
  font-weight: 950;
  color: var(--ig-accent);
  text-align: center;
  margin-bottom: 14px;
}

:deep(.hrjust-case__country) {
  color: var(--ig-accent-2);
}

:deep(.hrjust-case__sectionTitle) {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 950;
  color: var(--ig-accent);
  margin-bottom: 10px;
}

:deep(.hrjust-case__grid) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 14px;
}

:deep(.hrjust-case__party) {
  background: rgba(10, 34, 59, 0.03);
  border-left: 1px solid var(--ig-accent);
  padding: 12px;
}

:deep(.hrjust-case__partyRole) {
  font-weight: 950;
  color: var(--ig-accent);
}

:deep(.hrjust-case__partyType) {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65);
  font-style: italic;
}

:deep(.hrjust-case__partyName) {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.78);
}

:deep(.hrjust-case__highlight) {
  background: rgba(10, 34, 59, 0.03);
  border-left: 1px solid var(--ig-accent);
  padding: 10px 12px;
  color: rgba(0, 0, 0, 0.78);
  font-size: 13.5px;
  line-height: 1.55;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
}

:deep(.hrjust-case__divider) {
  border-bottom: 1px solid color-mix(in srgb, var(--ig-accent) 35%, transparent);
  margin: 14px 0;
}

:deep(.hrjust-case__code) {
  margin-left: 10px;
  word-break: break-all;
  font-size: 12.5px;
  background: rgba(0, 0, 0, 0.06);
  padding: 2px 6px;
  border-radius: 0;
  color: var(--ig-accent);
}

/* Show more button */
.hrjust-db__toggleBtn {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 13px;
}
.hrjust-db__toggleBtn:hover {
  background: rgba(10, 34, 59, 0.03);
}

.hrjust-db__details {
  margin-top: 12px;
}

@media (max-width: 980px) {
  :deep(.hrjust-case__grid) {
    grid-template-columns: 1fr;
  }

  .hrjust-db__field {
    min-width: 140px;
  }

  .hrjust-db__field--search {
    min-width: 200px;
  }
}

/* =========================
   Advanced filters (chips + search) — better UX
   ========================= */
.hrjust-db__advancedGrid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.hrjust-db__advCard {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 12px;
  display: grid;
  gap: 10px;
}

.hrjust-db__advHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.hrjust-db__advTitle {
  font-weight: 950;
  color: rgba(11, 31, 51, 0.86);
  font-size: 13px;
  border-left: 4px solid var(--ig-accent);
  padding-left: 8px;
}

.hrjust-db__advClear {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 6px 10px;
  font-size: 12.5px;
  cursor: pointer;
  color: rgba(11, 31, 51, 0.78);
}
.hrjust-db__advClear:hover {
  background: rgba(10, 34, 59, 0.03);
}

.hrjust-db__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  min-height: 34px;
  padding: 8px;
  border: 1px dashed var(--ig-border-soft);
  background: rgba(10, 34, 59, 0.02);
}

.hrjust-db__chipsEmpty {
  font-size: 12.5px;
  color: rgba(11, 31, 51, 0.55);
}

.hrjust-db__chip {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 6px 10px;
  font-size: 12.5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  max-width: 100%;
  text-align: left;
}

.hrjust-db__chip span {
  opacity: 0.75;
  font-weight: 900;
}
.hrjust-db__chip:hover {
  background: rgba(10, 34, 59, 0.03);
}

.hrjust-db__advFoot {
  margin-top: -2px;
}

@media (max-width: 980px) {
  .hrjust-db__advancedGrid {
    grid-template-columns: 1fr;
  }
}

/* Options list (click to add) */
.hrjust-db__options {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  max-height: 170px;
  overflow: auto;
  display: grid;
}

.hrjust-db__opt {
  border: none;
  background: #fff;
  padding: 10px 10px;
  cursor: pointer;
  text-align: left;
  font-size: 13px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: rgba(11, 31, 51, 0.86);
}

.hrjust-db__opt:hover {
  background: rgba(10, 34, 59, 0.03);
}

.hrjust-db__pickerEmpty {
  padding: 10px;
  font-size: 12.5px;
  color: rgba(11, 31, 51, 0.6);
}

.hrjust-db__summaryBar--bottom {
  margin-top: 16px;
  padding-top: 10px;
  border-top: 1px solid var(--ig-border-soft);
}

/* Darker tone for the “text blocks” that have the left vertical line */
:deep(.hrjust-case__highlight),
:deep(.hrjust-case__party) {
  /* was: rgba(10, 34, 59, 0.03) */
  background: rgba(10, 34, 59, 0.07);
}

/* Optional: if you want the Summary bar and chips containers to match the darker tone */
.hrjust-db__summaryText,
.hrjust-db__chips {
  /* was: rgba(10, 34, 59, 0.03) / 0.02 */
  background: rgba(10, 34, 59, 0.06);
}

/* Optional: if you also want a bit more contrast on the code pill background */
:deep(.hrjust-case__code) {
  /* was: rgba(0, 0, 0, 0.06) */
  background: rgba(0, 0, 0, 0.10);
}

</style>
