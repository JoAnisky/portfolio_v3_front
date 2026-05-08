<script setup lang="ts">
import UIBacklink from "~/components/ui/UIBacklink.vue";

useSeoMeta({
  title: 'Mentions légales - Jonathan Loré',
  description: 'Mentions légales du site jonathanlore.fr — Jonathan Loré, développeur web freelance.',
  robots: 'noindex, follow',
})
</script>

<template>
  <main class="legal">
    <div class="legal__container">

      <header class="legal__header">
        <UIBacklink link="/" label="Retour"/>
        <h1 class="legal__title">Mentions légales</h1>
        <p class="legal__subtitle">Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance en l'économie numérique.</p>
      </header>

      <div class="legal__content">

        <section class="legal__section">
          <h2 class="legal__section-title">Éditeur du site</h2>
          <dl class="legal__dl">
            <div class="legal__dl-row">
              <dt>Nom</dt>
              <dd>Loré Jonathan</dd>
            </div>
            <div class="legal__dl-row">
              <dt>Forme juridique</dt>
              <dd>Entrepreneur individuel</dd>
            </div>
            <div class="legal__dl-row">
              <dt>Activité</dt>
              <dd>Programmation informatique - code APE 6201Z</dd>
            </div>
            <div class="legal__dl-row">
              <dt>SIREN</dt>
              <dd>100 714 211</dd>
            </div>
            <div class="legal__dl-row">
              <dt>SIRET</dt>
              <dd>100 714 211 00016</dd>
            </div>
          </dl>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Hébergement</h2>
          <dl class="legal__dl">
            <div class="legal__dl-row">
              <dt>Hébergeur</dt>
              <dd>HOSTINGER operations, UAB</dd>
            </div>
            <div class="legal__dl-row">
              <dt>Adresse</dt>
              <dd>Švitrigailos str. 34, Vilnius 03230 Lithuania</dd>
            </div>
            <div class="legal__dl-row">
              <dt>Site web</dt>
              <dd>
                <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" class="legal__link">www.hostinger.fr</a>
              </dd>
            </div>
          </dl>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Propriété intellectuelle</h2>
          <p>L'ensemble des contenus présents sur ce site (textes, images, graphismes, code source) sont la propriété exclusive de Jonathan Loré, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, est interdite sans autorisation préalable écrite.</p>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Données personnelles</h2>
          <p>Ce site utilise Matomo, un outil d'analyse d'audience auto-hébergé, configuré en mode exempté de consentement conformément aux recommandations de la CNIL. Aucun cookie de traçage n'est déposé. Pour en savoir plus, consultez la <NuxtLink to="/privacy-policy" class="legal__link">politique de confidentialité</NuxtLink>.</p>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Limitation de responsabilité</h2>
          <p>Jonathan Loré s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, il ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition. En conséquence, Jonathan Loré décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.</p>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Droit applicable</h2>
          <p>Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
        </section>

      </div>
    </div>
  </main>
</template>