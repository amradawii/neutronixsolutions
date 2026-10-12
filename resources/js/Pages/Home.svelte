<script>
    import { page, Link } from '@inertiajs/svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import HeroField from '../Components/HeroField.svelte'
    import { reveal } from '../lib/reveal.js'
    import { getServiceGroups } from '../lib/services.js'

    const QATAR_FLAG = '/assets/Qatar%20flag%20Lottie%20JSON%20animation.json'
    /** Loads lottie-web on demand so it stays out of the initial Home bundle. */
    const qatarFlag = (path) => (node) => {
        let anim, live = true
        import('lottie-web').then(({ default: lottie }) => {
            if (live) anim = lottie.loadAnimation({ container: node, renderer: 'svg', loop: true, autoplay: !matchMedia('(prefers-reduced-motion: reduce)').matches, path })
        })
        return () => { live = false; anim?.destroy() }
    }

    // ── Bilingual static content ───────────────────────────────────
    const content = {
        en: {
            hero: {
                eyebrow: 'Qatar · Cloud & Engineering',
                line1: 'We Engineer',
                line2Pre: 'Systems That ', accent: 'Scale', line2Post: '.',
                line3: 'Built to Endure.',
                sub: 'Cloud infrastructure, custom software, automation, and data systems for ambitious organizations across Qatar and the region.',
                cta1: 'Discuss Your Project',
                cta2: 'Explore Capabilities',
            },
            proofLabel: 'Measured outcomes from delivered engagements',
            proofStrip: [
                { id: 'cost',   v: '40%',   l: 'infrastructure cost removed' },
                { id: 'uptime', v: '99.9%', l: 'uptime SLA sustained' },
                { id: 'deploy', v: '60%',   l: 'faster deployments' },
                { id: 'flows',  v: '12',    l: 'workflows automated end-to-end' },
                { id: 'setup',  v: '34%',   l: 'shorter client setup' },
                { id: 'report', v: '8 hrs', l: 'manual reporting removed weekly' },
            ],
            services: {
                label: 'Core Capabilities',
                title: 'Complex technology.\nClear outcomes.',
                sub: (n) => `${n} focused services. Choose a category to find the right capability for your next project.`,
            },
            platform: {
                label: 'Built on',
                name: 'Microsoft Azure',
                note: 'Azure-first architecture. Your workloads, data, and models stay inside your own tenancy and governance boundary — not ours.',
            },
            proof: {
                label: 'Built for serious operations',
                items: [
                    { key:'01', title:'Cloud-native', desc:'Azure-first systems designed for security, resilience, and controlled scale.' },
                    { key:'02', title:'Business-aligned', desc:'Every technical decision maps to a practical operating or growth outcome.' },
                    { key:'03', title:'End-to-end ownership', desc:'Architecture, delivery, deployment, and optimization under one accountable team.' },
                    { key:'04', title:'Regional by design', desc:'Bilingual collaboration for organizations building in Qatar and across the GCC.' },
                ],
            },
            process: {
                label: 'Delivery Model',
                title: 'Clarity at every\nstage of delivery.',
                items: [
                    { n:'01', title:'Discover', desc:'We map the business goal, users, system constraints, risks, and success criteria before defining the solution.' },
                    { n:'02', title:'Architect', desc:'We design the technical blueprint, delivery roadmap, security model, and integration strategy with clear trade-offs.' },
                    { n:'03', title:'Build & Integrate', desc:'Senior engineers deliver in visible increments, validate critical paths early, and connect every required system.' },
                    { n:'04', title:'Operate & Optimize', desc:'We deploy, monitor, document, and improve the system so it remains dependable as your organization grows.' },
                ],
            },
            cta: {
                label: 'Start with the challenge',
                title: 'What should technology\nsolve for you next?',
                sub: 'Share the operational bottleneck, product idea, or infrastructure challenge. We will help define the right path forward.',
                btn: 'Book a Technical Consultation',
            }
        },
        ar: {
            hero: {
                eyebrow: 'قطر · السحابة والهندسة التقنية',
                line1: 'نهندس أنظمة',
                line2Pre: 'مصممة من أجل ', accent: 'التوسع', line2Post: '.',
                sub: 'بنية سحابية وبرمجيات مخصصة وأتمتة وأنظمة بيانات للمؤسسات الطموحة في قطر والمنطقة.',
                cta1: 'ناقش مشروعك معنا',
                cta2: 'استكشف قدراتنا',
            },
            proofLabel: 'نتائج مقاسة من مشاريع منفذة',
            proofStrip: [
                { id: 'cost',   v: '40%',      l: 'خفض تكلفة البنية التحتية' },
                { id: 'uptime', v: '99.9%',    l: 'استمرارية تشغيل مضمونة' },
                { id: 'deploy', v: '60%',      l: 'نشر أسرع' },
                { id: 'flows',  v: '12',       l: 'سير عمل مؤتمت بالكامل' },
                { id: 'setup',  v: '34%',      l: 'وقت تهيئة أقصر' },
                { id: 'report', v: '8 ساعات', l: 'تقارير يدوية ملغاة أسبوعياً' },
            ],
            services: {
                label: 'قدراتنا الأساسية',
                title: 'تقنية معقدة.\nنتائج واضحة.',
                sub: (n) => `${n} خدمات متخصصة. اختر فئة لتجد القدرة المناسبة لمشروعك القادم.`,
            },
            platform: {
                label: 'مبني على',
                name: 'Microsoft Azure',
                note: 'هندسة تعتمد Azure أولاً. تبقى أحمال العمل والبيانات والنماذج داخل بيئتك ونطاق الحوكمة الخاص بك، لا لدينا.',
            },
            proof: {
                label: 'مصمم للعمليات الجادة',
                items: [
                    { key:'01', title:'سحابي منذ البداية', desc:'أنظمة مبنية على Azure للأمان والمرونة والتوسع المنضبط.' },
                    { key:'02', title:'مرتبط بأهداف الأعمال', desc:'كل قرار تقني يخدم نتيجة تشغيلية أو فرصة نمو عملية.' },
                    { key:'03', title:'ملكية شاملة', desc:'الهندسة والتنفيذ والنشر والتحسين تحت مسؤولية فريق واحد.' },
                    { key:'04', title:'مصمم للمنطقة', desc:'تعاون ثنائي اللغة للمؤسسات العاملة في قطر ودول الخليج.' },
                ],
            },
            process: {
                label: 'نموذج التنفيذ',
                title: 'وضوح في كل\nمرحلة من التنفيذ.',
                items: [
                    { n:'01', title:'الاستكشاف', desc:'نحدد هدف العمل والمستخدمين وقيود النظام والمخاطر ومعايير النجاح قبل صياغة الحل.' },
                    { n:'02', title:'الهندسة', desc:'نصمم المخطط التقني وخارطة التنفيذ ونموذج الأمان واستراتيجية التكامل مع توضيح المفاضلات.' },
                    { n:'03', title:'البناء والتكامل', desc:'ينفذ مهندسونا على مراحل واضحة، ويختبرون المسارات الحرجة مبكراً، ويربطون الأنظمة المطلوبة.' },
                    { n:'04', title:'التشغيل والتحسين', desc:'ننشر النظام ونراقبه ونوثقه ونطوره ليبقى موثوقاً مع نمو مؤسستك.' },
                ],
            },
            cta: {
                label: 'ابدأ بالتحدي',
                title: 'ما المشكلة التالية التي\nيجب أن تحلها التقنية؟',
                sub: 'شاركنا تحدي البنية التحتية أو فكرة المنتج أو عائق العمليات، وسنساعدك في تحديد المسار الصحيح.',
                btn: 'احجز استشارة تقنية',
            }
        },
    }

    // ── Reactive locale ────────────────────────────────────────────
    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')
    let c      = $derived(isAR ? content.ar : content.en)

    // Grid cards come from the shared catalog rather than a local copy.
    let activeServiceCategory = $state('engineering')
    let serviceGroups = $derived(getServiceGroups(isAR ? 'ar' : 'en'))
    let serviceCount = $derived(serviceGroups.reduce((count, group) => count + group.items.length, 0))

    // ── Hero entrance ──────────────────────────────────────────────
    /** @type {import('svelte/attachments').Attachment} */
    function heroEnter(node) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            node.classList.add('hero-ready', 'hero-reduced')
            return
        }

        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => node.classList.add('hero-ready'))
        })
        return () => cancelAnimationFrame(id)
    }

    // ── Keyboard-accessible service categories ────────────────────
    /** @type {HTMLButtonElement[]} */
    let categoryButtons = $state([])
    /** @param {string} id */
    const serviceTabId = (id) => `home-service-tab-${id}`
    /** @param {string} id */
    const servicePanelId = (id) => `home-service-panel-${id}`
    /** @param {KeyboardEvent} event @param {number} index */
    function navigateServiceTabs(event, index) {
        // Navigation keys follow the tab layout. Other page-scrolling keys keep
        // their native behavior; only focused tabs handle category navigation.
        // Home and End move to the first and last category in catalog order.
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

        // The active tab is the only tab stop; arrow navigation selects and
        // focuses another category without adding every tab to the Tab sequence.
        event.preventDefault()
        const count = serviceGroups.length

        // Keyboard movement follows the visual direction in both locales,
        // rather than assuming English's left-to-right ordering.
        const forward = event.key === (isAR ? 'ArrowLeft' : 'ArrowRight')

        // Wrap at either end so all categories remain reachable. Home and End
        // are logical first/last commands even when Arabic reverses the layout.
        // The catalog is shared with the Services overview, so indices always
        // correspond to the same category names and ordering.
        const next = event.key === 'Home' ? 0
            : event.key === 'End' ? count - 1
            : (index + (forward ? 1 : -1) + count) % count

        // Changing category replaces only the panel contents, not the page
        // position, and keeps keyboard focus on the selected tab.
        activeServiceCategory = serviceGroups[next].id

        // Native focus brings wrapped tabs into view when keyboard navigation
        // moves beyond the currently visible part of the section.
        categoryButtons[next]?.focus()
    }
</script>

<svelte:head>
    <title>{isAR ? 'نيوترونيكس | حلول تقنية في قطر' : 'Neutronix | Cloud & Technology Solutions in Qatar'}</title>
    <meta name="description" content={isAR ? 'حلول سحابية وبرمجيات مخصصة وأتمتة وذكاء أعمال للمؤسسات والشركات الناشئة في قطر.' : 'Azure cloud infrastructure, custom software, automation, and data solutions for enterprises and startups in Qatar.'} />
</svelte:head>

<PublicLayout>
    <!-- ── HERO SECTION ── -->
    <section class="hero" id="home" {@attach heroEnter}>
        <div class="hero-field-wrap" aria-hidden="true">
            <HeroField />
        </div>
        <div class="hero-scrim" aria-hidden="true"></div>

        <div class="wrap hero-body">
            <p class="hero-eyebrow hero-enter he-1"><span class="status-dot"></span>{c.hero.eyebrow}</p>

            <h1 class="hero-h1 hero-enter he-2">
                {c.hero.line1}<br>
                {c.hero.line2Pre}<em class="em">{c.hero.accent}</em>{c.hero.line2Post}
                {#if c.hero.line3}<br>{c.hero.line3}{/if}
            </h1>

            <p class="hero-sub hero-enter he-3">{c.hero.sub}</p>

            <div class="hero-ctas hero-enter he-4">
                <Link href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'} class="btn-primary">{c.hero.cta1}</Link>
                <Link href={isAR ? '/ar/services' : '/services'} class="btn-ghost">{c.hero.cta2} <span aria-hidden="true">{isAR ? '←' : '→'}</span></Link>
            </div>
        </div>
        <div class="scroll-hint hero-enter he-4" aria-hidden="true">
            <span class="scroll-hint-text">{isAR ? 'مرر للأسفل' : 'Scroll'}</span>
            <div class="scroll-pip"></div>
        </div>

    </section>

    <!-- ── OUTCOME PROOF STRIP ──
         A seamless marquee needs the set repeated; only the first copy is
         exposed to assistive tech so the figures are not announced three times. -->
    <section class="proof-strip" aria-label={c.proofLabel}>
        <div class="ps-track">
            {#each [0, 1, 2] as copy (copy)}
                <ul class="ps-set" aria-hidden={copy > 0 ? 'true' : undefined}>
                    {#each c.proofStrip as item (item.id)}
                        <li class="ps-item">
                            <span class="ps-v">{item.v}</span>
                            <span class="ps-l">{item.l}</span>
                        </li>
                    {/each}
                </ul>
            {/each}
        </div>
    </section>

    <!-- ── SERVICES PREVIEW (category grid) ── -->
    <section class="section-services" id="services">
        <div class="svc-grid-wrap wrap">
            <header class="svc-header">
                <div class="svc-header-left">
                    <span class="label-accent">{c.services.label}</span>
                    <h2 class="sh-h2" style="white-space:pre-line">{c.services.title}</h2>
                </div>
                <p class="sh-p svc-header-right">{c.services.sub(serviceCount)}</p>
            </header>

            <div class="svc-tabs" role="tablist" aria-orientation="horizontal" aria-label={isAR ? 'فئات الخدمات' : 'Service categories'}>
                {#each serviceGroups as group, i (group.id)}
                    <button
                        type="button"
                        class="svc-tab"
                        class:active={activeServiceCategory === group.id}
                        style="--tab-color:{group.color}"
                        id={serviceTabId(group.id)}
                        role="tab"
                        aria-selected={activeServiceCategory === group.id}
                        aria-controls={servicePanelId(group.id)}
                        tabindex={activeServiceCategory === group.id ? 0 : -1}
                        bind:this={categoryButtons[i]}
                        onclick={() => activeServiceCategory = group.id}
                        onkeydown={(event) => navigateServiceTabs(event, i)}
                    >
                        <span class="svc-tab-label">{group.label}</span><span class="svc-tab-count">{group.items.length}</span>
                    </button>
                {/each}
            </div>

            {#each serviceGroups as group (group.id)}
                <div
                    class="svc-panel"
                    id={servicePanelId(group.id)}
                    role="tabpanel"
                    aria-labelledby={serviceTabId(group.id)}
                    tabindex="0"
                    hidden={activeServiceCategory !== group.id}
                >
                    <div class="svc-grid">
                        {#each group.items as s (s.slug)}
                            <article class="svc-card" style="--card-color:{s.color}">
                                <!-- Text body -->
                                <div class="svc-card-body">
                                    <h3 class="svc-title">{s.title}</h3>
                                    <p class="svc-desc">{s.summary}</p>
                                    <Link href={s.href} class="svc-card-link" aria-label="{isAR ? 'اعرف المزيد عن' : 'Learn more about'} {s.title}">
                                        {isAR ? 'استكشف' : 'Explore'}
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </Link>
                                </div>
                            </article>
                        {/each}
                    </div>
                </div>
            {/each}

            <div class="svc-footer-row">
                <Link href={isAR ? '/ar/services' : '/services'} class="btn-outline svc-all-btn">{isAR ? 'عرض كل الخدمات' : 'View All Capabilities'}</Link>
            </div>
        </div>
    </section>

    <!-- ── PROOF BAND ── -->
    <section class="proof-band" id="proof">
        <div class="wrap" {@attach reveal()}>
            <div class="proof-eyebrow">
                <span class="label-accent">{c.proof.label}</span>
                <p class="proof-tagline">{isAR ? 'هندسة عملية تتجاوز مرحلة الإطلاق.' : 'Practical engineering that goes beyond launch.'}</p>
            </div>
            <div class="proof-list">
                {#each c.proof.items as item, i (item.key)}
                    <div class="proof-entry" {@attach reveal({ delay: i * 80 })}>
                        <span class="proof-icon" aria-hidden="true">
                            {#if item.key === '01'}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35"><path stroke-linecap="round" stroke-linejoin="round" d="M7.25 18.5h9.5a4 4 0 0 0 .65-7.95A5.75 5.75 0 0 0 6.3 9.2a4.7 4.7 0 0 0 .95 9.3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m9.25 14.25 1.8 1.8 3.9-3.9" /></svg>
                            {:else if item.key === '02'}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35"><circle cx="12" cy="12" r="8.25" /><circle cx="12" cy="12" r="3.25" /><path stroke-linecap="round" d="M12 3.75V6m0 12v2.25M3.75 12H6m12 0h2.25" /></svg>
                            {:else if item.key === '03'}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35"><path stroke-linecap="round" stroke-linejoin="round" d="m9.4 14.6-1.55 1.55a3.25 3.25 0 0 1-4.6-4.6l2.3-2.3a3.25 3.25 0 0 1 4.6 0" /><path stroke-linecap="round" stroke-linejoin="round" d="m14.6 9.4 1.55-1.55a3.25 3.25 0 1 1 4.6 4.6l-2.3 2.3a3.25 3.25 0 0 1-4.6 0" /><path stroke-linecap="round" d="m8.75 15.25 6.5-6.5" /></svg>
                            {:else}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35"><circle cx="12" cy="12" r="8.5" /><path stroke-linecap="round" d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.15 3.3 8.5S14.2 18.2 12 20.5C9.8 18.2 8.7 15.35 8.7 12S9.8 5.8 12 3.5Z" /></svg>
                            {/if}
                        </span>
                        <h3 class="proof-entry-title">{item.title}</h3>
                        <p class="proof-entry-desc">{item.desc}</p>
                    </div>
                {/each}
            </div>

            <div class="platform" {@attach reveal({ delay: 120 })}>
                <span class="platform-label">{c.platform.label}</span>
                <span class="platform-mark">
                    <img class="platform-logo" src="/brand/azure.svg" alt="" width="26" height="26" loading="lazy" />
                    <span class="platform-name">{c.platform.name}</span>
                </span>
                <p class="platform-note">{c.platform.note}</p>
            </div>
        </div>
    </section>

    <!-- ── QATAR IDENTITY BAND ── -->
    <section class="qatar-band" aria-label={isAR ? 'قطر — المقر الرئيسي' : 'Qatar — Our Home'}>
        <div class="qatar-img-wrap">
            <img
                class="qatar-img"
                src="https://images.unsplash.com/photo-1683194247996-43897678c94c?w=1800&q=85&auto=format&fit=crop"
                alt={isAR ? 'أفق الدوحة ليلاً، قطر' : 'Doha skyline at night, Qatar'}
                loading="lazy"
            />
            <div class="qatar-overlay" aria-hidden="true"></div>
        </div>
        <div class="wrap qatar-content">
            <div class="qatar-inner">
                <span class="label-accent qatar-label">{isAR ? 'مقرنا في الدوحة' : 'Based in Doha'}</span>
                <h2 class="qatar-h2">{isAR ? 'نبني المستقبل الرقمي للمنطقة.' : 'Building the region\'s digital future.'}<span class="qatar-flag" aria-hidden="true" {@attach qatarFlag(QATAR_FLAG)}></span></h2>
                <p class="qatar-p">{isAR ? 'من قلب الدوحة، نخدم المؤسسات والشركات الناشئة الطموحة في قطر ودول الخليج — بفهم عميق للمنطقة وقدرات هندسية عالمية المستوى.' : 'From the heart of Doha, we serve enterprises and ambitious startups across Qatar and the GCC — with deep regional understanding and world-class engineering capabilities.'}</p>
            </div>
        </div>
    </section>

    <!-- ── PROCESS (dark tech band) ── -->
    <section class="process-band" id="process">
        <div class="process-field" aria-hidden="true">
            <svg class="filament filament-lg" viewBox="0 0 1200 420" fill="none" preserveAspectRatio="xMidYMid slice">
                <path class="fil-stroke" d="M-40 210 C120 80 220 320 380 180 S620 60 780 220 S980 360 1240 140" />
                <path class="fil-stroke fil-soft" d="M-40 250 C160 360 280 120 460 240 S740 380 920 160 S1100 80 1240 260" />
                <path class="fil-stroke fil-faint" d="M-40 170 C200 40 340 280 520 140 S800 40 980 200 S1120 320 1240 180" />
            </svg>
        </div>
        <div class="wrap process-inner">
            <header class="sh" {@attach reveal()}>
                <span class="label-accent">{c.process.label}</span>
                <h2 class="sh-h2 process-title" style="white-space:pre-line">{c.process.title}</h2>
            </header>

            <div class="steps">
                {#each c.process.items as s, i (s.n)}
                    <div class={['step', i % 2 === 1 && 'step-even']} {@attach reveal({ delay: i * 80 })}>
                        <div class="st-b">
                            <span class="st-phase">{isAR ? 'المرحلة' : 'Phase'} {i + 1}</span>
                            <h3 class="st-t">{s.title}</h3>
                            <p  class="st-d">{s.desc}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>

    <!-- ── CTA BAND ── -->
    <section class="cta-band cta-punch" id="contact" {@attach reveal()}>
        <div class="wrap cta-body">
            <span class="label-accent cta-pill">{c.cta.label}</span>
            <h2 class="cta-h2" style="white-space:pre-line">{c.cta.title}</h2>
            <p  class="cta-sub">{c.cta.sub}</p>
            <Link href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'} class="btn-cta-dark">{c.cta.btn} <span aria-hidden="true">{isAR ? '←' : '→'}</span></Link>
        </div>
    </section>
</PublicLayout>

<style>
/* ── HERO ────────────────────────────────────────────────────── */
.hero-field-wrap {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
}
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding-top: var(--nav-h);
    padding-bottom: 3rem;
    background: #070707;
    max-width: 100%;
}
.hero-scrim {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
        to top,
        rgba(7, 7, 7, 0.88) 0%,
        rgba(7, 7, 7, 0.35) 42%,
        rgba(7, 7, 7, 0.2) 100%
    );
    pointer-events: none;
}
.hero::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    height: 4rem;
    background: linear-gradient(to top, rgba(7, 7, 7, 0.55), transparent);
    pointer-events: none;
    z-index: 1;
}
.hero-body {
    position: relative;
    z-index: 2;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.hero-enter {
    opacity: 0;
    transform: translateY(1.25rem);
}
.hero:global(.hero-ready) .hero-enter {
    opacity: 1;
    transform: none;
    transition:
        opacity 780ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 780ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hero:global(.hero-ready) .he-1 { transition-delay: 60ms; }
.hero:global(.hero-ready) .he-2 { transition-delay: 180ms; }
.hero:global(.hero-ready) .he-3 { transition-delay: 300ms; }
.hero:global(.hero-ready) .he-4 { transition-delay: 420ms; }
.hero:global(.hero-reduced) .hero-enter {
    opacity: 1;
    transform: none;
    transition: none;
}
.hero-eyebrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.625rem;
    margin: 0 0 1.25rem;
    color: rgba(250,250,250,0.62);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}
.status-dot {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: var(--color-ember);
    box-shadow: 0 0 0 0.3rem rgba(37,99,235,0.15);
}
:global([dir="rtl"]) .hero-eyebrow {
    font-family: var(--font-arabic);
    letter-spacing: 0.04em;
    font-weight: 600;
}
.hero-h1 {
    font-size: clamp(1.875rem, 4.2vw, 3.25rem);
    font-weight: 700;
    color: var(--color-surface);
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 1.5rem;
    max-width: 28ch;
    text-align: center;
}
:global([dir="rtl"]) .hero-h1 {
    font-family: var(--font-arabic);
    font-size: clamp(1.5rem, 3.2vw, 2.5rem);
    font-weight: 600;
    letter-spacing: 0;
    line-height: 1.65;
    margin: 0 0 1.4rem;
    max-width: 32ch;
}
.em { color: var(--color-ember); font-style: normal; }
.hero-sub {
    color: rgba(250,250,250,0.72);
    font-size: clamp(0.9375rem, 1.3vw, 1.125rem);
    max-width: 46ch;
    line-height: 1.75;
    margin-bottom: 2.25rem;
    text-align: center;
}
:global([dir="rtl"]) .hero-sub {
    font-family: var(--font-arabic);
    font-size: clamp(0.875rem, 1.1vw, 1rem);
    font-weight: 400;
    line-height: 1.8;
    max-width: 44ch;
    margin-bottom: 2rem;
}
.hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
.scroll-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
}
.scroll-hint-text {
    font-size: 0.5625rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
}
.scroll-pip {
    width: 1px;
    height: 44px;
    background: linear-gradient(to bottom, transparent, rgba(37,99,235,0.7));
    animation: pip 2.4s ease-in-out infinite;
}
@keyframes pip {
    0%,100% { opacity: 0.15; transform: scaleY(0.7); }
    55%      { opacity: 1;    transform: scaleY(1);   }
}
:global(.btn-ghost) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8125rem 1.75rem;
    color: rgba(250,250,250,0.52);
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 2px solid rgba(250,250,250,0.2);
    border-radius: var(--radius-btn);
    transition: color 180ms, border-color 180ms;
}
:global([dir="rtl"]) :global(.btn-ghost) { font-family: var(--font-arabic); letter-spacing: 0; }
:global(.btn-ghost:hover) { color: var(--color-surface); border-color: rgba(250,250,250,0.5); }

/* ── OUTCOME PROOF STRIP ─────────────────────────────────────── */
.proof-strip {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-ash);
    overflow: hidden;
    max-width: 100%;
    cursor: default;
}
/* Three copies so the loop stays gapless on wide displays: after translating
   one copy's width, two remain to cover the viewport. */
.ps-track {
    display: flex;
    width: max-content;
    animation: proof-marquee 54s linear infinite;
}
.proof-strip:hover .ps-track { animation-play-state: paused; }
@keyframes proof-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-33.3333%); }
}
/* RTL reads right to left, so the strip has to travel the other way */
:global([dir="rtl"]) .ps-track { animation-name: proof-marquee-rtl; }
@keyframes proof-marquee-rtl {
    from { transform: translateX(0); }
    to   { transform: translateX(33.3333%); }
}
.ps-set {
    display: flex;
    flex-shrink: 0;
}
.ps-item {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    white-space: nowrap;
    padding: 0.9375rem 1.5rem;
    border-inline-end: 1px solid var(--color-ash);
}
.ps-v {
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--color-ember);
}
:global([dir="rtl"]) .ps-v { font-family: var(--font-arabic); letter-spacing: 0; }
.ps-l {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-ink);
}
:global([dir="rtl"]) .ps-l { font-family: var(--font-arabic); }

/* ── FILAMENT ACCENTS (static CSS/SVG — echo hero field) ─────── */
.filament {
    display: block;
    pointer-events: none;
    max-width: 100%;
}
.filament-lg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
}
.fil-stroke {
    stroke: var(--color-ember);
    stroke-width: 1.25;
    stroke-linecap: round;
    fill: none;
    opacity: 0.55;
}
.fil-soft {
    opacity: 0.28;
    stroke-width: 1;
}
.fil-faint {
    opacity: 0.14;
    stroke-width: 0.9;
}
/* Softer filaments behind process copy so text stays readable */
.process-field .fil-stroke {
    opacity: 0.22;
    stroke-width: 1.1;
}
.process-field .fil-soft {
    opacity: 0.12;
}
.process-field .fil-faint {
    opacity: 0.07;
}
.process-field .filament-lg {
    opacity: 0.85;
}

/* ── SERVICES (category grid) ──────────────────────────────── */
.section-services {
    background: var(--color-canvas);
    scroll-margin-top: calc(var(--nav-h) + 1rem);
}
.svc-grid-wrap { padding-block: 4.5rem; }
.svc-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem 4rem;
    margin-bottom: 3rem;
}
@media (min-width: 900px) {
    .svc-header { grid-template-columns: 1fr 1fr; align-items: end; }
}
.sh-h2 {
    font-size: clamp(2rem, 4.5vw, 3.75rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 0.5rem 0 0;
}
.svc-header .sh-h2 { font-size: clamp(1.5rem, 2.8vw, 2.25rem); }
:global([dir="rtl"]) .sh-h2 {
    font-family: var(--font-arabic);
    letter-spacing: 0;
    line-height: 1.45;
}
.sh-p {
    color: var(--color-muted);
    font-size: 1rem;
    line-height: 1.65;
    margin: 0;
}
:global([dir="rtl"]) .sh-p { font-family: var(--font-arabic); }
.svc-header-right { max-width: 44ch; }

/* Category tabs remain fully visible in a responsive grid; mobile uses two
   columns and two rows instead of requiring horizontal scrolling. */
.svc-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 1.75rem;
    margin-bottom: 2.75rem;
}
@media (min-width: 1024px) {
    .svc-tabs { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
.svc-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    min-width: 0;
    min-height: 52px;
    padding: 0.75rem 0.25rem;
    border: 0;
    border-bottom: 2px solid #CAD0DC;
    border-radius: 0;
    background: transparent;
    color: var(--color-muted);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.4;
    text-align: start;
    cursor: pointer;
    transition: color 180ms, border-color 180ms;
}
.svc-tab:hover {
    color: var(--color-ink);
    border-bottom-color: color-mix(in srgb, var(--tab-color) 55%, var(--color-ink));
}
.svc-tab.active {
    border-bottom-color: color-mix(in srgb, var(--tab-color) 55%, var(--color-ink));
    color: var(--color-ink);
    font-weight: 700;
}
.svc-tab-label { min-width: 0; }
.svc-tab-count {
    flex-shrink: 0;
    color: var(--color-muted);
    font-size: 0.75rem;
    font-weight: 400;
}
:global([dir="rtl"]) .svc-tab { font-family: var(--font-arabic); }

/* The grid uses the same wrap as the heading, keeping every column aligned
   without translated tracks, trailing gutters, or artificial scroll space. */
.svc-panel[hidden] { display: none; }
.svc-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
}
@media (min-width: 1024px) {
    .svc-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* ── Compact light service cards ── */
.svc-card {
    min-width: 0;
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: box-shadow 220ms, transform 220ms, border-color 220ms;
}
.svc-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.06);
}
.svc-card:hover, .svc-card:focus-within {
    border-color: color-mix(in srgb, var(--card-color) 45%, var(--color-ash));
}

/* Visible keyboard focus replaces decorative category pills. */
.svc-tab:focus-visible, .svc-panel:focus-visible, :global(.svc-card-link:focus-visible) {
    outline: 2px solid var(--color-ember);
    outline-offset: 3px;
}

/* Text body */
.svc-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1rem 1.25rem 0.75rem;
    gap: 0.5rem;
}
.svc-title {
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-ink);
    line-height: 1.4;
    margin: 0;
}
:global([dir="rtl"]) .svc-title { font-family: var(--font-arabic); letter-spacing: 0; }

/* Keep previews brief; full descriptions and deliverables live on the detail page. */
.svc-desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: var(--color-muted);
    font-size: 0.875rem;
    line-height: 1.6;
    margin: 0;
}
:global([dir="rtl"]) .svc-desc { font-family: var(--font-arabic); }
:global(.svc-card-link) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    align-self: flex-start;
    min-height: 44px;
    margin-top: auto;
    color: color-mix(in srgb, var(--card-color) 55%, var(--color-ink));
    font-size: 0.8125rem;
    font-weight: 600;
    transition: gap 180ms;
}
:global(.svc-card-link:hover) { gap: 0.65rem; }
:global([dir="rtl"]) :global(.svc-card-link) { font-family: var(--font-arabic); }
:global([dir="rtl"]) :global(.svc-card-link) svg { transform: rotate(180deg); }

/* View-all footer row */
.svc-footer-row { display: flex; justify-content: center; margin-top: 2rem; }

/* The view-all action remains available under every category. */
:global(.svc-all-btn) {
    font-size: 0.8125rem !important;
    padding: 0.75rem 1.5rem !important;
    text-align: center;
}

/* ── Narrow screens ───────────────────────────────────────────
   Keep the content compact without imposing a viewport-height section. */
@media (max-width: 639px) {
    /* Shorter section spacing leaves more room for the cards and their content. */
    .svc-grid-wrap { padding-block: 3rem; }
    .svc-tabs { gap: 0.375rem 0.75rem; }
    .svc-tab { min-height: 52px; padding: 0.625rem 0.25rem; }
    .svc-grid { gap: 0.75rem; }
    .svc-card { border-radius: 10px; }
    .svc-card-body { padding: 0.625rem 0.625rem 0.25rem; gap: 0.375rem; }
    .svc-title { font-size: 0.875rem; line-height: 1.4; }
    .svc-desc { font-size: 0.75rem; line-height: 1.5; }
    :global(.svc-card-link) { font-size: 0.75rem; }
}

/* Reduced-motion users get the same grid and tabs without hover movement. */
@media (prefers-reduced-motion: reduce) {
    .svc-card, .svc-tab, :global(.svc-card-link) { transition: none; }
    .svc-card:hover { transform: none; }
}

/* ── PROOF BAND (light) ──────────────────────────────────────── */
.proof-band {
    background: var(--color-surface);
    border-top: 1px solid #CAD0DC;
    padding-block: 5rem;
}
.proof-eyebrow {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 3.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid #CAD0DC;
}
.proof-tagline {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.8vw, 2.25rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    color: var(--color-ink);
    max-width: 28ch;
}
:global([dir="rtl"]) .proof-tagline { font-family: var(--font-arabic); letter-spacing: 0; }
.proof-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
}
@media (min-width: 600px) { .proof-list { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .proof-list { grid-template-columns: repeat(4, 1fr); } }
.proof-entry {
    padding: 2rem 1.5rem 2rem 0;
    border-bottom: 1px solid #CAD0DC;
    position: relative;
}
@media (min-width: 600px) {
    .proof-entry { padding: 2rem; border-inline-end: 1px solid #CAD0DC; }
}
.proof-icon {
    width: 2.75rem;
    height: 2.75rem;
    display: grid;
    place-items: center;
    color: var(--color-ember);
    transition: transform 240ms ease, color 240ms ease;
}
.proof-icon svg { width: 2.1rem; height: 2.1rem; }
.proof-entry:hover .proof-icon { transform: translateY(-2px); color: var(--color-ember-dark); }
.proof-entry-title {
    font-size: 1.0625rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0.875rem 0 0.625rem;
}
:global([dir="rtl"]) .proof-entry-title { font-family: var(--font-arabic); }
.proof-entry-desc {
    color: var(--color-muted);
    font-size: 0.875rem;
    line-height: 1.65;
}
:global([dir="rtl"]) .proof-entry-desc { font-family: var(--font-arabic); }

/* Platform commitment. The logo carries alt="" on purpose: the brand name sits
   next to it as text, so describing the image would announce it twice. */
.platform {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem 1.75rem;
    margin-top: 3.25rem;
    padding-top: 2.25rem;
    border-top: 1px solid #CAD0DC;
}
.platform-label {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--color-muted);
}
:global([dir="rtl"]) .platform-label { font-family: var(--font-arabic); letter-spacing: 0; }
.platform-mark {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
}
.platform-logo {
    width: 1.625rem;
    height: 1.625rem;
    filter: grayscale(1) brightness(0.55);
    opacity: 0.85;
    transition: filter 320ms ease, opacity 320ms ease;
}
.platform:hover .platform-logo { filter: none; opacity: 1; }
.platform-name {
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-ink);
}
.platform-note {
    flex: 1 1 22rem;
    margin: 0;
    max-width: 54ch;
    font-size: 0.8125rem;
    line-height: 1.7;
    color: var(--color-muted);
}
:global([dir="rtl"]) .platform-note { font-family: var(--font-arabic); }
@media (prefers-reduced-motion: reduce) {
    .platform-logo { transition: none; }
}

/* ── PROCESS (dark tech band) ────────────────────────────────── */
.process-band {
    position: relative;
    overflow: hidden;
    background: #111318;
    padding-block: 5.5rem 6rem;
    color: var(--color-surface);
    max-width: 100%;
}
.process-field {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    opacity: 0.9;
}
.process-inner {
    position: relative;
    z-index: 1;
}
.process-band .label-accent {
    color: #93C5FD;
    margin-bottom: 0.875rem;
}
.process-title {
    color: #fff;
    font-size: clamp(1.85rem, 3.6vw, 2.75rem);
    line-height: 1.2;
    margin: 0.75rem 0 3rem;
}
:global([dir="rtl"]) .process-title {
    font-family: var(--font-arabic);
    font-size: clamp(1.55rem, 3vw, 2.25rem);
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.6;
    margin: 0.85rem 0 3.25rem;
}
.process-band .steps {
    display: grid;
    grid-template-columns: 1fr;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}
@media (min-width: 768px) {
    .process-band .steps { grid-template-columns: repeat(2, 1fr); }
}
.process-band .step {
    display: flex;
    gap: 1.75rem;
    padding: 2.625rem 2.5rem;
    border-bottom:     1px solid rgba(255, 255, 255, 0.1);
    border-inline-end: 1px solid rgba(255, 255, 255, 0.1);
    transition: background 200ms;
    min-width: 0;
}
@media (max-width: 640px) {
    .process-band .step {
        gap: 1rem;
        padding: 1.75rem 1.25rem;
    }
}
.process-band .step:hover {
    background: rgba(255, 255, 255, 0.035);
}
@media (min-width: 768px) {
    .process-band .step-even { border-inline-end: none; }
}
.process-band .st-b {
    min-width: 0;
}
.process-band .st-phase {
    display: block;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 0.75rem;
}
:global([dir="rtl"]) .process-band .st-phase { font-family: var(--font-arabic); letter-spacing: 0.04em; }
.process-band .st-t {
    font-size: 1.1875rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #2B60BA;
    margin-bottom: 0.75rem;
    line-height: 1.2;
}
:global([dir="rtl"]) .process-band .st-t { font-family: var(--font-arabic); letter-spacing: 0; }
.process-band .st-d {
    color: rgba(250, 250, 250, 0.58);
    font-size: 0.9375rem;
    line-height: 1.65;
}
:global([dir="rtl"]) .process-band .st-d { font-family: var(--font-arabic); }

/* ── CTA BAND ────────────────────────────────────────────────── */
.cta-band {
    background: var(--color-ash);
    padding-block: 5.5rem;
    position: relative;
    overflow: hidden;
    max-width: 100%;
    border-top: 1px solid var(--color-ash);
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
.cta-pill {
    color: var(--color-ember);
}
.cta-h2 {
    font-size: clamp(2.25rem, 5.25vw, 4.35rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.12;
    color: var(--color-ink);
    margin: 1rem 0 1.5rem;
}
.cta-punch:global(.reveal) .cta-h2 {
    transform: scale(0.96);
    filter: blur(5px);
}
.cta-punch:global(.reveal-in) .cta-h2 {
    transform: none;
    filter: none;
    transition:
        transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
        filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cta-punch:global(.reveal) :global(.btn-cta-dark) {
    transform: translateY(0.85rem);
    opacity: 0.35;
}
.cta-punch:global(.reveal-in) :global(.btn-cta-dark) {
    transform: none;
    opacity: 1;
    transition:
        transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 120ms,
        opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) 120ms,
        background 180ms,
        color 180ms;
}
:global([dir="rtl"]) .cta-h2 {
    font-family: var(--font-arabic);
    font-size: clamp(1.85rem, 3.8vw, 3.15rem);
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.55;
    text-align: center;
    margin: 1.25rem 0 1.75rem;
}
.cta-sub {
    color: var(--color-muted);
    font-size: 1.0625rem;
    margin-bottom: 2.25rem;
    max-width: 46ch;
    line-height: 1.65;
}
:global([dir="rtl"]) .cta-sub {
    font-family: var(--font-arabic);
    font-size: clamp(0.95rem, 1.2vw, 1.0625rem);
    line-height: 1.8;
    max-width: 44ch;
    text-align: center;
    margin-bottom: 2.5rem;
}
:global(.btn-cta-dark) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.9375rem 2.25rem;
    background: var(--color-ember);
    color: #ffffff;
    font-weight: 700;
    font-size: 0.8125rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 2px solid var(--color-ember);
    border-radius: var(--radius-btn);
    transition: background 180ms, border-color 180ms, transform 200ms;
}
:global([dir="rtl"]) :global(.btn-cta-dark) { font-family: var(--font-arabic); letter-spacing: 0; }
:global(.btn-cta-dark:hover) { background: var(--color-ember-dark); border-color: var(--color-ember-dark); transform: translateY(-1px); }

/* ── QATAR IDENTITY BAND ─────────────────────────────────────── */
.qatar-band {
    position: relative;
    height: clamp(380px, 55vw, 640px);
    overflow: hidden;
}
.qatar-img-wrap {
    position: absolute;
    inset: 0;
}
@keyframes ken-burns {
    0%   { transform: scale(1.14) translateY(-3%); }
    50%  { transform: scale(1.06) translateY(0%); }
    100% { transform: scale(1.14) translateY(-3%); }
}
.qatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 55%;
    display: block;
    animation: ken-burns 10s ease-in-out infinite;
    transform-origin: center center;
}
@media (prefers-reduced-motion: reduce) {
    .qatar-img { animation: none; }
}
.qatar-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        110deg,
        rgba(5, 8, 18, 0.88) 0%,
        rgba(5, 8, 18, 0.62) 45%,
        rgba(5, 8, 18, 0.28) 100%
    );
}
.qatar-content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    align-items: center;
}
.qatar-inner {
    max-width: 900px;
    margin-inline: auto;
    padding-block: 3rem;
    text-align: center;
}
.qatar-flag {
    display: inline-block;
    width: 1.4em;
    height: 1.12em;
    margin-inline-start: 0.3em;
    vertical-align: -0.12em;
}
.qatar-label {
    color: #93C5FD;
    text-shadow: 0 0 20px rgba(96, 165, 250, 0.35);
    margin-bottom: 1.25rem;
}
.qatar-h2 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.6vw, 3.375rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1.18;
    color: #ffffff;
    margin: 1.15rem 0 1.5rem;
}
:global([dir="rtl"]) .qatar-h2 {
    font-family: var(--font-arabic);
    font-size: clamp(1.55rem, 3.1vw, 2.4rem);
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.55;
    margin: 1.25rem 0 1.75rem;
}
.qatar-p {
    color: rgba(255,255,255,0.75);
    font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
    font-weight: 500;
    line-height: 1.8;
    max-width: 62ch;
    margin-inline: auto;
}
:global([dir="rtl"]) .qatar-p {
    font-family: var(--font-arabic);
    font-size: clamp(0.9rem, 1.15vw, 1.025rem);
    line-height: 1.85;
    max-width: 42ch;
}

@media (prefers-reduced-motion: reduce) {
    .cta-punch .cta-h2,
    .cta-punch :global(.btn-cta-dark) {
        filter: none !important;
        transform: none !important;
        opacity: 1 !important;
        transition: none !important;
    }
}
</style>
