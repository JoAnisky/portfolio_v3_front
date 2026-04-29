<script setup lang="ts">
const heroRef = ref<HTMLElement | null>(null)
const { applyParallax } = useParallax()

onMounted(() => {
  applyParallax(heroRef)
})
</script>
<template>
  <section class="hero" ref="heroRef">

    <!-- Fond CSS (gradient + halo aurora) -->
    <div class="hero__bg" />

    <!-- Couches parallax -->
    <div class="hero__layer" data-depth="0.02">
      <img src="/parallax/aurora_stars.webp" alt="" aria-hidden="true" class="hero__img">
    </div>

    <div class="hero__layer" data-depth="0.06">
      <img src="/parallax/moon.webp" alt="" aria-hidden="true" class="hero__img hero__img--moon">
    </div>

    <div class="hero__layer" data-depth="0.10">
      <img src="/parallax/mountains-1.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <div class="hero__layer" data-depth="0.12">
      <img src="/parallax/mountains-1-trees.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <div class="hero__layer" data-depth="0.14">
      <img src="/parallax/lake.webp" alt="" aria-hidden="true" class="hero__img hero__img--lake">
    </div>
    <div class="hero__layer" data-depth="0.25">
      <img src="/parallax/trees-1.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <div class="hero__layer" data-depth="0.32">
      <img src="/parallax/cliff.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <div class="hero__layer" data-depth="0.36">
      <img src="/parallax/mountains-2.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <div class="hero__layer" data-depth="0.44">
      <img src="/parallax/trees-2.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <div class="hero__layer" data-depth="0.49">
      <img src="/parallax/mountains-3.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <!-- Brume seule (dégradés radiaux, mix-blend-mode) -->
    <div class="hero__layer" data-depth="0.52">
      <img src="/parallax/trees-3-brume.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom hero__img--exclusion">
    </div>
    <!-- Arbres seuls -->
    <div class="hero__layer" data-depth="0.52">
      <img src="/parallax/trees-3.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom--trees">
    </div>

    <!-- Contenu texte (au dessus de tout) -->
    <div class="hero__content">
      <p class="hero__intro">Bonjour, je suis</p>
      <h1 class="hero__title">Jonathan Loré</h1>
      <span class="hero__badge">Développeur web Fullstack</span>
      <p class="hero__tagline">De la vision à la production, je construis des expériences qui ont du sens.</p>
    </div>

  </section>
</template>