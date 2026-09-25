<template>
  <div class="team-page">
    <section class="stage stage--top stage--top--compact stage--top--flat full-bleed">
      <div class="container stage-inner">
        <div class="hero hero--team">
          <div class="hero-kicker">
            <span class="kicker-dot" aria-hidden="true"></span>
            CURRENT PROJECT
          </div>

          <h1 class="hero-title hero-title--words" ref="heroTitleEl">
            MEET <span class="accent">the Team</span>
          </h1>

          <p class="hero-subtitle">
            Researchers, assistants, and visiting fellows contributing to the lab’s work.
          </p>

          <div class="hero-actions">
            <RouterLink class="btn btn--primary" to="/contact">
              Any Questions?
            </RouterLink>

            <RouterLink class="btn btn--ghost" to="/">
              Back to Home
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="content-block full-bleed">
      <div class="container">
        <div class="hero-offset team-hero-offset">

          <!-- CORE TEAM -->
          <section class="team-section" aria-labelledby="core-team-title">
            <div class="section-topline">
              <div>
                <h2 id="core-team-title" class="section-heading">
                  Core Team
                </h2>
              </div>
            </div>

            <div class="team-showcase" aria-label="Core team profiles">
              <aside class="team-bio-stage" aria-live="polite">
                <div class="team-bio-card" :key="selectedCoreMember.key">
                  <span class="team-bio-kicker">
                    Team member profile
                  </span>

                  <div class="team-bio-top">
                    <div
                      class="team-bio-avatar"
                      :data-initials="initials(selectedCoreMember.name)"
                    >
                      <img
                        v-if="selectedCoreMember.photo"
                        :src="selectedCoreMember.photo"
                        :alt="portraitAlt(selectedCoreMember)"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div class="team-bio-heading">
                      <h3 class="team-bio-name">
                        {{ selectedCoreMember.name }}
                      </h3>

                      <div class="team-bio-actions" aria-label="Team member contact links">
                        <a
                          class="team-bio-action"
                          :class="{ 'is-disabled': !selectedCoreMember.email }"
                          :href="
                            selectedCoreMember.email
                              ? mailto(selectedCoreMember.email)
                              : undefined
                          "
                          :aria-label="
                            selectedCoreMember.email
                              ? emailAriaLabel(selectedCoreMember)
                              : `${selectedCoreMember.name} has no email listed`
                          "
                          :aria-disabled="!selectedCoreMember.email"
                          :title="selectedCoreMember.email || 'No email listed'"
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
                          class="team-bio-action"
                          :class="{ 'is-disabled': !hasLinkedIn(selectedCoreMember) }"
                          :href="
                            hasLinkedIn(selectedCoreMember)
                              ? selectedCoreMember.linkedin
                              : undefined
                          "
                          :target="hasLinkedIn(selectedCoreMember) ? '_blank' : undefined"
                          :rel="hasLinkedIn(selectedCoreMember) ? 'noopener' : undefined"
                          :aria-label="
                            hasLinkedIn(selectedCoreMember)
                              ? linkedinAriaLabel(selectedCoreMember)
                              : `${selectedCoreMember.name} has no LinkedIn listed`
                          "
                          :aria-disabled="!hasLinkedIn(selectedCoreMember)"
                          :title="
                            hasLinkedIn(selectedCoreMember)
                              ? 'LinkedIn profile'
                              : 'No LinkedIn listed'
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

                  <p class="team-bio-text">
                    {{ selectedCoreMember.bio }}
                  </p>

                  <div
                    v-if="selectedCoreMember.location"
                    class="team-bio-location"
                  >
                    <span class="team-bio-location-logo-wrap">
                      <img
                        class="team-bio-location-logo"
                        :src="locationLogo(selectedCoreMember)"
                        :alt="`${selectedCoreMember.location} logo`"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>

                    <span class="team-bio-location-copy">
                      <span class="team-bio-location-label">
                        Location
                      </span>

                      <span class="team-bio-location-name">
                        {{ selectedCoreMember.location }}
                      </span>
                    </span>
                  </div>
                </div>
              </aside>

              <ul class="team-profile-grid" aria-label="Core team members">
                <li
                  v-for="member in coreTeam"
                  :key="member.key"
                  class="team-profile-item"
                >
                  <button
                    class="team-profile-button"
                    type="button"
                    :class="{ 'is-active': selectedCoreMember.key === member.key }"
                    :aria-pressed="selectedCoreMember.key === member.key"
                    @click="selectCoreMember(member)"
                  >
                    <span
                      class="team-avatar"
                      :data-initials="initials(member.name)"
                    >
                      <img
                        v-if="member.photo"
                        :src="member.photo"
                        :alt="portraitAlt(member)"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>

                    <span class="team-profile-copy">
                      <span
                        class="team-profile-name"
                        :title="member.name"
                      >
                        {{ member.name }}
                      </span>

                      <span
                        v-if="member.role"
                        class="team-profile-role"
                      >
                        {{ member.role }}
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </section>

          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>

          <!-- VISITING ALUMNI -->
          <section class="team-section" aria-labelledby="visiting-former-title">
            <div class="section-topline">
              <div>
                <h2 id="visiting-former-title" class="section-heading">
                  Alumni
                </h2>
              </div>
            </div>

            <div class="team-showcase" aria-label="Visiting alumni profiles">
              <aside class="team-bio-stage" aria-live="polite">
                <div class="team-bio-card" :key="selectedAlumniMember.key">
                  <span class="team-bio-kicker">
                    Alumni profile
                  </span>

                  <div class="team-bio-top">
                    <div
                      class="team-bio-avatar"
                      :data-initials="initials(selectedAlumniMember.name)"
                    >
                      <img
                        v-if="selectedAlumniMember.photo"
                        :src="selectedAlumniMember.photo"
                        :alt="portraitAlt(selectedAlumniMember)"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div class="team-bio-heading">
                      <h3 class="team-bio-name">
                        {{ selectedAlumniMember.name }}
                      </h3>

                      <div class="team-bio-actions" aria-label="Alumni contact links">
                        <a
                          class="team-bio-action"
                          :class="{ 'is-disabled': !selectedAlumniMember.email }"
                          :href="
                            selectedAlumniMember.email
                              ? mailto(selectedAlumniMember.email)
                              : undefined
                          "
                          :aria-label="
                            selectedAlumniMember.email
                              ? emailAriaLabel(selectedAlumniMember)
                              : `${selectedAlumniMember.name} has no email listed`
                          "
                          :aria-disabled="!selectedAlumniMember.email"
                          :title="selectedAlumniMember.email || 'No email listed'"
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
                          class="team-bio-action"
                          :class="{ 'is-disabled': !hasLinkedIn(selectedAlumniMember) }"
                          :href="
                            hasLinkedIn(selectedAlumniMember)
                              ? selectedAlumniMember.linkedin
                              : undefined
                          "
                          :target="hasLinkedIn(selectedAlumniMember) ? '_blank' : undefined"
                          :rel="hasLinkedIn(selectedAlumniMember) ? 'noopener' : undefined"
                          :aria-label="
                            hasLinkedIn(selectedAlumniMember)
                              ? linkedinAriaLabel(selectedAlumniMember)
                              : `${selectedAlumniMember.name} has no LinkedIn listed`
                          "
                          :aria-disabled="!hasLinkedIn(selectedAlumniMember)"
                          :title="
                            hasLinkedIn(selectedAlumniMember)
                              ? 'LinkedIn profile'
                              : 'No LinkedIn listed'
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

                  <p class="team-bio-text">
                    {{ selectedAlumniMember.bio }}
                  </p>

                  <div
                    v-if="selectedAlumniMember.location"
                    class="team-bio-location"
                  >
                    <span class="team-bio-location-logo-wrap">
                      <img
                        class="team-bio-location-logo"
                        :src="locationLogo(selectedAlumniMember)"
                        :alt="`${selectedAlumniMember.location} logo`"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>

                    <span class="team-bio-location-copy">
                      <span class="team-bio-location-label">
                        Location
                      </span>

                      <span class="team-bio-location-name">
                        {{ selectedAlumniMember.location }}
                      </span>
                    </span>
                  </div>
                </div>
              </aside>

              <ul class="team-profile-grid" aria-label="Visiting alumni">
                <li
                  v-for="member in visitingAlumni"
                  :key="member.key"
                  class="team-profile-item"
                >
                  <button
                    class="team-profile-button"
                    type="button"
                    :class="{ 'is-active': selectedAlumniMember.key === member.key }"
                    :aria-pressed="selectedAlumniMember.key === member.key"
                    @click="selectAlumniMember(member)"
                  >
                    <span
                      class="team-avatar"
                      :data-initials="initials(member.name)"
                    >
                      <img
                        v-if="member.photo"
                        :src="member.photo"
                        :alt="portraitAlt(member)"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>

                    <span class="team-profile-copy">
                      <span
                        class="team-profile-name"
                        :title="member.name"
                      >
                        {{ member.name }}
                      </span>

                      <span
                        v-if="member.role"
                        class="team-profile-role"
                      >
                        {{ member.role }}
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </section>

          <div class="spacer" aria-hidden="true"></div>
          <div class="spacer" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useWordReveal } from '@/composables/useWordReveal'

import {
  coreTeam as coreTeamData,
  visitingAlumni as visitingAlumniData,
} from '@/data/team.data'

import { TeamService } from '@/services/TeamService'
import '@/assets/pages/team.css'

const { el: heroTitleEl } = useWordReveal({
  stagger: 140,
  duration: 1300,
})

/* DATA */

const coreTeam = computed(() =>
  TeamService.normalizeMembers(coreTeamData),
)

const visitingAlumni = computed(() =>
  TeamService.normalizeMembers(visitingAlumniData),
)

/* CORE TEAM */

const selectedCoreMemberKey = ref(
  coreTeam.value[0]?.key || '',
)

const selectedCoreMember = computed(
  () =>
    coreTeam.value.find(
      (member) => member.key === selectedCoreMemberKey.value,
    ) ||
    coreTeam.value[0] ||
    {},
)

const selectCoreMember = (member) => {
  selectedCoreMemberKey.value = member.key
}

/* VISITING ALUMNI */

const selectedAlumniMemberKey = ref(
  visitingAlumni.value[0]?.key || '',
)

const selectedAlumniMember = computed(
  () =>
    visitingAlumni.value.find(
      (member) => member.key === selectedAlumniMemberKey.value,
    ) ||
    visitingAlumni.value[0] ||
    {},
)

const selectAlumniMember = (member) => {
  selectedAlumniMemberKey.value = member.key
}

/* LOCATION */

const DEFAULT_LOCATION_LOGO = '/images/logos/bern.png'

const locationLogo = (member) =>
  member.locationLogo ||
  member.institutionLogo ||
  member.universityLogo ||
  DEFAULT_LOCATION_LOGO

/* LINKS */

const hasLinkedIn = (member) =>
  Boolean(member.linkedin && member.linkedin !== '#')

const guardMissingLink = (event) => {
  if (!event.currentTarget.getAttribute('href')) {
    event.preventDefault()
  }
}

/* HELPERS */

const initials = TeamService.initials
const mailto = TeamService.mailto
const portraitAlt = TeamService.portraitAlt
const emailAriaLabel = TeamService.emailAriaLabel
const linkedinAriaLabel = TeamService.linkedinAriaLabel
</script>
