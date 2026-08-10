<script>
    import { page, Link } from '@inertiajs/svelte'
    import { onMount } from 'svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import { watchSections, scrollToId } from '../lib/motion.js'

    const content = {
        en: {
            eyebrow: 'Legal & Terms',
            title: 'Terms & Conditions',
            updated: 'Last updated: September 2026',
            navItems: [
                { id: 'acceptance',    label: '1. Acceptance' },
                { id: 'services',      label: '2. Scope of Services' },
                { id: 'ip',            label: '3. Intellectual Property' },
                { id: 'liability',     label: '4. Liability' },
                { id: 'modifications', label: '5. Governing Law' }
            ],
            sections: [
                {
                    id: 'acceptance',
                    title: '1. Acceptance of Terms',
                    paragraphs: [
                        'By accessing or using this website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please do not use the website.'
                    ]
                },
                {
                    id: 'services',
                    title: '2. Scope of Services',
                    paragraphs: [
                        'Information provided on this website is for general informational and demonstration purposes regarding our digital engineering, cloud architecture, and development services. Formal service delivery, project deliverables, and commercial agreements are governed by separate, signed statements of work (SOW) or service contracts.'
                    ]
                },
                {
                    id: 'ip',
                    title: '3. Intellectual Property',
                    paragraphs: [
                        'All materials, designs, branding, and content published on this website are the intellectual property of the company and are protected by applicable copyright and trademark laws. You may not copy, reproduce, or distribute any part without prior written consent.'
                    ]
                },
                {
                    id: 'liability',
                    title: '4. Limitation of Liability',
                    paragraphs: [
                        'While we strive for accuracy, the website and its contents are provided "as is." We are not liable for any direct, indirect, or incidental damages arising from your access to or inability to use this website.'
                    ]
                },
                {
                    id: 'modifications',
                    title: '5. Governing Law & Modifications',
                    paragraphs: [
                        'We reserve the right to revise these terms at any time. Changes become effective immediately upon posting. Your continued use of the website signifies acceptance of the updated terms.'
                    ]
                }
            ],
            contactCard: {
                title: 'Need a customized service agreement?',
                desc: 'We structure tailored statements of work with clear SLAs and milestones for enterprise projects.',
                cta: 'Discuss Your Project'
            }
        },
        ar: {
            eyebrow: 'الشؤون القانونية والشروط',
            title: 'الشروط والأحكام',
            updated: 'آخر تحديث: سبتمبر 2026',
            navItems: [
                { id: 'acceptance',    label: '١. قبول الشروط' },
                { id: 'services',      label: '٢. نطاق الخدمات' },
                { id: 'ip',            label: '٣. الملكية الفكرية' },
                { id: 'liability',     label: '٤. حدود المسؤولية' },
                { id: 'modifications', label: '٥. التعديلات' }
            ],
            sections: [
                {
                    id: 'acceptance',
                    title: '1. قبول الشروط',
                    paragraphs: [
                        'يشكل استخدامك لهذا الموقع موافقة صريحة على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق عليها، يرجى عدم متابعة استخدام الموقع.'
                    ]
                },
                {
                    id: 'services',
                    title: '2. نطاق الخدمات',
                    paragraphs: [
                        'المعلومات المعروضة على هذا الموقع مخصصة لأغراض التعريف بخدماتنا الهندسية والسحابية والبرمجية. يتم تنظيم تفاصيل المشروعات، التسليمات، والالتزامات التجارية عبر عقود واتفاقيات عمل منفصلة وموقعة مع كل عميل.'
                    ]
                },
                {
                    id: 'ip',
                    title: '3. الملكية الفكرية',
                    paragraphs: [
                        'جميع المحتويات والتصاميم والعلامات التجارية المنشورة على هذا الموقع هي ملكية فكرية حصرية للشركة ومحمية بموجب قوانين الملكية الفكرية. لا يجوز نسخها أو إعادة استخدامها دون إذن خطي مسبق.'
                    ]
                },
                {
                    id: 'liability',
                    title: '4. حدود المسؤولية',
                    paragraphs: [
                        'يُقدم محتوى الموقع "كما هو". نحن نبذل قصارى جهدنا لضمان دقة البيانات، ولكننا لا نتحمل أي مسؤولية قانونية عن أي أضرار مباشرة أو غير مباشرة قد تنشأ عن استخدامك للموقع أو عدم القدرة على الوصول إليه.'
                    ]
                },
                {
                    id: 'modifications',
                    title: '5. التعديلات والقانون الحاكم',
                    paragraphs: [
                        'نحتفظ بالحق في تحديث هذه الشروط في أي وقت، وتصبح التعديلات سارية المفعول بمجرد نشرها على الموقع. استمرارك في استخدام الموقع يعني موافقتك على الشروط المحدثة.'
                    ]
                }
            ],
            contactCard: {
                title: 'هل تحتاج إلى اتفاقية خدمة مخصصة؟',
                desc: 'نصيغ بيانات عمل واتفاقيات مستوى خدمة (SLA) محددة المعالم للمشاريع والتحولات المؤسسية.',
                cta: 'ناقش مشروعك معنا'
            }
        }
    }

    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')
    let c      = $derived(isAR ? content.ar : content.en)

    let activeSection = $state('acceptance')
    /** @type {HTMLElement[]} */
    let sectionElements = $state([])

    const SCROLL_OFFSET = 128

    onMount(() => {
        return watchSections(sectionElements, (id) => { activeSection = id }, { offset: SCROLL_OFFSET + 20 })
    })

    function jumpTo(event, id) {
        event.preventDefault()
        activeSection = id
        scrollToId(id, SCROLL_OFFSET)
    }
</script>

<svelte:head>
    <title>{c.title} | Neutronix</title>
    <meta name="description" content={isAR ? 'الشروط والأحكام القانونية لاستخدام موقع وخدمات نيوترونيكس.' : 'Legal terms and conditions governing the use of Neutronix website and services.'} />
</svelte:head>

<PublicLayout>
    <div class="legal-page">
        <!-- ── THIN SLEEK HEADER ── -->
        <header class="legal-hero">
            <div class="wrap">
                <div class="hero-meta-row">
                    <span class="label-accent hero-eyebrow">{c.eyebrow}</span>
                    <div class="legal-badge">
                        <span class="badge-dot" aria-hidden="true"></span>
                        <span>{c.updated}</span>
                    </div>
                </div>
                <h1 class="legal-title">{c.title}</h1>
            </div>
        </header>

        <!-- ── STICKY CATEGORY NAV (SERVICES-STYLE) ── -->
        <nav class="cat-nav" aria-label="Section Navigation">
            <div class="wrap cat-row">
                {#each c.navItems as item (item.id)}
                    <a
                        href={'#' + item.id}
                        class="cat-link"
                        class:active={activeSection === item.id}
                        aria-current={activeSection === item.id ? 'true' : undefined}
                        onclick={(event) => jumpTo(event, item.id)}
                    >
                        <span class="cat-dot"></span>
                        <span class="cat-link-label">{item.label}</span>
                    </a>
                {/each}
            </div>
        </nav>

        <!-- ── WIDE MAIN CONTENT (MATCHES SERVICES PAGE) ── -->
        <main class="wrap legal-body">
            <div class="legal-sections">
                {#each c.sections as section, i (section.id)}
                    <section
                        class="legal-section"
                        id={section.id}
                        bind:this={sectionElements[i]}
                    >
                        <h2 class="section-h2">{section.title}</h2>

                        {#if section.paragraphs}
                            {#each section.paragraphs as p, pi (pi)}
                                <p class="section-p">{p}</p>
                            {/each}
                        {/if}
                    </section>
                {/each}
            </div>

            <!-- ── GRAY BOTTOM CONTACT CARD ── -->
            <div class="legal-cta-card">
                <div class="cta-text">
                    <h3 class="cta-h3">{c.contactCard.title}</h3>
                    <p class="cta-desc">{c.contactCard.desc}</p>
                </div>
                <Link href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'} class="btn-primary">
                    {c.contactCard.cta} <span aria-hidden="true">{isAR ? '←' : '→'}</span>
                </Link>
            </div>
        </main>
    </div>
</PublicLayout>

<style>
    .legal-page {
        background: var(--color-canvas);
        min-height: 100vh;
        padding-top: var(--nav-h);
    }

    .wrap {
        max-width: 1060px;
    }

    /* ── THIN SLEEK HEADER ── */
    .legal-hero {
        background: var(--color-surface);
        border-bottom: 1px solid var(--color-ash);
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }
    .hero-meta-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 0.35rem;
        flex-wrap: wrap;
    }
    .hero-eyebrow {
        margin-bottom: 0;
        letter-spacing: 0.12em;
    }
    .legal-title {
        font-family: var(--font-display);
        font-size: clamp(1.75rem, 3.2vw, 2.65rem);
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1.1;
        color: var(--color-ink);
        margin: 0;
        white-space: nowrap;
    }
    @media (max-width: 540px) {
        .legal-title {
            white-space: normal;
        }
    }
    :global([dir="rtl"]) .legal-title {
        font-family: var(--font-arabic);
        letter-spacing: 0;
        line-height: 1.25;
        font-size: clamp(1.6rem, 2.8vw, 2.25rem);
    }
    .legal-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--color-muted);
        background: var(--color-canvas);
        border: 1px solid var(--color-ash);
        padding: 0.25rem 0.65rem;
        border-radius: 100px;
    }
    :global([dir="rtl"]) .legal-badge {
        font-family: var(--font-arabic);
    }
    .badge-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--color-ember);
    }

    /* ── STICKY CATEGORY NAV (SERVICES-STYLE) ── */
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
        .cat-row {
            grid-template-columns: repeat(5, 1fr);
        }
    }
    .cat-link {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.625rem;
        min-width: 0;
        padding: 0.75rem 0.875rem;
        border-inline-end: 1px solid var(--color-ash);
        border-bottom: 1px solid var(--color-ash);
        color: var(--color-muted);
        font-size: 0.75rem;
        font-weight: 700;
        line-height: 1.3;
        transition: color 200ms, background 200ms;
    }
    :global([dir="rtl"]) .cat-link { font-family: var(--font-arabic); }
    @media (max-width: 899px) {
        .cat-link:nth-child(2n) {
            border-inline-end: none;
        }
        .cat-link:last-child {
            grid-column: 1 / -1;
            border-inline-end: none;
            justify-content: center;
        }
    }
    @media (min-width: 900px) {
        .cat-link {
            padding: 1rem 1.25rem;
            border-bottom: none;
        }
        .cat-link:last-child {
            border-inline-end: none;
            justify-content: flex-start;
        }
    }
    .cat-link::after {
        content: '';
        position: absolute;
        inset-inline: 0;
        bottom: -1px;
        height: 2px;
        background: var(--color-ember);
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
        background: var(--color-ember);
        opacity: 0.35;
        transition: opacity 200ms, box-shadow 200ms;
    }
    .cat-link.active .cat-dot {
        opacity: 1;
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ember) 22%, transparent);
    }
    .cat-link-label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* ── WIDE MAIN CONTENT (MATCHES SERVICES PAGE) ── */
    .legal-body {
        padding-block: 3rem 6rem;
    }
    .legal-sections {
        display: flex;
        flex-direction: column;
    }
    .legal-section {
        padding-block: 2.75rem;
        border-bottom: 1px solid var(--color-ash);
    }
    .legal-section:first-child {
        padding-top: 1rem;
    }
    .legal-section:last-child {
        border-bottom: none;
    }

    .section-h2 {
        font-family: var(--font-display);
        font-size: clamp(1.35rem, 2.2vw, 1.75rem);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--color-ink);
        margin: 0 0 1.25rem;
        line-height: 1.35;
    }
    :global([dir="rtl"]) .section-h2 {
        font-family: var(--font-arabic);
        letter-spacing: 0;
        line-height: 1.45;
        font-size: clamp(1.25rem, 2vw, 1.5rem);
    }

    .section-p {
        font-size: 1rem;
        line-height: 1.85;
        color: rgba(8, 12, 21, 0.84);
        margin: 0 0 1.25rem;
        max-width: 88ch;
    }
    .section-p:last-child {
        margin-bottom: 0;
    }
    :global([dir="rtl"]) .section-p {
        font-family: var(--font-arabic);
        line-height: 1.9;
    }

    /* ── GRAY BOTTOM CONTACT CARD ── */
    .legal-cta-card {
        background: #E8EDF4;
        border: 1px solid var(--color-ash);
        border-radius: 8px;
        padding: 2.5rem 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;
        margin-top: 4rem;
    }
    @media (max-width: 640px) {
        .legal-cta-card {
            padding: 2rem 1.5rem;
        }
    }
    .cta-h3 {
        font-family: var(--font-display);
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--color-ink);
        margin: 0 0 0.35rem;
    }
    :global([dir="rtl"]) .cta-h3 {
        font-family: var(--font-arabic);
        letter-spacing: 0;
        font-size: 1.1875rem;
    }
    .cta-desc {
        color: var(--color-muted);
        font-size: 0.9375rem;
        margin: 0;
        line-height: 1.6;
    }
    :global([dir="rtl"]) .cta-desc {
        font-family: var(--font-arabic);
    }
</style>
