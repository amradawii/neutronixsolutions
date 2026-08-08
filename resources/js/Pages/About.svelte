<script>
    import { page, Link } from '@inertiajs/svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import { media } from '../lib/media.js'
    import { reveal } from '../lib/reveal.js'
    import { maskedLines, parallax, staggerIn, toLines } from '../lib/motion.js'

    const content = {
        en: {
            eyebrow: 'Our profile',
            title: 'A technical partner,\nnot a vendor.',
            subtitle: 'A Qatar-based engineering team for ambitious transformation.',
            desc: 'Neutronix brings cloud architecture, software engineering, automation, data, and product thinking into one accountable delivery team. We solve operationally meaningful problems and build systems designed to last beyond launch.',
            mission: {
                label: 'Our mission',
                text: 'To give organizations in Qatar and the region the engineering clarity and execution strength to modernize, scale, and create with confidence.',
            },
            valuesLabel: 'Our core philosophy',
            valuesTitle: 'How we work,\nand why it holds.',
            values: [
                { id: 'rigor', title: 'Engineering Rigor', desc: 'We make architecture, security, performance, and maintainability first-class delivery concerns — not tasks deferred until later.' },
                { id: 'clarity', title: 'Clarity & Accountability', desc: 'We communicate trade-offs plainly, keep delivery visible, and take ownership from initial architecture through production operation.' },
                { id: 'impact', title: 'Operational Impact', desc: 'We measure success in outcomes that matter: less manual work, stronger reliability, faster decisions, and systems ready to scale.' },
            ],
            team: {
                label: 'Delivery team',
                title: 'One team across\nthe critical path.',
                members: [
                    { id: 'architecture', name: 'Architecture & Cloud', role: 'Foundation', tone: 'cloud', bio: 'Azure environments, security models, deployment pipelines, observability, and resilient system design.' },
                    { id: 'product', name: 'Product Engineering', role: 'Build', tone: 'engineering', bio: 'Full-stack platforms, portals, APIs, and MVPs shaped around users and real operating workflows.' },
                    { id: 'intelligence', name: 'Automation & Data', role: 'Optimize', tone: 'data', bio: 'n8n orchestration, enterprise integration, data pipelines, dashboards, and continuous performance improvement.' },
                ],
            },
            cta: {
                label: 'Work with us',
                title: 'Tell us what you\nare trying to build.',
                sub: 'Bring the constraint, the deadline, or the half-formed idea. We will tell you plainly what it takes.',
                btn: 'Book a Technical Consultation',
            },
        },
        ar: {
            eyebrow: 'من نحن',
            title: 'شريك تقني،\nلا مجرد مورّد.',
            subtitle: 'فريق هندسي في قطر للتحولات الطموحة.',
            desc: 'تجمع نيوترونيكس هندسة السحابة وتطوير البرمجيات والأتمتة والبيانات وتفكير المنتج ضمن فريق تنفيذ واحد مسؤول. نحل مشكلات تشغيلية مؤثرة ونبني أنظمة تدوم بعد الإطلاق.',
            mission: {
                label: 'مهمتنا',
                text: 'تمكين المؤسسات في قطر والمنطقة من الوضوح الهندسي وقوة التنفيذ اللازمة للتحديث والتوسع والابتكار بثقة.',
            },
            valuesLabel: 'مبادئنا الأساسية',
            valuesTitle: 'كيف نعمل،\nولماذا يصمد ذلك.',
            values: [
                { id: 'rigor', title: 'الصرامة الهندسية', desc: 'نجعل الهندسة والأمان والأداء وقابلية الصيانة أولويات أساسية في التنفيذ، لا مهاماً مؤجلة.' },
                { id: 'clarity', title: 'الوضوح والمسؤولية', desc: 'نشرح المفاضلات بوضوح، ونجعل التنفيذ مرئياً، ونتولى المسؤولية من الهندسة الأولى حتى التشغيل.' },
                { id: 'impact', title: 'الأثر التشغيلي', desc: 'نقيس النجاح بنتائج مهمة: عمل يدوي أقل وموثوقية أعلى وقرارات أسرع وأنظمة جاهزة للتوسع.' },
            ],
            team: {
                label: 'فريق التنفيذ',
                title: 'فريق واحد عبر\nالمسار التقني.',
                members: [
                    { id: 'architecture', name: 'الهندسة والسحابة', role: 'الأساس', tone: 'cloud', bio: 'بيئات Azure ونماذج الأمان وخطوط النشر والمراقبة وتصميم الأنظمة المرنة.' },
                    { id: 'product', name: 'هندسة المنتجات', role: 'البناء', tone: 'engineering', bio: 'منصات متكاملة وبوابات وواجهات برمجية ومنتجات أولية مصممة حول المستخدم وسير العمل الحقيقي.' },
                    { id: 'intelligence', name: 'الأتمتة والبيانات', role: 'التحسين', tone: 'data', bio: 'تنسيق n8n وتكامل المؤسسات وخطوط البيانات ولوحات المؤشرات والتحسين المستمر للأداء.' },
                ],
            },
            cta: {
                label: 'اعمل معنا',
                title: 'أخبرنا بما\nتحاول بناءه.',
                sub: 'أحضر القيد أو الموعد النهائي أو الفكرة غير المكتملة، وسنوضح لك بصراحة ما يتطلبه الأمر.',
                btn: 'احجز استشارة تقنية',
            },
        },
    }

    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')
    let c      = $derived(isAR ? content.ar : content.en)

    /**
     * Groups the mission quote into ~8-word runs so it can be revealed line by
     * line, without hard-coding breaks that would not survive translation.
     * @param {string} text
     */
    function chunkWords(text) {
        return text.split(' ').reduce((lines, word, i) => {
            if (i % 8 === 0) lines.push(word)
            else lines[lines.length - 1] += ` ${word}`
            return lines
        }, [])
    }

    let missionLines = $derived(chunkWords(c.mission.text))
</script>

<svelte:head>
    <title>{isAR ? 'من نحن' : 'About Us'} | Neutronix</title>
    <meta name="description" content={isAR ? 'تعرف على نيوترونيكس، شريك هندسة السحابة والبرمجيات والأتمتة والبيانات في قطر.' : 'Meet Neutronix, a Qatar-based cloud, software, automation, and data engineering partner.'} />
</svelte:head>

<PublicLayout>
    <!-- ── OPENER ── -->
    <section class="opener">
        <div class="wrap opener-grid">
            <div class="opener-copy">
                <span class="label-accent">{c.eyebrow}</span>
                <h1 class="opener-title" {@attach maskedLines({ start: 'top 95%' })}>
                    {#each toLines(c.title) as line, i (i)}
                        <span class="line"><span data-line>{line}</span></span>
                    {/each}
                </h1>
                <p class="opener-sub">{c.subtitle}</p>
            </div>
            <p class="opener-desc" {@attach reveal()}>{c.desc}</p>
        </div>
    </section>

    <!-- ── PARALLAX BAND ── -->
    <div class="band">
        <img class="band-img" src={media.aboutBand} alt="" loading="eager" {@attach parallax({ amount: 10 })} />
        <div class="band-tint" aria-hidden="true"></div>
    </div>

    <!-- ── MISSION — centred statement ── -->
    <section class="mission">
        <div class="mission-field" aria-hidden="true">
            <svg viewBox="0 0 1200 420" fill="none" preserveAspectRatio="xMidYMid slice">
                <path class="fil" d="M-40 210 C120 80 220 320 380 180 S620 60 780 220 S980 360 1240 140" />
                <path class="fil fil-soft" d="M-40 250 C160 360 280 120 460 240 S740 380 920 160 S1100 80 1240 260" />
                <path class="fil fil-faint" d="M-40 170 C200 40 340 280 520 140 S800 40 980 200 S1120 320 1240 180" />
            </svg>
        </div>
        <div class="wrap mission-body">
            <span class="label-accent mission-label">{c.mission.label}</span>
            <blockquote class="mission-text" {@attach maskedLines({ stagger: 0.06 })}>
                {#each missionLines as line, i (i)}
                    <span class="line"><span data-line>{line}</span></span>
                {/each}
            </blockquote>
        </div>
    </section>

    <!-- ── PHILOSOPHY — centred head ── -->
    <section class="values">
        <div class="wrap">
            <header class="sec-head sec-head-center">
                <span class="label-accent">{c.valuesLabel}</span>
                <h2 class="sec-title" {@attach maskedLines()}>
                    {#each toLines(c.valuesTitle) as line, i (i)}
                        <span class="line"><span data-line>{line}</span></span>
                    {/each}
                </h2>
            </header>

            <div class="values-grid" {@attach staggerIn({ selector: '.value', y: 28 })}>
                {#each c.values as value (value.id)}
                    <article class="value">
                        <span class="value-rule" aria-hidden="true"></span>
                        <h3 class="value-title">{value.title}</h3>
                        <p class="value-desc">{value.desc}</p>
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <!-- ── DISCIPLINES — editorial rows, not cards ── -->
    <section class="team">
        <div class="wrap">
            <header class="sec-head sec-head-center">
                <span class="label-accent team-label">{c.team.label}</span>
                <h2 class="sec-title team-title" {@attach maskedLines()}>
                    {#each toLines(c.team.title) as line, i (i)}
                        <span class="line"><span data-line>{line}</span></span>
                    {/each}
                </h2>
            </header>

            <div class="disciplines" {@attach staggerIn({ selector: '.disc', y: 24 })}>
                {#each c.team.members as m (m.id)}
                    <article class="disc" style="--tone: var(--tone-{m.tone})">
                        <span class="disc-sweep" aria-hidden="true"></span>
                        <div class="disc-id">
                            <span class="disc-role">{m.role}</span>
                            <h3 class="disc-name">{m.name}</h3>
                        </div>
                        <p class="disc-bio">{m.bio}</p>
                    </article>
                {/each}
            </div>
        </div>
    </section>

    <!-- ── CTA — centred close ── -->
    <section class="cta">
        <div class="wrap cta-body" {@attach reveal()}>
            <span class="label-accent cta-label">{c.cta.label}</span>
            <h2 class="cta-title" {@attach maskedLines()}>
                {#each toLines(c.cta.title) as line, i (i)}
                    <span class="line"><span data-line>{line}</span></span>
                {/each}
            </h2>
            <p class="cta-sub">{c.cta.sub}</p>
            <Link href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'} class="btn-primary">{c.cta.btn} →</Link>
        </div>
    </section>
</PublicLayout>

<style>
/* ── OPENER ──────────────────────────────────────────────────── */
.opener {
    background: var(--color-canvas);
    padding-top: calc(var(--nav-h) + 4.5rem);
    padding-bottom: 3.5rem;
}
.opener-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: end;
}
@media (min-width: 1024px) {
    .opener-grid { grid-template-columns: 1.35fr 1fr; gap: 4rem; }
}
.opener-title {
    font-size: clamp(1.75rem, 3.6vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.03;
    color: var(--color-ink);
    margin: 0 0 1.25rem;
}
@media (min-width: 1024px) {
    .opener-title .line { white-space: nowrap; }
}
:global([dir="rtl"]) .opener-title { letter-spacing: 0; line-height: 1.25; }
.opener-sub {
    font-size: 1.1875rem;
    font-weight: 500;
    color: var(--color-ember);
    max-width: 34ch;
    line-height: 1.5;
    margin: 0;
}
:global([dir="rtl"]) .opener-sub { font-family: var(--font-arabic); }
.opener-desc {
    font-size: 1rem;
    color: var(--color-muted);
    line-height: 1.8;
    margin: 0;
    padding-inline-start: 1.5rem;
    border-inline-start: 2px solid var(--color-ember);
}
:global([dir="rtl"]) .opener-desc { font-family: var(--font-arabic); }

/* ── PARALLAX BAND ───────────────────────────────────────────── */
.band {
    position: relative;
    height: clamp(320px, 46vw, 560px);
    overflow: hidden;
    background: var(--color-ash);
}
.band-img {
    position: absolute;
    inset-inline: 0;
    top: -11%;
    width: 100%;
    height: 122%;
    object-fit: cover;
    object-position: center 45%;
}
.band-tint {
    position: absolute;
    inset: 0;
    background: linear-gradient(115deg, rgba(6, 9, 20, 0.62) 0%, rgba(6, 9, 20, 0.22) 55%, rgba(6, 9, 20, 0.05) 100%);
}

/* ── MISSION — centred statement ──────────────────────────────── */
.mission {
    position: relative;
    background: #0B0E14;
    padding-block: 7rem;
    overflow: hidden;
}
.mission-field {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.6;
}
.mission-field svg {
    width: 100%;
    height: 100%;
    max-width: none;
}
.fil {
    fill: none;
    stroke: var(--color-ember);
    stroke-width: 1.2;
    stroke-linecap: round;
    opacity: 0.34;
}
.fil-soft  { opacity: 0.18; stroke-width: 1; }
.fil-faint { opacity: 0.09; stroke-width: 0.9; }
.mission-body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.mission-label { color: color-mix(in srgb, var(--color-ember) 62%, white); }
.mission-text {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2.8vw, 2rem);
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.35;
    color: var(--color-surface);
    max-width: 40ch;
    margin: 0;
}
:global([dir="rtl"]) .mission-text {
    font-family: var(--font-arabic);
    letter-spacing: 0;
    line-height: 1.6;
    max-width: 34ch;
}

/* ── SHARED SECTION HEADS ────────────────────────────────────── */
.sec-head {
    max-width: 30ch;
    margin-bottom: 3.5rem;
}
.sec-head-center {
    max-width: 40ch;
    margin-inline: auto;
    text-align: center;
}
.sec-title {
    font-size: clamp(1.75rem, 3.6vw, 2.75rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.08;
    color: var(--color-ink);
    margin: 0;
}
@media (min-width: 1024px) {
    .sec-title .line { white-space: nowrap; }
}
:global([dir="rtl"]) .sec-title { letter-spacing: 0; line-height: 1.3; }

/* ── VALUES ──────────────────────────────────────────────────── */
.values {
    background: var(--color-canvas);
    padding-block: 6rem;
}
.values-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
}
@media (min-width: 768px) {
    .values-grid { grid-template-columns: repeat(3, 1fr); }
}
.value {
    position: relative;
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 16px;
    padding: 2rem 1.75rem 1.875rem;
    transition: border-color 300ms, box-shadow 300ms, transform 300ms;
}
.value:hover {
    transform: translateY(-4px);
    border-color: color-mix(in srgb, var(--color-ember) 34%, transparent);
    box-shadow: 0 18px 40px rgba(8, 12, 21, 0.08);
}
.value-rule {
    display: block;
    width: 2.25rem;
    height: 3px;
    border-radius: 2px;
    background: var(--color-ember);
    margin-bottom: 1.75rem;
    transition: width 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.value:hover .value-rule { width: 3.5rem; }
.value-title {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-ink);
    margin: 0 0 0.625rem;
    line-height: 1.3;
}
:global([dir="rtl"]) .value-title { letter-spacing: 0; }
.value-desc {
    font-size: 0.9375rem;
    color: var(--color-muted);
    line-height: 1.7;
    margin: 0;
}
:global([dir="rtl"]) .value-desc { font-family: var(--font-arabic); }

/* ── TEAM ────────────────────────────────────────────────────── */
.team {
    background: #0B0E14;
    padding-block: 6rem;
}
.team-label { color: color-mix(in srgb, var(--color-ember) 62%, white); }
.team-title { color: var(--color-surface); }
/* Editorial rows: each discipline reads as a line in a masthead, with a tone
   sweep that draws across on hover instead of a boxed card. */
.disciplines {
    border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.disc {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.875rem;
    padding-block: 2.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}
@media (min-width: 860px) {
    .disc {
        grid-template-columns: 1fr 1.35fr;
        gap: 3rem;
        align-items: baseline;
        padding-block: 2.75rem;
    }
}
.disc-sweep {
    position: absolute;
    inset-inline: 0;
    bottom: -1px;
    height: 1px;
    background: var(--tone);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
}
:global([dir="rtl"]) .disc-sweep { transform-origin: right; }
.disc:hover .disc-sweep { transform: scaleX(1); }
.disc-role {
    display: block;
    font-size: 0.625rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--tone);
    margin-bottom: 0.625rem;
}
:global([dir="rtl"]) .disc-role { font-family: var(--font-arabic); letter-spacing: 0.04em; }
.disc-name {
    font-size: clamp(1.375rem, 2.6vw, 2rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--color-surface);
    margin: 0;
    line-height: 1.15;
    transition: color 260ms;
}
:global([dir="rtl"]) .disc-name { letter-spacing: 0; line-height: 1.4; }
.disc:hover .disc-name { color: var(--tone); }
.disc-bio {
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.56);
    line-height: 1.8;
    margin: 0;
    max-width: 52ch;
}
:global([dir="rtl"]) .disc-bio { font-family: var(--font-arabic); max-width: 46ch; }

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
    .value,
    .value-rule,
    .disc-sweep,
    .disc-name {
        transition: none;
    }
    .value:hover { transform: none; }
}
</style>
