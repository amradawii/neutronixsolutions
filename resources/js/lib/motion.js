/**
 * Shared GSAP scroll motion, exposed as Svelte attachments.
 *
 * Only the core tween engine and ScrollTrigger are imported. SplitText and Flip
 * were deliberately left out: both rewrite DOM that Svelte owns, which breaks
 * bilingual pages when the locale swaps the text under them, and both cost
 * bundle weight for effects the markup can express directly.
 *
 * Every export honours prefers-reduced-motion and returns a cleanup function so
 * triggers do not leak across Inertia page visits.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// A webfont swap changes text metrics, which moves every trigger measured
// before it landed. One refresh covers every page that uses this module.
document.fonts?.ready.then(() => ScrollTrigger.refresh())

export { gsap, ScrollTrigger }

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Splits a content string on newlines so a heading can render one masked
 * element per line. Keeps line breaks in the content layer rather than in CSS.
 *
 * @param {string} text
 * @returns {string[]}
 */
export function toLines(text) {
    return String(text).split('\n')
}

/**
 * Slides every `[data-line]` descendant up out of its clipping parent.
 * Pair with the `.line` utility class in app.css.
 *
 * @param {{ delay?: number, stagger?: number, start?: string }} [options]
 * @returns {import('svelte/attachments').Attachment}
 */
export function maskedLines(options = {}) {
    const { delay = 0, stagger = 0.09, start = 'top 88%' } = options

    return (element) => {
        if (reducedMotion()) return

        const lines = element.querySelectorAll('[data-line]')
        if (lines.length === 0) return

        const tween = gsap.from(lines, {
            yPercent: 118,
            duration: 0.95,
            ease: 'power3.out',
            delay,
            stagger,
            scrollTrigger: { trigger: element, start, once: true },
        })

        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
            gsap.set(lines, { clearProps: 'transform' })
        }
    }
}

/**
 * Fades and lifts matching children in sequence when the container is reached.
 *
 * @param {{ selector?: string, y?: number, stagger?: number, start?: string, delay?: number }} [options]
 * @returns {import('svelte/attachments').Attachment}
 */
export function staggerIn(options = {}) {
    const { selector = ':scope > *', y = 26, stagger = 0.08, start = 'top 84%', delay = 0 } = options

    return (element) => {
        if (reducedMotion()) return

        const items = element.querySelectorAll(selector)
        if (items.length === 0) return

        const tween = gsap.from(items, {
            y,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay,
            stagger,
            scrollTrigger: { trigger: element, start, once: true },
        })

        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
            gsap.set(items, { clearProps: 'opacity,visibility,transform' })
        }
    }
}

/**
 * Drifts an oversized media element against the scroll direction.
 * The element must be absolutely positioned and taller than its clipping
 * parent, otherwise the drift exposes an edge.
 *
 * @param {{ amount?: number }} [options] Drift in percent of element height.
 * @returns {import('svelte/attachments').Attachment}
 */
export function parallax(options = {}) {
    const { amount = 9 } = options

    return (element) => {
        if (reducedMotion()) return

        const frame = element.parentElement ?? element
        const tween = gsap.fromTo(
            element,
            { yPercent: -amount },
            {
                yPercent: amount,
                ease: 'none',
                scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
            },
        )

        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
            gsap.set(element, { clearProps: 'transform' })
        }
    }
}

/**
 * Scales a rail fill from 0 to 1 as its closest positioned ancestor scrolls by.
 *
 * @param {{ scroller?: string }} [options] Selector for the element to measure.
 * @returns {import('svelte/attachments').Attachment}
 */
export function railProgress(options = {}) {
    const { scroller = 'section' } = options

    return (element) => {
        if (reducedMotion()) return

        const measured = element.closest(scroller)
        if (!measured) return

        gsap.set(element, { scaleY: 0, transformOrigin: 'top center' })
        const tween = gsap.to(element, {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: measured,
                start: 'top 60%',
                end: 'bottom 70%',
                scrub: 0.5,
            },
        })

        return () => {
            tween.scrollTrigger?.kill()
            tween.kill()
            gsap.set(element, { clearProps: 'transform' })
        }
    }
}

/**
 * Reports which of the given sections currently occupies the reading line.
 * Not an attachment — call it from onMount once all sections are bound.
 *
 * @param {HTMLElement[]} sections
 * @param {(id: string) => void} onActive
 * @param {{ offset?: number }} [options] Reading line, in px from the top.
 * @returns {() => void} cleanup
 */
export function watchSections(sections, onActive, options = {}) {
    const { offset = 180 } = options

    const triggers = sections.filter(Boolean).map((section) =>
        ScrollTrigger.create({
            trigger: section,
            start: `top ${offset}px`,
            end: `bottom ${offset}px`,
            onToggle: (self) => {
                if (self.isActive) onActive(section.id)
            },
        }),
    )

    return () => triggers.forEach((trigger) => trigger.kill())
}

/**
 * Scrolls to an element id, replacing the native `scroll-behavior: smooth` that
 * had to be removed globally because it desynchronises ScrollTrigger pinning.
 *
 * @param {string} id
 * @param {number} [offset] Distance to leave above the target.
 */
export function scrollToId(id, offset = 0) {
    const target = document.getElementById(id)
    if (!target) return

    const top = target.getBoundingClientRect().top + window.scrollY - offset
    const behavior = reducedMotion() ? 'auto' : 'smooth'
    window.scrollTo({ top, behavior })
}
