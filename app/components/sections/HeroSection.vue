<script setup lang="ts">
</script>
<template>
  <section class="hero">

    <!-- Fond CSS (gradient + halo aurora) -->
    <div class="hero__bg" />

    <!-- Couches parallax -->
    <div class="hero__layer" data-depth="0.1">
      <img src="/parallax/aurora_stars.webp" alt="" aria-hidden="true" class="hero__img">
    </div>

    <div class="hero__layer" data-depth="0.15">
      <img src="/parallax/moon.webp" alt="" aria-hidden="true" class="hero__img hero__img--moon">
    </div>

    <div class="hero__layer" data-depth="0.2">
      <img src="/parallax/mountains-1.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>

    <div class="hero__layer" data-depth="0.3">
      <img src="/parallax/lake.webp" alt="" aria-hidden="true" class="hero__img hero__img--center">
    </div>
    <div class="hero__layer" data-depth="0.6">
      <img src="/parallax/trees-1.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
        <div class="hero__layer" data-depth="0.7">
          <img src="/parallax/trees-2.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
        </div>
    <div class="hero__layer" data-depth="0.4">
      <img src="/parallax/mountains-2.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <div class="hero__layer" data-depth="0.5">
      <img src="/parallax/mountains-3.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <!-- Brume seule (dégradés radiaux, mix-blend-mode) -->
    <div class="hero__layer" data-depth="0.9">
      <img src="/parallax/trees-3-brume.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom hero__img--exclusion">
    </div>
    <!-- Arbres seuls (silhouette propre, pas de blend) -->
    <div class="hero__layer" data-depth="0.9">
      <img src="/parallax/trees-3.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>



<!--    &lt;!&ndash; Contenu texte (au dessus de tout) &ndash;&gt;-->
<!--    <div class="hero__content">-->
<!--      <slot />-->
<!--    </div>-->

  </section>
</template>