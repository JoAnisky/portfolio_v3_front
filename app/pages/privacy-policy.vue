<script setup lang="ts">
import UIBacklink from "~/components/ui/UIBacklink.vue";

const { matomoUrl } = useRuntimeConfig().public
const matomoOptOutUrl = `${matomoUrl}/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=010511&fontColor=989898&fontSize=14px&fontFamily=DM Sans`

useSeoMeta({
  title: 'Politique de confidentialité — Jonathan Loré',
  description: 'Politique de confidentialité du site jonathanlore.fr — collecte de données, analytics Matomo, droits des utilisateurs.',
  robots: 'noindex, follow',
})
</script>

<template>
  <main class="legal">
    <div class="legal__container">

      <header class="legal__header">
        <UIBacklink link="/" label="Retour"/>
        <h1 class="legal__title">Politique de confidentialité</h1>
        <p class="legal__subtitle">Dernière mise à jour : mai 2026. </p>
        <p class="legal__notice">Ce site respecte votre vie privée et ne collecte aucune donnée personnelle identifiable.</p>
      </header>

      <div class="legal__content">

        <section class="legal__section">
          <h2 class="legal__section-title">Responsable du traitement</h2>
          <dl class="legal__dl">
            <div class="legal__dl-row">
              <dt>Identité</dt>
              <dd>Loré Jonathan, entrepreneur individuel</dd>
            </div>
            <div class="legal__dl-row">
              <dt>Site</dt>
              <dd>jonathanlore.fr</dd>
            </div>
          </dl>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Données collectées</h2>
          <p>Ce site ne collecte aucune donnée personnelle identifiable. Aucun formulaire d'inscription, aucun espace membre, aucun cookie publicitaire ou de tracking tiers n'est présent.</p>
          <p class="legal__p-gap">Les seules données collectées sont des données de navigation anonymisées à des fins de statistiques, via l'outil Matomo (voir ci-dessous).</p>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Mesure d'audience - Matomo</h2>
          <p>Ce site utilise <strong>Matomo</strong>, un outil d'analyse d'audience open source auto-hébergé sur l'infrastructure de jonathanlore.fr. Matomo est configuré conformément aux recommandations de la <strong>CNIL</strong> pour bénéficier de l'exemption de consentement :</p>
          <ul class="legal__list">
            <li>L'adresse IP est anonymisée avant tout enregistrement</li>
            <li>Aucun cookie de traçage n'est déposé sur votre appareil</li>
            <li>Les données ne sont pas partagées avec des tiers</li>
            <li>Les données sont hébergées en France, sur nos propres serveurs</li>
            <li>La durée de conservation des données est limitée à 13 mois</li>
          </ul>
          <p class="legal__p-gap">Les données collectées comprennent : pages visitées, durée de visite, type de navigateur, résolution d'écran, pays d'origine (sans géolocalisation précise). Ces informations sont utilisées uniquement pour améliorer le site.</p>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Opposition au suivi</h2>
          <p>Même si aucun cookie n'est utilisé, vous pouvez à tout moment vous opposer à la collecte de vos données de navigation. Cochez la case ci-dessous pour activer l'exclusion :</p>
          <div class="legal__optout">
            <iframe
                :src="matomoOptOutUrl"
                class="legal__optout-iframe"
                title="Widget d'opposition au suivi Matomo"
                loading="lazy"
            />
          </div>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Cookies</h2>
          <p>Ce site n'utilise aucun cookie publicitaire, de tracking ou de partage sur les réseaux sociaux. Matomo étant configuré en mode sans cookie, aucun bandeau de consentement n'est affiché.</p>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Vos droits</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition concernant vos données. Les données de navigation collectées par Matomo étant anonymisées, elles ne permettent pas de vous identifier individuellement.</p>
          <p class="legal__p-gap">Pour toute question relative à vos données personnelles, vous pouvez contacter la CNIL à l'adresse <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="legal__link">www.cnil.fr</a>.</p>
        </section>

        <section class="legal__section">
          <h2 class="legal__section-title">Liens externes</h2>
          <p>Ce site peut contenir des liens vers des sites tiers. Jonathan Loré n'est pas responsable des pratiques de confidentialité de ces sites et vous invite à consulter leurs politiques respectives.</p>
        </section>

      </div>
    </div>
  </main>
</template>