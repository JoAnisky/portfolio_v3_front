export const useActiveSection = () => {
    const activeHash = ref('')
    const route = useRoute()
    let observer: IntersectionObserver | null = null

    // Pour éviter que l'observer n'écrase le hash pendant qu'on clique sur un lien
    const isManualScrolling = ref(false)

    const initObserver = () => {
        if (observer) observer.disconnect()

        // rootMargin : on cible une ligne horizontale à 30% du haut de l'écran
        observer = new IntersectionObserver((entries) => {
            if (isManualScrolling.value) return

            entries.forEach((entry) => {
                // On active la section qui ENTRE dans la zone de lecture
                if (entry.isIntersecting) {
                    activeHash.value = '#' + entry.target.id
                }
            })
        }, {
            // Zone de détection : on réduit à une bande fine pour éviter les chevauchements
            rootMargin: '-15% 0px -60% 0px',
            threshold: [0]
        })

        // On observe toutes les sections avec un ID
        document.querySelectorAll('section[id]').forEach((section) => {
            observer?.observe(section)
        })
    }

    const applyPath = async (path: string) => {
        if (path === '/') {
            // Si on est sur l'index, on initialise l'observer
            // nextTick est plus fiable que setTimeout
            await nextTick()
            initObserver()
            if (!window.location.hash) activeHash.value = '#hero'
        } else {
            // Logique pour les pages internes (ex: /projets/1)
            const segment = path.split('/')[1]
            if (segment === 'projects') activeHash.value = '#projects'
            else activeHash.value = ''
        }
    }

    onMounted(() => applyPath(route.path))

    // On surveille le changement de route (navigation interne)
    watch(() => route.path, (newPath) => {
        console.log(`route path: ${newPath}`)
        applyPath(newPath)
    })

    // On expose une fonction pour bloquer l'observer pendant un clic
    const setManualScroll = () => {
        isManualScrolling.value = true
        setTimeout(() => isManualScrolling.value = false, 800) // Temps du scroll auto
    }

    onUnmounted(() => observer?.disconnect())

    return { activeHash, setManualScroll }
}