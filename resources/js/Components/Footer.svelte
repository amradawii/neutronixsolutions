<script>
    import { page, Link } from '@inertiajs/svelte'

    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')

    const EMAIL = 'info@neutronixsolutions.com'
    const WHATSAPP_NUMBER = '97470313061'

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
                { label: 'Book a Consultation', href: '/book-a-consultation' },
            ],
            motto: 'Engineering dependable digital systems for ambitious teams across Qatar and the region.',
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
                { label: 'احجز استشارة', href: '/ar/book-a-consultation' },
            ],
            motto: 'نهندس أنظمة رقمية موثوقة للفرق الطموحة في قطر والمنطقة.',
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
                <div class="ft-contact">
                    <span class="ft-lbl">{c.contactLabel}</span>
                    <div class="ft-contact-actions">
                        <a href={`mailto:${EMAIL}`} class="ft-contact-link" aria-label={isAR ? `راسلنا عبر البريد الإلكتروني ${EMAIL}` : `Email us at ${EMAIL}`}>
                            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.75" y="4.25" width="14.5" height="11.5" rx="2" /><path stroke-linecap="round" stroke-linejoin="round" d="m3.5 5.5 5.2 4a2.1 2.1 0 0 0 2.6 0l5.2-4" /></svg>
                            <span>{EMAIL}</span>
                        </a>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} class="ft-contact-link ft-whatsapp" target="_blank" rel="noopener noreferrer" aria-label={isAR ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}>
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            <span dir="ltr">+974 7031 3061</span>
                        </a>
                    </div>
                </div>
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
            <p class="ft-motto">{c.motto}</p>
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
.ft-contact-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.25rem;
}
.ft-contact-link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: rgba(250,250,250,0.74);
    font-size: 0.8125rem;
    line-height: 1;
    transition: color 180ms;
}
.ft-contact-link:hover { color: var(--color-surface); }
.ft-contact-link svg { width: 1rem; height: 1rem; color: #ffffff; flex-shrink: 0; }
.ft-whatsapp svg { color: #25D366; }
.ft-whatsapp:hover { color: #25D366; }
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
.ft-motto {
    font-size: 0.8125rem;
    color: rgba(250,250,250,0.34);
    max-width: 46ch;
    text-align: end;
    margin: 0;
}
:global([dir="rtl"]) .ft-motto {
    font-family: var(--font-arabic);
    text-align: start;
}
@media (max-width: 768px) {
    .ft-btm { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
    .ft-motto { text-align: start; }
}
</style>
