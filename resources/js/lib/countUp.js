/**
 * Count-up when the element enters the viewport.
 * Reads data-count, data-prefix, data-suffix, data-decimals.
 *
 * @param {{ duration?: number }} [options]
 * @returns {import('svelte/attachments').Attachment}
 */
export function countUp(options = {}) {
    const duration = options.duration ?? 1400

    return (element) => {
        const end = Number(element.dataset.count)
        if (!Number.isFinite(end)) return

        const prefix = element.dataset.prefix ?? ''
        const suffix = element.dataset.suffix ?? ''
        const decimals = Number(element.dataset.decimals ?? 0)

        const format = (n) =>
            `${prefix}${decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString()}${suffix}`

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.textContent = format(end)
            return
        }

        element.textContent = format(0)

        let frame = 0
        let started = false

        const run = () => {
            if (started) return
            started = true
            const start = performance.now()

            const tick = (now) => {
                const t = Math.min(1, (now - start) / duration)
                const eased = 1 - Math.pow(1 - t, 3)
                element.textContent = format(end * eased)
                if (t < 1) frame = requestAnimationFrame(tick)
            }

            frame = requestAnimationFrame(tick)
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                run()
                observer.disconnect()
            },
            { threshold: 0.35 },
        )

        observer.observe(element)
        return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
        }
    }
}
