<script>
    import { page, Link } from '@inertiajs/svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import HeroField from '../Components/HeroField.svelte'
    import { reveal } from '../lib/reveal.js'
    import { onMount } from 'svelte'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    gsap.registerPlugin(ScrollTrigger)

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
                { id: 'cost',   v: '40%',   l: 'infrastructure cost removed',      client: 'Novus Living' },
                { id: 'uptime', v: '99.9%', l: 'uptime SLA sustained',             client: 'Novus Living' },
                { id: 'deploy', v: '60%',   l: 'faster deployments',               client: 'Aether Skincare' },
                { id: 'flows',  v: '12',    l: 'workflows automated end-to-end',   client: 'Solara Energy' },
                { id: 'setup',  v: '34%',   l: 'shorter client setup',             client: 'Zeta Warehouses' },
                { id: 'report', v: '8 hrs', l: 'manual reporting removed weekly',  client: 'Apex Capital' },
            ],
            services: {
                label: 'Core Capabilities',
                title: 'Complex technology.\nClear outcomes.',
                sub: 'Nine focused services. Scroll to explore — or view all capabilities for the full picture.',
                items: [
                    { id:'azure', kicker:'Cloud & Infrastructure', title:'Azure Cloud Architecture & Migration', desc:'Secure, scalable Azure environments planned around your workloads, governance requirements, and operating model.', offerings:['Cloud Readiness Assessment','Azure Landing Zones','Workload Migration'], img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70&auto=format&fit=crop', color:'#0EA5E9' },
                    { id:'devops', kicker:'Cloud & Infrastructure', title:'DevOps, Deployment & Reliability', desc:'Production pipelines and operational foundations that make releases predictable, observable, and recoverable.', offerings:['CI/CD Pipelines','Containers & Microservices','Monitoring & Alerting'], img:'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=70&auto=format&fit=crop', color:'#0EA5E9' },
                    { id:'platforms', kicker:'Custom Engineering', title:'Full-Stack Platforms & Custom Systems', desc:'Business-critical web platforms, portals, internal tools, and APIs engineered around real workflows.', offerings:['Custom Web Platforms','Enterprise Portals','API Architecture'], img:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=70&auto=format&fit=crop', color:'#6366F1' },
                    { id:'mvp', kicker:'Custom Engineering', title:'MVP & Product Engineering', desc:'A disciplined path from product idea to a validated, production-ready release for founders and innovation teams.', offerings:['Product Discovery','UX/UI Engineering','MVP Development'], img:'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=70&auto=format&fit=crop', color:'#6366F1' },
                    { id:'automation', kicker:'Data & Automation', title:'Workflow Automation & Integration', desc:'Connected workflows that remove repetitive work and move information reliably between your teams, tools, and customers.', offerings:['n8n Orchestration','System Connectors','API & Webhook Integration'], img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70&auto=format&fit=crop', color:'#10B981' },
                    { id:'data', kicker:'Data & Automation', title:'Data Analytics & Business Intelligence', desc:'Reliable data pipelines and decision-ready dashboards that turn fragmented operational data into a shared source of truth.', offerings:['Data Pipelines','Executive Dashboards','Reporting Automation'], img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=70&auto=format&fit=crop', color:'#10B981' },
                    { id:'ai', kicker:'Data & Automation', title:'Applied AI & Retrieval Systems', desc:'Assistants and document intelligence grounded in your own sources — cited answers in Arabic and English, inside your own Azure tenancy.', offerings:['Bilingual RAG','Document Intelligence','Model Adaptation'], img:'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=70&auto=format&fit=crop', color:'#10B981' },
                    { id:'optimization', kicker:'Data & Automation', title:'Maintenance & Performance Optimization', desc:'Targeted modernization for systems held back by slow APIs, fragile code, database bottlenecks, or rising infrastructure cost.', offerings:['Legacy Refactoring','API Optimization','Database Tuning'], img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=70&auto=format&fit=crop', color:'#14B8A6' },
                    { id:'creative', kicker:'Creative & Growth', title:'Product Design, Brand & Digital Growth', desc:'Complementary product experience, identity, and growth support that helps technically strong solutions launch with equal clarity.', offerings:['UX/UI & Product Design','Brand Identity','Launch Systems'], img:'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=70&auto=format&fit=crop', color:'#F59E0B' },
                ],
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
                line3: 'ومبنية لتدوم.',
                sub: 'بنية سحابية وبرمجيات مخصصة وأتمتة وأنظمة بيانات للمؤسسات الطموحة في قطر والمنطقة.',
                cta1: 'ناقش مشروعك معنا',
                cta2: 'استكشف قدراتنا',
            },
            proofLabel: 'نتائج مقاسة من مشاريع منفذة',
            proofStrip: [
                { id: 'cost',   v: '40%',      l: 'خفض تكلفة البنية التحتية',       client: 'نوفوس ليفينج' },
                { id: 'uptime', v: '99.9%',    l: 'استمرارية تشغيل مضمونة',         client: 'نوفوس ليفينج' },
                { id: 'deploy', v: '60%',      l: 'نشر أسرع',                       client: 'إيثر للعناية بالبشرة' },
                { id: 'flows',  v: '12',       l: 'سير عمل مؤتمت بالكامل',          client: 'سولارا للطاقة' },
                { id: 'setup',  v: '34%',      l: 'وقت تهيئة أقصر',                 client: 'مستودعات زيتا' },
                { id: 'report', v: '8 ساعات', l: 'تقارير يدوية ملغاة أسبوعياً',    client: 'أبيكس كابيتال' },
            ],
            services: {
                label: 'قدراتنا الأساسية',
                title: 'تقنية معقدة.\nنتائج واضحة.',
                sub: 'تسع خدمات متخصصة. مرر لاستكشافها — أو اعرض جميع الخدمات للصورة الكاملة.',
                items: [
                    { id:'azure', kicker:'السحابة والبنية التحتية', title:'هندسة Azure والترحيل السحابي', desc:'بيئات Azure آمنة وقابلة للتوسع مبنية حول أحمال العمل ومتطلبات الحوكمة، من التقييم حتى الترحيل.', offerings:['تقييم الجاهزية السحابية','Azure Landing Zones','ترحيل أحمال العمل'], img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=70&auto=format&fit=crop', color:'#0EA5E9' },
                    { id:'devops', kicker:'السحابة والبنية التحتية', title:'DevOps والنشر والموثوقية', desc:'خطوط إنتاج وأسس تشغيلية تجعل الإصدارات قابلة للتوقع والمراقبة والاستعادة.', offerings:['خطوط CI/CD','الحاويات والخدمات المصغرة','المراقبة والتنبيهات'], img:'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=70&auto=format&fit=crop', color:'#0EA5E9' },
                    { id:'platforms', kicker:'الهندسة المخصصة', title:'المنصات المتكاملة والأنظمة المخصصة', desc:'منصات أعمال وبوابات وأدوات داخلية وواجهات برمجية مصممة حول سير العمل الحقيقي.', offerings:['منصات ويب مخصصة','بوابات المؤسسات','هندسة الواجهات البرمجية'], img:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=70&auto=format&fit=crop', color:'#6366F1' },
                    { id:'mvp', kicker:'الهندسة المخصصة', title:'هندسة المنتجات والنماذج الأولية', desc:'مسار منضبط من فكرة المنتج إلى إصدار مُثبت وجاهز للإنتاج للمؤسسين وفرق الابتكار.', offerings:['اكتشاف المنتج','هندسة UX/UI','تطوير MVP'], img:'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=70&auto=format&fit=crop', color:'#6366F1' },
                    { id:'automation', kicker:'البيانات والأتمتة', title:'أتمتة سير العمل والتكامل', desc:'سير عمل مترابط يلغي المهام المتكررة وينقل المعلومات بموثوقية بين الفرق والأدوات والعملاء.', offerings:['تنسيق n8n','موصلات الأنظمة','تكامل API وWebhooks'], img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=70&auto=format&fit=crop', color:'#10B981' },
                    { id:'data', kicker:'البيانات والأتمتة', title:'تحليلات البيانات وذكاء الأعمال', desc:'خطوط بيانات موثوقة ولوحات قرار تحوّل البيانات التشغيلية المتفرقة إلى مصدر موحد للحقيقة.', offerings:['خطوط البيانات','لوحات الإدارة','أتمتة التقارير'], img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=70&auto=format&fit=crop', color:'#10B981' },
                    { id:'ai', kicker:'البيانات والأتمتة', title:'الذكاء الاصطناعي التطبيقي وأنظمة الاسترجاع', desc:'مساعدون واستخراج ذكي للمستندات يستندون إلى مصادرك — إجابات موثّقة بالعربية والإنجليزية داخل بيئة Azure الخاصة بك.', offerings:['استرجاع ثنائي اللغة','ذكاء المستندات','تكييف النماذج'], img:'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=70&auto=format&fit=crop', color:'#10B981' },
                    { id:'optimization', kicker:'البيانات والأتمتة', title:'الصيانة وتحسين الأداء', desc:'تحديث موجه للأنظمة المتأثرة ببطء الواجهات أو هشاشة الشفرة أو اختناقات قواعد البيانات.', offerings:['تحديث الأنظمة القديمة','تحسين API','ضبط قواعد البيانات'], img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=70&auto=format&fit=crop', color:'#14B8A6' },
                    { id:'creative', kicker:'الإبداع والنمو', title:'تصميم المنتج والهوية والنمو الرقمي', desc:'خدمات مكملة في تجربة المنتج والهوية والنمو تساعد الحلول التقنية القوية على الانطلاق بوضوح.', offerings:['تصميم UX/UI والمنتج','الهوية التجارية','أنظمة الإطلاق'], img:'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=70&auto=format&fit=crop', color:'#F59E0B' },
                ],
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

    // ── GSAP scroll-driven services slider ────────────────────────
    /** @type {HTMLElement|null} */
    let sliderSection = $state(null)
    /** @type {HTMLElement|null} */
    let sliderViewport = $state(null)
    /** @type {HTMLElement|null} */
    let sliderTrack = $state(null)
    /** @type {HTMLElement|null} */
    let progressFill = $state(null)

    // Pinning is only enabled where the whole section fits on screen. This must
    // stay in sync with the matching @media block in this component's <style>,
    // which compacts the section to exactly one viewport.
    const PIN_QUERY = '(min-width: 768px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)'

    // Extra scroll after the last card lands, so it stays fully visible for a
    // beat before the section unpins.
    const DWELL = 160

    onMount(() => {
        const section = sliderSection
        const viewport = sliderViewport
        const track = sliderTrack
        if (!section || !viewport || !track) return

        const mm = gsap.matchMedia()

        mm.add(PIN_QUERY, () => {
            const styles = getComputedStyle(track)
            const rtl = styles.direction === 'rtl'
            // The track drops its trailing padding while pinned, so add the
            // leading gutter back to land the last card off the viewport edge.
            const gutter = parseFloat(styles.paddingInlineStart) || 0

            // scrollWidth/clientWidth are layout metrics and stay constant while
            // the track is translated. Measuring with getBoundingClientRect()
            // instead would feed the current x back into the distance, shrinking
            // it on every update so the track stalls before the last card.
            const getDistance = () => Math.max(track.scrollWidth + gutter - viewport.clientWidth, 0)
            if (getDistance() === 0) return

            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${getDistance() + DWELL}`,
                pin: true,
                pinSpacing: true,
                scrub: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const distance = getDistance()
                    const progress = Math.min((self.progress * (distance + DWELL)) / distance, 1)
                    gsap.set(track, { x: (rtl ? distance : -distance) * progress })
                    if (progressFill) gsap.set(progressFill, { scaleX: progress })
                },
            })

            // Moving focus into a card makes the browser scroll the clipped
            // viewport horizontally, which desyncs it from the GSAP transform.
            const pinScrollLeft = () => { viewport.scrollLeft = 0 }
            viewport.addEventListener('scroll', pinScrollLeft)

            // Webfont swap changes the section height, and therefore the pin
            // distance, after the trigger has already measured it.
            let live = true
            document.fonts?.ready.then(() => { if (live) trigger.refresh() })

            return () => {
                live = false
                viewport.removeEventListener('scroll', pinScrollLeft)
                trigger.kill()
                gsap.set(track, { x: 0 })
                if (progressFill) gsap.set(progressFill, { scaleX: 0 })
            }
        })

        return () => mm.revert()
    })
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
            <p class="hero-brand hero-enter he-1">{isAR ? 'نيوترونيكس' : 'Neutronix'}<span class="dot">•</span></p>

            <h1 class="hero-h1 hero-enter he-2">
                {c.hero.line1}<br>
                {c.hero.line2Pre}<em class="em">{c.hero.accent}</em>{c.hero.line2Post}<br>
                {c.hero.line3}
            </h1>

            <p class="hero-sub hero-enter he-3">{c.hero.sub}</p>

            <div class="hero-ctas hero-enter he-4">
                <Link href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'} class="btn-primary">{c.hero.cta1}</Link>
                <Link href={isAR ? '/ar/services' : '/services'} class="btn-ghost">{c.hero.cta2} →</Link>
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
                            <span class="ps-client">{item.client}</span>
                        </li>
                    {/each}
                </ul>
            {/each}
        </div>
    </section>

    <!-- ── SERVICES PREVIEW (GSAP scroll slider) ── -->
    <section class="section-services" id="services" bind:this={sliderSection}>
        <div class="svc-slider-wrap">
            <header class="svc-header wrap">
                <div class="svc-header-left">
                    <span class="label-accent">{c.services.label}</span>
                    <h2 class="sh-h2" style="white-space:pre-line">{c.services.title}</h2>
                </div>
                <p class="sh-p svc-header-right">{c.services.sub}</p>
            </header>

            <div class="svc-track-outer" bind:this={sliderViewport}>
                <div class="svc-track" bind:this={sliderTrack}>
                    {#each c.services.items as s (s.id)}
                        <article class="svc-card" style="--card-color:{s.color}">
                            <!-- Image panel at top -->
                            <div class="svc-card-img">
                                <img src={s.img} alt="" loading="lazy" />
                                <div class="svc-card-img-overlay" style="background:linear-gradient(160deg,{s.color}33 0%,{s.color}11 100%)"></div>
                                <span class="svc-tag">{s.kicker}</span>
                            </div>
                            <!-- Text body -->
                            <div class="svc-card-body">
                                <h3 class="svc-title">{s.title}</h3>
                                <p class="svc-desc">{s.desc}</p>
                                <ul class="svc-chips">
                                    {#each s.offerings as offering (offering)}
                                        <li>{offering}</li>
                                    {/each}
                                </ul>
                                <Link href={isAR ? '/ar/services' : '/services'} class="svc-card-link" aria-label="{isAR ? 'اعرف المزيد عن' : 'Learn more about'} {s.kicker}">
                                    {isAR ? 'استكشف' : 'Explore'}
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </Link>
                            </div>
                        </article>
                    {/each}
                </div>
            </div>

            <div class="svc-footer-row wrap">
                <div class="svc-progress-bar" aria-hidden="true">
                    <div class="svc-progress-fill" bind:this={progressFill}></div>
                </div>
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
                <h2 class="qatar-h2">{isAR ? 'نبني المستقبل الرقمي للمنطقة.' : 'Building the region\'s digital future.'}</h2>
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
            <Link href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'} class="btn-cta-dark">{c.cta.btn} →</Link>
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
:global([dir="rtl"]) .hero-eyebrow { font-family: var(--font-arabic); letter-spacing: 0.04em; }
.hero-brand {
    font-family: var(--font-display);
    font-size: clamp(2.75rem, 7vw, 5.5rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: var(--color-surface);
    margin: 0 0 1rem;
}
:global([dir="rtl"]) .hero-brand {
    font-family: var(--font-arabic);
    letter-spacing: 0;
    line-height: 1.25;
}
.hero-brand .dot {
    color: var(--color-ember);
    margin-inline-start: 0.15em;
}
.hero-h1 {
    font-size: clamp(1.5rem, 3.2vw, 2.5rem);
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
    letter-spacing: 0;
    line-height: 1.25;
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
:global([dir="rtl"]) .hero-sub { font-family: var(--font-arabic); max-width: 38ch; }
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
.ps-client {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-muted);
}
:global([dir="rtl"]) .ps-client { font-family: var(--font-arabic); letter-spacing: 0.03em; }

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

/* ── SERVICES (GSAP scroll slider) ──────────────────────────── */
.section-services {
    position: relative;
    background: var(--color-canvas);
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: clip;
}
.svc-slider-wrap {
    padding-block: 4rem 2.5rem;
    background: var(--color-canvas);
    width: 100%;
}
.svc-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem 4rem;
    margin-bottom: 2.5rem;
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
:global([dir="rtl"]) .sh-h2 {
    font-family: var(--font-arabic);
    letter-spacing: 0;
    line-height: 1.25;
}
.sh-p {
    color: var(--color-muted);
    font-size: 1.0625rem;
    line-height: 1.65;
    margin: 0;
}
:global([dir="rtl"]) .sh-p { font-family: var(--font-arabic); }
.svc-header-right {
    max-width: 44ch;
    padding-bottom: 0.25rem;
}

/* Horizontal slider track.
   Default (unpinned) behaviour is a plain native horizontal scroller; the
   pinned media query further down hands control over to GSAP. */
.svc-track-outer {
    overflow-x: auto;
    overflow-y: hidden;
    padding-block: 0.75rem 1.25rem;
    scroll-snap-type: x proximity;
}
/* --gutter lines the first and last card up with the .wrap container above.
   It is only ever consumed as padding, so the percentage always resolves
   against the same containing block. */
.svc-track {
    --gutter: max(1.25rem, calc((100% - 1280px) / 2 + 1.25rem));
    display: flex;
    gap: 1.5rem;
    padding-inline: var(--gutter);
}
@media (min-width: 480px) {
    .svc-track { --gutter: max(1.5rem, calc((100% - 1280px) / 2 + 1.5rem)); }
}
@media (min-width: 1024px) {
    .svc-track { --gutter: max(2.5rem, calc((100% - 1280px) / 2 + 2.5rem)); }
}

/* ── Modern light service cards with image panel ── */
.svc-card {
    flex: 0 0 min(340px, 78vw);
    scroll-snap-align: start;
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    transition: box-shadow 350ms, transform 350ms, border-color 350ms;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.svc-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.12), 0 0 0 1px color-mix(in srgb, var(--card-color, var(--color-ember)) 30%, transparent);
    border-color: color-mix(in srgb, var(--card-color, var(--color-ember)) 35%, transparent);
}

/* Image panel */
.svc-card-img {
    position: relative;
    height: 148px;
    overflow: hidden;
    flex-shrink: 0;
}
.svc-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 600ms cubic-bezier(0.22,1,0.36,1);
    display: block;
}
.svc-card:hover .svc-card-img img { transform: scale(1.07); }
.svc-card-img-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
}
/* Category pill floated over image */
.svc-tag {
    position: absolute;
    bottom: 0.875rem;
    inset-inline-start: 0.875rem;
    display: inline-flex;
    align-items: center;
    font-size: 0.5625rem;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #fff;
    padding: 0.3rem 0.75rem;
    border-radius: 100px;
    background: color-mix(in srgb, var(--card-color, var(--color-ember)) 88%, #000);
    backdrop-filter: blur(8px);
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
}
:global([dir="rtl"]) .svc-tag { font-family: var(--font-arabic); letter-spacing: 0; }

/* Text body */
.svc-card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.125rem 1.375rem 1.375rem;
    gap: 0.5rem;
}
.svc-title {
    font-family: var(--font-display);
    font-size: 1.075rem;
    font-weight: 700;
    letter-spacing: -0.022em;
    color: var(--color-ink);
    line-height: 1.25;
    margin: 0;
}
:global([dir="rtl"]) .svc-title { font-family: var(--font-arabic); letter-spacing: 0; }
.svc-desc {
    color: var(--color-muted);
    font-size: 0.8125rem;
    line-height: 1.65;
    flex: 1;
    margin: 0;
}
:global([dir="rtl"]) .svc-desc { font-family: var(--font-arabic); }
.svc-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    padding-top: 0.625rem;
    border-top: 1px solid var(--color-ash);
}
.svc-chips li {
    font-size: 0.5625rem;
    font-weight: 700;
    color: var(--color-muted);
    background: var(--color-canvas);
    border: 1px solid var(--color-ash);
    padding: 0.2rem 0.55rem;
    border-radius: 100px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}
:global([dir="rtl"]) .svc-chips li { font-family: var(--font-arabic); letter-spacing: 0; }
:global(.svc-card-link) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--card-color, var(--color-ember));
    transition: gap 200ms;
    margin-top: 0.125rem;
}
:global(.svc-card-link:hover) { gap: 0.65rem; }
:global([dir="rtl"]) :global(.svc-card-link) { font-family: var(--font-arabic); letter-spacing: 0; }

/* Scroll progress + footer row */
.svc-footer-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}
/* Only meaningful while GSAP drives the track */
.svc-progress-bar {
    display: none;
    flex: 1;
    min-width: 120px;
    height: 2px;
    background: var(--color-ash);
    border-radius: 2px;
    overflow: hidden;
}
.svc-progress-fill {
    height: 100%;
    width: 100%;
    background: var(--color-ember);
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left center;
}
:global([dir="rtl"]) .svc-progress-fill { transform-origin: right center; }
:global(.svc-all-btn) {
    flex-shrink: 0;
    font-size: 0.75rem !important;
    padding: 0.6rem 1.25rem !important;
}

/* ── Pinned mode ──────────────────────────────────────────────
   Must mirror PIN_QUERY in <script>. The section is compacted to exactly one
   viewport (minus the fixed navbar) so GSAP can pin it without clipping the
   heading behind the navbar or cutting off the footer row. */
@media (min-width: 768px) and (min-height: 720px) and (prefers-reduced-motion: no-preference) {
    .section-services {
        height: 100vh;
    }
    .svc-slider-wrap {
        padding-block: calc(var(--nav-h) + 1.5rem) 1.5rem;
        /* Never let flex shrink the wrap below its content on short screens —
           the generous block padding absorbs the overflow instead. */
        flex-shrink: 0;
    }
    .svc-header {
        margin-bottom: 1.75rem;
    }
    .svc-header .sh-h2 {
        font-size: clamp(1.75rem, 3.2vw, 2.75rem);
    }
    .svc-track-outer {
        overflow: hidden;
        scroll-snap-type: none;
        padding-block: 0.5rem 0.75rem;
    }
    /* The trailing gutter becomes part of the scroll distance in JS instead,
       because browsers disagree on whether end padding counts in scrollWidth. */
    .svc-track {
        padding-inline-end: 0;
        will-change: transform;
    }
    .svc-card-img {
        height: 128px;
    }
    .svc-footer-row {
        margin-top: 1.25rem;
    }
    .svc-progress-bar {
        display: block;
    }
}

/* ── PROOF BAND (light) ──────────────────────────────────────── */
.proof-band {
    background: var(--color-surface);
    border-top: 1px solid var(--color-ash);
    padding-block: 5rem;
}
.proof-eyebrow {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 3.5rem;
    padding-bottom: 2.5rem;
    border-bottom: 1px solid var(--color-ash);
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
    border-bottom: 1px solid var(--color-ash);
    position: relative;
}
@media (min-width: 600px) {
    .proof-entry { padding: 2rem; border-inline-end: 1px solid var(--color-ash); }
}
.proof-entry::after {
    content: '';
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    width: 2.5rem;
    height: 3px;
    background: var(--color-ember);
    border-radius: 0 0 3px 3px;
}
@media (min-width: 600px) {
    .proof-entry::after { top: 0; left: 2rem; width: 2.5rem; }
}
.proof-entry-title {
    font-size: 1.0625rem;
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: 0.625rem;
    margin-top: 1.75rem;
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
    border-top: 1px solid var(--color-ash);
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
.process-title {
    color: #fff;
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
    color: var(--color-ember);
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
:global([dir="rtl"]) .cta-body { align-items: flex-end; }
.cta-pill {
    color: var(--color-ember);
}
.cta-h2 {
    font-size: clamp(2.25rem, 5.25vw, 4.35rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.06;
    color: var(--color-ink);
    margin: 0.6rem 0 1rem;
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
    letter-spacing: 0;
    line-height: 1.2;
}
.cta-sub {
    color: var(--color-muted);
    font-size: 1.0625rem;
    margin-bottom: 2rem;
    max-width: 46ch;
    line-height: 1.6;
}
:global([dir="rtl"]) .cta-sub { font-family: var(--font-arabic); max-width: 38ch; }
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
    max-width: 580px;
    padding-block: 3rem;
}
:global([dir="rtl"]) .qatar-inner { text-align: right; }
.qatar-label {
    color: color-mix(in srgb, var(--color-ember) 85%, white);
}
.qatar-h2 {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: #ffffff;
    margin: 0.75rem 0 1rem;
}
:global([dir="rtl"]) .qatar-h2 { font-family: var(--font-arabic); letter-spacing: 0; line-height: 1.25; }
.qatar-p {
    color: rgba(255,255,255,0.68);
    font-size: clamp(0.9375rem, 1.3vw, 1.0625rem);
    line-height: 1.75;
    max-width: 44ch;
}
:global([dir="rtl"]) .qatar-p { font-family: var(--font-arabic); max-width: 38ch; }

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
