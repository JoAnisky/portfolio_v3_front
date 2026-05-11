import type { Project, ProjectScreenshot } from '#/shared/types/project'

export function useProjectLightbox(project: MaybeRef<Project | null | undefined>) {
    const lightboxScreenshots = computed<ProjectScreenshot[]>(() => {
        const p = toValue(project)
        if (!p?.screenshots.length) return []
        const cover = p.screenshots.find((s: { isCover: any }) => s.isCover)
        const others = p.screenshots.filter((s: { isCover: any }) => !s.isCover)
        return cover ? [cover, ...others] : [...others]
    })

    const lightboxOpen = ref(false)
    const activeIndex = ref(0)
    const slideDirection = ref<'next' | 'prev'>('next')

    function openLightbox(index: number) {
        activeIndex.value = index
        lightboxOpen.value = true
    }

    function closeLightbox() {
        lightboxOpen.value = false
    }

    function nextSlide() {
        slideDirection.value = 'next'
        activeIndex.value = (activeIndex.value + 1) % lightboxScreenshots.value.length
    }

    function prevSlide() {
        slideDirection.value = 'prev'
        activeIndex.value = (activeIndex.value - 1 + lightboxScreenshots.value.length) % lightboxScreenshots.value.length
    }

    function onKeyDown(e: KeyboardEvent) {
        if (!lightboxOpen.value) return
        if (e.key === 'Escape')     closeLightbox()
        if (e.key === 'ArrowRight') nextSlide()
        if (e.key === 'ArrowLeft')  prevSlide()
    }

    // ── Swipe tactile ──────────────────────────────────────
    let touchStartX = 0

    function onTouchStart(e: TouchEvent) {
        if (!e.touches[0]) return
        touchStartX = e.touches[0].clientX
    }

    function onTouchEnd(e: TouchEvent) {
        if (!e.changedTouches[0]) return
        const delta = touchStartX - e.changedTouches[0].clientX
        if (Math.abs(delta) < 50) return // trop petit, on ignore
        if (delta > 0) nextSlide()
        else prevSlide()
    }

    onMounted(() => window.addEventListener('keydown', onKeyDown))
    onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

    watch(lightboxOpen, (open) => {
        document.body.style.overflow = open ? 'hidden' : ''
    })

    return {
        lightboxScreenshots,
        lightboxOpen,
        activeIndex,
        slideDirection,
        openLightbox,
        closeLightbox,
        nextSlide,
        prevSlide,
        onTouchStart,
        onTouchEnd,
    }
}