<script>
    import { page, Link } from '@inertiajs/svelte'
    import { onMount } from 'svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import { watchSections, scrollToId } from '../lib/motion.js'

    const content = {
        en: {
            eyebrow: 'Legal & Compliance',
            title: 'Privacy Policy',
            updated: 'Last updated: September 2026',
            navItems: [
                { id: 'collection', label: '1. Collection' },
                { id: 'usage',      label: '2. Usage' },
                { id: 'security',   label: '3. Security' },
                { id: 'third-party',label: '4. Third Parties' },
                { id: 'rights',     label: '5. Your Rights' }
            ],
            sections: [
                {
                    id: 'collection',
                    title: '1. Information We Collect',
                    paragraphs: [
                        'We collect information you provide directly to us (such as your name, email address, company name, and project requirements when contacting us or requesting a consultation). We also automatically collect standard technical data when you visit our website (such as IP address, browser type, and usage telemetry via cookies).'
                    ]
                },
                {
                    id: 'usage',
                    title: '2. How We Use Your Information',
                    intro: 'We use the collected information to:',
                    list: [
                        'Provide, operate, and maintain our engineering and cloud consulting services.',
                        'Respond to your inquiries, schedule meetings, and send project proposals.',
                        'Monitor website traffic, prevent fraud, and optimize user experience.'
                    ]
                },
                {
                    id: 'security',
                    title: '3. Data Protection & Security',
                    paragraphs: [
                        'We implement industry-standard security measures and cloud governance guardrails to protect your data from unauthorized access, alteration, or disclosure. We do not sell your personal information to third parties.'
                    ]
                },
                {
                    id: 'third-party',
                    title: '4. Third-Party Services',
                    paragraphs: [
                        'We may engage trusted third-party providers (such as cloud hosting, analytics, and CRM platforms) solely to assist in operating our business and website, subject to strict confidentiality agreements.'
                    ]
                },
                {
                    id: 'rights',
                    title: '5. Your Rights',
                    paragraphs: [
                        'You have the right to request access to, correction of, or deletion of your personal information stored with us. For any privacy requests, contact us at contact@neutronix.com.'
                    ],
                    email: 'contact@neutronix.com'
                }
            ],
            contactCard: {
                title: 'Questions about our privacy practices?',
                desc: 'Our compliance and engineering team is available to assist with any security or data questions.',
                cta: 'Discuss Your Project'
            }
        },
        ar: {
            eyebrow: 'الشؤون القانونية والامتثال',
            title: 'سياسة الخصوصية',
            updated: 'آخر تحديث: سبتمبر 2026',
            navItems: [
                { id: 'collection', label: '١. جمع البيانات' },
                { id: 'usage',      label: '٢. استخدام البيانات' },
                { id: 'security',   label: '٣. أمان البيانات' },
                { id: 'third-party',label: '٤. أطراف ثالثة' },
                { id: 'rights',     label: '٥. حقوقك' }
            ],
            sections: [
                {
                    id: 'collection',
                    title: '1. المعلومات التي نجمعها',
                    paragraphs: [
                        'نجمع المعلومات التي تقدمها لنا مباشرة (مثل الاسم، البريد الإلكتروني، اسم الشركة، وتفاصيل المشروع عند التواصل معنا أو طلب استشارة). كما نجمع تلقائياً بيانات تقنية قياسية عند تصفح موقعنا (مثل عنوان IP، نوع المتصفح، وبيانات التحليل عبر ملفات تعريف الارتباط).'
                    ]
                },
                {
                    id: 'usage',
                    title: '2. كيفية استخدام المعلومات',
                    intro: 'نستخدم هذه المعلومات للأغراض التالية:',
                    list: [
                        'تقديم خدماتنا الهندسية والاستشارية وإدارتها بكفاءة.',
                        'الرد على الاستفسارات، جدولة الاجتماعات، وإرسال عروض المشاريع.',
                        'مراقبة أداء الموقع، حماية الأنظمة من الاحتيال، وتحسين تجربة المستخدم.'
                    ]
                },
                {
                    id: 'security',
                    title: '3. أمان البيانات وحمايتها',
                    paragraphs: [
                        'نطبق معايير أمان معتمدة وأطر حوكمة سحابية لحماية بياناتك من الوصول غير المصرح به أو التعديل أو الإفصاح. نحن لا نقوم ببيع بياناتك الشخصية لأي طرف ثالث.'
                    ]
                },
                {
                    id: 'third-party',
                    title: '4. خدمات الطرف الثالث',
                    paragraphs: [
                        'قد نستعين بشركاء ومزودي خدمات سحابية وتحليلية موثوقين فقط للمساعدة في تشغيل أعمالنا وموقعنا الإلكتروني، وذلك وفق اتفاقيات سرية صارمة.'
                    ]
                },
                {
                    id: 'rights',
                    title: '5. حقوقك',
                    paragraphs: [
                        'يحق لك طلب الاطلاع على بياناتك الشخصية المسجلة لدينا، أو تصحيحها، أو حذفها. لأي استفسارات تتعلق بالخصوصية، يمكنك التواصل معنا عبر contact@neutronix.com.'
                    ],
                    email: 'contact@neutronix.com'
                }
            ],
            contactCard: {
                title: 'هل لديك استفسارات حول سياسة الخصوصية؟',
                desc: 'فريقنا الهندسي وحوكمة البيانات مستعد للإجابة عن أي تساؤلات متعلقة بالبيانات والأمان.',
                cta: 'ناقش مشروعك معنا'
            }
        }
    }

    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')
    let c      = $derived(isAR ? content.ar : content.en)

    let activeSection = $state('collection')
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
    <meta name="description" content={isAR ? 'سياسة الخصوصية ومعايير حماية البيانات لدى نيوترونيكس.' : 'Privacy Policy and data protection standards at Neutronix.'} />
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
                                <p class="section-p">
                                    {#if section.email && p.includes(section.email)}
                                        {p.split(section.email)[0]}
                                        <a href={`mailto:${section.email}`} class="legal-link">{section.email}</a>
                                        {p.split(section.email)[1]}
                                    {:else}
                                        {p}
                                    {/if}
                                </p>
                            {/each}
                        {/if}

                        {#if section.intro}
                            <p class="section-p intro-p">{section.intro}</p>
                        {/if}

                        {#if section.list}
                            <ul class="clean-list">
                                {#each section.list as item, li (li)}
                                    <li class="clean-list-item">
                                        <span class="list-bullet" aria-hidden="true"></span>
                                        <span>{item}</span>
                                    </li>
                                {/each}
                            </ul>
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
    .intro-p {
        margin-bottom: 1rem;
        font-weight: 600;
        color: var(--color-ink);
    }

    /* ── CLEAN LIST ── */
    .clean-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
        padding-inline-start: 0.25rem;
        max-width: 88ch;
    }
    .clean-list-item {
        display: flex;
        align-items: flex-start;
        gap: 0.875rem;
        font-size: 1rem;
        line-height: 1.8;
        color: rgba(8, 12, 21, 0.84);
    }
    :global([dir="rtl"]) .clean-list-item {
        font-family: var(--font-arabic);
        line-height: 1.9;
    }
    .list-bullet {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--color-ember);
        flex-shrink: 0;
        margin-top: 0.7rem;
    }

    .legal-link {
        color: var(--color-ember);
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: color 150ms ease;
    }
    .legal-link:hover {
        color: var(--color-ember-dark);
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
