<script setup lang="ts">
const { form, errors, isLoading, submitStatus, handleSubmit } = useContactForm()
</script>

<template>
  <section id="contact" class="contact py-24">
    <div class="container mx-auto px-6">

      <div class="section-header mb-16 text-center">
        <h2 class="section-title">Travaillons ensemble</h2>
        <p class="section-quote">"Le web n'a pas de frontières. Moi non plus."</p>
      </div>

      <div class="contact__grid">

        <!-- Colonne gauche : formulaire -->
        <div class="contact__card contact__card--form">
          <div class="contact__form-header">
            <h3 class="contact__form-title">
              Envoyez votre <span class="contact__form-title--accent">Message</span>
            </h3>
            <p class="contact__form-subtitle">// Je réponds habituellement sous un délai de 24h</p>
          </div>

          <form class="contact__form" novalidate @submit.prevent="handleSubmit">

            <div class="contact__field">
              <label for="contact-name" class="contact__label">Nom</label>
              <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  class="contact__input"
                  :class="{ 'contact__input--error': errors.name }"
                  placeholder="John"
                  autocomplete="name"
                  required
                  aria-describedby="contact-name-error"
              />
              <span v-if="errors.name" id="contact-name-error" class="contact__error" role="alert">
                {{ errors.name }}
              </span>
            </div>

            <div class="contact__field">
              <label for="contact-email" class="contact__label">Email</label>
              <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  class="contact__input"
                  :class="{ 'contact__input--error': errors.email }"
                  placeholder="hello@email.com"
                  autocomplete="email"
                  required
                  aria-describedby="contact-email-error"
              />
              <span v-if="errors.email" id="contact-email-error" class="contact__error" role="alert">
                {{ errors.email }}
              </span>
            </div>

            <div class="contact__field">
              <label for="contact-subject" class="contact__label">Sujet</label>
              <input
                  id="contact-subject"
                  v-model="form.subject"
                  type="text"
                  class="contact__input"
                  :class="{ 'contact__input--error': errors.subject }"
                  placeholder="Comment je peux vous aider ?"
                  required
                  aria-describedby="contact-subject-error"
              />
              <span v-if="errors.subject" id="contact-subject-error" class="contact__error" role="alert">
                {{ errors.subject }}
              </span>
            </div>

            <div class="contact__field">
              <label for="contact-message" class="contact__label">Message</label>
              <textarea
                  id="contact-message"
                  v-model="form.message"
                  class="contact__input contact__input--textarea"
                  :class="{ 'contact__input--error': errors.message }"
                  rows="6"
                  required
                  aria-describedby="contact-message-error"
              ></textarea>
              <span v-if="errors.message" id="contact-message-error" class="contact__error" role="alert">
                {{ errors.message }}
              </span>
            </div>

            <Transition name="contact__feedback-anim">
              <div
                  v-if="submitStatus !== 'idle'"
                  class="contact__feedback"
                  :class="`contact__feedback--${submitStatus}`"
                  role="status"
                  aria-live="polite"
              >
                <template v-if="submitStatus === 'success'">
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="contact__feedback-icon">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"/>
                  </svg>
                  Message envoyé ! Je vous répondrai rapidement.
                </template>
                <template v-else-if="submitStatus === 'error'">
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="contact__feedback-icon">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                  </svg>
                  Une erreur est survenue. Réessayez ou contactez-moi directement.
                </template>
              </div>
            </Transition>

            <div class="contact__form-footer">
              <button
                  type="submit"
                  class="contact__submit"
                  :disabled="isLoading || submitStatus === 'success'"
                  :aria-busy="isLoading"
              >
                <template v-if="!isLoading">
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.903 6.308H9.75a.75.75 0 010 1.5H4.182l-1.903 6.308a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"/>
                  </svg>
                  Envoyer
                </template>
                <template v-else>
                  <svg class="contact__spinner" viewBox="0 0 24 24" fill="none" aria-label="Envoi en cours…">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="10"/>
                  </svg>
                </template>
              </button>
            </div>

          </form>
        </div>

        <!-- Colonne droite -->
        <div class="contact__right">

          <!-- Card globe (Three.js à implémenter dans ContactGlobe.vue) -->
          <div class="contact__card contact__card--globe">
            <!-- TODO: <ContactGlobe /> -->
          </div>

          <!-- Card infos -->
          <div class="contact__card contact__card--infos">
            <div class="contact__infos-left">
              <div class="contact__info-item">
                <span class="contact__info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
                  </svg>
                </span>
                <div>
                  <p class="contact__info-label">Localisation</p>
                  <p class="contact__info-value">Besançon, France</p>
                </div>
              </div>
              <div class="contact__info-item">
                <span class="contact__info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                  </svg>
                </span>
                <div>
                  <p class="contact__info-label">Email</p>
                  <a href="mailto:contact@jonathanlore.fr" class="contact__info-value contact__info-value--link">
                    contact@jonathanlore.fr
                  </a>
                </div>
              </div>
            </div>

            <div class="contact__socials">
              <a
                  href="https://www.linkedin.com/in/jonathanlore42"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact__social-pill"
                  aria-label="LinkedIn - jonathanlore42"
              >
                <span class="contact__social-pill-icon contact__social-pill-icon--linkedin" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </span>
                <span>/in/jonathanlore42</span>
              </a>

              <a
                  href="https://www.malt.fr/profile/jonathanlore"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact__social-pill"
                  aria-label="Malt - jonathanlore"
              >
                <span class="contact__social-pill-icon contact__social-pill-icon--malt" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.086 2.916a4.139 4.139 0 0 0-5.848 0l-1.544 1.54L12.15 2.916a4.138 4.138 0 1 0-5.852 5.848l1.544 1.54-1.544 1.544a4.138 4.138 0 1 0 5.852 5.848l1.544-1.544 1.544 1.544a4.138 4.138 0 1 0 5.848-5.848L19.542 10.3l1.544-1.544a4.139 4.139 0 0 0 0-5.84zm-9.392 11.008L10.15 12.38l1.544-1.544 1.544 1.544zm7.544-7.544-1.544 1.544-1.544-1.544 1.544-1.544z"/>
                  </svg>
                </span>
                <span>/profile/jonathanlore</span>
              </a>

              <a
                  href="https://github.com/jonathanlore42"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact__social-pill"
                  aria-label="GitHub - jonathanlore42"
              >
                <span class="contact__social-pill-icon contact__social-pill-icon--github" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </span>
                <span>/jonathanlore42</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>