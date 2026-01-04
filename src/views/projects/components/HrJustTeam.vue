<template>
  <div class="hrjust-content hrjust-team">
    <section v-for="g in groups" :key="g.id" class="hrjust-teamGroup">
      <div class="hrjust-teamGroup__head">
        <h4 class="hrjust-teamGroup__title">{{ g.title }}</h4>
      </div>

      <div class="hrjust-teamGrid">
        <article v-for="p in g.people" :key="p.id" class="hrjust-teamCard">
          <div class="hrjust-teamCard__top" aria-hidden="true"></div>

          <div class="hrjust-teamCard__body">
            <img class="hrjust-teamCard__avatar" :src="p.photo" :alt="p.name" loading="lazy" />

            <div class="hrjust-teamCard__name">
              {{ p.name }}
            </div>

            <div class="hrjust-teamCard__role">
              {{ p.title }}
            </div>

            <div class="hrjust-teamCard__meta">
              {{ p.location }}
            </div>

            <div class="hrjust-teamCard__actions" aria-label="Contact links">
              <a
                v-if="p.linkedin"
                class="hrjust-teamIconBtn"
                :href="p.linkedin"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <span aria-hidden="true">in</span>
              </a>

              <a
                v-if="p.email"
                class="hrjust-teamIconBtn"
                :href="`mailto:${p.email}`"
                aria-label="Email"
                title="Email"
              >
                <span aria-hidden="true">@</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
/**
 * Team members – presentational component
 * Styling focuses on modern, square-corner, editorial cards
 */

const groups = [
  {
    id: 'unibe',
    title: 'University of Bern',
    desc: 'Senior Researcher, Research Assistants, and Developer.',
    people: [
      {
        id: 'elisa',
        name: 'Prof. Elisa Fornalé',
        title: 'Senior Researcher',
        location: 'Bern, Switzerland',
        photo: '/images/profilePictures/Elisa.jpg',
        linkedin: 'https://ch.linkedin.com/in/elisa-fornal%C3%A9-622596283',
        email: 'elisa.fornale@wti.org',
      },
      {
        id: 'felicia',
        name: 'Felicia Meyer',
        title: 'Research Assistant',
        location: 'Bern, Switzerland',
        photo: '/images/profilePictures/FeliciaExpended.png',
        linkedin: '',
        email: 'felicia.meyer@unibe.ch',
      },
      {
        id: 'riccarda',
        name: 'Riccarda Heepen',
        title: 'Research Assistant',
        location: 'Bern, Switzerland',
        photo: '/images/profilePictures/RiccardaExpended2.png',
        linkedin: 'https://www.linkedin.com/in/riccarda-heepen-9593b828a/',
        email: 'riccarda.heepen@unibe.ch',
      },
      {
        id: 'martina',
        name: 'Martina Pennino',
        title: 'Research Assistant',
        location: 'Bern, Switzerland',
        photo: '/images/profilePictures/Martina.jpg',
        linkedin: 'https://www.linkedin.com/in/martina-pennino-49b696304/',
        email: 'martina.pennino@unibe.ch',
      },
    ],
  },
  {
    id: 'iir',
    title: 'Institute of International Relations Prague',
    desc: 'Senior Researcher, Full Professor, and Research Assistants.',
    people: [
      {
        id: 'federica',
        name: 'Dr. Federica Cristani',
        title: 'Senior Researcher',
        location: 'Prague, Czech Republic',
        photo: '/images/profilePictures/Federica.png',
        linkedin: 'https://cz.linkedin.com/in/federica-cristani',
        email: 'cristani@iir.cz',
      },
      {
        id: 'veronika',
        name: 'Prof. Veronika Bílková',
        title: 'Full Professor',
        location: 'Prague, Czech Republic',
        photo: '/images/profilePictures/Veronika3.jpg',
        linkedin: 'https://www.linkedin.com/in/veronika-b%C3%ADlkov%C3%A1-84932333/',
        email: 'bilkova@iir.cz',
      },
      {
        id: 'magdalena',
        name: 'Magdalena Florová',
        title: 'Research Assistant',
        location: 'Prague, Czech Republic',
        photo: '/images/profilePictures/Magdalena.png',
        linkedin: 'https://www.linkedin.com/in/magdalena-florov%C3%A1-54581035a/',
        email: 'florova@iir.cz',
      },
      {
        id: 'barbora',
        name: 'Barbora Lukešová',
        title: 'Research Assistant',
        location: 'Prague, Czech Republic',
        photo: '/images/profilePictures/Barbora3.jpg',
        linkedin: 'https://www.linkedin.com/in/barbora-lukesova/',
        email: 'lukesova@iir.cz',
      },
    ],
  },
  {
    id: 'unitn',
    title: 'University of Trento',
    desc: 'Focus on human rights justifications and climate change at the EU level and in international trade and investment.',
    people: [
      {
        id: 'chiara',
        name: 'Chiara Tea Antoniazzi',
        title: 'Postdoctoral Researcher',
        location: 'Trento, Italy',
        photo: '/images/profilePictures/Chiara.jpg',
        linkedin: 'https://it.linkedin.com/in/chiara-tea-antoniazzi-9791a8118',
        email: 'chiara.antoniazzi.2@unitn.it',
      },
      {
        id: 'caterina',
        name: 'Caterina Milo',
        title: 'Postdoctoral Researcher',
        location: 'Trento, Italy',
        photo: '/images/profilePictures/CaterinaB.jpg',
        linkedin: 'https://it.linkedin.com/in/caterina-milo',
        email: 'caterina.milo@unitn.it',
      },
      {
        id: 'elena',
        name: 'Elena Cristina Fasoli',
        title: 'Associate Professor',
        location: 'Trento, Italy',
        photo: '/images/profilePictures/ElenaD.png',
        linkedin: 'https://it.linkedin.com/in/elena-fasoli-9b8480bb',
        email: 'elenacristina.fasoli@unitn.it',
      },
      {
        id: 'paolo',
        name: 'Paolo Turrini',
        title: 'Associate Professor',
        location: 'Trento, Italy',
        photo: '/images/profilePictures/Paolo.jpg',
        linkedin: 'https://it.linkedin.com/in/paoloturrini',
        email: 'paolo.turrini@unitn.it',
      },
    ],
  },
]
</script>

<style scoped>
/* Theme variables */
.hrjust-team {
  --team-accent: var(--hrjust-accent-3, #002d47);
  --team-border: rgba(10, 34, 59, 0.12);
  --team-border-soft: rgba(10, 34, 59, 0.08);
  --team-text: rgba(11, 31, 51, 0.92);
  --team-muted: rgba(11, 31, 51, 0.62);
  --team-card: #ffffff;
  --team-tint: rgba(0, 45, 71, 0.04);
}

/* Group header */
.hrjust-teamGroup {
  margin-top: 18px;
}
.hrjust-teamGroup__head {
  margin-bottom: 12px;
}
.hrjust-teamGroup__title {
  font-size: 12px;
  font-weight: 950;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--team-accent);
  margin: 0;
}

.hrjust-teamGroup__desc {
  margin-top: 6px;
  font-size: 13px;
  color: var(--team-muted);
}

/* Grid */
.hrjust-teamGrid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (max-width: 1100px) {
  .hrjust-teamGrid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 860px) {
  .hrjust-teamGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 520px) {
  .hrjust-teamGrid {
    grid-template-columns: 1fr;
  }
}

/* Card */
.hrjust-teamCard {
  position: relative;
  background: var(--team-card);
  border: 1px solid var(--team-border-soft);
  box-shadow:
    0 1px 0 rgba(10, 34, 59, 0.04),
    0 10px 22px rgba(10, 34, 59, 0.06);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.hrjust-teamCard::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: var(--team-accent);
}

.hrjust-teamCard:hover {
  transform: translateY(-2px);
  border-color: var(--team-border);
  box-shadow:
    0 2px 0 rgba(10, 34, 59, 0.05),
    0 16px 34px rgba(10, 34, 59, 0.1);
}

.hrjust-teamCard__top {
  height: 54px;
  background: linear-gradient(90deg, rgba(0, 45, 71, 0.16), rgba(0, 45, 71, 0.06));
  border-bottom: 1px solid var(--team-border-soft);
}

.hrjust-teamCard__body {
  padding: 14px;
  text-align: center;
}

.hrjust-teamCard__avatar {
  width: 118px;
  height: 118px;
  border-radius: 999px;
  margin: -34px auto 10px;
  object-fit: cover;
  background: #fff;
  border: 3px solid #fff;
  box-shadow:
    0 0 0 2px rgba(0, 45, 71, 0.22),
    0 12px 20px rgba(10, 34, 59, 0.12);
}

.hrjust-teamCard__name {
  font-size: 15px;
  font-weight: 950;
  color: var(--team-text);
}

.hrjust-teamCard__role {
  margin-top: 6px;
  font-size: 13px;
  font-weight: 850;
  color: var(--team-accent);
}

.hrjust-teamCard__meta {
  margin: 10px auto 0;
  padding: 6px 10px;
  font-size: 12.5px;
  color: var(--team-muted);
  background: var(--team-tint);
  border: 1px solid var(--team-border-soft);
  display: inline-flex;
}

/* Actions */
.hrjust-teamCard__actions {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--team-border-soft);
  display: inline-flex;
  gap: 8px;
}

.hrjust-teamIconBtn {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid var(--team-border-soft);
  background: #fff;
  color: var(--team-accent);
  font-weight: 950;
  text-decoration: none;
  transition:
    transform 140ms ease,
    background 140ms ease,
    box-shadow 140ms ease;
}

.hrjust-teamIconBtn:hover {
  transform: translateY(-1px);
  background: var(--team-tint);
  box-shadow: 0 10px 18px rgba(10, 34, 59, 0.08);
}
</style>
