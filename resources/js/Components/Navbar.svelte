<script>
    import { page, Link } from '@inertiajs/svelte'
    import { swapLocalePath } from '../lib/locale.js'

    // ── State ──────────────────────────────────────────────────────
    let mobileOpen = $state(false)
    let scrollY    = $state(0)

    // ── Reactive Properties ────────────────────────────────────────
    let locale     = $derived(page.props.locale)
    let isAR       = $derived(locale === 'ar')
    let currentUrl = $derived(page.url)
    let scrolled   = $derived(scrollY > 50)
    let langHref   = $derived(swapLocalePath(currentUrl, isAR ? 'en' : 'ar'))

    // Helper to determine if a route is active
    function isActive(path) {
        if (path === '/' || path === '/ar') {
            return currentUrl === path
        }
        return currentUrl.startsWith(path)
    }

    function handleResize() {
        if (window.innerWidth >= 1024) {
            mobileOpen = false
        }
    }

    const navigation = {
        en: {
            links: [
                { label: 'Home',     href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'About',    href: '/about' },
            ],
            langLabel: 'عربي',
            cta: 'Book a Consultation',
        },
        ar: {
            links: [
                { label: 'الرئيسية',  href: '/ar' },
                { label: 'الخدمات',  href: '/ar/services' },
                { label: 'من نحن',  href: '/ar/about' },
            ],
            langLabel: 'EN',
            cta: 'احجز استشارة',
        }
    }

    let c = $derived(isAR ? navigation.ar : navigation.en)
</script>

<svelte:window bind:scrollY={scrollY} onresize={handleResize} />

<header class="nav" class:scrolled class:menu-open={mobileOpen} class:nav-dark={!scrolled && (currentUrl === '/' || currentUrl === '/ar')}>
    <div class="wrap">
        <div class="nav-row">
            <!-- Logo -->
            <Link href={isAR ? '/ar' : '/'} class="logo" aria-label="NeutronixSolutions home">
                <img class="logo-img" src="/assets/logo.png" alt="Neutronix" />
            </Link>

            <!-- Desktop Nav Links -->
            <nav class="links" aria-label="Main navigation">
                {#each c.links as link (link.href)}
                    <Link
                        href={link.href}
                        class="nl {isActive(link.href) ? 'active' : ''}"
                    >
                        {link.label}
                    </Link>
                {/each}
            </nav>

            <!-- Right Side Controls -->
            <div class="nav-end">
                <Link href={langHref} class="lang">{c.langLabel}</Link>
                <div class="cta-d">
                    <Link href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'} class="btn-primary-nav">{c.cta}</Link>
                </div>
                <button
                    class="hbg"
                    onclick={() => mobileOpen = !mobileOpen}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                >
                    <span class:x={mobileOpen}></span>
                    <span class:x={mobileOpen}></span>
                    <span class:x={mobileOpen}></span>
                </button>
            </div>
        </div>

        <!-- Mobile Nav Menu -->
        {#if mobileOpen}
            <nav class="mob" aria-label="Mobile navigation">
                {#each c.links as link (link.href)}
                    <Link
                        href={link.href}
                        class="ml {isActive(link.href) ? 'active' : ''}"
                        onclick={() => mobileOpen = false}
                    >
                        {link.label}
                    </Link>
                {/each}
                <Link
                    href={isAR ? '/ar/book-a-consultation' : '/book-a-consultation'}
                    class="btn-primary mob-cta"
                    onclick={() => mobileOpen = false}
                >
                    {c.cta}
                </Link>
            </nav>
        {/if}
    </div>
</header>

<style>
.nav {
    position: fixed;
    inset: 0 0 auto;
    z-index: 100;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-ash);
    transition: background 320ms ease, border-color 320ms ease, box-shadow 320ms ease;
}

/* Translucent/dark hero state when scrolled to the top of homepage */
.nav.nav-dark {
    background: transparent;
    border-bottom-color: transparent;
}
.nav.nav-dark.menu-open {
    background: rgba(9, 11, 16, 0.97);
    border-bottom-color: rgba(255,255,255,0.1);
}

.nav-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    gap: 1.5rem;
}

/* Logo */
:global(.logo) {
    flex-shrink: 0;
    display: block;
}
.logo-img {
    display: block;
    height: 3.25rem;
    width: auto;
    transition: filter 320ms ease;
}
/* Logo PNG is navy on transparent; invert to white over the dark hero. */
.nav.nav-dark .logo-img { filter: brightness(0) invert(1); }

/* Desktop Links */
.links {
    display: none;
    flex: 1;
    justify-content: center;
    gap: 2rem;
}
@media (min-width: 1024px) { .links { display: flex; } }

:global(.nl) {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-muted);
    transition: color 180ms;
    position: relative;
    padding-block: 0.25rem;
}
:global(.nl:hover) { color: var(--color-ink); }
:global(.nl.active) { color: var(--color-ember); }

.nav.nav-dark :global(.nl) { color: rgba(250,250,250,0.6); }
.nav.nav-dark :global(.nl:hover) { color: var(--color-surface); }
.nav.nav-dark :global(.nl.active) { color: var(--color-ember); }

/* Right end control panel */
.nav-end { display: flex; align-items: center; gap: 1rem; }
:global(.lang) {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-muted);
    border: 1px solid var(--color-ash);
    padding: 0.3rem 0.625rem;
    border-radius: 2px;
    transition: color 180ms, border-color 180ms;
}
:global(.lang:hover) { color: var(--color-ink); border-color: var(--color-ink); }
.nav.nav-dark :global(.lang) { color: rgba(250,250,250,0.5); border-color: rgba(250,250,250,0.2); }
.nav.nav-dark :global(.lang:hover) { color: var(--color-surface); border-color: rgba(250,250,250,0.5); }

.cta-d { display: none; }
@media (min-width: 768px) { .cta-d { display: block; } }

:global(.btn-primary-nav) {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    background-color: var(--color-ember);
    color: #ffffff;
    font-family: var(--font-sans);
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border: 1px solid var(--color-ember);
    border-radius: var(--radius-btn);
    cursor: pointer;
    transition: background-color 150ms ease, border-color 150ms ease;
}
:global(.btn-primary-nav:hover) {
    background-color: var(--color-ember-dark);
    border-color: var(--color-ember-dark);
}
.nav.nav-dark :global(.btn-primary-nav) {
    background-color: #ffffff;
    color: var(--color-ink);
    border-color: #ffffff;
}
.nav.nav-dark :global(.btn-primary-nav:hover) {
    background-color: var(--color-ember);
    color: #ffffff;
    border-color: var(--color-ember);
}

:global([dir="rtl"]) :global(.btn-primary-nav) {
    font-family: var(--font-arabic);
    letter-spacing: 0;
}

/* Hamburger menu button */
.hbg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 34px;
    height: 34px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}
.hbg span {
    display: block;
    width: 100%;
    height: 1.5px;
    background: var(--color-ink);
    border-radius: 1px;
    transition: transform 280ms ease, opacity 280ms ease;
}
.nav.nav-dark .hbg span { background: var(--color-surface); }
.hbg span.x:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hbg span.x:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hbg span.x:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
@media (min-width: 1024px) { .hbg { display: none; } }

/* Mobile Menu drawer */
.mob {
    display: flex;
    flex-direction: column;
    padding-bottom: 1.5rem;
    border-top: 1px solid var(--color-ash);
}
.nav.nav-dark .mob { border-top-color: rgba(255,255,255,0.1); }
:global(.ml) {
    padding: 0.875rem 0;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-muted);
    border-bottom: 1px solid var(--color-ash);
    transition: color 150ms;
}
:global(.ml:hover) { color: var(--color-ink); }
:global(.ml.active) { color: var(--color-ember); }

.nav.nav-dark :global(.ml) { color: rgba(250,250,250,0.65); border-bottom-color: rgba(255,255,255,0.06); }
.nav.nav-dark :global(.ml:hover) { color: var(--color-surface); }
.nav.nav-dark :global(.ml.active) { color: var(--color-ember); }

:global(.mob-cta) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    text-align: center;
    margin-top: 1.25rem;
    padding: 0.65rem 1.5rem !important;
    font-size: 0.75rem !important;
    letter-spacing: 0.04em;
}
</style>
