<script>
    import { page, Link } from '@inertiajs/svelte'
    import { getServices } from '../lib/services.js'

    let locale = $derived(page.props.locale)
    let isAR   = $derived(locale === 'ar')

    const EMAIL = 'info@neutronixsolutions.com'
    const WHATSAPP_NUMBER = '97470313061'

    const social = [
        { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/neutronix-solutions', type: 'linkedin' },
        { label: 'Instagram', href: '#', type: 'instagram' },
    ]

    const footerData = {
        en: {
            servicesLabel: 'Capabilities',
            companyLabel: 'Company',
            links: [
                { label: 'Home',     href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'About',    href: '/about' },
                { label: 'Book a Consultation', href: '/book-a-consultation' },
            ],
            legal: [
                { label: 'Privacy Policy',      href: '/privacy' },
                { label: 'Terms & Conditions',  href: '/terms' },
            ],
            copy: `© ${new Date().getFullYear()} NeutronixSolutions. All rights reserved.`,
        },
        ar: {
            servicesLabel: 'القدرات',
            companyLabel: 'الشركة',
            links: [
                { label: 'الرئيسية', href: '/ar' },
                { label: 'الخدمات',  href: '/ar/services' },
                { label: 'من نحن',   href: '/ar/about' },
                { label: 'احجز استشارة', href: '/ar/book-a-consultation' },
            ],
            legal: [
                { label: 'سياسة الخصوصية', href: '/ar/privacy' },
                { label: 'الشروط والأحكام', href: '/ar/terms' },
            ],
            copy: `© ${new Date().getFullYear()} NeutronixSolutions. جميع الحقوق محفوظة.`,
        },
    }

    let c = $derived(isAR ? footerData.ar : footerData.en)
    let services = $derived(getServices(isAR ? 'ar' : 'en'))
    let servicesBase = $derived(isAR ? '/ar/services' : '/services')
</script>

<footer class="footer">
    <div class="wrap">
        <!-- Capability links: the deepest tier, so it leads. -->
        <nav class="ft-row ft-services" aria-label={c.servicesLabel}>
            {#each services as service (service.slug)}
                <Link href={`${servicesBase}/${service.slug}`} class="ft-link">{service.short}</Link>
            {/each}
        </nav>

        <div class="ft-main">
            <Link href={isAR ? '/ar' : '/'} class="ft-logo">
                <img class="ft-logo-img" src="/assets/logo.png" alt="Neutronix" />
            </Link>

            <nav class="ft-row ft-company" aria-label={c.companyLabel}>
                {#each c.links as link (link.href)}
                    <Link href={link.href} class="ft-link ft-link-strong">{link.label}</Link>
                {/each}
            </nav>

            <p class="ft-copy">{c.copy}</p>
        </div>

        <div class="ft-row ft-meta">
            {#each c.legal as item (item.label)}
                <Link href={item.href} class="ft-link">{item.label}</Link>
            {/each}

            <a
                href={`mailto:${EMAIL}`}
                class="ft-link ft-contact"
                aria-label={isAR ? `راسلنا عبر البريد الإلكتروني ${EMAIL}` : `Email us at ${EMAIL}`}
            >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.75" y="4.25" width="14.5" height="11.5" rx="2" /><path stroke-linecap="round" stroke-linejoin="round" d="m3.5 5.5 5.2 4a2.1 2.1 0 0 0 2.6 0l5.2-4" /></svg>
                <span dir="ltr">{EMAIL}</span>
            </a>

            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                class="ft-link ft-contact ft-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isAR ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
            >
                <svg viewBox="0 0 24 24" fill="#25D366" style="color: #25D366;" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                <span dir="ltr">+974 7031 3061</span>
            </a>

            {#each social as s (s.label)}
                <a
                    href={s.href}
                    class="ft-link ft-contact ft-{s.type}"
                    target={s.href !== '#' ? '_blank' : undefined}
                    rel={s.href !== '#' ? 'noopener noreferrer' : undefined}
                    aria-label={s.label}
                >
                    {#if s.type === 'linkedin'}
                        <svg viewBox="0 0 24 24" fill="#0A66C2" style="color: #0A66C2;" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                    {:else if s.type === 'instagram'}
                        <svg viewBox="0 0 24 24" fill="none" stroke="#E4405F" style="color: #E4405F;" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    {/if}
                    <span>{s.label}</span>
                </a>
            {/each}
        </div>
    </div>
</footer>

<style>
.footer {
    background: var(--color-ink);
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    padding-block: 2.5rem;
    margin-top: auto;
}

/* Shared horizontal link row: centered, wrapping, evenly spaced. */
.ft-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.5rem 1.5rem;
}
/* The three rows read as one band: no rules between them, just rhythm. */
/* Capability links wrap naturally as the catalog grows, keeping readable
   type and spacing instead of forcing every service onto one desktop line. */
.ft-services {
    max-width: 72rem;
    margin-inline: auto;
    padding-bottom: 1.125rem;
    gap: 0.625rem 1.25rem;
}
:global(.ft-services .ft-link) {
    font-size: 0.8125rem;
}

/* Brand and copyright are pinned to the edges; the nav stays optically centered. */
.ft-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
}
@media (min-width: 901px) {
    .ft-main { padding-inline: clamp(2.5rem, 7vw, 4.5rem); }
}
.ft-company {
    flex: 1;
}
.ft-meta {
    padding-top: 1.125rem;
}

:global(.ft-logo) {
    flex-shrink: 0;
    display: block;
}
/* Logo PNG is navy on transparent; invert to white on the dark footer. */
.ft-logo-img {
    display: block;
    height: 2.875rem;
    width: auto;
    filter: brightness(0) invert(1);
}

:global(.ft-link) {
    font-size: 0.8125rem;
    font-weight: 500;
    line-height: 1.5;
    color: rgba(250, 250, 250, 0.42);
    white-space: nowrap;
    transition: color 180ms;
}
:global(.ft-link:hover) { color: var(--color-surface); }
:global(.ft-link-strong) { color: rgba(250, 250, 250, 0.72); }
:global([dir="rtl"]) :global(.ft-link) { font-family: var(--font-arabic); }

.ft-copy {
    flex-shrink: 0;
    font-size: 0.75rem;
    color: rgba(250, 250, 250, 0.28);
    white-space: nowrap;
    margin: 0;
}
:global([dir="rtl"]) .ft-copy { font-family: var(--font-arabic); }

:global(.ft-contact) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
}
:global(.ft-contact) svg { width: 0.9375rem; height: 0.9375rem; flex-shrink: 0; }
:global(.ft-whatsapp svg) { color: #25D366 !important; fill: #25D366 !important; }
:global(.ft-whatsapp:hover svg) { color: #25D366 !important; fill: #25D366 !important; }
:global(.ft-linkedin svg) { color: #0A66C2 !important; fill: #0A66C2 !important; }
:global(.ft-linkedin:hover svg) { color: #0A66C2 !important; fill: #0A66C2 !important; }
:global(.ft-instagram svg) { color: #E4405F !important; stroke: #E4405F !important; }
:global(.ft-instagram:hover svg) { color: #E4405F !important; stroke: #E4405F !important; }

/* Arabic capability labels are longer, so the rows breathe rather than crush. */
:global([dir="rtl"]) .ft-services { gap: 0.625rem 1.25rem; }

@media (max-width: 900px) {
    .ft-main {
        flex-direction: column;
        gap: 1.25rem;
    }
    .ft-copy { order: 3; }
}
@media (max-width: 560px) {
    .ft-row { gap: 0.625rem 1.125rem; }
    :global(.ft-link) { white-space: normal; }
}
</style>
