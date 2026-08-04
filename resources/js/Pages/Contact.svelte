<script>
    import { page } from '@inertiajs/svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import { reveal } from '../lib/reveal.js'
    import { maskedLines, staggerIn, toLines } from '../lib/motion.js'

    const EMAIL = 'hello@neutronixsolutions.com'

    const content = {
        en: {
            eyebrow: 'Contact',
            title: 'Start with\ntechnical challenge.',
            subtitle: 'Tell us what you need to build, improve, migrate, or automate. A senior engineer reads every message and responds within one business day.',
            required: 'Required',
            form: {
                legend: 'Project enquiry',
                name: 'Your name',
                email: 'Business email',
                company: 'Company or brand',
                optional: 'Optional',
                service: 'Primary capability needed',
                services: [
                    { id: 'cloud',      label: 'Cloud & Infrastructure' },
                    { id: 'software',   label: 'Custom Software & Platforms' },
                    { id: 'startup',    label: 'MVP & Startup Engineering' },
                    { id: 'automation', label: 'Automation & Integration' },
                    { id: 'ai',         label: 'Applied AI & Retrieval Systems' },
                    { id: 'data',       label: 'Data & Business Intelligence' },
                    { id: 'optimize',   label: 'Maintenance & Optimization' },
                    { id: 'creative',   label: 'Creative & Growth' },
                    { id: 'other',      label: 'Other / Multi-discipline' },
                ],
                message: 'Challenge, scope & target milestones',
                messageHint: 'The more context you give, the more useful our first reply will be.',
                submit: 'Request Technical Consultation',
                submitting: 'Sending…',
                privacy: 'We use your details only to reply to this enquiry.',
            },
            next: {
                label: 'What happens next',
                steps: [
                    { id: 'read', t: 'We read the context', d: 'A senior engineer reviews your message — it does not land in a sales queue.' },
                    { id: 'call', t: 'A short call', d: 'Thirty minutes to clarify constraints, scope, and what success has to look like.' },
                    { id: 'path', t: 'A written path forward', d: 'An honest read on approach, effort, and sequence — before any commitment.' },
                ],
            },
            info: {
                label: 'Direct channels',
                emailLabel: 'Email',
                addressLabel: 'Studio',
                addressVal: 'Doha, Qatar',
                hoursLabel: 'Office hours',
                hoursVal: 'Sun — Thu · 9:00 — 18:00 AST',
            },
            feedback: {
                success: 'Received. We will reply by email within one business day.',
                error: 'Something is missing. Please check the required fields and try again.',
            },
        },
        ar: {
            eyebrow: 'تواصل معنا',
            title: 'ابدأ بالتحدي التقني.',
            subtitle: 'أخبرنا بما تحتاج إلى بنائه أو تطويره أو ترحيله أو أتمتته. يقرأ مهندس أول كل رسالة ويرد خلال يوم عمل واحد.',
            required: 'مطلوب',
            form: {
                legend: 'طلب مشروع',
                name: 'الاسم',
                email: 'البريد الإلكتروني للعمل',
                company: 'الشركة أو العلامة التجارية',
                optional: 'اختياري',
                service: 'القدرة الأساسية المطلوبة',
                services: [
                    { id: 'cloud',      label: 'السحابة والبنية التحتية' },
                    { id: 'software',   label: 'البرمجيات والمنصات المخصصة' },
                    { id: 'startup',    label: 'هندسة المنتجات والشركات الناشئة' },
                    { id: 'automation', label: 'الأتمتة والتكامل' },
                    { id: 'ai',         label: 'الذكاء الاصطناعي التطبيقي وأنظمة الاسترجاع' },
                    { id: 'data',       label: 'البيانات وذكاء الأعمال' },
                    { id: 'optimize',   label: 'الصيانة وتحسين الأداء' },
                    { id: 'creative',   label: 'الإبداع والنمو' },
                    { id: 'other',      label: 'أخرى / تخصصات متعددة' },
                ],
                message: 'التحدي والنطاق والمراحل المستهدفة',
                messageHint: 'كلما زاد السياق الذي تشاركه، كان ردنا الأول أكثر فائدة.',
                submit: 'اطلب استشارة تقنية',
                submitting: 'جاري الإرسال…',
                privacy: 'نستخدم بياناتك للرد على هذا الطلب فقط.',
            },
            next: {
                label: 'ما الذي يحدث بعد ذلك',
                steps: [
                    { id: 'read', t: 'نقرأ السياق', d: 'يراجع مهندس أول رسالتك — ولا تذهب إلى قائمة مبيعات.' },
                    { id: 'call', t: 'مكالمة قصيرة', d: 'ثلاثون دقيقة لتوضيح القيود والنطاق وشكل النجاح المطلوب.' },
                    { id: 'path', t: 'مسار مكتوب', d: 'قراءة صريحة للمنهج والجهد والتسلسل، قبل أي التزام.' },
                ],
            },
            info: {
                label: 'قنوات مباشرة',
                emailLabel: 'البريد الإلكتروني',
                addressLabel: 'المقر',
                addressVal: 'الدوحة، قطر',
                hoursLabel: 'ساعات العمل',
                hoursVal: 'الأحد — الخميس · 9:00 — 18:00 بتوقيت الدوحة',
            },
            feedback: {
                success: 'تم الاستلام. سنرد عبر البريد الإلكتروني خلال يوم عمل واحد.',
                error: 'هناك حقول ناقصة. يرجى مراجعة الحقول المطلوبة والمحاولة مرة أخرى.',
            },
        },
    }

    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')
    let c      = $derived(isAR ? content.ar : content.en)

    let form = $state({ name: '', email: '', company: '', service: 'software', message: '' })
    let isSubmitting = $state(false)
    /** @type {'success'|'error'|null} */
    let submitStatus = $state(null)

    /**
     * Front-end only for now — the backend will replace the timeout with a real
     * POST once the layout and content flow are locked.
     * @param {SubmitEvent} event
     */
    function handleSubmit(event) {
        event.preventDefault()
        isSubmitting = true
        submitStatus = null

        setTimeout(() => {
            isSubmitting = false

            if (!form.name || !form.email || !form.message) {
                submitStatus = 'error'
                return
            }

            submitStatus = 'success'
            form.name = ''
            form.email = ''
            form.company = ''
            form.message = ''
        }, 900)
    }
</script>

<svelte:head>
    <title>{isAR ? 'تواصل معنا' : 'Contact'} | Neutronix</title>
    <meta name="description" content={isAR ? 'ناقش مشروعك السحابي أو البرمجي أو مشروع الأتمتة مع فريق نيوترونيكس في قطر.' : 'Discuss your cloud, software, automation, or data project with the Neutronix team in Qatar.'} />
</svelte:head>

<PublicLayout>
    <!-- ── OPENER ── -->
    <section class="opener">
        <div class="wrap opener-grid">
            <div class="opener-heading">
                <span class="label-accent opener-eyebrow">{c.eyebrow}</span>
                <h1 class="opener-title" {@attach maskedLines({ start: 'top 95%' })}>
                    {#each toLines(c.title) as line, i (i)}
                        <span class="line"><span data-line>{line}</span></span>
                    {/each}
                </h1>
            </div>
            <p class="opener-sub">{c.subtitle}</p>
        </div>
    </section>

    <!-- ── FORM + ASIDE ── -->
    <section class="contact">
        <div class="wrap contact-grid">
            <div class="form-card" {@attach reveal()}>
                <div class="status-slot" aria-live="polite">
                    {#if submitStatus === 'success'}
                        <p class="status status-success">{c.feedback.success}</p>
                    {:else if submitStatus === 'error'}
                        <p class="status status-error">{c.feedback.error}</p>
                    {/if}
                </div>

                <form onsubmit={handleSubmit}>
                    <fieldset class="fieldset" disabled={isSubmitting}>
                        <legend class="visually-hidden">{c.form.legend}</legend>

                        <div class="row">
                            <div class="field">
                                <label class="f-label" for="name">
                                    {c.form.name}<span class="req" title={c.required}>*</span>
                                </label>
                                <input
                                    class="f-control" type="text" id="name" name="name"
                                    autocomplete="name" required
                                    bind:value={form.name}
                                    placeholder={isAR ? 'مثال: أحمد العتيبي' : 'e.g. John Doe'}
                                />
                            </div>
                            <div class="field">
                                <label class="f-label" for="email">
                                    {c.form.email}<span class="req" title={c.required}>*</span>
                                </label>
                                <input
                                    class="f-control" type="email" id="email" name="email"
                                    autocomplete="email" required
                                    bind:value={form.email}
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div class="row">
                            <div class="field">
                                <label class="f-label" for="company">
                                    {c.form.company}<span class="f-optional">{c.form.optional}</span>
                                </label>
                                <input
                                    class="f-control" type="text" id="company" name="company"
                                    autocomplete="organization"
                                    bind:value={form.company}
                                />
                            </div>
                            <div class="field">
                                <label class="f-label" for="service">{c.form.service}</label>
                                <select class="f-control f-select" id="service" name="service" bind:value={form.service}>
                                    {#each c.form.services as option (option.id)}
                                        <option value={option.id}>{option.label}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>

                        <div class="field">
                            <label class="f-label" for="message">
                                {c.form.message}<span class="req" title={c.required}>*</span>
                            </label>
                            <textarea
                                class="f-control f-textarea" id="message" name="message"
                                rows="6" required
                                aria-describedby="message-hint"
                                bind:value={form.message}
                                placeholder={isAR ? 'صف النظام الحالي والعائق والجدول الزمني المستهدف…' : 'Describe the current system, the bottleneck, and your target timeline…'}
                            ></textarea>
                            <p class="f-hint" id="message-hint">{c.form.messageHint}</p>
                        </div>

                        <div class="submit-row">
                            <button class="btn-primary submit" type="submit" aria-busy={isSubmitting}>
                                {isSubmitting ? c.form.submitting : c.form.submit}
                            </button>
                            <p class="privacy">{c.form.privacy}</p>
                        </div>
                    </fieldset>
                </form>
            </div>

            <aside class="aside">
                <div class="panel">
                    <span class="panel-label">{c.info.label}</span>
                    <a class="panel-email" href="mailto:{EMAIL}">{EMAIL}</a>
                    <dl class="panel-meta">
                        <div class="meta">
                            <dt>{c.info.addressLabel}</dt>
                            <dd>{c.info.addressVal}</dd>
                        </div>
                        <div class="meta">
                            <dt>{c.info.hoursLabel}</dt>
                            <dd>{c.info.hoursVal}</dd>
                        </div>
                    </dl>
                </div>

                <div class="next">
                    <h2 class="label-accent next-label">{c.next.label}</h2>
                    <ol class="steps" {@attach staggerIn({ selector: '.step', y: 18, stagger: 0.09 })}>
                        {#each c.next.steps as step (step.id)}
                            <li class="step">
                                <p class="step-t">{step.t}</p>
                                <p class="step-d">{step.d}</p>
                            </li>
                        {/each}
                    </ol>
                </div>
            </aside>
        </div>
    </section>
</PublicLayout>

<style>
/* ── OPENER ──────────────────────────────────────────────────── */
.opener {
    background: #0B0E14;
    color: var(--color-surface);
    padding-top: calc(var(--nav-h) + 4.5rem);
    padding-bottom: 3.5rem;
}
.opener-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    align-items: end;
}
@media (min-width: 1024px) {
    .opener-grid { grid-template-columns: 1.4fr 1fr; gap: 3.5rem; }
}
.opener-heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 0;
}
.opener-eyebrow { color: color-mix(in srgb, var(--color-ember) 62%, white); }
.opener-title {
    font-size: clamp(1.75rem, 3.6vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.04;
    color: var(--color-surface);
    margin: 0;
}
@media (min-width: 1024px) {
    .opener-title .line { white-space: nowrap; }
}
:global([dir="rtl"]) .opener-title { letter-spacing: 0; line-height: 1.25; }
.opener-sub {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.8;
    margin: 0;
    padding-inline-start: 1.5rem;
    border-inline-start: 2px solid color-mix(in srgb, var(--color-ember) 70%, white);
}
:global([dir="rtl"]) .opener-sub { font-family: var(--font-arabic); }

/* ── LAYOUT ──────────────────────────────────────────────────── */
.contact {
    background: var(--color-canvas);
    padding-block: 4rem 6rem;
}
.contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
}
@media (min-width: 1024px) {
    .contact-grid { grid-template-columns: 1.65fr 1fr; gap: 2.5rem; }
}

/* ── FORM ────────────────────────────────────────────────────── */
.form-card {
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 20px;
    padding: 2rem 1.5rem;
    box-shadow: 0 2px 14px rgba(8, 12, 21, 0.04);
}
@media (min-width: 768px) {
    .form-card { padding: 3rem; }
}
.status {
    margin: 0 0 1.75rem;
    padding: 0.9375rem 1.125rem;
    border-radius: 10px;
    font-size: 0.9375rem;
    line-height: 1.6;
    border: 1px solid transparent;
}
:global([dir="rtl"]) .status { font-family: var(--font-arabic); }
.status-success { background: #ECFDF5; border-color: #A7F3D0; color: #065F46; }
.status-error   { background: #FEF2F2; border-color: #FECACA; color: #991B1B; }
.fieldset {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border: none;
    margin: 0;
    padding: 0;
    min-width: 0;
}
.fieldset:disabled { opacity: 0.6; }
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}
.row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
}
@media (min-width: 700px) {
    .row { grid-template-columns: 1fr 1fr; }
}
.field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 0;
}
.f-label {
    display: flex;
    align-items: baseline;
    gap: 0.375rem;
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-ink);
}
:global([dir="rtl"]) .f-label { font-family: var(--font-arabic); letter-spacing: 0.03em; }
.req { color: var(--color-ember); }
.f-optional {
    font-size: 0.625rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--color-muted);
    text-transform: none;
}
.f-control {
    width: 100%;
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    color: var(--color-ink);
    background: var(--color-canvas);
    border: 1px solid var(--color-ash);
    border-radius: 10px;
    padding: 0.8125rem 1rem;
    transition: border-color 180ms, box-shadow 180ms, background 180ms;
}
:global([dir="rtl"]) .f-control { font-family: var(--font-arabic); }
.f-control::placeholder { color: color-mix(in srgb, var(--color-muted) 70%, transparent); }
.f-control:hover { border-color: color-mix(in srgb, var(--color-muted) 55%, transparent); }
.f-control:focus {
    outline: none;
    background: var(--color-surface);
    border-color: var(--color-ember);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ember) 16%, transparent);
}
.f-select {
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C6370' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.125rem;
    padding-inline-end: 2.75rem;
}
:global([dir="rtl"]) .f-select {
    background-position: left 1rem center;
    padding-inline-end: 1rem;
    padding-inline-start: 2.75rem;
}
.f-textarea { resize: vertical; min-height: 9rem; line-height: 1.7; }
.f-hint {
    margin: 0;
    font-size: 0.75rem;
    color: var(--color-muted);
    line-height: 1.6;
}
:global([dir="rtl"]) .f-hint { font-family: var(--font-arabic); }
.submit-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem 1.5rem;
    padding-top: 1.75rem;
    border-top: 1px solid var(--color-ash);
    margin-top: 0.5rem;
}
.submit {
    border-radius: 10px;
    padding-inline: 2rem;
}
.privacy {
    margin: 0;
    font-size: 0.75rem;
    color: var(--color-muted);
    max-width: 30ch;
    line-height: 1.6;
}
:global([dir="rtl"]) .privacy { font-family: var(--font-arabic); }

/* ── ASIDE ───────────────────────────────────────────────────── */
.aside {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
@media (min-width: 1024px) {
    .aside { position: sticky; top: calc(var(--nav-h) + 2rem); }
}
.panel {
    background: #2A2E38;
    border-radius: 20px;
    padding: 2rem 1.75rem;
    color: var(--color-surface);
}
.panel-label {
    display: block;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.62);
    margin-bottom: 0.875rem;
}
:global([dir="rtl"]) .panel-label { font-family: var(--font-arabic); letter-spacing: 0.04em; }
.panel-email {
    display: inline-block;
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 700;
    color: color-mix(in srgb, var(--color-ember) 55%, white);
    word-break: break-word;
    border-bottom: 1px solid transparent;
    transition: color 180ms, border-color 180ms;
}
.panel-email:hover {
    color: var(--color-surface);
    border-bottom-color: rgba(255, 255, 255, 0.4);
}
.panel-meta {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin: 2rem 0 0;
    padding-top: 1.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.meta dt {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.62);
    margin-bottom: 0.375rem;
}
:global([dir="rtl"]) .meta dt { font-family: var(--font-arabic); letter-spacing: 0.03em; }
.meta dd {
    margin: 0;
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.92);
    line-height: 1.6;
}
:global([dir="rtl"]) .meta dd { font-family: var(--font-arabic); }

.next-label {
    margin-bottom: 1.25rem;
    font-size: 0.625rem;
}
/* Connected timeline — reads as a sequence without decorative numbering */
.steps {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    margin: 0;
    padding-inline-start: 1.625rem;
}
.steps::before {
    content: '';
    position: absolute;
    inset-inline-start: 0.3125rem;
    top: 0.45rem;
    bottom: 0.45rem;
    width: 1px;
    background: var(--color-ash);
}
.step { position: relative; }
.step::before {
    content: '';
    position: absolute;
    inset-inline-start: -1.625rem;
    top: 0.3rem;
    width: 0.6875rem;
    height: 0.6875rem;
    border-radius: 50%;
    background: var(--color-canvas);
    border: 2px solid var(--color-ember);
}
.step-t {
    font-family: var(--font-display);
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--color-ink);
    margin: 0 0 0.3125rem;
    line-height: 1.4;
}
:global([dir="rtl"]) .step-t { font-family: var(--font-arabic); }
.step-d {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--color-muted);
    line-height: 1.7;
}
:global([dir="rtl"]) .step-d { font-family: var(--font-arabic); }

@media (prefers-reduced-motion: reduce) {
    .f-control,
    .panel-email {
        transition: none;
    }
}
</style>
