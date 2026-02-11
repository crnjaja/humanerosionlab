<template>
  <div class="hrjust-content hrjust-db">
    <header class="hrjust-content__head"></header>

    <div class="hrjust-tool hrjust-tool--db">
      <!-- =========================
           DETAIL VIEW — clean, linear, column-based like screenshot
           ========================= -->
      <div v-if="selectedCase" class="hrjust-detail">
        <div class="hrjust-detail__topbar">
          <button type="button" class="hrjust-detail__back" @click="closeCase()">
            ← Back to results
          </button>
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
import { useCaseDatabase } from '@/services/caseDatabaseService'

const {
  // state
  selectedCase,
  showAdvanced,
  filters,
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

  // helpers
  isEmptyLike,
  displayValue,
  asList,
  asLinks,
  safeUrl,
  hasOriginalTitle,
} = useCaseDatabase({
  jsonFile: 'climate_cases2.json',
  casesPerPageDefault: 10,
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
