<script>
    import { page, Link } from '@inertiajs/svelte'
    import { tick } from 'svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import { countUp } from '../lib/countUp.js'
    import { listProjects, workFilters } from '../lib/projects.js'
    import { gsap, maskedLines, staggerIn, toLines } from '../lib/motion.js'

    const intro = {
        en: {
            eyebrow: 'Selected engagements',
            title: 'Work that had to\nhold up in production.',
            subtitle: 'Systems, platforms, and digital experiences built around measurable operating outcomes.',
            metrics: [
                { id: 'cost', count: 40, suffix: '%', label: 'Infrastructure cost removed', note: 'Novus Living, Azure migration' },
                { id: 'deploy', count: 60, suffix: '%', label: 'Faster deployments', note: 'Aether, containerised rebuild' },
                { id: 'flows', count: 12, suffix: '', label: 'Workflows automated', note: 'Solara, n8n orchestration' },
                { id: 'setup', count: 34, suffix: '%', label: 'Shorter client setup', note: 'Zeta, booking platform' },
            ],
            filterLabel: 'Filter by discipline',
            empty: 'No projects in this discipline yet.',
            cta: {
                label: 'Your system next',
                title: 'Have a system that\nneeds to hold up?',
                sub: 'Tell us what it has to do, who depends on it, and where it currently breaks.',
                btn: 'Start a Conversation',
            },
        },
        ar: {
            eyebrow: 'مشاريع مختارة',
            title: 'أعمال كان عليها\nأن تصمد في الإنتاج.',
            subtitle: 'أنظمة ومنصات وتجارب رقمية مبنية حول نتائج تشغيلية قابلة للقياس.',
            metrics: [
                { id: 'cost', count: 40, suffix: '%', label: 'خفض تكلفة البنية', note: 'نوفوس ليفينج، ترحيل Azure' },
                { id: 'deploy', count: 60, suffix: '%', label: 'نشر أسرع', note: 'إيثر، إعادة بناء بالحاويات' },
                { id: 'flows', count: 12, suffix: '', label: 'سير عمل مؤتمت', note: 'سولارا، تنسيق n8n' },
                { id: 'setup', count: 34, suffix: '%', label: 'وقت تهيئة أقصر', note: 'زيتا، منصة الحجز' },
            ],
            filterLabel: 'تصفية حسب التخصص',
            empty: 'لا توجد مشاريع في هذا التخصص بعد.',
            cta: {
                label: 'نظامك التالي',
                title: 'لديك نظام يجب\nأن يصمد؟',
                sub: 'أخبرنا بما يجب أن يفعله، ومن يعتمد عليه، وأين يتعطل حالياً.',
                btn: 'ابدأ محادثة',
            },
        },
    }

    /** Ties each project category to the shared capability colour system. */
    const tones = { platforms: 'engineering', cloud: 'cloud', automation: 'data' }

    let locale = $derived(page.props.locale)
    let isAR = $derived(locale === 'ar')
    let c = $derived(isAR ? intro.ar : intro.en)
    let projects = $derived(listProjects(isAR ? 'ar' : 'en'))
    let filters = $derived(isAR ? workFilters.ar : workFilters.en)

    let activeFilter = $state('all')
    let filteredProjects = $derived(
        activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter),
    )

    /** @type {HTMLElement|null} */
    let grid = $state(null)

    /**
     * Cross-fades the grid instead of letting cards pop in and out. Svelte keeps
     * ownership of the DOM; GSAP only touches transforms on the settled result.
     * @param {string} id
     */
    async function selectFilter(id) {
        if (id === activeFilter) return

        const animate = grid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (animate) {
            await gsap.to(grid, { autoAlpha: 0, y: 12, duration: 0.22, ease: 'power2.in' })
        }

        activeFilter = id
        await tick()

        if (!animate) return
        gsap.set(grid, { autoAlpha: 1, y: 0 })
        gsap.from(grid.children, {
            autoAlpha: 0,
            y: 26,
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.06,
            clearProps: 'opacity,visibility,transform',
        })
    }
</script>

<svelte:head>
    <title>{isAR ? 'أعمالنا المختارة' : 'Selected Work'} | Neutronix</title>
    <meta name="description" content={isAR ? 'مشاريع نيوترونيكس في الترحيل السحابي وهندسة المنصات والأتمتة والبيانات في قطر.' : 'Neutronix case studies across cloud migration, platform engineering, automation, and data in Qatar.'} />
</svelte:head>

<PublicLayout>
    <!-- ── OPENER ── -->
    <section class="opener">
        <div class="wrap">
            <span class="label-accent">{c.eyebrow}</span>
            <h1 class="opener-title" {@attach maskedLines({ start: 'top 95%' })}>
                {#each toLines(c.title) as line, i (i)}
                    <span class="line"><span data-line>{line}</span></span>
                {/each}
            </h1>
            <p class="opener-sub">{c.subtitle}</p>
        </div>
    </section>

    <!-- ── OUTCOME METRICS ── -->
    <section class="metrics" aria-label={isAR ? 'نتائج مختارة' : 'Selected outcomes'}>
        <!-- Staggering the cell contents rather than the cells keeps the grid
             rules from flashing through the 1px gaps mid-animation. -->
        <div class="wrap metrics-grid" {@attach staggerIn({ selector: '.metric > *', y: 14, stagger: 0.05, start: 'top 90%' })}>
            {#each c.metrics as metric (metric.id)}
                <div class="metric">
                    <p class="metric-v">
                        <span
                            data-count={metric.count}
                            data-suffix={metric.suffix}
                            {@attach countUp()}
                        >{metric.count}{metric.suffix}</span>
                    </p>
                    <p class="metric-l">{metric.label}</p>
                    <p class="metric-n">{metric.note}</p>
                </div>
            {/each}
        </div>
    </section>

    <!-- ── FILTERS ── -->
    <div class="filter-bar">
        <div class="wrap">
            <p class="filter-label">{c.filterLabel}</p>
            <div class="filter-row" role="group" aria-label={c.filterLabel}>
                {#each filters as filter (filter.id)}
                    <button
                        type="button"
                        class="filter-btn"
                        class:active={activeFilter === filter.id}
                        aria-pressed={activeFilter === filter.id}
                        onclick={() => selectFilter(filter.id)}
                    >
                        {filter.label}
                    </button>
                {/each}
            </div>
        </div>
    </div>

    <!-- ── CASES ── -->
    <section class="cases">
        <div class="wrap">
            <div class="cases-grid" bind:this={grid}>
                {#each filteredProjects as p (p.id)}
                    <article class="case-cell" style="--tone: var(--tone-{tones[p.category] ?? 'engineering'})">
                        <Link href={p.href} class="case">
                            <span class="case-media">
                                <img src={p.image} alt="" loading="lazy" />
                            </span>
                            <span class="case-scrim"></span>
                            <span class="case-body">
                                <span class="case-top">
                                    <span class="case-client">{p.client}</span>
                                    <span class="case-year">{p.year}</span>
                                </span>
                                <span class="case-tag">{p.tag}</span>
                                <span class="case-title">{p.title}</span>
                                <span class="case-foot">
                                    <span class="case-stat">{p.stat}</span>
                                    <span class="case-go" aria-hidden="true">
                                        <svg width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </span>
                                </span>
                            </span>
                        </Link>
                    </article>
                {:else}
                    <p class="cases-empty">{c.empty}</p>
                {/each}
            </div>
        </div>
    </section>

    <!-- ── CTA ── -->
    <section class="cta">
        <div class="wrap cta-body">
            <span class="label-accent cta-label">{c.cta.label}</span>
            <h2 class="cta-title" {@attach maskedLines()}>
                {#each toLines(c.cta.title) as line, i (i)}
                    <span class="line"><span data-line>{line}</span></span>
                {/each}
            </h2>
            <p class="cta-sub">{c.cta.sub}</p>
            <Link href={isAR ? '/ar/contact' : '/contact'} class="btn-primary">{c.cta.btn} →</Link>
        </div>
    </section>
</PublicLayout>

<style>
/* ── OPENER ──────────────────────────────────────────────────── */
.opener {
    background: var(--color-canvas);
    padding-top: calc(var(--nav-h) + 4.5rem);
    padding-bottom: 3rem;
}
.opener-title {
    font-size: clamp(2.25rem, 5.4vw, 4.25rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.05;
    color: var(--color-ink);
    margin: 0 0 1.25rem;
}
:global([dir="rtl"]) .opener-title { letter-spacing: 0; line-height: 1.25; }
.opener-sub {
    font-size: 1.0625rem;
    color: var(--color-muted);
    max-width: 52ch;
    line-height: 1.7;
    margin: 0;
}
:global([dir="rtl"]) .opener-sub { font-family: var(--font-arabic); max-width: 44ch; }

/* ── METRICS ─────────────────────────────────────────────────── */
.metrics {
    background: var(--color-canvas);
    padding-bottom: 3.5rem;
}
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--color-ash);
    border: 1px solid var(--color-ash);
}
@media (min-width: 900px) {
    .metrics-grid { grid-template-columns: repeat(4, 1fr); }
}
.metric {
    background: var(--color-surface);
    padding: 1.75rem 1.375rem;
}
.metric-v {
    font-family: var(--font-display);
    font-size: clamp(2rem, 3.4vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
    color: var(--color-ember);
    margin: 0 0 0.75rem;
}
:global([dir="rtl"]) .metric-v { font-family: var(--font-arabic); letter-spacing: 0; }
.metric-l {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-ink);
    line-height: 1.4;
    margin: 0 0 0.375rem;
}
:global([dir="rtl"]) .metric-l { font-family: var(--font-arabic); }
.metric-n {
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin: 0;
    line-height: 1.5;
}
:global([dir="rtl"]) .metric-n { font-family: var(--font-arabic); letter-spacing: 0; }

/* ── FILTERS ─────────────────────────────────────────────────── */
.filter-bar {
    background: var(--color-canvas);
    padding-bottom: 2rem;
}
.filter-label {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-muted);
    margin: 0 0 0.875rem;
}
:global([dir="rtl"]) .filter-label { font-family: var(--font-arabic); letter-spacing: 0.04em; }
.filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.filter-btn {
    background: transparent;
    border: 1px solid var(--color-ash);
    border-radius: 100px;
    cursor: pointer;
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-muted);
    padding: 0.6rem 1.125rem;
    transition: background 200ms, color 200ms, border-color 200ms;
}
:global([dir="rtl"]) .filter-btn { font-family: var(--font-arabic); letter-spacing: 0; }
.filter-btn:hover {
    color: var(--color-ink);
    border-color: var(--color-muted);
}
.filter-btn.active {
    background: var(--color-ink);
    border-color: var(--color-ink);
    color: var(--color-surface);
}

/* ── CASES ───────────────────────────────────────────────────── */
.cases {
    background: var(--color-canvas);
    padding-bottom: 5rem;
}
.cases-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}
@media (min-width: 700px) {
    .cases-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1100px) {
    .cases-grid { grid-template-columns: repeat(3, 1fr); }
}
.cases-empty {
    grid-column: 1 / -1;
    padding: 3rem 0;
    color: var(--color-muted);
    font-size: 0.9375rem;
}
:global([dir="rtl"]) .cases-empty { font-family: var(--font-arabic); }
:global(.case) {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: 16px;
    aspect-ratio: 4 / 3.4;
    background: var(--color-ink);
    color: var(--color-surface);
    isolation: isolate;
}
.case-media {
    position: absolute;
    inset: 0;
    display: block;
}
.case-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}
:global(.case:hover) .case-media img { transform: scale(1.06); }
.case-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(6, 8, 14, 0.94) 12%, rgba(6, 8, 14, 0.55) 46%, rgba(6, 8, 14, 0.12) 100%);
    transition: opacity 350ms;
}
:global(.case:hover) .case-scrim { opacity: 0.88; }
.case-body {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.25rem 1.375rem 1.375rem;
    gap: 0.5rem;
}
.case-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
    /* Pinned to the top of the card, above the justify-content: flex-end stack */
    position: absolute;
    inset-inline: 1.375rem;
    top: 1.25rem;
}
.case-client {
    font-family: var(--font-display);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.92);
}
:global([dir="rtl"]) .case-client { font-family: var(--font-arabic); letter-spacing: 0; }
.case-year {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.5);
    flex-shrink: 0;
}
.case-tag {
    align-self: flex-start;
    font-size: 0.5625rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #fff;
    padding: 0.28rem 0.7rem;
    border-radius: 100px;
    background: color-mix(in srgb, var(--tone) 86%, #000);
}
:global([dir="rtl"]) .case-tag { font-family: var(--font-arabic); letter-spacing: 0; }
.case-title {
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.5vw, 1.1875rem);
    font-weight: 700;
    line-height: 1.3;
    color: var(--color-surface);
    max-width: 28ch;
}
:global([dir="rtl"]) .case-title { font-family: var(--font-arabic); line-height: 1.5; }
.case-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 0.375rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
}
.case-stat {
    font-family: var(--font-display);
    font-size: 0.9375rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: var(--tone);
}
:global([dir="rtl"]) .case-stat { font-family: var(--font-arabic); letter-spacing: 0; }
.case-go {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 50%;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.28);
    color: rgba(255, 255, 255, 0.85);
    transition: background 240ms, border-color 240ms, transform 240ms;
}
:global([dir="rtl"]) .case-go svg { transform: scaleX(-1); }
:global(.case:hover) .case-go {
    background: var(--tone);
    border-color: var(--tone);
    transform: translateX(3px);
}
:global([dir="rtl"]) :global(.case:hover) .case-go { transform: translateX(-3px); }

/* ── CTA ─────────────────────────────────────────────────────── */
.cta {
    background: var(--color-ash);
    padding-block: 5rem;
}
.cta-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
:global([dir="rtl"]) .cta-body { align-items: flex-end; text-align: right; }
.cta-label { color: var(--color-ember); }
.cta-title {
    font-size: clamp(1.875rem, 4.2vw, 3.25rem);
    font-weight: 800;
    letter-spacing: -0.035em;
    line-height: 1.08;
    color: var(--color-ink);
    margin: 0.25rem 0 1rem;
}
:global([dir="rtl"]) .cta-title { letter-spacing: 0; line-height: 1.3; }
.cta-sub {
    color: var(--color-muted);
    font-size: 1rem;
    line-height: 1.7;
    max-width: 48ch;
    margin: 0 0 1.75rem;
}
:global([dir="rtl"]) .cta-sub { font-family: var(--font-arabic); max-width: 40ch; }

@media (prefers-reduced-motion: reduce) {
    .case-media img,
    .case-scrim,
    .case-go {
        transition: none;
    }
    :global(.case:hover) .case-media img,
    :global(.case:hover) .case-go {
        transform: none;
    }
}
</style>
