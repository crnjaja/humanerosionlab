<template>
  <section class="full-bleed">
    <div class="container stack">
      <header class="hero">
        <div class="hero__top">
          <div class="hero__brand">
            <img class="hero__logo" src="/files/logo.png" alt="Logo" />
            <div>
              <div class="kicker">Expérience en plusieurs étapes</div>
              <h1>Repas complet & accès aux bains</h1>
            </div>
          </div>
        </div>

        <div class="chips" aria-label="Informations rapides">
          <span class="chip">⏱️ Durée : ~3h</span>
          <span class="chip">🍽️ Menu complet</span>
          <span class="chip">🛁 Accès bains</span>
          <span class="chip">📍 Sur réservation</span>
        </div>
      </header>

      <div class="steps" role="list">
        <article class="card card--accent step" role="listitem">
          <div class="step__meta">
            <div class="step__badge">
              <span class="step__num" aria-hidden="true">1</span>
              <span class="muted">Repas</span>
            </div>

            <h3 class="step__title">Entrée • Plat • Dessert</h3>
            <p class="step__subtitle">
              Une expérience culinaire guidée par la saison, le terroir et le respect des origines.
              Sous la direction du Chef Matteo Salas, Le Cercle propose une carte raffinée et
              accessible, inspirée des produits locaux, sélectionnés dans un rayon de 180 km autour
              de Martigny. La cuisine évolue au fil des saisons pour offrir des plats authentiques
              et parfois surprenants, avec une attention portée à chaque détail.
            </p>
            <p class="step__subtitle">
              Les menus changent selon les saisons et mettent en avant des produits locaux
              soigneusement choisis dans un rayon de 180 km. Lors de ta visite, tu pourras choisir
              par personne : une entrée, un plat et un dessert. Option : si tu choisis la Côte de
              bœuf, un supplément de CHF 45.– par personne sera à régler sur place.
            </p>
          </div>

          <figure class="media" aria-label="Image étape 1 - repas">
            <img src="/files/2.webp" alt="Repas complet : entrée, plat et dessert" loading="lazy" />
          </figure>
        </article>

        <article class="card card--accent step" role="listitem">
          <div class="step__meta">
            <div class="step__badge">
              <span class="step__num" aria-hidden="true">2</span>
              <span class="muted">Bains</span>
            </div>

            <h3 class="step__title">Pause • chaleur • calme</h3>
            <p class="step__subtitle">
              Les Bains Publics du Quartier LôDzè proposent une alternative plus calme aux thermes
              classiques : ici, on mise sur la relaxation, la déconnexion et le silence, sans foule.
              Chaque créneau est limité à 30 personnes pour garder une ambiance intime.
            </p>
            <p class="step__subtitle">
              Le lieu comprend cinq bassins intérieurs chauffés (entre 28 et 40°C) et un bassin
              extérieur à 28°C. Un sauna complète l’expérience, mais il est actuellement en
              réparation.
            </p>
            <p class="step__subtitle">
              Chaque session dure 90 minutes et il faut réserver à l’avance. À Martigny, ces bains
              offrent une parenthèse bien-être inspirée de l’héritage romain, entre design, chaleur
              et sérénité.
            </p>
          </div>

          <figure class="media" aria-label="Image étape 2 - bains">
            <img src="/files/1.webp" alt="Bains : ambiance chaude et détente" loading="lazy" />
          </figure>
        </article>
      </div>
    </div>
  </section>
</template>
