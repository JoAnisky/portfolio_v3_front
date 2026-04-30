<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// --- Compteurs animés ---
interface Counter {
  label: string
  target: number
  suffix: string
  current: number
}

const counters = ref<Counter[]>([
  { label: "ans d'expérience",          target: 4,   suffix: '+',  current: 0 },
  { label: 'contributions à des projets', target: 10,  suffix: '+',  current: 0 },
  { label: 'technologies utilisées',    target: 8,   suffix: '+',  current: 0 },
  { label: 'remote-friendly',           target: 100, suffix: '%',  current: 0 },
])

const countersStarted = ref(false)
const countersRef = ref<HTMLElement | null>(null)

function animateCounters() {
  if (countersStarted.value) return
  countersStarted.value = true

  counters.value.forEach((counter) => {
    const duration = 1600
    const steps = 60
    const increment = counter.target / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), counter.target)
      counter.current = current
      if (current >= counter.target) clearInterval(timer)
    }, duration / steps)
  })
}

// --- Cards ---
interface Card {
  icon: string
  title: string
  description: string
}

const cards: Card[] = [
  {
    icon: '⚡',
    title: 'Autonomie totale',
    description: 'Du brief au déploiement, un seul interlocuteur',
  },
  {
    icon: '🧩',
    title: 'Code maintenable',
    description: 'Tests, documentation, bonnes pratiques',
  },
  {
    icon: '🚀',
    title: 'Stack moderne',
    description: 'Nuxt, Symfony, Laravel, Docker, Kubernetes',
  },
  {
    icon: '🎯',
    title: 'Vision produit',
    description: 'Je pense au-delà du ticket',
  },
]

// --- IntersectionObserver ---
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!countersRef.value) return
  observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) animateCounters()
      },
      { threshold: 0.3 },
  )
  observer.observe(countersRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section id="about" class="about">
    <!-- En-tête de section -->
    <div class="section-header">
      <h2 class="section-title">À propos</h2>
      <p class="section-quote">
        "L'espace entre une idée et sa réalité, c'est là que je travaille."
      </p>
    </div>

    <!-- Layout principal 2 colonnes -->
    <div class="about__main">
      <!-- Colonne gauche : photo + réseaux -->
      <div class="about__left">
        <!-- Icônes réseaux sociaux -->
        <div class="about__socials">
          <a href="https://www.linkedin.com/in/jonathanlore42" target="_blank" rel="noopener noreferrer" class="about__social-link" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://www.malt.fr/profile/jonathanlore" target="_blank" rel="noopener noreferrer" class="about__social-link" aria-label="Malt">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.672 0H2.328C1.044 0 0 1.044 0 2.328v19.344C0 22.956 1.044 24 2.328 24h19.344C22.956 24 24 22.956 24 21.672V2.328C24 1.044 22.956 0 21.672 0zM7.393 17.46l-1.164-1.163 8.903-8.904 1.163 1.163-8.902 8.904zm.613-9.792c.642.642.642 1.682 0 2.324-.642.641-1.682.641-2.324 0-.641-.642-.641-1.682 0-2.324.642-.641 1.682-.641 2.324 0zm8.006 8.006c.642.641.642 1.681 0 2.323-.641.642-1.681.642-2.323 0-.642-.642-.642-1.682 0-2.323.642-.642 1.682-.642 2.323 0z"/>
            </svg>
          </a>
          <a href="https://github.com/JoAnisky" target="_blank" rel="noopener noreferrer" class="about__social-link" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>

        <!-- Photo de profil -->
        <div class="about__photo">
          <div class="about__photo-ring about__photo-ring--outer"></div>
          <div class="about__photo-ring"></div>
          <div class="about__photo-placeholder">
            <!-- Remplacer par : <img src="/profile.webp" alt="Jonathan Loré" /> -->
            <span class="about__photo-initials">JL</span>
          </div>
        </div>

        <!-- Pastille disponibilité -->
        <div class="about__availability">
          <span class="about__availability-dot"></span>
          <span>Disponible pour missions</span>
        </div>

        <!-- Boutons CTA -->
        <div class="about__cta">
          <a href="#contact" class="about__btn about__btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Collaborer
          </a>
          <a href="/cv-jonathan-lore.pdf" download class="about__btn about__btn--secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Télécharger le CV
          </a>
        </div>
      </div>

      <!-- Colonne droite : bio -->
      <div class="about__right">
        <h3 class="about__name">
          Développeur web Fullstack&nbsp;<span class="about__name-highlight">freelance</span>
        </h3>
        <div class="about__bio">
          <p>
            Développeur fullstack depuis plusieurs années, j'aime construire des choses qui tiennent -
            des interfaces soignées, des architectures qui évoluent et livrer des projets.
          </p>
          <p>
            Mon terrain de jeu va de l'UI jusqu'à l'infra :
            <strong>Vue/Nuxt</strong> côté front,
            <strong>Symfony</strong> ou <strong>Laravel</strong> côté back,
            et une vraie culture DevOps avec la mise en place d'outils tels que
            <span class="about__tech">Jenkins</span> et <span class="about__tech">Kubernetes</span>
            pour que tout ça vive sereinement en production.
          </p>
          <p>
            Ce qui me plaît, c'est de comprendre à la fois la vision du client et les contraintes
            techniques - et faire le pont entre les deux.
          </p>
        </div>
      </div>
    </div>

    <!-- Cards "Pourquoi travailler avec moi ?" -->
    <div class="about__cards">
      <h4 class="about__cards-title">
        Pourquoi <span>Travailler avec moi&nbsp;?</span>
      </h4>
      <div class="about__cards-grid">
        <div v-for="card in cards" :key="card.title" class="about__card">
          <span class="about__card-icon">{{ card.icon }}</span>
          <strong class="about__card-title">{{ card.title }}</strong>
          <p class="about__card-desc">{{ card.description }}</p>
        </div>
      </div>
    </div>

    <!-- Séparateur gradient -->
    <div class="about__divider" aria-hidden="true"></div>

    <!-- Compteurs -->
    <div ref="countersRef" class="about__counters">
      <div v-for="counter in counters" :key="counter.label" class="about__counter">
        <span class="about__counter-value">{{ counter.current }}{{ counter.suffix }}</span>
        <span class="about__counter-label">{{ counter.label }}</span>
      </div>
    </div>

    <!-- Séparateur gradient bas -->
    <div class="about__divider" aria-hidden="true"></div>
  </section>
</template>