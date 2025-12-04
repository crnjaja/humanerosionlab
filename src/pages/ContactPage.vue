<template>
  <section class="full-bleed">
    <div class="container stack">
      <header class="hero">
        <div class="hero__top">
          <div class="hero__brand">
            <img class="hero__logo" src="/files/logo.png" alt="Logo" />
            <div>
              <div class="kicker">Contact</div>
              <h1>Nous trouver & nous joindre</h1>
            </div>
          </div>
        </div>

        <div class="chips" aria-label="Informations rapides">
          <span class="chip">📍 Martigny</span>
          <span class="chip">🧭 Itinéraire</span>
          <span class="chip">🕒 Horaires</span>
          <span class="chip">♿ Accès</span>
        </div>
      </header>

      <div class="split">
        <article class="card card--accent split__left">
          <div class="section-title">
            <h2>Contact & accès</h2>
            <span class="muted">Adresse, horaires, itinéraire</span>
          </div>

          <ul class="info-list">
            <li class="info-item">
              <div class="info-key">Adresse</div>
              <div class="info-val">
                Avenue du Grand-Saint-Bernard 1<br />
                1920 Martigny, Suisse
              </div>
            </li>

            <li class="info-item">
              <div class="info-key">Téléphone</div>
              <div class="info-val">
                <a class="btn btn--terra" href="tel:+41277205959" aria-label="Appeler">
                  📞 +41 27 720 59 59
                </a>
              </div>
            </li>

            <li class="info-item">
              <div class="info-key">Email</div>
              <div class="info-val">
                <a
                  class="btn btn--ghost"
                  href="mailto:reception@lodze.ch"
                  aria-label="Envoyer un email"
                >
                  ✉️ reception@lodze.ch
                </a>
              </div>
            </li>

            <li class="info-item">
              <div class="info-key">Restaurant</div>
              <div class="info-val">
                Diner : 12:00 → 14:00<br />
                Souper : 19:00 → 21:30
              </div>
            </li>

            <li class="info-item">
              <div class="info-key">Bains</div>
              <div class="info-val">
                Lun–Jeu : 12:00 → 22:00<br />
                Ven–Dim : 09:00 → 22:00
              </div>
            </li>
          </ul>
        </article>

        <aside class="split__right map-frame" aria-label="Carte Google Maps">
          <div class="map-aspect">
            <iframe
              :title="`Carte : ${addressLine}`"
              :src="mapsEmbedSrc"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            ></iframe>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const addressLine = 'Avenue du Grand-Saint-Bernard 1, 1920 Martigny, Suisse'
const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&z=15&output=embed`
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`
</script>
