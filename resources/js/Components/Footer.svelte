<script>
    import { page, Link } from '@inertiajs/svelte'

    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')

    const social = [
        { label: 'LinkedIn',  href: 'https://linkedin.com/company/neutronixsolutions' },
        { label: 'Instagram', href: 'https://instagram.com/neutronixsolutions' },
        { label: 'X',         href: 'https://x.com/neutronixsolutions' },
    ]

    const footerData = {
        en: {
            tagline: 'Cloud, software, automation, and data engineering for ambitious organizations in Qatar.',
            contactLabel: 'Contact',
            followLabel: 'Follow',
            links: [
                { label: 'Home',     href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Work',     href: '/work' },
                { label: 'About',    href: '/about' },
                { label: 'Contact',  href: '/contact' },
            ],
            copy: `© ${new Date().getFullYear()} NeutronixSolutions. All rights reserved.`
        },
        ar: {
            tagline: 'هندسة السحابة والبرمجيات والأتمتة والبيانات للمؤسسات الطموحة في قطر.',
            contactLabel: 'تواصل',
            followLabel: 'تابعنا',
            links: [
                { label: 'الرئيسية',  href: '/ar' },
                { label: 'الخدمات',  href: '/ar/services' },
                { label: 'أعمالنا', href: '/ar/work' },
                { label: 'من نحن',  href: '/ar/about' },
                { label: 'اتصل بنا', href: '/ar/contact' },
            ],
            copy: `© ${new Date().getFullYear()} NeutronixSolutions. جميع الحقوق محفوظة.`
        }
    }

    let c = $derived(isAR ? footerData.ar : footerData.en)
</script>

<footer class="footer">
    <div class="wrap">
        <div class="ft">
            <div class="ft-brand">
                <Link href={isAR ? '/ar' : '/'} class="ft-logo">
                    {isAR ? 'نيوترونيكس' : 'Neutronix'}<span class="dot">•</span>
                </Link>
                <p class="ft-tag">{c.tagline}</p>
                <p class="ft-contact">
                    <span class="ft-lbl">{c.contactLabel}</span>
                    <a href="mailto:hello@neutronixsolutions.com" class="ft-mail">hello@neutronixsolutions.com</a>
                </p>
                <div class="ft-social">
                    <span class="ft-lbl">{c.followLabel}</span>
                    <div class="ft-social-row">
                        {#each social as s (s.href)}
                            <a href={s.href} class="ft-soc" target="_blank" rel="noopener noreferrer">{s.label}</a>
                        {/each}
                    </div>
                </div>
            </div>
            <nav class="ft-links" aria-label="Footer navigation">
                {#each c.links as link (link.href)}
                    <Link href={link.href} class="ft-a">{link.label}</Link>
                {/each}
            </nav>
        </div>
        <div class="ft-btm">
            <p class="ft-copy">{c.copy}</p>
            <button onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} class="ft-top">
                {isAR ? '↑ الأعلى' : '↑ Top'}
            </button>
        </div>
    </div>
</footer>

<style>
.footer {
    background: var(--color-ink);
    padding-block-start: 4rem;
    padding-block-end: 2.5rem;
    margin-top: auto;
}
.ft {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 3rem;
    flex-wrap: wrap;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
}
:global(.ft-logo) {
    display: block;
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-surface);
    margin-bottom: 0.875rem;
}
.dot { color: var(--color-ember); }
.ft-tag {
    color: rgba(250,250,250,0.32);
    font-size: 0.9375rem;
    max-width: 28ch;
    line-height: 1.55;
    margin-bottom: 1.25rem;
}
:global([dir="rtl"]) .ft-tag { font-family: var(--font-arabic); }
.ft-contact {
    margin-bottom: 1.125rem;
}
.ft-lbl {
    display: block;
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(250,250,250,0.22);
    margin-bottom: 0.4rem;
}
:global([dir="rtl"]) .ft-lbl {
    font-family: var(--font-arabic);
    letter-spacing: 0;
}
.ft-brand {
    min-width: 0;
    max-width: 100%;
}
.ft-mail {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(250,250,250,0.38);
    transition: color 180ms;
    overflow-wrap: anywhere;
    word-break: break-word;
}
.ft-mail:hover { color: var(--color-ember); }
.ft-social-row {
    display: flex;
    gap: 1.25rem;
    flex-wrap: wrap;
}
.ft-soc {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(250,250,250,0.38);
    transition: color 180ms;
}
.ft-soc:hover { color: var(--color-ember); }
.ft-links {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    text-align: end;
}
:global([dir="rtl"]) .ft-links {
    text-align: start;
}
:global(.ft-a) {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(250,250,250,0.38);
    transition: color 180ms;
}
:global(.ft-a:hover) { color: var(--color-ember); }
:global([dir="rtl"]) :global(.ft-a) { font-family: var(--font-arabic); }
.ft-btm {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 2rem;
    gap: 1rem;
}
.ft-copy {
    font-size: 0.8125rem;
    color: rgba(250,250,250,0.18);
}
.ft-top {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: rgba(250,250,250,0.25);
    transition: color 180ms;
    padding: 0;
}
.ft-top:hover { color: var(--color-ember); }
</style>
