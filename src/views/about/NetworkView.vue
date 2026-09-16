<template>
  <div class="network-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            CURRENT PROJECT
          </div>

          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            Explore <span class="accent">our Network</span>
          </h1>

          <p class="hero-subtitle">
            Partner institutions and advisors supporting the Human Erosion Lab.
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
        <div class="network-hero-offset">
          <section class="network-section" aria-labelledby="partners-title">
            <div class="section-topline">
              <div>
                <h2 id="partners-title" class="section-heading">Partners</h2>
              </div>
            </div>

            <ul class="partner-grid" aria-label="Partner institutions">
              <li v-for="partner in partners" :key="partner.key" class="partner-card">
                <a
                  class="partner-link"
                  :href="partner.url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="`Visit ${partner.name}`"
                >
                  <div class="partner-logo-wrap">
                    <img
                      class="partner-logo"
                      :class="partner.logoClass"
                      :src="partner.logo"
                      :alt="`${partner.name} logo`"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div class="partner-content">
                    <span class="partner-eyebrow">{{ partner.type }}</span>
                    <h3 class="partner-name">{{ partner.name }}</h3>
                    <p class="partner-text">{{ partner.description }}</p>
                  </div>

                  <span class="partner-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <div class="spacer" aria-hidden="true"></div>

          <section class="network-section" aria-labelledby="advisory-title">
            <div class="section-topline">
              <div>
                <h2 id="advisory-title" class="section-heading">Advisors</h2>
              </div>
            </div>

            <div class="advisor-showcase" aria-label="Advisory board profiles">
              <aside class="advisor-bio-stage" aria-live="polite">
                <div class="advisor-bio-card" :key="selectedAdvisor.key">
                  <span class="advisor-bio-kicker">Advisor profile</span>

                  <div class="advisor-bio-top">
                    <div class="advisor-bio-avatar" :data-initials="initials(selectedAdvisor.name)">
                      <img
                        v-if="selectedAdvisor.photo"
                        :src="selectedAdvisor.photo"
                        :alt="portraitAlt(selectedAdvisor)"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div class="advisor-bio-heading">
                      <h3 class="advisor-bio-name">{{ selectedAdvisor.name }}</h3>

                      <div class="advisor-bio-actions" aria-label="Advisor contact links">
                        <a
                          class="advisor-bio-action"
                          :class="{ 'is-disabled': !selectedAdvisor.email }"
                          :href="selectedAdvisor.email ? mailto(selectedAdvisor.email) : undefined"
                          :aria-label="
                            selectedAdvisor.email
                              ? emailAriaLabel(selectedAdvisor)
                              : `${selectedAdvisor.name} has no email listed`
                          "
                          :aria-disabled="!selectedAdvisor.email"
                          :title="selectedAdvisor.email || 'No email listed'"
                          @click="guardMissingLink"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M4 6h16v12H4z"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linejoin="round"
                            />
                            <path
                              d="m4 7 8 6 8-6"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </a>

                        <a
                          class="advisor-bio-action"
                          :class="{ 'is-disabled': !hasLinkedIn(selectedAdvisor) }"
                          :href="
                            hasLinkedIn(selectedAdvisor) ? selectedAdvisor.linkedin : undefined
                          "
                          :target="hasLinkedIn(selectedAdvisor) ? '_blank' : undefined"
                          :rel="hasLinkedIn(selectedAdvisor) ? 'noopener' : undefined"
                          :aria-label="
                            hasLinkedIn(selectedAdvisor)
                              ? linkedinAriaLabel(selectedAdvisor)
                              : `${selectedAdvisor.name} has no LinkedIn listed`
                          "
                          :aria-disabled="!hasLinkedIn(selectedAdvisor)"
                          :title="
                            hasLinkedIn(selectedAdvisor) ? 'LinkedIn profile' : 'No LinkedIn listed'
                          "
                          @click="guardMissingLink"
                        >
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M6.5 9.5V19M6.5 6.4v.1M10.5 19v-9.5M10.5 13.2c0-2.2 1.35-3.9 3.65-3.9 2.1 0 3.35 1.35 3.35 3.85V19"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <p class="advisor-bio-text">{{ selectedAdvisor.bio }}</p>

                  <div class="advisor-bio-institution">
                    <span class="advisor-bio-logo-wrap">
                      <img
                        class="advisor-bio-logo"
                        :src="advisorLogo(selectedAdvisor)"
                        :alt="`${advisorInstitutionName(selectedAdvisor)} logo`"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span class="advisor-bio-institution-copy">
                      <span class="advisor-bio-institution-label">Institution</span>
                      <span class="advisor-bio-institution-name">
                        {{ advisorInstitutionName(selectedAdvisor) }}
                      </span>
                      <span
                        v-if="advisorInstitutionPlace(selectedAdvisor)"
                        class="advisor-bio-institution-place"
                      >
                        {{ advisorInstitutionPlace(selectedAdvisor) }}
                      </span>
                    </span>
                  </div>
                </div>
              </aside>

              <ul class="advisor-profile-grid" aria-label="Advisory board members">
                <li v-for="member in advisoryBoard" :key="member.key" class="advisor-profile-item">
                  <button
                    class="advisor-profile-button"
                    type="button"
                    :class="{ 'is-active': selectedAdvisor.key === member.key }"
                    :aria-pressed="selectedAdvisor.key === member.key"
                    @click="selectAdvisor(member)"
                  >
                    <span class="advisor-avatar" :data-initials="initials(member.name)">
                      <img
                        v-if="member.photo"
                        :src="member.photo"
                        :alt="portraitAlt(member)"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>

                    <span class="advisor-name" :title="member.name">{{ member.name }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'
import { advisoryBoard as advisoryBoardData } from '@/data/team.data'
import { TeamService } from '@/services/TeamService'
import '@/assets/pages/network.css'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

const partners = [
  {
    key: 'intersect-observatory',
    name: 'Intersect Observatory',
    type: 'Observatory',
    description:
      'Developed within the Horizon Europe HRJust project, the Intersect Observatory explores how States use human rights justifications in situations involving climate change, COVID and migration through a gender and intersectionality lens. This digital living lab collects and disseminates knowledge while highlighting regulatory and legal gaps in human rights protection across these interconnected areas.',
    logo: '/images/logos/network/hrjust.png',
    url: 'https://hrjust-intersect-observatory.eu/',
  },
  {
    key: 'unruly-nature',
    name: 'Unruly Nature',
    type: 'Collective',
    description:
      'Unruly Nature is a collaborative research project exploring socio-natural relations through Political Geography, Environmental Humanities, Natural Sciences, Design, Philosophy, Critical Theory and Visual Arts. This interdisciplinary initiative fosters dialogue, research collaboration and public awareness around environmental issues while providing a digital space for its transdisciplinary network and the publication of the Unruly Natures journal.',
    logo: '/images/logos/network/unruly.png',
    url: 'https://unrulynatures.ch/',
  },
  {
    key: 'warredoc',
    name: 'WARREDOC',
    type: 'Research Centre',
    description:
      'WARREDOC is a Water Resources Research and Documentation Centre at the University for Foreigners of Perugia. It advances research, education and knowledge exchange on water, environment and climate disaster risks. Through multidisciplinary and multicultural approaches, the Centre promotes sustainable development, international academic cooperation and scientific progress in the field of water resources management.',
    logo: '/images/logos/network/warredoc.png',
    url: 'https://warredoc-unistrapg.org/en/',
  },
]

const advisoryBoard = computed(() =>
  TeamService.normalizeMembers(advisoryBoardData).map((member, index) => ({
    ...member,
    institutionLogo: advisoryBoardData[index]?.institutionLogo,
  })),
)
const selectedAdvisorKey = ref(advisoryBoard.value[0]?.key || '')
const selectedAdvisor = computed(
  () =>
    advisoryBoard.value.find((member) => member.key === selectedAdvisorKey.value) ||
    advisoryBoard.value[0] ||
    {},
)

const selectAdvisor = (member) => {
  selectedAdvisorKey.value = member.key
}

const DEFAULT_ADVISOR_LOGO = '/images/logos/unibe.png'

const advisorInstitution = (member) =>
  member.university ||
  member.institution ||
  member.affiliation ||
  member.location ||
  'University of Bern'

const advisorInstitutionParts = (member) => {
  const value = advisorInstitution(member)
  const [name, ...placeParts] = value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  return {
    name: name || value,
    place: placeParts.join(', '),
  }
}

const advisorInstitutionName = (member) => advisorInstitutionParts(member).name
const advisorInstitutionPlace = (member) => advisorInstitutionParts(member).place

const advisorLogo = (member) =>
  member.institutionLogo || member.universityLogo || DEFAULT_ADVISOR_LOGO

const hasLinkedIn = (member) => Boolean(member.linkedin && member.linkedin !== '#')
const guardMissingLink = (event) => {
  if (!event.currentTarget.getAttribute('href')) event.preventDefault()
}

const initials = TeamService.initials
const mailto = TeamService.mailto
const portraitAlt = TeamService.portraitAlt
const emailAriaLabel = TeamService.emailAriaLabel
const linkedinAriaLabel = TeamService.linkedinAriaLabel
</script>
