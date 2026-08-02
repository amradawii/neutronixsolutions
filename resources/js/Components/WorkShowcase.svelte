<script>
    import { Link } from '@inertiajs/svelte'
    import { reveal } from '../lib/reveal.js'

    /** @type {{ project: any, t: Record<string, string>, workIndex: string, contactHref: string }} */
    let { project, t, workIndex, contactHref } = $props()

    let showcase = $derived(project.showcase)
    let slides = $derived(
        showcase
            ? [
                  {
                      id: 'featured',
                      src: showcase.featured.src,
                      caption: showcase.featured.caption,
                      url: 'app.zetawarehouses.com',
                  },
                  ...showcase.browser,
              ]
            : [],
    )

    let active = $state(0)
    let current = $derived(slides[active] ?? null)
    let total = $derived(slides.length)

    function prev() {
        if (!total) return
        active = (active - 1 + total) % total
    }

    function next() {
        if (!total) return
        active = (active + 1) % total
    }

    function go(i) {
        active = i
    }
</script>

{#if showcase && current}
    <div class="showcase-shell">
        <!-- Intro -->
        <section class="intro wrap" {@attach reveal()}>
            <div class="intro-copy">
                <p class="summary">{project.summary}</p>
                <div class="intro-meta">
                    <div>
                        <span class="meta-lbl">{t.services}</span>
                        <ul class="chips">
                            {#each project.services as svc (svc)}
                                <li class="chip">{svc}</li>
                            {/each}
                        </ul>
                    </div>
                    <div>
                        <span class="meta-lbl">{t.year}</span>
                        <p class="year">{project.year}</p>
                    </div>
                </div>
            </div>
            <div class="intro-stat">
                <span class="stat-val">{project.stat}</span>
                <span class="stat-note">{showcase.labels.impact}</span>
            </div>
        </section>

        <!-- Narrative -->
        <section class="story wrap" {@attach reveal()}>
            <div class="story-text">
                <h2 class="block-label">{t.challenge}</h2>
                <p class="block-text">{project.challenge}</p>
            </div>
            <div class="story-text">
                <h2 class="block-label">{t.solution}</h2>
                <p class="block-text">{project.solution}</p>
            </div>
        </section>

        <!-- Screenshot slider -->
        <section class="screens" {@attach reveal()}>
            <div class="wrap">
                <div class="screens-head">
                    <p class="stage-label">{showcase.labels.product}</p>
                    <p class="screens-count">{active + 1} / {total}</p>
                </div>

                <div
                    class="slider"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label={showcase.labels.system}
                >
                    <div class="slider-stage">
                        <button type="button" class="nav-btn nav-prev" onclick={prev} aria-label="Previous screenshot">
                            ←
                        </button>

                        <div class="browser">
                            <div class="browser-bar" aria-hidden="true">
                                <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
                                <span class="browser-url">{current.url}</span>
                            </div>
                            <div class="browser-screen">
                                {#key current.id}
                                    <img src={current.src} alt={current.caption} loading="eager" />
                                {/key}
                            </div>
                        </div>

                        <button type="button" class="nav-btn nav-next" onclick={next} aria-label="Next screenshot">
                            →
                        </button>
                    </div>

                    <p class="slide-caption">{current.caption}</p>

                    <div class="dots" role="tablist" aria-label="Screenshots">
                        {#each slides as slide, i (slide.id)}
                            <button
                                type="button"
                                class={['dot-btn', active === i && 'active']}
                                role="tab"
                                aria-selected={active === i}
                                aria-label={`Screenshot ${i + 1}`}
                                onclick={() => go(i)}
                            ></button>
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <!-- Design craft (kept) -->
        <section class="craft wrap" {@attach reveal()}>
            <p class="stage-label">{showcase.labels.craft}</p>
            <div class="craft-grid">
                <figure class="phone">
                    <div class="phone-frame">
                        <div class="phone-notch" aria-hidden="true"></div>
                        <img src={showcase.mobile.src} alt={showcase.mobile.caption} loading="lazy" />
                    </div>
                    <figcaption>{showcase.mobile.caption}</figcaption>
                </figure>
                <figure class="design-board">
                    <img src={showcase.design.src} alt={showcase.design.caption} loading="lazy" />
                    <figcaption>{showcase.design.caption}</figcaption>
                </figure>
            </div>
        </section>

        <!-- Soft wide frame (not full black band) -->
        <section class="wide-panel wrap" {@attach reveal()}>
            <figure class="wide-frame">
                <img src={showcase.wide.src} alt={showcase.wide.caption} loading="lazy" />
                <figcaption>{showcase.wide.caption}</figcaption>
            </figure>
        </section>

        <!-- Quote + results -->
        <section class="close wrap" {@attach reveal()}>
            <blockquote class="quote">
                <p>“{showcase.quote.text}”</p>
                <footer>— {showcase.quote.role}</footer>
            </blockquote>
            <div class="close-side">
                <h2 class="block-label">{t.results}</h2>
                <ul class="results">
                    {#each project.results as item (item)}
                        <li>{item}</li>
                    {/each}
                </ul>
                <div class="close-actions">
                    <Link href={workIndex} class="back-link">{t.back}</Link>
                    <Link href={contactHref} class="btn-primary">{t.cta}</Link>
                </div>
            </div>
        </section>
    </div>
{/if}

<style>
.showcase-shell {
    background: var(--color-canvas);
}

.intro {
    display: grid;
    gap: 2.5rem;
    padding-block: 2.5rem 2rem;
}
@media (min-width: 900px) {
    .intro {
        grid-template-columns: 1.4fr 0.8fr;
        align-items: end;
        gap: 4rem;
        padding-block: 3rem 2.5rem;
    }
}
.summary {
    font-size: clamp(1.25rem, 2.4vw, 1.625rem);
    line-height: 1.55;
    color: var(--color-ink);
    margin: 0 0 2rem;
    max-width: 36ch;
    font-weight: 500;
}
:global([dir='rtl']) .summary {
    font-family: var(--font-arabic);
}
.intro-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
}
.meta-lbl,
.block-label,
.stage-label {
    display: block;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ember);
    margin-bottom: 0.75rem;
}
:global([dir='rtl']) .meta-lbl,
:global([dir='rtl']) .block-label,
:global([dir='rtl']) .stage-label {
    font-family: var(--font-arabic);
    letter-spacing: 0.04em;
}
.chips {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
}
.chip {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.35rem 0.65rem;
    border: 1px solid var(--color-ash);
    background: color-mix(in srgb, var(--color-ash) 28%, var(--color-canvas));
    color: var(--color-ink);
}
:global([dir='rtl']) .chip {
    font-family: var(--font-arabic);
}
.year {
    margin: 0;
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 800;
}
.intro-stat {
    padding: 1.75rem;
    background: color-mix(in srgb, var(--color-ash) 55%, var(--color-canvas));
    border: 1px solid var(--color-ash);
}
.stat-val {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 800;
    color: var(--color-ember);
    letter-spacing: -0.04em;
    line-height: 1;
    margin-bottom: 0.75rem;
}
:global([dir='rtl']) .stat-val {
    font-family: var(--font-arabic);
}
.stat-note {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-muted);
}
:global([dir='rtl']) .stat-note {
    font-family: var(--font-arabic);
    letter-spacing: 0;
}

.story {
    display: grid;
    gap: 2rem;
    padding-block: 1rem 3rem;
}
@media (min-width: 900px) {
    .story {
        grid-template-columns: 1fr 1fr;
        gap: 3.5rem;
        padding-block: 1rem 3.5rem;
    }
}
.story-text {
    padding: 1.5rem;
    background: color-mix(in srgb, var(--color-ash) 22%, var(--color-canvas));
    border: 1px solid var(--color-ash);
}
.block-text {
    margin: 0;
    color: var(--color-muted);
    font-size: 1.0625rem;
    line-height: 1.7;
}
:global([dir='rtl']) .block-text {
    font-family: var(--font-arabic);
}

.screens {
    padding-block: 2.5rem 4rem;
    background: color-mix(in srgb, var(--color-ash) 32%, var(--color-canvas));
    border-block: 1px solid var(--color-ash);
}
.screens-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 0.25rem;
}
.screens-count {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--color-muted);
}

.slider {
    outline: none;
}
.slider-stage {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.75rem;
    align-items: center;
}
.browser {
    margin: 0;
    min-width: 0;
}
.slide-caption,
.phone figcaption,
.design-board figcaption,
.wide-frame figcaption {
    margin-top: 0.85rem;
    font-size: 0.875rem;
    color: var(--color-muted);
}
.slide-caption {
    text-align: center;
}
:global([dir='rtl']) .slide-caption,
:global([dir='rtl']) .phone figcaption,
:global([dir='rtl']) .design-board figcaption,
:global([dir='rtl']) .wide-frame figcaption {
    font-family: var(--font-arabic);
}
.browser-bar {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 0.9rem;
    background: color-mix(in srgb, var(--color-ink) 88%, #444);
    border-radius: 10px 10px 0 0;
}
.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
.dot.r { background: #ff5f57; }
.dot.y { background: #febc2e; }
.dot.g { background: #28c840; }
.browser-url {
    margin-inline-start: 0.75rem;
    flex: 1;
    font-size: 0.6875rem;
    color: rgba(255, 255, 255, 0.45);
    font-family: ui-monospace, monospace;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.browser-screen {
    overflow: hidden;
    border-radius: 0 0 10px 10px;
    background: color-mix(in srgb, var(--color-ash) 40%, var(--color-ink));
    border: 1px solid var(--color-ash);
    border-top: none;
}
.browser-screen img {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: top center;
    animation: fade-in 280ms ease;
}
@keyframes fade-in {
    from { opacity: 0.35; }
    to { opacity: 1; }
}

.nav-btn {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border: 1px solid var(--color-ash);
    background: color-mix(in srgb, var(--color-ash) 18%, var(--color-canvas));
    color: var(--color-ink);
    cursor: pointer;
    font-size: 1.125rem;
    transition: background 160ms, border-color 160ms;
}
.nav-btn:hover {
    border-color: var(--color-ink);
    background: var(--color-surface);
}
.dots {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0.85rem;
}
.dot-btn {
    width: 8px;
    height: 8px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--color-ash);
    cursor: pointer;
    transition: background 160ms, transform 160ms;
}
.dot-btn.active {
    background: var(--color-ember);
    transform: scale(1.25);
}

@media (max-width: 640px) {
    .slider-stage {
        gap: 0.4rem;
    }
    .nav-btn {
        width: 36px;
        height: 36px;
        font-size: 1rem;
    }
}

.craft {
    padding-block: 4rem;
}
.craft-grid {
    display: grid;
    gap: 2rem;
    align-items: end;
}
@media (min-width: 768px) {
    .craft-grid {
        grid-template-columns: 0.75fr 1.25fr;
        gap: 2.5rem;
    }
}
.phone {
    margin: 0;
    justify-self: center;
    width: min(100%, 280px);
}
.phone-frame {
    position: relative;
    border: 2px solid color-mix(in srgb, var(--color-ink) 75%, var(--color-ash));
    border-radius: 28px;
    overflow: hidden;
    background: var(--color-ink);
    box-shadow: 0 18px 40px color-mix(in srgb, var(--color-ink) 12%, transparent);
}
.phone-notch {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 38%;
    height: 18px;
    background: #0a0a0a;
    border-radius: 999px;
    z-index: 2;
}
.phone-frame img {
    display: block;
    width: 100%;
    aspect-ratio: 9 / 16;
    object-fit: cover;
}
.design-board {
    margin: 0;
}
.design-board img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    border: 1px solid var(--color-ash);
    background: color-mix(in srgb, var(--color-ash) 25%, var(--color-canvas));
}

.wide-panel {
    padding-block: 0 3rem;
}
.wide-frame {
    margin: 0;
    padding: 1rem;
    background: color-mix(in srgb, var(--color-ash) 28%, var(--color-canvas));
    border: 1px solid var(--color-ash);
}
.wide-frame img {
    display: block;
    width: 100%;
    max-height: 56vh;
    object-fit: cover;
}

.close {
    display: grid;
    gap: 3rem;
    padding-block: 2rem 5rem;
}
@media (min-width: 900px) {
    .close {
        grid-template-columns: 1.2fr 0.9fr;
        gap: 4rem;
        align-items: start;
    }
}
.close-side {
    padding: 1.5rem;
    background: color-mix(in srgb, var(--color-ash) 24%, var(--color-canvas));
    border: 1px solid var(--color-ash);
}
.quote {
    margin: 0;
    padding: 0;
    border: none;
}
.quote p {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 600;
    line-height: 1.3;
    color: var(--color-ink);
    margin: 0 0 1.25rem;
    max-width: 18ch;
}
:global([dir='rtl']) .quote p {
    font-family: var(--font-arabic);
    max-width: 22ch;
    line-height: 1.45;
}
.quote footer {
    font-size: 0.875rem;
    color: var(--color-muted);
}
:global([dir='rtl']) .quote footer {
    font-family: var(--font-arabic);
}
.results {
    margin: 0 0 2rem;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.results li {
    position: relative;
    padding-inline-start: 1.25rem;
    color: var(--color-ink);
    font-weight: 500;
    line-height: 1.5;
}
.results li::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 0.55em;
    width: 0.5rem;
    height: 0.5rem;
    background: var(--color-ember);
}
:global([dir='rtl']) .results li {
    font-family: var(--font-arabic);
}
.close-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
}
:global(.back-link) {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-muted);
    transition: color 160ms;
}
:global(.back-link:hover) {
    color: var(--color-ember);
}
:global([dir='rtl']) :global(.back-link) {
    font-family: var(--font-arabic);
}

@media (prefers-reduced-motion: reduce) {
    .browser-screen img {
        animation: none;
    }
}
</style>
