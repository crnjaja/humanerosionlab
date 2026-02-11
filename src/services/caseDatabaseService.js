// src/services/caseDatabaseService.js
import { computed, onMounted, reactive, ref, watch } from 'vue'

/* =========================
   Constants copied from your Joomla logic
   ========================= */
export const HUMAN_RIGHTS_KEYWORDS = {
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

export const CIVIL_SOCIETY_OPTIONS = [
  'Amicus Curiae',
  'NGOs as Claimants',
  'Supported by NGOs',
  'Public support',
  'Strategic Litigation',
  'Youth Activism',
]

export const SUBTOPICS = ['Trade & HR', 'Climate Change & HR']

/* =========================
   Pure helpers (exported so template can use them)
   ========================= */
export function normalizeClaimantType(val = '') {
  const v = String(val).toLowerCase()
  return v.replace('individuals', 'individual')
}

export function decisionIsValid(val) {
  const v = String(val || '')
    .toLowerCase()
    .trim()
  return v && v !== 'n/a' && v !== 'null' && v !== 'pending'
}

export function alphaSort(a, b) {
  return String(a).localeCompare(String(b))
}

export function capitalize(s = '') {
  const str = String(s)
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

export function isEmptyLike(value) {
  const s = String(value ?? '').trim()
  if (!s) return true
  const v = s.toLowerCase()
  return v === 'n/a' || v === 'na' || v === 'null' || v === 'not provided' || v === 'pending'
}

export function displayValue(value, emptyLabel = 'Not provided') {
  return isEmptyLike(value) ? emptyLabel : String(value)
}

export function asList(value) {
  const v = String(value || '').trim()
  if (!v) return []
  const parts = v
    .split(/[,;\n]+/g)
    .map((x) => x.trim())
    .filter(Boolean)

  const seen = new Set()
  const out = []
  for (const p of parts) {
    const key = p.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(p)
  }
  return out
}

export function asLinks(value) {
  const v = String(value || '').trim()
  if (!v) return []
  const urls = v.match(/https?:\/\/[^\s)]+/g) || []
  return urls.map((u) => u.replace(/[),.;]+$/g, '').trim()).filter((u) => /^https?:\/\//i.test(u))
}

export function safeUrl(value) {
  const links = asLinks(value)
  return links[0] || ''
}

export function hasOriginalTitle(c) {
  return !isEmptyLike(c?.case_name_original)
}

/* =========================
   Loader
   ========================= */
async function fetchCasesFromPublicJson(fileName = 'climate_cases2.json') {
  const base = import.meta.env.BASE_URL
  const url = `${base}${fileName}`
  const res = await fetch(url)
  const db = await res.json()

  const table = Array.isArray(db)
    ? db.find((d) => d.type === 'table' && d.name === 'climate_cases2')
    : null
  const rows = table?.data ?? []

  return rows.filter((c) => c?.case_name && c.case_name !== 'case_name')
}

/* =========================
   Main service/composable
   ========================= */
export function useCaseDatabase({
  jsonFile = 'climate_cases2.json',
  casesPerPageDefault = 10,
} = {}) {
  // State
  const allCases = ref([])
  const selectedCase = ref(null)

  // UI controls
  const showAdvanced = ref(false)
  const casesPerPage = ref(casesPerPageDefault)
  const currentPage = ref(1)

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

  // Actions
  function openCase(c) {
    selectedCase.value = c
    window?.scrollTo?.({ top: 0, behavior: 'smooth' })
  }

  function closeCase() {
    selectedCase.value = null
    window?.scrollTo?.({ top: 0, behavior: 'smooth' })
  }

  function toggleAdvanced() {
    showAdvanced.value = !showAdvanced.value
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

  // Computeds
  const civilSocietyList = computed(() => {
    const base = asList(selectedCase.value?.civil_society_engagement)
    if (!base.length) return []

    const nRaw = selectedCase.value?.amiciicuriae_number
    const n = isEmptyLike(nRaw) ? '' : String(nRaw).trim()

    const idx = base.findIndex((x) => x.toLowerCase().includes('amicus curiae'))
    if (idx === -1 || !n) return base

    const out = [...base]
    out[idx] = `${out[idx]} (${n})`
    return out
  })

  const options = computed(() => {
    const countries = new Set()
    const claimantTypes = new Set()
    const respondentTypes = new Set()
    const justifications = new Set()

    for (const c of allCases.value) {
      String(c.respondent_country || '')
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)
        .forEach((x) => countries.add(x))

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

  function remainingOptions(field) {
    const selected = new Set((filters[field] || []).map(String))
    let source
    if (field === 'civilSociety') source = options.value.civilSociety
    else if (field === 'humanRights') source = options.value.humanRights
    else if (field === 'justifications') source = options.value.justifications
    else source = options.value.subtopics
    return source.filter((x) => !selected.has(x))
  }

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

      const rightsCatalogue = String(c.rights_catalogue || '').toLowerCase()
      const matchRights = rights.every((label) => {
        const keywords = HUMAN_RIGHTS_KEYWORDS[label] || []
        return keywords.some((kw) => rightsCatalogue.includes(kw))
      })

      const justificationField = String(c.justification_typology || '').toLowerCase()
      const matchJustification = justs.every((j) => justificationField.includes(j))

      const isInternational = String(c.nature_of_case || '')
        .toLowerCase()
        .includes('international')

      let matchSubtopics = true
      if (subtopics.length === 1) {
        if (subtopics.includes('trade & hr')) matchSubtopics = isInternational
        else if (subtopics.includes('climate change & hr')) matchSubtopics = !isInternational
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

  // Reset page when filters change
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

  // Load
  async function fetchCases() {
    allCases.value = await fetchCasesFromPublicJson(jsonFile)
  }

  onMounted(fetchCases)

  return {
    // state
    allCases,
    selectedCase,
    showAdvanced,
    filters,
    casesPerPage,
    currentPage,

    // computed
    options,
    remainingOptions,
    filteredCases,
    paginatedCases,
    pageCountShown,
    totalPages,
    civilSocietyList,

    // actions
    openCase,
    closeCase,
    toggleAdvanced,
    resetAll,
    addChip,
    removeChip,

    // helpers for template
    isEmptyLike,
    displayValue,
    asList,
    asLinks,
    safeUrl,
    hasOriginalTitle,
  }
}
