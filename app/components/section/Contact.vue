<script setup lang="ts">
const { form, errors, isLoading, submitStatus, handleSubmit } = useContactForm()
</script>

<template>
  <section id="contact" class="contact pb-24 pt-12">
    <div class="container mx-auto px-6">

      <div class="section-header mb-16 text-center">
        <h2 class="section-title">Travaillons ensemble</h2>
        <p class="section-quote">« Le web n'a pas de frontières. Moi non plus. »</p>
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
                  placeholder="Yves fugue en BMX chez Will, qui est près du Kilimandjaro"
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 40" fill="none">
                    <rect x="0.5" y="0.5" width="37.4877" height="39" rx="4.5" stroke="#0DCDEF"/>
                    <path opacity="0.7" d="M14.5171 13.4611C14.5168 13.9567 14.3198 14.4318 13.9692 14.782C13.6186 15.1322 13.1433 15.3289 12.6477 15.3286C12.1522 15.3284 11.6771 15.1313 11.3269 14.7807C10.9766 14.4301 10.78 13.9548 10.7803 13.4593C10.7805 12.9637 10.9776 12.4886 11.3282 12.1384C11.6787 11.7882 12.1541 11.5915 12.6496 11.5918C13.1451 11.592 13.6203 11.7891 13.9705 12.1397C14.3207 12.4903 14.5173 12.9656 14.5171 13.4611ZM14.5731 16.7122H10.8363V28.4084H14.5731V16.7122ZM20.4773 16.7122H16.7592V28.4084H20.4399V22.2707C20.4399 18.8515 24.8961 18.5339 24.8961 22.2707V28.4084H28.5862V21.0002C28.5862 15.2361 21.9907 15.451 20.4399 18.2816L20.4773 16.7122Z" fill="#0DCDEF"/>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
                    <rect x="0.5" y="0.5" width="39" height="39" rx="4.5" stroke="#F28D8D"/>
                    <path opacity="0.7" d="M21.5341 24.578L20.8705 25.2626L22.8267 27.2773C23.7874 28.2683 25.3232 29.2268 26.758 27.7467C27.8293 26.6383 27.5796 25.481 26.9887 24.5519C26.799 24.5649 21.5341 24.578 21.5341 24.578ZM18.4909 16.9984L19.1545 16.3138L17.2331 14.335C16.2724 13.3472 14.8155 12.3105 13.305 13.8688C12.1957 15.0098 12.4422 16.1248 13.03 17.031L18.4909 16.9984ZM27.5291 18.3546C25.9419 20.0153 24.3502 21.6714 22.754 23.3229H26.4009C27.7598 23.3229 29.501 22.9936 29.501 20.7898C29.501 19.1729 28.5656 18.5632 27.5291 18.3546ZM17.2773 18.2535H13.5767C12.2178 18.2535 10.4766 18.6936 10.4766 20.7898C10.4766 22.3514 11.4467 22.9936 12.5023 23.2185C12.6287 23.0686 17.2773 18.2535 17.2773 18.2535ZM21.9671 28.164L20.0141 26.1493L18.0927 28.1281C17.9526 28.2719 17.8082 28.411 17.6597 28.5454C17.8809 29.631 18.5003 30.6286 20.0141 30.6286C21.5278 30.6286 22.1504 29.6277 22.3684 28.5389C22.2336 28.4215 22.0998 28.2966 21.9671 28.164ZM18.0927 13.4515L20.0141 15.4304L21.9671 13.4157C22.0964 13.2815 22.2314 13.1531 22.3716 13.031C22.1662 11.965 21.5784 11 20.0109 11C18.4435 11 17.8557 11.9682 17.6534 13.0375C17.7967 13.1636 17.941 13.3016 18.0927 13.4515ZM26.758 13.833C25.3201 12.3529 23.7874 13.3114 22.8267 14.3024L13.7569 23.6587C12.7993 24.6464 11.7944 26.1526 13.305 27.7109C14.8155 29.2691 16.2755 28.2325 17.2331 27.2447L26.3029 17.8884C27.2636 16.8974 28.1927 15.313 26.758 13.833Z" fill="#F28D8D"/>
                  </svg>
                </span>
                <span>/profile/jonathanlore</span>
              </a>

              <a
                  href="https://github.com/joanisky"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="contact__social-pill"
                  aria-label="GitHub - joanisky"
              >
                <span class="contact__social-pill-icon contact__social-pill-icon--github" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
                    <rect x="0.5" y="0.5" width="39" height="39" rx="4.5" stroke="white"/>
                    <path opacity="0.7" d="M20.3333 10.3975C19.0722 10.3975 17.8235 10.6458 16.6584 11.1284C15.4934 11.611 14.4348 12.3184 13.5431 13.2101C11.7422 15.0109 10.7305 17.4534 10.7305 20.0002C10.7305 24.2447 13.4865 27.8457 17.2988 29.1229C17.7789 29.1997 17.9326 28.902 17.9326 28.6428V27.0199C15.2726 27.5961 14.706 25.7331 14.706 25.7331C14.2643 24.6192 13.6401 24.3215 13.6401 24.3215C12.7663 23.7261 13.7073 23.7453 13.7073 23.7453C14.6676 23.8126 15.1766 24.7344 15.1766 24.7344C16.012 26.194 17.4236 25.7619 17.971 25.5315C18.0574 24.9073 18.3071 24.4848 18.5759 24.2447C16.4441 24.0046 14.2067 23.1788 14.2067 19.5201C14.2067 18.4542 14.5716 17.5996 15.1958 16.9178C15.0997 16.6777 14.7636 15.679 15.2918 14.3826C15.2918 14.3826 16.0984 14.1233 17.9326 15.3621C18.6912 15.1508 19.517 15.0452 20.3333 15.0452C21.1495 15.0452 21.9753 15.1508 22.734 15.3621C24.5681 14.1233 25.3747 14.3826 25.3747 14.3826C25.9029 15.679 25.5668 16.6777 25.4707 16.9178C26.0949 17.5996 26.4598 18.4542 26.4598 19.5201C26.4598 23.1884 24.2128 23.995 22.0714 24.2351C22.4171 24.5328 22.734 25.1185 22.734 26.0116V28.6428C22.734 28.902 22.8876 29.2093 23.3773 29.1229C27.1896 27.8361 29.936 24.2447 29.936 20.0002C29.936 18.7392 29.6877 17.4905 29.2051 16.3254C28.7225 15.1604 28.0152 14.1018 27.1235 13.2101C26.2318 12.3184 25.1732 11.611 24.0081 11.1284C22.843 10.6458 21.5943 10.3975 20.3333 10.3975Z" fill="white"/>
                  </svg>
                </span>
                <span>/joanisky</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>