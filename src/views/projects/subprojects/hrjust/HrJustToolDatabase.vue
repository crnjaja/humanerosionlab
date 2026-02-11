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

      <!-- =========================
           DETAIL VIEW — clean, linear, column-based like screenshot
           ========================= -->
      <div v-if="selectedCase" class="hrjust-detail">
        <div class="hrjust-detail__topbar">
          <button type="button" class="hrjust-detail__back" @click="closeCase()">
            ← Back to results
          </button>

          <div class="hrjust-detail__rightActions">
            <a
              v-if="safeUrl(selectedCase.external_case_link)"
              class="hrjust-detail__linkStrong"
              :href="safeUrl(selectedCase.external_case_link)"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to the full text of the decision ↗
            </a>
            <span v-else class="hrjust-detail__linkStrong hrjust-detail__linkStrong--empty">
              Link to the full text of the decision: Not provided
            </span>
          </div>
        </div>

        <!-- Title area (no box) -->
        <div class="hrjust-detail__heading">
          <h2 class="hrjust-detail__title">
            {{ selectedCase.case_name || 'Untitled case' }}
          </h2>

          <!-- Original title: show only when provided -->
          <div v-if="hasOriginalTitle(selectedCase)" class="hrjust-detail__subtitle">
            <span class="hrjust-detail__subtitleLabel">Original title</span>
            <span class="hrjust-detail__subtitleValue">
              {{ String(selectedCase.case_name_original).trim() }}
            </span>
          </div>

          <!-- light meta line -->
          <div class="hrjust-detail__metaLine">
            <span class="hrjust-detail__metaItem">
              <strong>Country:</strong>
              <span :class="{ 'is-empty': isEmptyLike(selectedCase.respondent_country) }">
                {{ displayValue(selectedCase.respondent_country, 'Unknown') }}
              </span>
            </span>

            <span class="hrjust-detail__metaDot">•</span>

            <span class="hrjust-detail__metaItem">
              <strong>Scope:</strong>
              <span :class="{ 'is-empty': isEmptyLike(selectedCase.nature_of_case) }">
                {{ displayValue(selectedCase.nature_of_case) }}
              </span>
            </span>

            <span class="hrjust-detail__metaDot">•</span>

            <span class="hrjust-detail__metaItem">
              <strong>Decision date:</strong>
              <span :class="{ 'is-empty': isEmptyLike(selectedCase.decision_date) }">
                {{ displayValue(selectedCase.decision_date) }}
              </span>
            </span>
          </div>
        </div>

        <!-- =========================
             CASE OVERVIEW
             ========================= -->
        <section class="hrjust-section">
          <div class="hrjust-section__bar">
            <h3 class="hrjust-section__title">Case overview</h3>
          </div>

          <div class="hrjust-dlGrid">
            <!-- Column 1 -->
            <div class="hrjust-dlCol">
              <div class="hrjust-dl">
                <div class="hrjust-dt">Country</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.respondent_country) }"
                >
                  {{ displayValue(selectedCase.respondent_country, 'Unknown') }}
                </div>
              </div>

              <!-- Case ID intentionally removed -->

              <div class="hrjust-dl">
                <div class="hrjust-dt">Proceeding #</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.proceeding_number) }"
                >
                  {{ displayValue(selectedCase.proceeding_number) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Decision date</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.decision_date) }"
                >
                  {{ displayValue(selectedCase.decision_date) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Submission year</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.submission_year) }"
                >
                  {{ displayValue(selectedCase.submission_year) }}
                </div>
              </div>
            </div>

            <!-- Column 2 -->
            <div class="hrjust-dlCol">
              <div class="hrjust-dl">
                <div class="hrjust-dt">Type of body</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.court_type) }"
                >
                  {{ displayValue(selectedCase.court_type) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Proceedings status</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.proceedings_status) }"
                >
                  {{ displayValue(selectedCase.proceedings_status) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Human rights involvement</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.humanrights_involvment) }"
                >
                  {{ displayValue(selectedCase.humanrights_involvment) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Court type</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.court_type) }"
                >
                  {{ displayValue(selectedCase.court_type) }}
                </div>
              </div>
            </div>

            <!-- Column 3 — Parties (single coherent style) -->
            <div class="hrjust-dlCol">
              <div class="hrjust-dl">
                <div class="hrjust-dt">Claimant type</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.claimant_type) }"
                >
                  {{ displayValue(selectedCase.claimant_type) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Claimant</div>
                <div class="hrjust-dd" :class="{ 'is-empty': isEmptyLike(selectedCase.claimant) }">
                  {{ displayValue(selectedCase.claimant) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Respondent type</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.respondent_type) }"
                >
                  {{ displayValue(selectedCase.respondent_type) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Respondent</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.respondent) }"
                >
                  {{ displayValue(selectedCase.respondent) }}
                </div>
              </div>
            </div>

            <!-- Column 4 -->
            <div class="hrjust-dlCol">
              <div class="hrjust-dl">
                <div class="hrjust-dt">Civil society engagement</div>
                <div class="hrjust-dd" :class="{ 'is-empty': !civilSocietyList.length }">
                  <template v-if="civilSocietyList.length">
                    <ul class="hrjust-inlineList">
                      <li v-for="(t, i) in civilSocietyList" :key="`cs-${i}`">{{ t }}</li>
                    </ul>
                  </template>
                  <template v-else>Not provided</template>
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Human rights catalogue</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': !asList(selectedCase.rights_catalogue).length }"
                >
                  <template v-if="asList(selectedCase.rights_catalogue).length">
                    <ul class="hrjust-inlineList">
                      <li v-for="(t, i) in asList(selectedCase.rights_catalogue)" :key="`rc-${i}`">
                        {{ t }}
                      </li>
                    </ul>
                  </template>
                  <template v-else>Not provided</template>
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Justification typology</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.justification_typology) }"
                >
                  {{ displayValue(selectedCase.justification_typology) }}
                </div>
              </div>

              <div class="hrjust-dl">
                <div class="hrjust-dt">Justification subtypology</div>
                <div
                  class="hrjust-dd"
                  :class="{ 'is-empty': isEmptyLike(selectedCase.justification_subtypology) }"
                >
                  {{ displayValue(selectedCase.justification_subtypology) }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- =========================
             CASE ANALYSIS
             ========================= -->
        <section class="hrjust-section">
          <div class="hrjust-section__bar">
            <h3 class="hrjust-section__title">Case analysis</h3>
          </div>

          <div class="hrjust-linear">
            <div class="hrjust-linearRow">
              <div class="hrjust-linearK">General summary</div>
              <div
                class="hrjust-linearV"
                :class="{ 'is-empty': isEmptyLike(selectedCase.summary) }"
              >
                {{ displayValue(selectedCase.summary, 'No summary provided.') }}
              </div>
            </div>

            <div class="hrjust-linearRow">
              <div class="hrjust-linearK">Violated rights</div>
              <div
                class="hrjust-linearV"
                :class="{ 'is-empty': isEmptyLike(selectedCase.humanrights_violated) }"
              >
                {{ displayValue(selectedCase.humanrights_violated) }}
              </div>
            </div>

            <div class="hrjust-linearRow">
              <div class="hrjust-linearK">Notes</div>
              <div class="hrjust-linearV" :class="{ 'is-empty': isEmptyLike(selectedCase.notes) }">
                {{ displayValue(selectedCase.notes) }}
              </div>
            </div>
          </div>
        </section>

        <!-- =========================
             REFERENCES
             ========================= -->
        <section class="hrjust-section">
          <div class="hrjust-section__bar">
            <h3 class="hrjust-section__title">References</h3>
          </div>

          <div class="hrjust-linear">
            <div class="hrjust-linearRow">
              <div class="hrjust-linearK">External case link</div>
              <div
                class="hrjust-linearV"
                :class="{ 'is-empty': !safeUrl(selectedCase.external_case_link) }"
              >
                <a
                  v-if="safeUrl(selectedCase.external_case_link)"
                  class="hrjust-link"
                  :href="safeUrl(selectedCase.external_case_link)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ safeUrl(selectedCase.external_case_link) }}
                </a>
                <span v-else>Not provided</span>
              </div>
            </div>

            <div class="hrjust-linearRow">
              <div class="hrjust-linearK">Literature reference</div>
              <div
                class="hrjust-linearV"
                :class="{ 'is-empty': !asLinks(selectedCase.literature_reference).length }"
              >
                <template v-if="asLinks(selectedCase.literature_reference).length">
                  <a
                    v-for="(u, i) in asLinks(selectedCase.literature_reference)"
                    :key="`lr-${i}`"
                    class="hrjust-link"
                    :href="u"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open source {{ i + 1 }}
                  </a>
                </template>
                <span v-else>Not provided</span>
              </div>
            </div>
          </div>
        </section>

        <details class="hrjust-raw">
          <summary class="hrjust-raw__sum">Show raw record</summary>
          <pre class="hrjust-raw__pre">{{ selectedCase }}</pre>
        </details>
      </div>

      <!-- =========================
           LIST VIEW (filters + results)
           ========================= -->
      <template v-else>
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
                  <div
                    v-if="!remainingOptions('civilSociety').length"
                    class="hrjust-db__pickerEmpty"
                  >
                    All selected.
                  </div>
                </div>
              </div>

              <!-- Human Rights -->
              <div class="hrjust-db__advCard">
                <div class="hrjust-db__advHead">
                  <div class="hrjust-db__advTitle">Human rights</div>
                  <button
                    type="button"
                    class="hrjust-db__advClear"
                    @click="filters.humanRights = []"
                  >
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
                  <div
                    v-if="!remainingOptions('humanRights').length"
                    class="hrjust-db__pickerEmpty"
                  >
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
            <button
              class="hrjust-db__pagerBtn"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
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

          <button class="hrjust-db__openBtn" type="button" @click="openCase(c)">
            Open full case →
          </button>
        </div>

        <!-- Bottom summary + pagination -->
        <div class="hrjust-db__summaryBar hrjust-db__summaryBar--bottom" aria-live="polite">
          <div class="hrjust-db__summaryText">
            Displaying {{ pageCountShown }} case notes of {{ filteredCases.length }} (Page
            {{ currentPage }} of {{ totalPages }})
          </div>

          <div class="hrjust-db__pager" v-if="totalPages > 1">
            <button
              class="hrjust-db__pagerBtn"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
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
      </template>
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
const selectedCase = ref(null)

function openCase(c) {
  selectedCase.value = c
  window?.scrollTo?.({ top: 0, behavior: 'smooth' })
}
function closeCase() {
  selectedCase.value = null
  window?.scrollTo?.({ top: 0, behavior: 'smooth' })
}

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
  if (field === 'civilSociety') source = options.value.civilSociety
  else if (field === 'humanRights') source = options.value.humanRights
  else if (field === 'justifications') source = options.value.justifications
  else source = options.value.subtopics
  return source.filter((x) => !selected.has(x))
}

const casesPerPage = ref(10)
const currentPage = ref(1)

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

function decisionIsValid(val) {
  const v = String(val || '')
    .toLowerCase()
    .trim()
  return v && v !== 'n/a' && v !== 'null' && v !== 'pending'
}

function alphaSort(a, b) {
  return String(a).localeCompare(String(b))
}
function capitalize(s = '') {
  const str = String(s)
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

function isEmptyLike(value) {
  const s = String(value ?? '').trim()
  if (!s) return true
  const v = s.toLowerCase()
  return v === 'n/a' || v === 'na' || v === 'null' || v === 'not provided' || v === 'pending'
}

function displayValue(value, emptyLabel = 'Not provided') {
  return isEmptyLike(value) ? emptyLabel : String(value)
}

function asList(value) {
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

function asLinks(value) {
  const v = String(value || '').trim()
  if (!v) return []
  const urls = v.match(/https?:\/\/[^\s)]+/g) || []
  return urls.map((u) => u.replace(/[),.;]+$/g, '').trim()).filter((u) => /^https?:\/\//i.test(u))
}

function safeUrl(value) {
  const links = asLinks(value)
  return links[0] || ''
}

function hasOriginalTitle(c) {
  return !isEmptyLike(c?.case_name_original)
}

/* =========================
   Civil society: add amici # next to "Amicus Curiae"
   ========================= */
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

/* =========================
   Options computed from dataset
   ========================= */
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

  const table = Array.isArray(db)
    ? db.find((d) => d.type === 'table' && d.name === 'climate_cases2')
    : null
  const rows = table?.data ?? []

  allCases.value = rows.filter((c) => c?.case_name && c.case_name !== 'case_name')
}

onMounted(async () => {
  await fetchCases()
})
</script>

<style scoped>
/* =========================
   MATCH your HRJUST look (square corners)
   Includes LIST VIEW + DETAIL VIEW (complete)
   ========================= */
.hrjust-db {
  --accent: var(--hrjust-accent-3, #d84b8b);
  --ig-border: var(--hrjust-border, rgba(10, 34, 59, 0.12));
  --ig-border-soft: var(--hrjust-border-soft, rgba(10, 34, 59, 0.08));
  --ig-accent: var(--accent);
  --ig-accent-2: var(--hrjust-accent-2, #002d47);
}

/* Tool frame */
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

.hrjust-tool__note {
  margin: 0;
  font-size: 13px;
  color: rgba(11, 31, 51, 0.78);
}

/* =========================
   LIST VIEW — Filters toolbar
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
  flex: 999 1 320px;
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
  padding-right: 44px;
}

.hrjust-db__searchIcon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
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

/* Buttons */
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

.hrjust-db__btn--ghost {
  border: 1px solid var(--ig-border-soft);
  background: transparent;
  color: rgba(11, 31, 51, 0.78);
}
.hrjust-db__btn--ghost:hover {
  background: rgba(10, 34, 59, 0.03);
}

/* Advanced */
.hrjust-db__advanced {
  margin-top: 10px;
  border-top: 1px solid var(--ig-border-soft);
  padding-top: 10px;
}

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

.hrjust-db__hint {
  font-size: 12px;
  color: rgba(11, 31, 51, 0.6);
}

/* Summary + pager */
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

.hrjust-db__summaryBar--bottom {
  margin-top: 16px;
  padding-top: 10px;
  border-top: 1px solid var(--ig-border-soft);
}

/* Cases list cards (LIST VIEW only) */
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

/* Summary block in list (keep your nice style here) */
:deep(.hrjust-case__highlight) {
  background: rgba(10, 34, 59, 0.06);
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

.hrjust-db__openBtn {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 8px 10px;
  cursor: pointer;
  font-size: 13px;
}
.hrjust-db__openBtn:hover {
  background: rgba(10, 34, 59, 0.03);
}

/* =========================
   DETAIL VIEW styles (flat like screenshot)
   ========================= */
.hrjust-detail {
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.hrjust-detail__topbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0 14px;
  border-bottom: 1px solid var(--ig-border-soft);
  margin-bottom: 14px;
}

.hrjust-detail__back {
  border: 1px solid var(--ig-border-soft);
  background: #fff;
  border-radius: 0;
  padding: 9px 12px;
  cursor: pointer;
  font-size: 13px;
}
.hrjust-detail__back:hover {
  background: rgba(10, 34, 59, 0.03);
}

.hrjust-detail__rightActions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.hrjust-detail__linkStrong {
  color: rgba(11, 31, 51, 0.92);
  font-weight: 900;
  font-size: 13px;
  text-decoration: none;
}
.hrjust-detail__linkStrong:hover {
  text-decoration: underline;
  color: var(--ig-accent);
}
.hrjust-detail__linkStrong--empty {
  color: rgba(11, 31, 51, 0.45);
  font-weight: 800;
}

.hrjust-detail__heading {
  margin-bottom: 10px;
}

.hrjust-detail__title {
  margin: 0;
  font-size: 22px;
  line-height: 1.25;
  font-weight: 950;
  color: rgba(11, 31, 51, 0.92);
}

.hrjust-detail__subtitle {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: baseline;
}

.hrjust-detail__subtitleLabel {
  font-size: 12px;
  font-weight: 850;
  color: rgba(11, 31, 51, 0.62);
  text-transform: uppercase;
  letter-spacing: 0.09em;
}

.hrjust-detail__subtitleValue {
  font-size: 13.5px;
  color: rgba(11, 31, 51, 0.82);
  font-style: italic;
}

.hrjust-detail__metaLine {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  color: rgba(11, 31, 51, 0.7);
  font-size: 13px;
}
.hrjust-detail__metaItem strong {
  color: rgba(11, 31, 51, 0.86);
  font-weight: 900;
}
.hrjust-detail__metaDot {
  opacity: 0.5;
}

.is-empty {
  color: rgba(11, 31, 51, 0.45);
}

/* Section bar */
.hrjust-section {
  margin-top: 18px;
}
.hrjust-section__bar {
  padding: 14px 0;
  border-top: 1px solid var(--ig-border-soft);
  border-bottom: 1px solid var(--ig-border-soft);
  margin-bottom: 14px;
}
.hrjust-section__title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  color: rgba(11, 31, 51, 0.92);
}

/* Flat columns list */
.hrjust-dlGrid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 26px;
}
.hrjust-dlCol {
  display: grid;
  gap: 16px;
}
.hrjust-dl {
  display: grid;
  gap: 5px;
}
.hrjust-dt {
  font-size: 13px;
  font-weight: 900;
  color: rgba(11, 31, 51, 0.86);
}
.hrjust-dd {
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(11, 31, 51, 0.8);
  word-break: break-word;
}
.hrjust-dd.is-empty {
  color: rgba(11, 31, 51, 0.45);
}

/* inline list */
.hrjust-inlineList {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 4px;
}

/* analysis (linear) */
.hrjust-linear {
  display: grid;
  gap: 16px;
}
.hrjust-linearRow {
  display: grid;
  gap: 6px;
}
.hrjust-linearK {
  font-size: 13px;
  font-weight: 900;
  color: rgba(11, 31, 51, 0.86);
}
.hrjust-linearV {
  font-size: 13.5px;
  line-height: 1.7;
  color: rgba(11, 31, 51, 0.8);
  text-align: justify;
  hyphens: auto;
}
.hrjust-linearV.is-empty {
  color: rgba(11, 31, 51, 0.45);
  text-align: left;
  hyphens: none;
}

/* links inside linear blocks */
.hrjust-link {
  color: var(--ig-accent);
  font-weight: 800;
  text-decoration: none;
  display: inline-block;
  margin-right: 10px;
}
.hrjust-link:hover {
  text-decoration: underline;
}

/* raw */
.hrjust-raw {
  margin-top: 18px;
  border-top: 1px solid var(--ig-border-soft);
  padding-top: 12px;
}
.hrjust-raw__sum {
  cursor: pointer;
  font-weight: 900;
  color: rgba(11, 31, 51, 0.86);
}
.hrjust-raw__pre {
  margin: 10px 0 0;
  padding: 12px;
  border: 1px solid var(--ig-border-soft);
  background: rgba(0, 0, 0, 0.06);
  border-radius: 0;
  overflow: auto;
  font-size: 12px;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 980px) {
  .hrjust-db__advancedGrid {
    grid-template-columns: 1fr;
  }

  .hrjust-db__field {
    min-width: 140px;
  }

  .hrjust-db__field--search {
    min-width: 200px;
  }
}

@media (max-width: 1200px) {
  .hrjust-dlGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 760px) {
  .hrjust-dlGrid {
    grid-template-columns: 1fr;
  }
}
</style>
