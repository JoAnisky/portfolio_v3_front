<script setup lang="ts">
const DURATION = 8000

const route = useRoute()
const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  if (route.query.ref !== 'card') return
  if (sessionStorage.getItem('qr-welcome-shown')) return
  visible.value = true
  sessionStorage.setItem('qr-welcome-shown', '1')
  timer = setTimeout(close, DURATION)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

function close() {
  if (timer) clearTimeout(timer)
  visible.value = false
}

function goToProjects() {
  close()
  const el = document.getElementById('projects')
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <Transition name="welcome-toast">
    <div v-if="visible" class="welcome-toast" role="dialog" aria-live="polite">
        <button class="welcome-toast__close" @click="close" aria-label="Fermer">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        <p class="welcome-toast__greeting">Bonjour !</p>
        <p class="welcome-toast__message">
          Merci d'avoir scanné ma carte. Vous trouverez ici mes projets, mon parcours et un formulaire de contact pour toute demande ou collaboration.
        </p>

        <button class="welcome-toast__cta" @click="goToProjects">
          Voir mes projets
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <div class="welcome-toast__progress" :style="{ '--duration': `${DURATION}ms` }" />
    </div>
  </Transition>
</template>
