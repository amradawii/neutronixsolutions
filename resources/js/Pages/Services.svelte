<script>
    import { page, Link } from '@inertiajs/svelte'
    import { onMount } from 'svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import { media } from '../lib/media.js'
    import { reveal } from '../lib/reveal.js'
    import { getServiceGroups, getServices } from '../lib/services.js'
    import { maskedLines, parallax, railProgress, staggerIn, toLines, watchSections, scrollToId } from '../lib/motion.js'

    const content = {
        en: {
            eyebrow: 'Neutronix Capabilities',
            title: 'Technical\ncapabilities.',
            subtitle: 'Engineering solutions for systems that need to perform, integrate, and scale.',
            desc: 'Engage one focused capability or combine disciplines under one accountable technical partner in Qatar.',
            facts: [
                { id: 'count', l: 'Focused capabilities' },
                { id: 'groups', l: 'Delivery categories' },
                { id: 'cloud', v: 'Azure', l: 'Cloud foundation' },
                { id: 'base', v: 'Doha', l: 'Engineering base' },
            ],
            navLabel: 'Jump to a category',
            deliverLabel: 'What we deliver',
            moreLabel: 'Full capability detail',
            faqs: {
                label: 'FAQ',
                title: 'Frequently asked\nquestions.',
                items: [
                    {
                        id: 'scope',
                        q: 'Can you own a complete technical delivery?',
                        a: 'Yes. We can lead discovery, architecture, product design, engineering, cloud deployment, integrations, and ongoing optimization under one delivery model.',
                    },
                    {
                        id: 'pricing',
                        q: 'Do you support both enterprises and startups?',
                        a: 'Yes. We adapt governance and delivery depth to the engagement — from focused MVP builds for founders to controlled cloud and integration programs for established organizations.',
                    },
                    {
                        id: 'metrics',
                        q: 'How do you define and measure success?',
                        a: 'We agree measurable technical and business outcomes before delivery — such as reliability, processing time, release velocity, adoption, infrastructure cost, or operational effort saved.',
                    },
                ],
            },
            cta: {
                label: 'Start with the challenge',
                title: 'Not sure which\ncapability you need?',
                sub: 'Describe the system, the bottleneck, or the idea. We will map it to the right capability and tell you what it realistically takes.',
                btn: 'Book a Technical Consultation',
            },
        },
        ar: {
            eyebrow: 'قدرات نيوترونيكس',
            title: 'قدراتنا التقنية.',
            subtitle: 'حلول هندسية لأنظمة يجب أن تعمل وتتكامل وتتوسع بثقة.',
            desc: 'استعن بقدرة متخصصة واحدة أو اجمع التخصصات تحت مسؤولية شريك تقني واحد في قطر.',
            facts: [
                { id: 'count', l: 'قدرة متخصصة' },
                { id: 'groups', l: 'فئات التنفيذ' },
                { id: 'cloud', v: 'Azure', l: 'الأساس السحابي' },
                { id: 'base', v: 'الدوحة', l: 'مقر الهندسة' },
            ],
            navLabel: 'انتقل إلى فئة',
            deliverLabel: 'ما الذي نقوم به',
            moreLabel: 'تفاصيل القدرة كاملة',
            faqs: {
                label: 'الأسئلة الشائعة',
                title: 'أسئلة\nمتكررة.',
                items: [
                    {
                        id: 'scope',
                        q: 'هل يمكنكم تولي التنفيذ التقني بالكامل؟',
                        a: 'نعم. نقود الاستكشاف والهندسة وتصميم المنتج والتطوير والنشر السحابي والتكامل والتحسين المستمر ضمن نموذج تنفيذ واحد.',
                    },
                    {
                        id: 'pricing',
                        q: 'هل تدعمون المؤسسات والشركات الناشئة؟',
                        a: 'نعم. نكيّف الحوكمة وعمق التنفيذ حسب المشروع، من بناء منتجات أولية مركزة للمؤسسين إلى برامج سحابية وتكاملية منضبطة للمؤسسات.',
                    },
                    {
                        id: 'metrics',
                        q: 'كيف تحددون وتقيسون النجاح؟',
                        a: 'نتفق قبل التنفيذ على نتائج تقنية وتجارية قابلة للقياس، مثل الموثوقية وزمن المعالجة وسرعة الإصدار والتبني وتكلفة البنية أو الجهد التشغيلي الموفر.',
                    },
                ],
            },
            cta: {
                label: 'ابدأ بالتحدي',
                title: 'غير متأكد أي\nقدرة تحتاج؟',
                sub: 'صف لنا النظام أو العائق أو الفكرة، وسنحددها على القدرة المناسبة ونوضح ما يتطلبه الأمر فعلياً.',
                btn: 'احجز استشارة تقنية',
            },
        },
    }

    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')
    let c      = $derived(isAR ? content.ar : content.en)

    // Capabilities and categories both come from the shared catalog, so this
    // page never needs editing when one is added.
    let groups = $derived(getServiceGroups(isAR ? 'ar' : 'en'))

    let facts = $derived(
        c.facts.map((fact) => {
            if (fact.id === 'count') return { ...fact, v: String(getServices().length).padStart(2, '0') }
            if (fact.id === 'groups') return { ...fact, v: String(groups.length).padStart(2, '0') }
            return fact
        }),
    )

    let activeCategory = $state('cloud')
    let openFaq = $state(null)

    /** @type {HTMLElement[]} */
    let groupSections = $state([])

    // Sticky navbar + sticky category bar both sit above the scroll target.
    const SCROLL_OFFSET = 128

    onMount(() => watchSections(groupSections, (id) => { activeCategory = id }, { offset: SCROLL_OFFSET + 20 }))

    /** @param {MouseEvent} event @param {string} id */
    function jumpTo(event, id) {
        event.preventDefault()
        activeCategory = id
        scrollToId(id, SCROLL_OFFSET)
    }
</script>

<svelte:head>
    <title>{isAR ? 'قدراتنا التقنية' : 'Technical Capabilities'} | Neutronix</title>
    <meta name="description" content={isAR ? 'خدمات Azure والسحابة وتطوير البرمجيات والأتمتة والبيانات للمؤسسات والشركات الناشئة في قطر.' : 'Azure cloud, custom software, workflow automation, data, and optimization services for enterprises and startups in Qatar.'} />
</svelte:head>

<PublicLayout>
    <!-- ── OPENER ── -->
    <section class="opener">
        <div class="opener-media" aria-hidden="true">
            <img class="opener-img" src={media.servicesBand} alt="" loading="eager" {@attach parallax({ amount: 8 })} />
            <div class="opener-scrim"></div>
        </div>

        <div class="wrap opener-body">
            <span class="label-accent opener-eyebrow">{c.eyebrow}</span>
            <h1 class="opener-title" {@attach maskedLines({ start: 'top 95%' })}>
                {#each toLines(c.title) as line, i (i)}
                    <span class="line"><span data-line>{line}</span></span>
                {/each}
            </h1>
            <p class="opener-sub">{c.subtitle}</p>
            <p class="opener-desc">{c.desc}</p>

            <!-- Cell contents, not the cells: staggering the cells themselves
                 would flash the 1px grid rules through the gaps. -->
            <dl class="facts" {@attach staggerIn({ selector: '.fact > *', y: 12, stagger: 0.05, start: 'top 95%' })}>
                {#each facts as fact (fact.id)}
                    <div class="fact">
                        <dt class="fact-v">{fact.v}</dt>
                        <dd class="fact-l">{fact.l}</dd>
                    </div>
                {/each}
            </dl>
        </div>
    </section>

    <!-- ── STICKY CATEGORY NAV ── -->
    <nav class="cat-nav" aria-label={c.navLabel}>
        <div class="wrap cat-row">
            {#each groups as category (category.id)}
                <a
                    href={'#' + category.id}
                    class="cat-link"
                    class:active={activeCategory === category.id}
                    style="--tone: var(--tone-{category.tone})"
                    aria-current={activeCategory === category.id ? 'true' : undefined}
                    onclick={(event) => jumpTo(event, category.id)}
                >
                    <span class="cat-dot"></span>
                    <span class="cat-link-label">{category.label}</span>
                </a>
            {/each}
        </div>
    </nav>

    <!-- ── CAPABILITIES, GROUPED BY CATEGORY ── -->
    <div class="groups">
        {#each groups as group, gi (group.id)}
            <section
                class="cat-group"
                id={group.id}
                style="--tone: var(--tone-{group.tone})"
                bind:this={groupSections[gi]}
            >
                <div class="wrap">
                    <header class="cat-head" {@attach reveal()}>
                        <span class="cat-head-rule" aria-hidden="true"></span>
                        <h2 class="cat-head-title">{group.label}</h2>
                        <p class="cat-head-desc">{group.desc}</p>
                    </header>

                    <div class="cat-body">
                        <div class="rail" aria-hidden="true">
                            <span class="rail-fill" {@attach railProgress({ scroller: '.cat-group' })}></span>
                        </div>

                        <div class="svc-list">
                            {#each group.items as item (item.id)}
                                <article class="svc" {@attach reveal()}>
                                    <h3 class="svc-title">
                                        <Link href={item.href} class="svc-title-link">{item.title}</Link>
                                    </h3>
                                    <div class="svc-detail">
                                        <p class="svc-desc">{item.summary}</p>
                                        <p class="svc-deliver">{c.deliverLabel}</p>
                                        <ul class="svc-features">
                                            {#each item.features as feature (feature)}
                                                <li class="svc-feature">{feature}</li>
                                            {/each}
                                        </ul>
                                        <Link href={item.href} class="svc-more">
                                            {c.moreLabel} <span aria-hidden="true">{isAR ? '←' : '→'}</span>
                                        </Link>
                                    </div>
                                </article>
                            {/each}
                        </div>
                    </div>
                </div>
            </section>
        {/each}
    </div>

    <!-- ── FAQ ── -->
    <section class="faq">
        <div class="wrap faq-layout">
            <div class="faq-head">
                <span class="label-accent">{c.faqs.label}</span>
                <h2 class="faq-title" {@attach maskedLines()}>
                    {#each toLines(c.faqs.title) as line, i (i)}
                        <span class="line"><span data-line>{line}</span></span>
                    {/each}
                </h2>
            </div>

            <div class="faq-list" {@attach staggerIn({ selector: '.faq-item', y: 20 })}>
                {#each c.faqs.items as faq, i (faq.id)}
                    <div class="faq-item" class:open={openFaq === i}>
                        <h3 class="faq-heading">
                            <button
                                class="faq-trigger"
                                id="faq-trigger-{faq.id}"
                                aria-expanded={openFaq === i}
                                aria-controls="faq-panel-{faq.id}"
                                onclick={() => (openFaq = openFaq === i ? null : i)}
                            >
                                <span class="faq-q">{faq.q}</span>
                                <span class="faq-mark" aria-hidden="true"></span>
                            </button>
                        </h3>
                        <div
                            class="faq-panel"
                            id="faq-panel-{faq.id}"
                            role="region"
                            aria-labelledby="faq-trigger-{faq.id}"
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

    <!-- ── CTA ── -->
    <section class="cta">
        <div class="wrap cta-body" {@attach reveal()}>
            <span class="label-accent cta-label">{c.cta.label}</span>
            <h2 class="cta-title" {@attach maskedLines()}>
                {#each toLines(c.cta.title) as line, i (i)}
                    <span class="line"><span data-line>{line}</span></span>
                {/each}
            </h2>
            <p class="cta-sub">{c.cta.sub}</p>
            <Link href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'} class="btn-primary cta-btn">{c.cta.btn} <span aria-hidden="true">{isAR ? '←' : '→'}</span></Link>
        </div>
    </section>
</PublicLayout>

<style>
/* ── OPENER ──────────────────────────────────────────────────── */
.opener {
    position: relative;
    background: #070707;
    color: var(--color-surface);
    padding-top: calc(var(--nav-h) + 5rem);
    padding-bottom: 4.5rem;
    overflow: clip;
}
.opener-media {
    position: absolute;
    inset: 0;
    overflow: hidden;
}
.opener-img {
    position: absolute;
    inset-inline: 0;
    top: -12%;
    width: 100%;
    height: 124%;
    object-fit: cover;
    object-position: center;
    opacity: 0.34;
}
.opener-scrim {
    position: absolute;
    inset: 0;
    background:
        linear-gradient(to top, #070707 6%, rgba(7, 7, 7, 0.55) 60%, rgba(7, 7, 7, 0.85) 100%),
        radial-gradient(120% 90% at 50% 120%, rgba(26, 63, 168, 0.4), transparent 70%);
}
.opener-body {
    position: relative;
    z-index: 1;
}
.opener-eyebrow {
    color: color-mix(in srgb, var(--color-ember) 60%, white);
}
.opener-title {
    font-size: clamp(2.75rem, 7vw, 5.75rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.02;
    color: var(--color-surface);
    margin: 0 0 1.5rem;
}
:global([dir="rtl"]) .opener-title { letter-spacing: 0; line-height: 1.2; }
.opener-sub {
    font-size: clamp(1.0625rem, 1.8vw, 1.375rem);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.82);
    max-width: 40ch;
    margin: 0 0 0.875rem;
    line-height: 1.5;
}
.opener-desc {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.52);
    max-width: 52ch;
    margin: 0;
    line-height: 1.75;
}
:global([dir="rtl"]) .opener-desc { max-width: 44ch; }
.facts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    margin: 3.5rem 0 0;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.12);
}
@media (min-width: 768px) {
    .facts { grid-template-columns: repeat(4, 1fr); }
}
.fact {
    background: #070707;
    padding: 1.375rem 1.25rem;
}
.fact-v {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.6vw, 2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-surface);
    line-height: 1;
}
:global([dir="rtl"]) .fact-v { font-family: var(--font-arabic); letter-spacing: 0; }
.fact-l {
    margin: 0.5rem 0 0;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.42);
    line-height: 1.4;
}
:global([dir="rtl"]) .fact-l { font-family: var(--font-arabic); letter-spacing: 0.03em; }

/* ── STICKY CATEGORY NAV ─────────────────────────────────────── */
.cat-nav {
    position: sticky;
    top: var(--nav-h);
    z-index: 20;
    border-bottom: 1px solid var(--color-ash);
    background: color-mix(in srgb, var(--color-surface) 88%, transparent);
    backdrop-filter: blur(14px);
}
.cat-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-inline: 0;
}
@media (min-width: 900px) {
    .cat-row { grid-template-columns: repeat(4, 1fr); }
}
.cat-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    min-width: 0;
    padding: 0.9rem 1rem;
    border-inline-end: 1px solid var(--color-ash);
    color: var(--color-muted);
    font-size: 0.6875rem;
    font-weight: 700;
    line-height: 1.3;
    transition: color 200ms, background 200ms;
}
:global([dir="rtl"]) .cat-link { font-family: var(--font-arabic); }
@media (min-width: 900px) {
    .cat-link { padding: 1rem 1.25rem; }
}
.cat-link::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    bottom: -1px;
    height: 2px;
    background: var(--tone);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cat-link:hover { color: var(--color-ink); background: var(--color-canvas); }
.cat-link.active { color: var(--color-ink); }
.cat-link.active::after { transform: scaleX(1); }
.cat-dot {
    width: 0.4375rem;
    height: 0.4375rem;
    border-radius: 50%;
    flex-shrink: 0;
    background: var(--tone);
    opacity: 0.35;
    transition: opacity 200ms, box-shadow 200ms;
}
.cat-link.active .cat-dot {
    opacity: 1;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--tone) 22%, transparent);
}
.cat-link-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* ── CAPABILITY GROUPS ───────────────────────────────────────── */
.groups {
    background: var(--color-canvas);
}
.cat-group {
    padding-block: 4.5rem;
    border-bottom: 1px solid var(--color-ash);
    scroll-margin-top: 128px;
}
.cat-group:last-child { border-bottom: none; }
.cat-head {
    max-width: 62ch;
    margin-bottom: 3rem;
}
.cat-head-rule {
    display: block;
    width: 3rem;
    height: 3px;
    border-radius: 2px;
    background: var(--tone);
    margin-bottom: 1.5rem;
}
.cat-head-title {
    font-size: clamp(1.75rem, 3.6vw, 2.875rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--color-ink);
    margin: 0;
}
:global([dir="rtl"]) .cat-head-title { letter-spacing: 0; line-height: 1.3; }
.cat-head-desc {
    margin: 1rem 0 0;
    color: var(--color-muted);
    font-size: 1.0625rem;
    line-height: 1.7;
}
:global([dir="rtl"]) .cat-head-desc { font-family: var(--font-arabic); }
.cat-body {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
}
@media (min-width: 768px) {
    .cat-body { grid-template-columns: 2px 1fr; gap: 2.5rem; }
}
.rail {
    display: none;
    background: var(--color-ash);
    border-radius: 2px;
}
@media (min-width: 768px) {
    .rail { display: block; }
}
.rail-fill {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--tone);
    border-radius: 2px;
}
.svc-list {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    min-width: 0;
}
.svc {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}
@media (min-width: 1024px) {
    .svc { grid-template-columns: 1fr 1.6fr; gap: 3rem; }
}
.svc-title {
    font-size: clamp(1.25rem, 2vw, 1.625rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.25;
    color: var(--color-ink);
    margin: 0;
}
:global([dir="rtl"]) .svc-title { letter-spacing: 0; line-height: 1.45; }
:global(.svc-title-link) {
    color: inherit;
    transition: color 200ms;
}
:global(.svc-title-link:hover) { color: var(--tone); }
:global(.svc-more) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 1.25rem;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: var(--color-ember);
    transition: gap 200ms;
}
:global(.svc-more:hover) { gap: 0.7rem; }
:global([dir="rtl"]) :global(.svc-more) { font-family: var(--font-arabic); letter-spacing: 0; }
.svc-detail { min-width: 0; }
.svc-desc {
    font-size: 1rem;
    color: var(--color-muted);
    line-height: 1.75;
    margin: 0 0 1.75rem;
}
:global([dir="rtl"]) .svc-desc { font-family: var(--font-arabic); }
.svc-deliver {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ink);
    margin: 0 0 1rem;
}
:global([dir="rtl"]) .svc-deliver { font-family: var(--font-arabic); letter-spacing: 0.03em; }
.svc-features {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1px;
    background: var(--color-ash);
    border: 1px solid var(--color-ash);
}
@media (min-width: 640px) {
    .svc-features { grid-template-columns: repeat(2, 1fr); }
}
.svc-feature {
    position: relative;
    background: var(--color-surface);
    padding: 0.8125rem 1rem 0.8125rem 2rem;
    font-size: 0.875rem;
    color: var(--color-ink);
    transition: background 200ms;
}
:global([dir="rtl"]) .svc-feature {
    font-family: var(--font-arabic);
    padding: 0.8125rem 2rem 0.8125rem 1rem;
}
.svc-feature::before {
    content: '';
    position: absolute;
    inset-inline-start: 1rem;
    top: 1.15rem;
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 1px;
    background: var(--tone);
}
.svc-feature:hover { background: var(--color-canvas); }

/* ── FAQ ─────────────────────────────────────────────────────── */
.faq {
    background: var(--color-surface);
    padding-block: 6rem;
}
.faq-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
}
@media (min-width: 1024px) {
    .faq-layout { grid-template-columns: 1fr 1.7fr; gap: 4rem; }
}
.faq-title {
    font-size: clamp(1.875rem, 3.4vw, 2.75rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--color-ink);
    margin: 0;
}
:global([dir="rtl"]) .faq-title { letter-spacing: 0; line-height: 1.3; }
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
    padding: 1.5rem 0.25rem;
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
    font-size: 1.0625rem;
    font-weight: 600;
    line-height: 1.4;
}
:global([dir="rtl"]) .faq-q { font-family: var(--font-arabic); }
/* Plus that rotates into a minus */
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
/* 0fr -> 1fr animates the panel open without measuring heights in JS */
.faq-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1);
}
.faq-item.open .faq-panel { grid-template-rows: 1fr; }
.faq-panel-inner { overflow: hidden; }
.faq-a {
    margin: 0;
    padding: 0 2.5rem 1.75rem 0.25rem;
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.75;
    max-width: 68ch;
}
:global([dir="rtl"]) .faq-a { font-family: var(--font-arabic); padding: 0 0.25rem 1.75rem 2.5rem; }

/* ── CTA ─────────────────────────────────────────────────────── */
.cta {
    background: var(--color-ash);
    padding-block: 5.5rem;
}
.cta-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
:global([dir="rtl"]) .cta-body {
    align-items: center;
    text-align: center;
}
.cta-label { color: var(--color-ember); }
.cta-title {
    font-size: clamp(2rem, 4.6vw, 3.75rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.06;
    color: var(--color-ink);
    margin: 0.25rem 0 1rem;
}
:global([dir="rtl"]) .cta-title { letter-spacing: 0; line-height: 1.25; text-align: center; }
.cta-sub {
    color: var(--color-muted);
    font-size: 1.0625rem;
    line-height: 1.7;
    max-width: 50ch;
    margin: 0 0 2rem;
}
:global([dir="rtl"]) .cta-sub { font-family: var(--font-arabic); max-width: 44ch; text-align: center; }

@media (prefers-reduced-motion: reduce) {
    .faq-panel,
    .faq-mark::before,
    .faq-mark::after,
    .cat-link::after {
        transition: none;
    }
}
</style>
