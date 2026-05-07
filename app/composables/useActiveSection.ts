import { useRoute } from 'vue-router';

/**
 * Marque la section ou la page active avec IntersectionObserver
 */
export const useActiveSection = () => {
    const activeHash = ref('')
    const route = useRoute()
    let observer: IntersectionObserver | null = null

    const initObserver = () => {

        if (observer) observer.disconnect()

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    activeHash.value = '#' + entry.target.id
                }
            })
        }, {
            // Déclenche quand la section occupe la zone entre 20% et 60% du viewport
            rootMargin: '-20% 0px -40% 0px',
            threshold: 0
        })

        document.querySelectorAll('section[id]')
            .forEach((section) => observer?.observe(section))
    }

    // Fonction de nettoyage et relance
    const refresh = () => {
        if (route.path === '/') {
            setTimeout(() => {
                initObserver()
                if (window.location.hash) {
                    activeHash.value = window.location.hash
                }
            }, 300) // Petit délai pour laisser le DOM se stabiliser
        } else {
            const routeHashMap: Record<string, string> = {
                'projects': '#projects',
            }
            const segment = route.path.split('/')[1] ?? ''
            activeHash.value = routeHashMap[segment] ?? ''
        }
    }

    onMounted(() =>  nextTick(() => refresh()))

    // on surveille le changement de route pour relancer l'observer
    watch(() => route.fullPath, () => refresh())

    onUnmounted(() => observer?.disconnect())

    return activeHash;
}