<template>
  <footer class="footer">
    <NavFooter/>
    <p class="footer__copy">
      <span class="footer__copy-symbol">©</span>
      {{ currentYear }} Jonathan Loré. Tous droits réservés – Fait avec passion
      <span class="footer__heart" aria-hidden="true">♡</span>
    </p>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>