<script>
    import { page, Link } from '@inertiajs/svelte'
    import PublicLayout from '../Layouts/PublicLayout.svelte'
    import WorkShowcase from '../Components/WorkShowcase.svelte'
    import { reveal } from '../lib/reveal.js'
    import { getProject, getRelatedProjects } from '../lib/projects.js'

    let { slug: slugProp } = $props()

    let locale = $derived(page.props.locale)
    let isAR = $derived(locale === 'ar')
    let slug = $derived(slugProp ?? page.props.slug)
    let project = $derived(getProject(slug, isAR ? 'ar' : 'en'))
    let related = $derived(getRelatedProjects(slug, isAR ? 'ar' : 'en', 3))
    let isShowcase = $derived(Boolean(project?.showcase))

    const ui = {
        en: {
            challenge: 'Challenge',
            solution: 'Solution',
            results: 'Results',
            services: 'Services delivered',
            more: 'More work',
            back: '← Back to work',
            cta: 'Start a project',
            missing: 'Project not found.',
            year: 'Year',
        },
        ar: {
            challenge: 'التحدي',
            solution: 'الحل',
            results: 'النتائج',
            services: 'الخدمات المقدّمة',
            more: 'المزيد من الأعمال',
            back: 'العودة للأعمال →',
            cta: 'ابدأ مشروعك',
            missing: 'المشروع غير موجود.',
            year: 'السنة',
        },
    }

    let t = $derived(isAR ? ui.ar : ui.en)
    let workIndex = $derived(isAR ? '/ar/work' : '/work')
    let contactHref = $derived(isAR ? '/ar/contact' : '/contact')
</script>

<svelte:head>
    <title>{project ? `${project.client} — ${project.title}` : t.missing}</title>
</svelte:head>

<PublicLayout>
    {#if !project}
        <section class="missing wrap">
            <h1 class="page-title">{t.missing}</h1>
            <Link href={workIndex} class="back-link">{t.back}</Link>
        </section>
    {:else}
        {#if isShowcase}
            <header class="case-head">
                <div class="wrap">
                    <Link href={workIndex} class="hero-back">{t.back}</Link>
                    <div class="hero-meta">
                        <span class="hero-client">{project.client}</span>
                        <span class="hero-tag">{project.tag}</span>
                    </div>
                    <h1 class="case-title">{project.title}</h1>
                </div>
            </header>
            <WorkShowcase {project} {t} {workIndex} {contactHref} />
        {:else}
            <section class="hero">
                <img
                    class="hero-media"
                    src={project.image}
                    alt="{project.client} — {project.title}"
                />
                <div class="hero-scrim" aria-hidden="true"></div>
                <div class="wrap hero-body">
                    <Link href={workIndex} class="hero-back">{t.back}</Link>
                    <div class="hero-meta">
                        <span class="hero-client">{project.client}</span>
                        <span class="hero-tag">{project.tag}</span>
                    </div>
                    <h1 class="hero-title">{project.title}</h1>
                    <p class="hero-stat">{project.stat}</p>
                </div>
            </section>

            <section class="detail section" {@attach reveal()}>
                <div class="wrap detail-grid">
                    <div class="detail-main">
                        <p class="summary">{project.summary}</p>

                        <div class="block">
                            <h2 class="block-label">{t.challenge}</h2>
                            <p class="block-text">{project.challenge}</p>
                        </div>

                        <div class="block">
                            <h2 class="block-label">{t.solution}</h2>
                            <p class="block-text">{project.solution}</p>
                        </div>

                        <div class="block">
                            <h2 class="block-label">{t.results}</h2>
                            <ul class="results">
                                {#each project.results as item (item)}
                                    <li>{item}</li>
                                {/each}
                            </ul>
                        </div>
                    </div>

                    <aside class="detail-side">
                        <div class="side-block">
                            <h2 class="block-label">{t.services}</h2>
                            <ul class="chips">
                                {#each project.services as svc (svc)}
                                    <li class="chip">{svc}</li>
                                {/each}
                            </ul>
                        </div>
                        <div class="side-block">
                            <h2 class="block-label">{t.year}</h2>
                            <p class="year">{project.year}</p>
                        </div>
                        <div class="side-actions">
                            <Link href={workIndex} class="back-link">{t.back}</Link>
                            <Link href={contactHref} class="btn-primary">{t.cta}</Link>
                        </div>
                    </aside>
                </div>
            </section>
        {/if}

        {#if related.length}
            <section class="related section" {@attach reveal()}>
                <div class="wrap">
                    <h2 class="related-title">{t.more}</h2>
                    <div class="related-grid">
                        {#each related as p (p.id)}
                            <Link href={p.href} class="related-card">
                                <div class="related-media">
                                    <img src={p.image} alt="{p.client} — {p.title}" loading="lazy" />
                                </div>
                                <div class="related-body">
                                    <span class="related-client">{p.client}</span>
                                    <h3 class="related-h">{p.title}</h3>
                                    <span class="related-stat">{p.stat}</span>
                                </div>
                            </Link>
                        {/each}
                    </div>
                </div>
            </section>
        {/if}
    {/if}
</PublicLayout>

<style>
.missing {
    padding-top: 140px;
    padding-bottom: 6rem;
}
.page-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
}
:global([dir='rtl']) .page-title {
    font-family: var(--font-arabic);
}

.hero {
    position: relative;
    min-height: 58vh;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    background: var(--color-ink);
    padding-top: 72px;
}
.case-head {
    padding-top: 110px;
    padding-bottom: 0.5rem;
    background: color-mix(in srgb, var(--color-ash) 20%, var(--color-canvas));
    border-bottom: 1px solid var(--color-ash);
}
.case-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.12;
    max-width: 20ch;
    margin: 0 0 1.5rem;
    color: var(--color-ink);
}
:global([dir='rtl']) .case-title {
    font-family: var(--font-arabic);
    letter-spacing: 0;
    line-height: 1.3;
    max-width: 24ch;
}
.case-head .hero-client {
    color: var(--color-ink);
}
.case-head .hero-tag {
    color: var(--color-muted);
}
.case-head :global(.hero-back) {
    color: var(--color-muted);
}
.case-head :global(.hero-back:hover) {
    color: var(--color-ember);
}
.hero-media {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.hero-scrim {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10, 10, 10, 0.92) 0%, rgba(10, 10, 10, 0.35) 55%, rgba(10, 10, 10, 0.25) 100%);
}
.hero-body {
    position: relative;
    z-index: 1;
    padding-block: 3.5rem 3rem;
    color: var(--color-surface);
}
:global(.hero-back) {
    display: inline-block;
    font-size: 0.8125rem;
    font-weight: 600;
    color: rgba(250, 250, 250, 0.55);
    margin-bottom: 1.25rem;
    transition: color 160ms;
}
:global(.hero-back:hover) {
    color: var(--color-ember);
}
:global([dir='rtl']) :global(.hero-back) {
    font-family: var(--font-arabic);
}
.hero-meta {
    display: flex;
    gap: 1rem;
    align-items: baseline;
    flex-wrap: wrap;
    margin-bottom: 0.75rem;
}
.hero-client {
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 0.9375rem;
}
:global([dir='rtl']) .hero-client {
    font-family: var(--font-arabic);
}
.hero-tag {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(250, 250, 250, 0.55);
}
:global([dir='rtl']) .hero-tag {
    font-family: var(--font-arabic);
    letter-spacing: 0;
}
.hero-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 3.25rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    max-width: 18ch;
    margin: 0 0 1rem;
}
:global([dir='rtl']) .hero-title {
    font-family: var(--font-arabic);
    letter-spacing: 0;
    line-height: 1.3;
    max-width: 22ch;
}
.hero-stat {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 800;
    color: var(--color-ember);
    margin: 0;
}
:global([dir='rtl']) .hero-stat {
    font-family: var(--font-arabic);
}

.detail {
    background: var(--color-canvas);
}
.detail-grid {
    display: grid;
    gap: 3rem;
}
@media (min-width: 1024px) {
    .detail-grid {
        grid-template-columns: 1.6fr 0.9fr;
        gap: 4rem;
        align-items: start;
    }
}
.summary {
    font-size: 1.1875rem;
    line-height: 1.65;
    color: var(--color-ink);
    margin: 0 0 2.5rem;
    max-width: 52ch;
}
:global([dir='rtl']) .summary {
    font-family: var(--font-arabic);
}
.block {
    margin-bottom: 2rem;
}
.block-label {
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ember);
    margin: 0 0 0.75rem;
}
:global([dir='rtl']) .block-label {
    font-family: var(--font-arabic);
    letter-spacing: 0.04em;
}
.block-text {
    margin: 0;
    color: var(--color-muted);
    font-size: 1.0625rem;
    line-height: 1.7;
    max-width: 54ch;
}
:global([dir='rtl']) .block-text {
    font-family: var(--font-arabic);
}
.results {
    margin: 0;
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

.detail-side {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.75rem;
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
}
.chips {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.chip {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.4rem 0.7rem;
    border: 1px solid var(--color-ash);
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
.side-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: auto;
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

.related {
    background: var(--color-surface);
    border-top: 1px solid var(--color-ash);
}
.related-title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 800;
    margin: 0 0 2rem;
}
:global([dir='rtl']) .related-title {
    font-family: var(--font-arabic);
}
.related-grid {
    display: grid;
    gap: 1.25rem;
}
@media (min-width: 768px) {
    .related-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
:global(.related-card) {
    display: block;
    border: 1px solid var(--color-ash);
    background: var(--color-canvas);
    overflow: hidden;
    color: inherit;
    text-decoration: none;
    transition: border-color 180ms;
}
:global(.related-card:hover) {
    border-color: var(--color-ink);
}
.related-media {
    aspect-ratio: 16 / 10;
    overflow: hidden;
}
.related-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 500ms ease;
}
:global(.related-card:hover) .related-media img {
    transform: scale(1.04);
}
.related-body {
    padding: 1.25rem;
}
.related-client {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-muted);
    margin-bottom: 0.4rem;
}
:global([dir='rtl']) .related-client {
    font-family: var(--font-arabic);
}
.related-h {
    font-family: var(--font-display);
    font-size: 1.0625rem;
    font-weight: 700;
    line-height: 1.3;
    margin: 0 0 0.75rem;
}
:global([dir='rtl']) .related-h {
    font-family: var(--font-arabic);
}
.related-stat {
    font-family: var(--font-display);
    font-weight: 800;
    color: var(--color-ember);
    font-size: 1rem;
}
:global([dir='rtl']) .related-stat {
    font-family: var(--font-arabic);
}

@media (prefers-reduced-motion: reduce) {
    .related-media img {
        transition: none;
    }
    :global(.related-card:hover) .related-media img {
        transform: none;
    }
}
</style>
