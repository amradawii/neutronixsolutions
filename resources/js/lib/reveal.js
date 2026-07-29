/**
 * Scroll-driven reveal via IntersectionObserver.
 * Prefer this over decorative glow layers for editorial motion.
 *
 * @param {{ rootMargin?: string, threshold?: number, delay?: number }} [options]
 * @returns {import('svelte/attachments').Attachment}
 */
export function reveal(options = {}) {
    const { rootMargin = '0px 0px -10% 0px', threshold = 0.12, delay = 0 } = options

    return (element) => {
        element.classList.add('reveal')
        if (delay > 0) {
            element.style.setProperty('--reveal-delay', `${delay}ms`)
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.classList.add('reveal-in')
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                element.classList.add('reveal-in')
                observer.unobserve(element)
            },
            { rootMargin, threshold },
        )

        observer.observe(element)
        return () => observer.disconnect()
    }
}
