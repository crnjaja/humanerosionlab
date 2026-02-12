<!-- ClimCo2AcademicParticipation.vue -->
<template>
  <div id="academic-participation" class="hrjust-content hrjust-academic">
    <!-- Header -->
    <header class="hrjust-acaHeader">
      <div class="hrjust-acaHeader__icon" aria-hidden="true">
        <i class="fas fa-user-graduate"></i>
      </div>

      <div class="hrjust-acaHeader__text">
        <p class="hrjust-acaHeader__kicker">ACADEMIC PARTICIPATION / ACTIVITIES</p>
        <h2 class="hrjust-acaHeader__title">Academic Participation</h2>
        <p class="hrjust-acaHeader__desc">
          Invited talks, expert contributions, mentoring, teaching, and participation in academic and policy-related events.
        </p>
      </div>
    </header>

    <!-- Controls -->
    <section class="hrjust-acaControls" aria-label="Academic participation filters">
      <div class="hrjust-acaControls__field">
        <i class="fas fa-search" aria-hidden="true"></i>
        <input
          v-model.trim="query"
          class="hrjust-acaControls__input"
          type="search"
          placeholder="Search role, person, institution, city…"
          aria-label="Search academic participation"
        />
      </div>

      <div class="hrjust-acaControls__field hrjust-acaControls__field--select">
        <i class="fas fa-filter" aria-hidden="true"></i>
        <select v-model="yearFilter" class="hrjust-acaControls__select" aria-label="Filter by year">
          <option value="">All years</option>
          <option v-for="y in availableYears" :key="y" :value="String(y)">{{ y }}</option>
        </select>
      </div>

      <button class="hrjust-acaControls__btn" type="button" @click="resetFilters" :disabled="!query && !yearFilter">
        <i class="fas fa-rotate-left" aria-hidden="true"></i>
        Reset
      </button>
    </section>

    <!-- List (grouped by year) -->
    <section class="hrjust-acaYears" aria-label="Academic participation list">
      <article v-for="group in groupedFiltered" :key="group.year" class="hrjust-acaYear">
        <div class="hrjust-acaYear__bar">
          <div class="hrjust-acaYear__barInner">
            <h3 class="hrjust-acaYear__title">{{ group.year }}</h3>
            <span class="hrjust-acaYear__count">{{ group.items.length }} activities</span>
          </div>
        </div>

        <div class="hrjust-acaList">
          <article
            v-for="item in group.items"
            :key="item.id"
            class="hrjust-acaCard"
            :data-year="item.year"
          >
            <!-- Icon “à cheval” -->
            <div class="hrjust-acaCard__icon" aria-hidden="true">
              <i :class="item.icon"></i>
            </div>

            <div class="hrjust-acaCard__top">
              <div class="hrjust-acaCard__topInner">
                <div class="hrjust-acaCard__roleWrap">
                  <span class="hrjust-acaCard__role">{{ item.role }}</span>

                  <span class="hrjust-acaCard__person">
                    <i class="fas fa-user" aria-hidden="true"></i>
                    {{ item.person }}
                  </span>

                  <!-- NEW: geographical info (only shown when available) -->
                  <span v-if="item.where" class="hrjust-acaCard__where">
                    <i class="fas fa-location-dot" aria-hidden="true"></i>
                    {{ item.where }}
                  </span>
                </div>

                <span class="hrjust-acaCard__metaYear">{{ item.year }}</span>
              </div>
            </div>

            <div class="hrjust-acaCard__inner">
              <p class="hrjust-acaCard__text">
                {{ item.text }}
              </p>

              <footer v-if="item.linkUrl" class="hrjust-acaMeta">
                <div class="hrjust-acaMeta__link">
                  <i class="fas fa-link" aria-hidden="true"></i>
                  <a
                    class="hrjust-acaMeta__a"
                    :href="item.linkUrl"
                    target="_blank"
                    rel="noopener"
                  >
                    {{ item.linkLabel || "Open link" }}
                  </a>
                </div>
              </footer>
            </div>
          </article>
        </div>
      </article>

      <!-- Empty state -->
      <article v-if="groupedFiltered.length === 0" class="hrjust-empty">
        <div class="hrjust-empty__title">No results</div>
        <p class="hrjust-empty__text">
          Try a different keyword or clear the year filter.
        </p>
      </article>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

/**
 * Notes:
 * - Data normalized from your Joomla HTML.
 * - Added:
 *   - where: geographical info when it is explicitly present in the original text
 *   - fixed: 2020 “Scholarship award” sub-entries were missing as separate records
 *   - fixed: removed duplicate 2017 PDD advisory committee record
 */

const items = [
  // ----------------
  // 2023
  // ----------------
  {
    id: '2023-cedaw-au-wcl',
    year: 2023,
    role: 'Invited speaker/expert',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Washington DC',
    text:
      'Thematic consultation designed to inform the drafting of the CEDAW Committee’s future General Recommendation No. 40 on the equal and inclusive representation of women in decision-making systems, Academy for Human Rights and Humanitarian Law at American University Washington College of Law, Washington DC.',
  },
  {
    id: '2023-medcop-tangiers',
    year: 2023,
    role: 'Invited speaker (CH Representative)',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Tangiers',
    text: 'MEDCOP Climate Forum, co-organized by the Government of Morocco, Tangiers.',
  },
  {
    id: '2023-neuchatel-mentor',
    year: 2023,
    role: 'Invited mentor',
    person: 'Elisa Fornalé',
    category: 'mentor',
    icon: 'fas fa-hands-helping',
    where: 'Neuchâtel',
    text: 'Migration and Im/Mobility in Times of Entangled Crises, Neuchâtel Graduate Conference.',
  },
  {
    id: '2023-aspire-steering-milan',
    year: 2023,
    role: 'Invited expert',
    person: 'Elisa Fornalé',
    category: 'committee',
    icon: 'fas fa-users-cog',
    where: 'Milan',
    text:
      'ASPIRe (Decision making of aspiring (re)migrants to and within the EU: The case of Labour Market-Leading Migrations from Asia) Horizon Europe, Steering Committee Meeting, University of Milan.',
  },
  {
    id: '2023-maritime-strategy-bern',
    year: 2023,
    role: 'Invited expert',
    person: 'Elisa Fornalé',
    category: 'expert',
    icon: 'fas fa-user-check',
    where: 'Bern',
    text: 'Maritime’ strategy launch, CH Department of Foreign Affairs, Bern.',
  },
  {
    id: '2023-amsterdam-temporalities',
    year: 2023,
    role: 'Invited speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Amsterdam',
    text: 'Time and Temporalities of Migration Law, University of Amsterdam.',
  },
  {
    id: '2023-prague-book-launch-empowerment',
    year: 2023,
    role: 'Invited speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Prague',
    text: 'Book Launch Women’s Empowerment and Its Limits, Institute of International Relations, Prague.',
  },
  {
    id: '2023-osce-prague-cedaw-gr40',
    year: 2023,
    role: 'Invited speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Prague',
    text: 'The CEDAW Draft General Recommendation on equal and inclusive representation of women in decision-making systems, OSCE Prague.',
  },
  {
    id: '2023-prague-uni-sea-level-rise',
    year: 2023,
    role: 'Invited lecturer',
    person: 'Elisa Fornalé',
    category: 'teaching',
    icon: 'fas fa-chalkboard-teacher',
    where: 'Prague',
    text: 'Sea Level Rise and International Law, Prague University.',
  },
  {
    id: '2023-salerno-gender-parity-polycrisis',
    year: 2023,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Salerno',
    text:
      "Climate Change and Gender Parity in Times of ‘Polycrisis’ (Parità di genere e cambiamenti climatici in tempi di ‘polycrisis’), International Conference ‘Dalla non discriminazione alle pari opportunità’, University of Salerno.",
  },
  {
    id: '2023-bern-migrants-ambientali',
    year: 2023,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Bern',
    text: 'Riconoscimento e protezione dei migranti ambientali: una sfida per l’Europa, Bern.',
  },
  {
    id: '2023-geneva-academy-moderator-cedaw',
    year: 2023,
    role: 'Moderator',
    person: 'Elisa Fornalé',
    category: 'moderation',
    icon: 'fas fa-comments',
    where: 'Geneva',
    text:
      'Equal and Inclusive Representation of Women in Decision-Making Systems: CEDAW’s Next General Recommendation, Geneva Academy of International Humanitarian Law.',
  },

  // ----------------
  // 2022
  // ----------------
  {
    id: '2022-naples-anthropocene',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Naples',
    text: 'Migration and Rights at the Time of the Anthropocene, University of Naples.',
  },
  {
    id: '2022-wto-gender-trade-book-launch',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text:
      'Book Launch “Gender Equality in the Mirror”, World Trade Congress on Gender and Trade, "Gender Equality for Sustainable Trade and Recovery" World Trade Organization.',
  },
  {
    id: '2022-bern-slow-violence',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Bern',
    text: 'Slow violence, Gender and Climate Change, University of Bern.',
  },
  {
    id: '2022-lisbon-sea-level-rise-preparing',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Lisbon',
    text: 'Preparing for Sea Level Rise, University of Lisbon.',
  },
  {
    id: '2022-venice-eu-directive-gbv',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Venice',
    text:
      'The Proposed EU Directive on Combating Gender-based Violence: Towards Greater Protection of Women in Europe?, University Cà Foscari Venice.',
  },
  {
    id: '2022-unwomen-igc-update',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text:
      'Climate Change and Gender: An Update from the Commission on the Status of Women, organized together with UN Women and International Gender Champions Initiative.',
  },
  {
    id: '2022-radboud-sea-level-rise',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text: 'Sea Level Rise and International Law, Radboud University.',
  },
  {
    id: '2022-naples-climate-justice',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Naples',
    text: 'Climate Justice, Naples University.',
  },
  {
    id: '2022-ila-lisbon-sea-level-rise',
    year: 2022,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Lisbon',
    text: 'Sea Level Rise and International Law, ILA Conference, Lisbon University.',
  },
  {
    id: '2022-emilia-romagna-keynote',
    year: 2022,
    role: 'Invited keynote',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Emilia-Romagna (Italy)',
    text: 'Climate Change, Region of Emilia-Romagna, Italy.',
  },
  {
    id: '2022-udine-vulnerabilite',
    year: 2022,
    role: 'Invited expert',
    person: 'Elisa Fornalé',
    category: 'expert',
    icon: 'fas fa-user-check',
    where: 'Udine',
    text:
      'La vulnérabilité dans la jurisprudence des cours européennes et dans l’activité des autorités indépendantes, University of Udine.',
  },

  // ----------------
  // 2021
  // ----------------
  {
    id: '2021-bern-wip-gender-studies',
    year: 2021,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Bern',
    text:
      'Unequal Participation: Clothing the Invisibility of Women at International Level, Work in Progress Gender Studies, University of Bern.',
  },
  {
    id: '2021-ila-ilw-disappearing-land',
    year: 2021,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text:
      'Disappearing Land and Displaced Persons: Climate Change and International Law, American Branch of the International Law Association’s International Law Weekend (ILW).',
  },
  {
    id: '2021-ila-co-rapporteur-draft-report',
    year: 2021,
    role: 'Co-rapporteur, Presentation of the Draft Report of the ILA Committee',
    person: 'Elisa Fornalé',
    category: 'committee',
    icon: 'fas fa-users-cog',
    where: null,
    text: 'Inter-sessional meeting of the ILA Committee on International Law and Sea Level Rise.',
  },
  {
    id: '2021-surrey-keynote-gender-identity-politics',
    year: 2021,
    role: 'Invited Keynote',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text: 'Gender, Identity & Politics: Representation, Exclusion and Vulnerability, University of Surrey.',
  },
  {
    id: '2021-trento-law-of-sea',
    year: 2021,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Trento',
    text:
      'Climate Change and Sea-Level Rise - Legal Consequences from the Law of the Sea, Statehood and Affected Persons Perspectives, University of Trento.',
  },
  {
    id: '2021-ila-statehood-rights-affected-populations',
    year: 2021,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text:
      'Statehood and the Rights of Affected Populations, inter-sessional meeting of 2021the ILA Committee on International Law and Sea Level Rise.',
  },
  {
    id: '2021-qmul-environmental-change-mobility',
    year: 2021,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text: 'Environmental Change and Human Mobility: The Legal Challenges, Faculty of Law, Queen Mary University.',
  },
  {
    id: '2021-ila-mapping-exercise',
    year: 2021,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text:
      'Human Mobility in the Context of Sea Level Rise: An Exploratory Mapping Exercise, Invited Lecture, inter-sessional meeting of the ILA Committee on International Law and Sea Level Rise.',
  },
  {
    id: '2021-ila-invited-participant-march',
    year: 2021,
    role: 'Invited Participant',
    person: 'Elisa Fornalé',
    category: 'participant',
    icon: 'fas fa-users',
    where: 'Online',
    text: 'Inter-sessional meeting of the ILA Committee on International Law and Sea Level Rise, March, on-line.',
  },
  {
    id: '2021-biicl-webinar-yildiz',
    year: 2021,
    role: 'Invited Speaker',
    person: 'Aylin Yildiz',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text: 'Webinar titled "Rising sea-levels and international law: The role of the International Law Commission", March.',
    linkUrl: 'https://www.biicl.org/events/11468/webinar-series-rising-sea-levels-promoting-climate-justice-through-international-law',
    linkLabel: 'BIICL event page',
  },
  {
    id: '2021-qmul-lecturer-environmental-migration',
    year: 2021,
    role: 'Invited Lecturer',
    person: 'Elisa Fornalé',
    category: 'teaching',
    icon: 'fas fa-chalkboard-teacher',
    where: 'Online',
    text: '“Environmental Migration”, Queen Mary University, February, on-line.',
  },
  {
    id: '2021-ila-mapping-exercise-jan',
    year: 2021,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Online',
    text:
      'Human Mobility in the Context of Sea Level Rise: An Exploratory Mapping Exercise, inter-sessional meeting of the ILA Committee on International Law and Sea Level Rise, January, on-line.',
  },

  // ----------------
  // 2020
  // ----------------
  {
    id: '2020-ila-participant-oct',
    year: 2020,
    role: 'Invited Participant',
    person: 'Elisa Fornalé',
    category: 'participant',
    icon: 'fas fa-users',
    where: 'Online',
    text: 'Inter-sessional meeting of the ILA Committee on International Law and Sea Level Rise, 5 October, on-line.',
    linkUrl: 'https://www.fni.no/news/sea-level-rise-and-international-law',
    linkLabel: 'FNI news',
  },
  {
    id: '2020-yildiz-scholarship-ila-kyoto',
    year: 2020,
    role: 'Scholarship award',
    person: 'Aylin Yildiz',
    category: 'award',
    icon: 'fas fa-award',
    where: 'Kyoto (Japan)',
    text: 'Awarded the scholarship from the International Law Association 79th Biennial Conference Kyoto, Japan.',
  },
  // NEW: extracted sub-entries from the original HTML (not invented, explicitly listed)
  {
    id: '2020-ila-study-group-rights-child-migration',
    year: 2020,
    role: 'Invited Speaker',
    person: 'Aylin Yildiz',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Online',
    text:
      'Meeting of the ILA Study Group on Cross-Border Violations of the Rights of the Child in Migration. 13 December 2020, on-line.',
  },
  {
    id: '2020-ila-79th-biennial-closing-plenary',
    year: 2020,
    role: 'Invited Speaker',
    person: 'Aylin Yildiz',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Online',
    text: 'Closing Plenary of the ILA 79th Biennial Conference. 8 December 2020, on-line.',
  },
  {
    id: '2020-yildiz-teaching-assistant-nus',
    year: 2020,
    role: 'Teaching Assistant',
    person: 'Aylin Yildiz',
    category: 'teaching',
    icon: 'fas fa-chalkboard-teacher',
    where: 'Online',
    text:
      'eAcademy of the Centre for International Law, National University of Singapore. September-December 2020. (Includes invited speaking role at the closing ceremony of the Centre for International Law eAcademy, National University of Singapore. 16 December 2020, on-line.)',
    linkUrl: 'https://cil.nus.edu.sg/event/e-academy-2020/',
    linkLabel: 'NUS CIL eAcademy',
  },
  {
    id: '2020-perugia-human-rights-climate',
    year: 2020,
    role: 'Invited Lecturer',
    person: 'Elisa Fornalé',
    category: 'teaching',
    icon: 'fas fa-chalkboard-teacher',
    where: 'Perugia',
    text: '“Human rights and climate change”, University of Perugia, May.',
  },
  {
    id: '2020-hours-of-crisis-hague',
    year: 2020,
    role: 'Contestant at the "Hours of Crisis" competition',
    person: 'Aylin Yildiz',
    category: 'award',
    icon: 'fas fa-award',
    where: 'The Hague',
    text:
      'Held at the Hague Academy of International Law, 18 January. Aylin Yildiz’s team received the runner-up awards for the "Best Negotiating Team" and the "Best Written Advice".',
  },

  // ----------------
  // 2019
  // ----------------
  {
    id: '2019-naples-legal-gaps-environmental-migration',
    year: 2019,
    role: 'Invited Lecturer',
    person: 'Elisa Fornalé',
    category: 'teaching',
    icon: 'fas fa-chalkboard-teacher',
    where: 'Naples',
    text: '“Would be worse? An introduction to legal gaps in the context of environmental migration”, University of Naples, December.',
  },
  {
    id: '2019-ila-participant-madrid',
    year: 2019,
    role: 'Invited participant',
    person: 'Elisa Fornalé',
    category: 'participant',
    icon: 'fas fa-users',
    where: 'Madrid',
    text: 'Inter-sessional meeting of the ILA Committee on International Law and Sea Level Rise, University of Madrid, 10 November.',
    linkUrl: 'https://www.fni.no/news/sea-level-rise-and-international-law',
    linkLabel: 'FNI news',
  },
  {
    id: '2019-ohchr-dialogues-geneva',
    year: 2019,
    role: 'Invited expert/facilitator',
    person: 'Elisa Fornalé',
    category: 'expert',
    icon: 'fas fa-user-check',
    where: 'Geneva',
    text: 'Human Rights and Climate Change Dialogues, UN High Commissioner for Human Rights, Geneva, 5 November.',
  },
  {
    id: '2019-wti-colloquium-yildiz',
    year: 2019,
    role: 'Oral Presentations',
    person: 'Aylin Yildiz',
    category: 'presentation',
    icon: 'fas fa-file-alt',
    where: 'Bern',
    text:
      '“Migration, Trade and Environmental Changes”, presented at the PhD Colloquium | World Trade Institute, the University of Bern, Switzerland, November.',
  },
  {
    id: '2019-gi-geneva-planned-relocation-fiji',
    year: 2019,
    role: 'Paper Presentation',
    person: 'Aylin Yildiz',
    category: 'presentation',
    icon: 'fas fa-file-alt',
    where: 'Geneva',
    text:
      '“Planned Relocation in the Context of Climate Change: A Case Study of Fiji”, presented at the event titled “Paths Panel II - the Authority of Legal Instruments: Perspectives from IHL and Environmental Law” | The Graduate Institute of Geneva, Switzerland, May.',
  },
  {
    id: '2019-ec-dg-home-drr',
    year: 2019,
    role: 'Invited expert/speaker',
    person: 'Elisa Fornalé',
    category: 'expert',
    icon: 'fas fa-user-check',
    where: 'Brussels',
    text: 'Cluster on Disaster Risk Reduction and Resilience, DG Home, European Commission, Brussels, 25 March.',
  },
  {
    id: '2019-sinking-islands-space-settlement',
    year: 2019,
    role: 'Oral Presentations',
    person: 'Aylin Yildiz',
    category: 'presentation',
    icon: 'fas fa-file-alt',
    where: null,
    text:
      '“Wild Human Mobility Operations: The “Sinking Islands” and Space Settlement”, presented at the conference titled “Connecting Environmental Changes and Human Mobility as a Way to Draw New Maps of Knowledge” | Congressi Stefano Franscini, Switzerland, March.',
  },
  {
    id: '2019-mpi-poster-banabans',
    year: 2019,
    role: 'Poster Presentations',
    person: 'Aylin Yildiz',
    category: 'poster',
    icon: 'fas fa-thumbtack',
    where: 'Germany',
    text:
      '“Banabans”, presented at the workshop titled “Representations of Migration and Emotions of Exclusion” | Max Planck Institute for Human Development, Germany, March.',
  },
  {
    id: '2019-hague-doctoral-networking-common-concern',
    year: 2019,
    role: 'Oral Presentations',
    person: 'Aylin Yildiz',
    category: 'presentation',
    icon: 'fas fa-file-alt',
    where: 'The Netherlands',
    text:
      '“Understanding Migration in the Context of Climate Change Under the Doctrine of Common Concern of Humankind”, presented at the doctoral networking meetings | The Hague Academy of International Law, the Netherlands, January.',
  },

  // ----------------
  // 2018
  // ----------------
  {
    id: '2018-naples-migration-governance-local-authorities',
    year: 2018,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Naples',
    text:
      'At the “Migration Governance Issues: Local Authorities at the Front Line in Times of Climate Change and Security”, Training for Local Authorities, University of Naples and the Municipality of Naples, December.',
  },
  {
    id: '2018-vunidogoloa-relocation-fiji',
    year: 2018,
    role: 'Oral Presentations',
    person: 'Aylin Yildiz',
    category: 'presentation',
    icon: 'fas fa-file-alt',
    where: 'Italy',
    text:
      '“Vunidogoloa Village as the First Climate-Induced Community Relocation in Fiji”, presented at the training titled “Loss, Damage and Mobility in the Context of Climate Change” | Project of Climate Security with Local Authorities, Italy, December.',
  },
  {
    id: '2018-piedmont-local-authorities',
    year: 2018,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Piedmont',
    text:
      'At the “Migration Governance Issues: Local Authorities at the Front Line in Times of Climate Change and Security”, Training for Local Authorities, Region of Piedmont, September.',
  },
  {
    id: '2018-wti-phd-colloquium-common-concern',
    year: 2018,
    role: 'Oral Presentations',
    person: 'Aylin Yildiz',
    category: 'presentation',
    icon: 'fas fa-file-alt',
    where: 'Bern',
    text:
      '“Human Mobility in the Context of Climate Change: A Common Concern Approach”, presented at the PhD Colloquium | World Trade Institute, the University of Bern, Switzerland, September.',
  },
  {
    id: '2018-freiburg-environment-conflict',
    year: 2018,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text: 'At the Workshop on “Environment and Conflict: Exploring Interdependencies”, organized by University of Freiburg, June.',
  },
  {
    id: '2018-usp-fiji-ecological-justice',
    year: 2018,
    role: 'Oral Presentations',
    person: 'Aylin Yildiz',
    category: 'presentation',
    icon: 'fas fa-file-alt',
    where: 'Fiji',
    text:
      '“A legal Challenge for Ecological Justice: What is our Common Normative Framework?”, presented at the conference titled “The 4th International Conference on Sustainable Alternatives for Poverty Reduction and Ecological Justice” | University of the South Pacific, Fiji, June.',
  },
  {
    id: '2018-bogis-bossey-pdd-stakeholder',
    year: 2018,
    role: 'Invited Speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Bogis-Bossey (CH)',
    text:
      'Task Force on Displacement Stakeholder Meeting on “Recommendations for Integrated Approaches to Avert, Minimize and Address Displacement Related to the Adverse Impacts of Climate Change”, in Bogis-Bossey (CH), May.',
  },
  {
    id: '2018-acuns-annual-meeting-human-rights',
    year: 2018,
    role: 'Selected speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text:
      'At the ACUNS (Academic Council on the United Nations Systems) Annual Meeting on Human Rights, Migration, and Global Governance, July. participated in a panel on Climate Change and Human Development with a paper on “Framing Human Mobility and Environmental Changes and as a Matter of ‘Common Concern’, July.',
  },

  // ----------------
  // 2017
  // ----------------
  {
    id: '2017-un-thematic-session-regular-pathways',
    year: 2017,
    role: 'Invited expert',
    person: 'Elisa Fornalé',
    category: 'expert',
    icon: 'fas fa-user-check',
    where: null,
    text:
      'At the United Nations Thematic Session “Irregular Migration and Regular Pathways, Including Decent Work, Labour Mobility, Recognition of Skills and Qualifications and Other Relevant Measures”, 13 October 2017.',
    linkUrl:
      'http://webtv.un.org/search/panel-3-recognition-of-skills-6th-informal-thematic-session-global-compact-onmigration/5608331138001',
    linkLabel: 'UN WebTV',
  },
  {
    id: '2017-pdd-advisory-committee-geneva',
    year: 2017,
    role: 'Invited expert',
    person: 'Elisa Fornalé',
    category: 'expert',
    icon: 'fas fa-user-check',
    where: 'Geneva',
    text: 'Advisory Committee Meeting of the Platform on Disaster Displacement, Geneva, October.',
  },
  {
    id: '2017-freiburg-workshop-state-sovereignty',
    year: 2017,
    role: 'Invited participant',
    person: 'Elisa Fornalé',
    category: 'participant',
    icon: 'fas fa-users',
    where: null,
    text:
      'At the workshop “Challenging State Sovereignty in the Age of Migration: A multilevel Approach to Southeast and East Asian Migration”, organized by Prof. Nicola Piper of Freiburg University.',
  },
  {
    id: '2017-ecpr-oslo-discussant',
    year: 2017,
    role: 'Invited discussant',
    person: 'Elisa Fornalé',
    category: 'moderation',
    icon: 'fas fa-comments',
    where: 'Oslo (Norway)',
    text:
      'In two panels: "Luck, Migration, and Human Rights" and "Transnational Migrants and Access to Social Rights. Social Citizenship Strategies in Blurred Spaces of Belonging", ECPR General Conference, Norway, Oslo, September.',
  },
  {
    id: '2017-euresearch-migration-h2020',
    year: 2017,
    role: 'Invited speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: null,
    text: 'Euresearch Event “Migration in Horizon 2020”, September.',
  },
  {
    id: '2017-researchers-night-bern-poster',
    year: 2017,
    role: 'Poster Presentations',
    person: 'Elisa Fornalé, Aylin Yildiz and Najma Rehouma',
    category: 'poster',
    icon: 'fas fa-thumbtack',
    where: 'Bern',
    text:
      '“Framing Environmental Degradation, Labour Mobility and Human Development as a Matter of Common Concern”, presented at the event titled “Nacht der Forschung: Researchers’ Night” | University of Bern, Switzerland, September.',
  },
  {
    id: '2017-side-event-local-authorities-inclusion',
    year: 2017,
    role: 'Invited participant',
    person: 'Elisa Fornalé',
    category: 'participant',
    icon: 'fas fa-users',
    where: 'Geneva',
    text:
      'Side event on ‘The Role of Local Authorities in Promoting Inclusion of Refugees and Migrants’ during the first informal thematic session on “Human Rights of all Migrants, Social Inclusion, Cohesion and all Forms of Discrimination, Including Racism, Xenophobia and Intolerance” in the framework of the intergovernmental consultations and negotiations for the preparation of the Global compact for safe, orderly and regular migration, as envisaged by the 2016 New York Declaration for Refugees and Migrants, Geneva, May.',
  },
  {
    id: '2017-pacific-paradise-conference',
    year: 2017,
    role: 'Invited speaker',
    person: 'Elisa Fornalé',
    category: 'speaker',
    icon: 'fas fa-microphone-alt',
    where: 'Bern',
    text:
      'Mapping Environmental Degradation, Human Mobility and Human Development: The Challenges in the Pacific Region, International Conference “Studies of Paradise: Where language meets culture in the Pacific”, University of Bern, 9–10 March 2017.',
  },
  {
    id: '2017-multi-level-approach-bern',
    year: 2017,
    role: 'Invited discussant',
    person: 'Elisa Fornalé',
    category: 'moderation',
    icon: 'fas fa-comments',
    where: 'Bern',
    text: 'Migration Governance in an Era of Large Movements: A Multi-Level Approach, Switzerland, Bern, February.',
  },
]

const query = ref('')
const yearFilter = ref('')

const availableYears = computed(() => {
  const ys = [...new Set(items.map((i) => i.year))].sort((a, b) => b - a)
  return ys
})

const filtered = computed(() => {
  const q = query.value.toLowerCase()
  const yf = yearFilter.value ? Number(yearFilter.value) : null

  return items.filter((i) => {
    const matchesYear = yf ? i.year === yf : true
    const hay = `${i.role} ${i.person} ${i.where || ''} ${i.text}`.toLowerCase()
    const matchesQuery = q ? hay.includes(q) : true
    return matchesYear && matchesQuery
  })
})

const groupedFiltered = computed(() => {
  const map = new Map()
  for (const i of filtered.value) {
    if (!map.has(i.year)) map.set(i.year, [])
    map.get(i.year).push(i)
  }

  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, list]) => ({
      year,
      items: list,
    }))
})

function resetFilters() {
  query.value = ''
  yearFilter.value = ''
}
</script>

<style scoped>
/* Square corners, consistent with your modern style */
.hrjust-academic {
  --accent: #195190;            /* from your Joomla title color */
  --accent-2: #009499;          /* from your Joomla year + separator */
  --accent-top-a: rgba(25, 81, 144, 0.14);
  --accent-top-b: rgba(25, 81, 144, 0.06);

  --card: #ffffff;
  --border-soft: rgba(10, 34, 59, 0.08);
  --border: rgba(10, 34, 59, 0.12);
  --shadow: 0 1px 0 rgba(10, 34, 59, 0.04), 0 10px 22px rgba(10, 34, 59, 0.06);
  --shadow-hover: 0 2px 0 rgba(10, 34, 59, 0.05), 0 16px 34px rgba(10, 34, 59, 0.1);

  display: grid;
  gap: 16px;
}

/* Header */
.hrjust-acaHeader {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  margin-bottom: 2px;
}

.hrjust-acaHeader__icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border-soft);
  background: #fff;
}

.hrjust-acaHeader__icon i {
  font-size: 20px;
  color: var(--accent);
}

.hrjust-acaHeader__kicker {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(11, 31, 51, 0.62);
}

.hrjust-acaHeader__title {
  margin: 0;
  font-size: 19px;
  letter-spacing: -0.02em;
  color: rgba(11, 31, 51, 0.96);
}

.hrjust-acaHeader__desc {
  margin: 6px 0 0;
  font-size: 14px;
  color: rgba(11, 31, 51, 0.72);
  max-width: 62rem;
  text-align: justify;
}

/* Controls */
.hrjust-acaControls {
  display: grid;
  grid-template-columns: 1fr 220px auto;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border: 1px solid var(--border-soft);
  background: #fff;
  box-shadow: 0 1px 0 rgba(10, 34, 59, 0.03);
}

.hrjust-acaControls__field {
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  padding: 10px 10px;
  border: 1px solid var(--border-soft);
  background: rgba(25, 81, 144, 0.03);
}

.hrjust-acaControls__field i {
  font-size: 13px;
  color: rgba(11, 31, 51, 0.66);
}

.hrjust-acaControls__input {
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: rgba(11, 31, 51, 0.92);
}

.hrjust-acaControls__field--select {
  grid-template-columns: 18px minmax(0, 1fr);
}

.hrjust-acaControls__select {
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  font-size: 13.5px;
  color: rgba(11, 31, 51, 0.92);
  appearance: none;
}

.hrjust-acaControls__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--border-soft);
  background: #fff;
  font-weight: 800;
  font-size: 12.5px;
  color: rgba(11, 31, 51, 0.9);
  cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}

.hrjust-acaControls__btn:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: var(--border);
  box-shadow: 0 10px 22px rgba(10, 34, 59, 0.08);
}

.hrjust-acaControls__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Years wrapper */
.hrjust-acaYears {
  display: grid;
  gap: 14px;
}

/* Year section bar */
.hrjust-acaYear {
  border: 1px solid var(--border-soft);
  background: #fff;
  box-shadow: 0 1px 0 rgba(10, 34, 59, 0.03);
}

.hrjust-acaYear__bar {
  background: linear-gradient(90deg, rgba(0, 148, 153, 0.16), rgba(0, 148, 153, 0.06));
  border-bottom: 1px solid var(--border-soft);
}

.hrjust-acaYear__barInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
}

.hrjust-acaYear__title {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: -0.01em;
  color: rgba(11, 31, 51, 0.98);
}

.hrjust-acaYear__count {
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(11, 31, 51, 0.66);
}

.hrjust-acaList {
  display: grid;
  gap: 12px;
  padding: 12px;
}

/* Card (mirrors your publication cards) */
.hrjust-acaCard {
  position: relative;
  background: var(--card);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow);
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.hrjust-acaCard:hover {
  transform: translateY(-2px);
  border-color: var(--border);
  box-shadow: var(--shadow-hover);
}

/* Icon “à cheval” */
.hrjust-acaCard__icon {
  position: absolute;
  left: 16px;
  top: 12px;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  background: #ffffff;
  border: 1px solid rgba(10, 34, 59, 0.12);
  z-index: 2;
}

.hrjust-acaCard__icon i {
  font-size: 18px;
  color: rgba(0, 45, 71, 0.95);
}

.hrjust-acaCard__top {
  background: linear-gradient(90deg, var(--accent-top-a), var(--accent-top-b));
  border-bottom: 1px solid var(--border-soft);
}

.hrjust-acaCard__topInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 14px 10px 70px; /* space reserved for icon */
}

.hrjust-acaCard__roleWrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
}

.hrjust-acaCard__role {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(11, 31, 51, 0.92);
  border-left: 3px solid var(--accent-2);
  padding-left: 10px;
}

.hrjust-acaCard__person {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(11, 31, 51, 0.78);
}

.hrjust-acaCard__person i {
  font-size: 13px;
  color: rgba(0, 77, 119, 0.95);
}

/* NEW: where pill next to person */
.hrjust-acaCard__where {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 800;
  color: rgba(11, 31, 51, 0.74);
}

.hrjust-acaCard__where i {
  font-size: 13px;
  color: rgba(0, 77, 119, 0.95);
}

.hrjust-acaCard__metaYear {
  font-size: 12px;
  font-weight: 850;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(11, 31, 51, 0.66);
}

.hrjust-acaCard__inner {
  padding: 14px 16px 14px;
}

.hrjust-acaCard__text {
  margin: 0;
  font-size: 13.5px;
  color: rgba(11, 31, 51, 0.78);
  line-height: 1.6;
  text-align: justify;
}

/* Meta link */
.hrjust-acaMeta {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border-soft);
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  font-size: 12.5px;
  color: rgba(11, 31, 51, 0.78);
}

.hrjust-acaMeta__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hrjust-acaMeta__link i {
  font-size: 13px;
  color: rgba(0, 77, 119, 0.95);
}

.hrjust-acaMeta__a {
  color: rgba(0, 45, 71, 0.98);
  text-decoration: underline;
  font-weight: 800;
}

.hrjust-acaMeta__a:hover {
  color: #8a0a2c;
}

/* Empty state */
.hrjust-empty {
  border: 1px solid var(--border-soft);
  background: #fff;
  box-shadow: 0 1px 0 rgba(10, 34, 59, 0.03);
  padding: 16px;
  display: grid;
  gap: 8px;
}

.hrjust-empty__title {
  font-size: 14px;
  font-weight: 900;
  color: rgba(11, 31, 51, 0.95);
}

.hrjust-empty__text {
  margin: 0;
  font-size: 13.5px;
  color: rgba(11, 31, 51, 0.72);
  text-align: justify;
}

/* Responsive */
@media (max-width: 980px) {
  .hrjust-acaControls {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hrjust-acaHeader {
    grid-template-columns: minmax(0, 1fr);
  }

  .hrjust-acaHeader__icon {
    order: -1;
  }

  .hrjust-acaCard__topInner {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 62px;
  }

  .hrjust-acaYear__barInner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
