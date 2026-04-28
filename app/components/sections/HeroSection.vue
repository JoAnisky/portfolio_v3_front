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
    <div class="hero__layer" data-depth="0.03">
      <img src="/parallax/aurora_stars.webp" alt="" aria-hidden="true" class="hero__img">
    </div>

    <div class="hero__layer" data-depth="0.04">
      <img src="/parallax/moon.webp" alt="" aria-hidden="true" class="hero__img hero__img--moon">
    </div>

    <div class="hero__layer" data-depth="0.13">
      <img src="/parallax/mountains-1.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>

    <div class="hero__layer" data-depth="0.17">
      <img src="/parallax/lake.webp" alt="" aria-hidden="true" class="hero__img hero__img--center">
    </div>
    <div class="hero__layer" data-depth="0.28">
      <img src="/parallax/trees-1.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
        <div class="hero__layer" data-depth="0.32">
          <img src="/parallax/trees-2.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
        </div>
    <div class="hero__layer" data-depth="0.35">
      <img src="/parallax/mountains-2.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <div class="hero__layer" data-depth="0.38">
      <img src="/parallax/mountains-3.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom">
    </div>
    <!-- Brume seule (dégradés radiaux, mix-blend-mode) -->
    <div class="hero__layer" data-depth="0.40">
      <img src="/parallax/trees-3-brume.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom hero__img--exclusion">
    </div>
    <!-- Arbres seuls -->
    <div class="hero__layer" data-depth="0.40">
      <img src="/parallax/trees-3.webp" alt="" aria-hidden="true" class="hero__img hero__img--bottom--trees">
    </div>

<!--    &lt;!&ndash; Contenu texte (au dessus de tout) &ndash;&gt;-->
<!--    <div class="hero__content">-->
<!--      <slot />-->
<!--    </div>-->

  </section>
</template>