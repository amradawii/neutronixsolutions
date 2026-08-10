<script>
    import { page, Link } from '@inertiajs/svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import { reveal } from '../lib/reveal.js'
    import { maskedLines, staggerIn, toLines } from '../lib/motion.js'
    import { getService, getRelatedServices } from '../lib/services.js'

    let { slug: slugProp } = $props()

    let locale = $derived(page.props.locale)
    let isAR = $derived(locale === 'ar')
    let slug = $derived(slugProp ?? page.props.slug)
    let service = $derived(getService(slug, isAR ? 'ar' : 'en'))
    let related = $derived(getRelatedServices(slug, isAR ? 'ar' : 'en', 3))

    const ui = {
        en: {
            back: '← All capabilities',
            outcomes: 'What you get',
            deliverables: 'What we deliver',
            process: 'How we work',
            stack: 'Typical stack',
            faq: 'Common questions',
            related: 'Related capabilities',
            missing: 'Capability not found.',
            ctaTitle: 'Have a project in\nthis area?',
            ctaSub: 'Describe the system, the bottleneck, or the idea. We will tell you what it realistically takes — scope, sequence, and effort — before anyone commits.',
            ctaBtn: 'Book a Technical Consultation',
        },
        ar: {
            back: 'كل القدرات →',
            outcomes: 'ما ستحصلون عليه',
            deliverables: 'ما الذي نقوم به',
            process: 'كيف نعمل',
            stack: 'التقنيات المعتادة',
            faq: 'أسئلة متكررة',
            related: 'قدرات ذات صلة',
            missing: 'القدرة غير موجودة.',
            ctaTitle: 'لديكم مشروع في\nهذا المجال؟',
            ctaSub: 'صِفوا لنا النظام أو العائق أو الفكرة، وسنوضح ما يتطلبه الأمر فعلياً من نطاق وترتيب وجهد قبل أن يلتزم أحد بشيء.',
            ctaBtn: 'احجز استشارة تقنية',
        },
    }

    let t = $derived(isAR ? ui.ar : ui.en)
    let servicesIndex = $derived(isAR ? '/ar/services' : '/services')
    let contactHref = $derived(isAR ? '/ar/book-a-consultation' : '/book-a-consultation')

    let openFaq = $state(null)

    /** Reset the accordion when navigating between service pages. */
    $effect(() => {
        slug
        openFaq = null
    })

    /** @param {string} s */
    const serviceHref = (s) => (isAR ? `/ar/services/${s}` : `/services/${s}`)
</script>

<svelte:head>
    {#if service}
        <title>{service.meta.title} | Neutronix</title>
        <meta name="description" content={service.meta.description} />
    {:else}
        <title>{t.missing} | Neutronix</title>
    {/if}
</svelte:head>

<PublicLayout>
    {#if !service}
        <section class="missing wrap">
            <h1 class="missing-title">{t.missing}</h1>
            <Link href={servicesIndex} class="btn-secondary">{t.back}</Link>
        </section>
    {:else}
        <!-- ── HERO ── -->
        <section class="hero" style="--tone: var(--tone-{service.tone})">
            <div class="wrap hero-body">
                <Link href={servicesIndex} class="hero-back">{t.back}</Link>
                <span class="hero-eyebrow">
                    <span class="hero-dot" aria-hidden="true"></span>
                    {service.eyebrow}
                </span>
                <h1 class="hero-title" {@attach maskedLines({ start: 'top 95%' })}>
                    {#each toLines(service.title) as line, i (i)}
                        <span class="line"><span data-line>{line}</span></span>
                    {/each}
                </h1>
                <p class="hero-summary">{service.summary}</p>
            </div>
        </section>

        <!-- ── OVERVIEW + OUTCOMES ── -->
        <section class="overview" style="--tone: var(--tone-{service.tone})">
            <div class="wrap overview-grid">
                <div class="overview-main" {@attach reveal()}>
                    {#each service.overview as paragraph, i (i)}
                        <p class="overview-p">{paragraph}</p>
                    {/each}
                </div>

                <aside class="outcomes" {@attach reveal()}>
                    <h2 class="block-label">{t.outcomes}</h2>
                    <ul class="outcome-list">
                        {#each service.outcomes as outcome (outcome)}
                            <li class="outcome">{outcome}</li>
                        {/each}
                    </ul>
                </aside>
            </div>
        </section>

        <!-- ── DELIVERABLES ── -->
        <section class="deliver" style="--tone: var(--tone-{service.tone})">
            <div class="wrap">
                <header class="sec-head" {@attach reveal()}>
                    <span class="sec-rule" aria-hidden="true"></span>
                    <h2 class="sec-title">{t.deliverables}</h2>
                </header>

                <div class="deliver-grid" {@attach staggerIn({ selector: '.deliver-item > *', y: 12, stagger: 0.05 })}>
                    {#each service.deliverables as item (item.t)}
                        <article class="deliver-item">
                            <h3 class="deliver-t">{item.t}</h3>
                            <p class="deliver-d">{item.d}</p>
                        </article>
                    {/each}
                </div>
            </div>
        </section>

        <!-- ── PROCESS ── -->
        <section class="process" style="--tone: var(--tone-{service.tone})">
            <div class="wrap">
                <header class="sec-head" {@attach reveal()}>
                    <span class="sec-rule" aria-hidden="true"></span>
                    <h2 class="sec-title">{t.process}</h2>
                </header>

                <ol class="steps" {@attach staggerIn({ selector: '.step', y: 20, stagger: 0.06 })}>
                    {#each service.process as step, i (step.t)}
                        <li class="step">
                            <span class="step-n">{String(i + 1).padStart(2, '0')}</span>
                            <h3 class="step-t">{step.t}</h3>
                            <p class="step-d">{step.d}</p>
                        </li>
                    {/each}
                </ol>

                <div class="stack" {@attach reveal()}>
                    <h3 class="block-label">{t.stack}</h3>
                    <ul class="chips">
                        {#each service.stack as tech (tech)}
                            <li class="chip" dir="ltr">{tech}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </section>

        <!-- ── FAQ ── -->
        <section class="faq">
            <div class="wrap faq-layout">
                <div class="faq-head">
                    <span class="label-accent">{t.faq}</span>
                </div>

                <div class="faq-list">
                    {#each service.faqs as faq, i (faq.q)}
                        <div class="faq-item" class:open={openFaq === i}>
                            <h3 class="faq-heading">
                                <button
                                    class="faq-trigger"
                                    id="svc-faq-trigger-{i}"
                                    aria-expanded={openFaq === i}
                                    aria-controls="svc-faq-panel-{i}"
                                    onclick={() => (openFaq = openFaq === i ? null : i)}
                                >
                                    <span class="faq-q">{faq.q}</span>
                                    <span class="faq-mark" aria-hidden="true"></span>
                                </button>
                            </h3>
                            <div
                                class="faq-panel"
                                id="svc-faq-panel-{i}"
                                role="region"
                                aria-labelledby="svc-faq-trigger-{i}"
                                inert={openFaq !== i ? true : undefined}
                            >
                                <div class="faq-panel-inner">
                                    <p class="faq-a">{faq.a}</p>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </section>

        <!-- ── RELATED ── -->
        <section class="related">
            <div class="wrap">
                <h2 class="block-label related-label">{t.related}</h2>
                <div class="related-grid">
                    {#each related as item (item.slug)}
                        <Link href={serviceHref(item.slug)} class="related-card" style="--tone: var(--tone-{item.tone})">
                            <span class="related-eyebrow">{item.eyebrow}</span>
                            <span class="related-title">{item.title}</span>
                            <span class="related-arrow" aria-hidden="true">{isAR ? '←' : '→'}</span>
                        </Link>
                    {/each}
                </div>
            </div>
        </section>

        <!-- ── CTA ── -->
        <section class="cta">
            <div class="wrap cta-body" {@attach reveal()}>
                <h2 class="cta-title">
                    {#each toLines(t.ctaTitle) as line, i (i)}
                        <span class="cta-line">{line}</span>
                    {/each}
                </h2>
                <p class="cta-sub">{t.ctaSub}</p>
                <Link href={contactHref} class="btn-primary">{t.ctaBtn} <span aria-hidden="true">{isAR ? '←' : '→'}</span></Link>
            </div>
        </section>
    {/if}
</PublicLayout>

<style>
/* ── NOT FOUND ───────────────────────────────────────────────── */
.missing {
    padding-block: calc(var(--nav-h) + 6rem) 6rem;
}
.missing-title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    margin: 0 0 1.5rem;
}

/* ── HERO ────────────────────────────────────────────────────── */
.hero {
    position: relative;
    background: #070707;
    color: var(--color-surface);
    padding-top: calc(var(--nav-h) + 4.5rem);
    padding-bottom: 4rem;
    overflow: clip;
}
.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(110% 80% at 50% 130%, color-mix(in srgb, var(--tone) 26%, transparent), transparent 68%);
    pointer-events: none;
}
.hero-body {
    position: relative;
    z-index: 1;
}
:global(.hero-back) {
    display: inline-block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 2rem;
    transition: color 180ms;
}
:global(.hero-back:hover) { color: var(--color-surface); }
.hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.62);
    margin-bottom: 1.25rem;
}
:global([dir="rtl"]) .hero-eyebrow {
    font-family: var(--font-arabic);
    letter-spacing: 0.03em;
}
.hero-dot {
    width: 0.4375rem;
    height: 0.4375rem;
    border-radius: 50%;
    background: var(--tone);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--tone) 24%, transparent);
}
.hero-title {
    font-size: clamp(2.25rem, 5.4vw, 4.25rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: var(--color-surface);
    max-width: 20ch;
    margin: 0 0 1.5rem;
}
:global([dir="rtl"]) .hero-title { letter-spacing: 0; line-height: 1.25; }
.hero-summary {
    font-size: clamp(1rem, 1.6vw, 1.25rem);
    color: rgba(255, 255, 255, 0.62);
    line-height: 1.7;
    max-width: 62ch;
    margin: 0;
}
:global([dir="rtl"]) .hero-summary { font-family: var(--font-arabic); max-width: 54ch; }

/* ── SHARED SECTION HEADINGS ─────────────────────────────────── */
.sec-head {
    margin-bottom: 2.5rem;
}
.sec-rule {
    display: block;
    width: 3rem;
    height: 3px;
    border-radius: 2px;
    background: var(--tone);
    margin-bottom: 1.25rem;
}
.sec-title {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: var(--color-ink);
    margin: 0;
}
:global([dir="rtl"]) .sec-title { letter-spacing: 0; line-height: 1.35; }
.block-label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ink);
    margin: 0 0 1.25rem;
}
:global([dir="rtl"]) .block-label { font-family: var(--font-arabic); letter-spacing: 0.03em; }

/* ── OVERVIEW ────────────────────────────────────────────────── */
.overview {
    background: var(--color-surface);
    padding-block: 5rem;
}
.overview-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
}
@media (min-width: 1024px) {
    .overview-grid { grid-template-columns: 1.7fr 1fr; gap: 4rem; }
}
.overview-p {
    font-size: 1.0625rem;
    line-height: 1.85;
    color: var(--color-muted);
    margin: 0 0 1.5rem;
    max-width: 68ch;
}
.overview-p:last-child { margin-bottom: 0; }
:global([dir="rtl"]) .overview-p { font-family: var(--font-arabic); }
.outcomes {
    border-top: 3px solid var(--tone);
    padding-top: 1.5rem;
}
.outcome-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
}
.outcome {
    position: relative;
    padding-inline-start: 1.5rem;
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--color-ink);
}
:global([dir="rtl"]) .outcome { font-family: var(--font-arabic); }
.outcome::before {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 0.55rem;
    width: 0.4375rem;
    height: 0.4375rem;
    border-radius: 1px;
    background: var(--tone);
}

/* ── DELIVERABLES ────────────────────────────────────────────── */
.deliver {
    background: var(--color-canvas);
    padding-block: 5rem;
    border-top: 1px solid var(--color-ash);
}
.deliver-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: var(--color-ash);
    border: 1px solid var(--color-ash);
}
@media (min-width: 768px) {
    .deliver-grid { grid-template-columns: repeat(2, 1fr); }
}
.deliver-item {
    background: var(--color-surface);
    padding: 1.75rem 1.5rem;
}
.deliver-t {
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-ink);
    margin: 0 0 0.75rem;
}
:global([dir="rtl"]) .deliver-t { letter-spacing: 0; }
.deliver-d {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--color-muted);
    margin: 0;
}
:global([dir="rtl"]) .deliver-d { font-family: var(--font-arabic); }

/* ── PROCESS ─────────────────────────────────────────────────── */
.process {
    background: var(--color-surface);
    padding-block: 5rem;
    border-top: 1px solid var(--color-ash);
}
.steps {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
    margin: 0 0 3.5rem;
    padding: 0;
    list-style: none;
}
@media (min-width: 640px) {
    .steps { grid-template-columns: repeat(2, 1fr); gap: 2.5rem 3rem; }
}
@media (min-width: 1024px) {
    .steps { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
}
.step {
    border-top: 1px solid var(--color-ash);
    padding-top: 1.25rem;
}
.step-n {
    display: block;
    font-family: var(--font-display);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: var(--tone);
    margin-bottom: 0.75rem;
}
.step-t {
    font-size: 1rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0 0 0.625rem;
}
:global([dir="rtl"]) .step-t { font-family: var(--font-arabic); }
.step-d {
    font-size: 0.875rem;
    line-height: 1.7;
    color: var(--color-muted);
    margin: 0;
}
:global([dir="rtl"]) .step-d { font-family: var(--font-arabic); }
.chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    list-style: none;
}
.chip {
    border: 1px solid var(--color-ash);
    background: var(--color-canvas);
    padding: 0.4375rem 0.75rem;
    font-size: 0.8125rem;
    color: var(--color-ink);
}

/* ── FAQ ─────────────────────────────────────────────────────── */
.faq {
    background: var(--color-canvas);
    padding-block: 5rem;
    border-top: 1px solid var(--color-ash);
}
.faq-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
}
@media (min-width: 1024px) {
    .faq-layout { grid-template-columns: 1fr 2fr; gap: 4rem; }
}
.faq-list {
    border-top: 1px solid var(--color-ash);
}
.faq-item {
    border-bottom: 1px solid var(--color-ash);
}
.faq-heading {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
}
.faq-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 1.375rem 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: start;
    color: var(--color-ink);
    transition: color 180ms;
}
.faq-trigger:hover { color: var(--color-ember); }
.faq-q {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.45;
}
:global([dir="rtl"]) .faq-q { font-family: var(--font-arabic); }
.faq-mark {
    position: relative;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
}
.faq-mark::before,
.faq-mark::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: var(--color-ember);
    transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.faq-mark::after { transform: rotate(90deg); }
.faq-item.open .faq-mark::after { transform: rotate(180deg); }
.faq-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1);
}
.faq-item.open .faq-panel { grid-template-rows: 1fr; }
.faq-panel-inner { overflow: hidden; }
.faq-a {
    margin: 0;
    padding: 0 2.5rem 1.625rem 0.25rem;
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.75;
    max-width: 72ch;
}
:global([dir="rtl"]) .faq-a { font-family: var(--font-arabic); padding: 0 0.25rem 1.625rem 2.5rem; }

/* ── RELATED ─────────────────────────────────────────────────── */
.related {
    background: var(--color-surface);
    padding-block: 4.5rem;
    border-top: 1px solid var(--color-ash);
}
.related-label { margin-bottom: 1.5rem; }
.related-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: var(--color-ash);
    border: 1px solid var(--color-ash);
}
@media (min-width: 768px) {
    .related-grid { grid-template-columns: repeat(3, 1fr); }
}
:global(.related-card) {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background: var(--color-surface);
    padding: 1.5rem 1.375rem 2.75rem;
    transition: background 200ms;
}
:global(.related-card:hover) { background: var(--color-canvas); }
.related-eyebrow {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--tone);
}
:global([dir="rtl"]) .related-eyebrow { font-family: var(--font-arabic); letter-spacing: 0.03em; }
.related-title {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--color-ink);
}
:global([dir="rtl"]) .related-title { font-family: var(--font-arabic); }
.related-arrow {
    position: absolute;
    inset-inline-start: 1.375rem;
    bottom: 1.25rem;
    color: var(--color-muted);
    transition: transform 220ms, color 220ms;
}
:global(.related-card:hover) .related-arrow {
    color: var(--tone);
    transform: translateX(0.25rem);
}
:global([dir="rtl"]) :global(.related-card:hover) .related-arrow {
    transform: translateX(-0.25rem);
}

/* ── CTA ─────────────────────────────────────────────────────── */
.cta {
    background: var(--color-ash);
    padding-block: 5rem;
}
.cta-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
:global([dir="rtl"]) .cta-body {
    align-items: center;
    text-align: center;
}
.cta-title {
    font-size: clamp(1.875rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.08;
    color: var(--color-ink);
    margin: 0 0 1rem;
    text-align: center;
}
:global([dir="rtl"]) .cta-title { letter-spacing: 0; line-height: 1.3; text-align: center; }
.cta-line { display: block; }
.cta-sub {
    color: var(--color-muted);
    font-size: 1.0625rem;
    line-height: 1.7;
    max-width: 54ch;
    margin: 0 0 2rem;
    text-align: center;
}
:global([dir="rtl"]) .cta-sub { font-family: var(--font-arabic); max-width: 46ch; text-align: center; }

@media (prefers-reduced-motion: reduce) {
    .faq-panel,
    .faq-mark::before,
    .faq-mark::after,
    .related-arrow {
        transition: none;
    }
}
</style>
