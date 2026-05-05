export const useSafeEmail = (encodedEmail: string) => {
    const email = ref('Afficher l\'email')
    const isReady = ref(false)
    const isRevealed = ref(false)

    // on décode quand l'utilisateur appuie sur le bouton (avant de relâcher)
    const prepare = () => {
        if (!isReady.value) {
            email.value = atob(encodedEmail)
            isReady.value = true
        }
    }

    //  ouvre le mailer uniquement si la préparation a eu lieu
    const execute = () => {
        if (isReady.value) {
            window.location.href = `mailto:${email.value}`
            isRevealed.value = true
        } else {
            // Si un bot appelle .click() sans mousedown, isReady sera false.
            console.warn("Action bloquée : séquence d'événements incomplète.")
        }
    }

    return {
        email,
        isRevealed,
        prepare,
        execute
    }
}