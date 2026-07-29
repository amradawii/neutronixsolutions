<script>
    import { page } from '@inertiajs/svelte'
    import Navbar from '../Components/Navbar.svelte'
    import Footer from '../Components/Footer.svelte'

    // Svelte 5 children snippet prop
    let { children } = $props()

    let locale = $derived(page.props.locale)
    let direction = $derived(page.props.direction ?? (locale === 'ar' ? 'rtl' : 'ltr'))

    // Blade sets <html dir/lang> only on full page load. Inertia SPA visits
    // update shared props but leave the document element stale — sync here.
    $effect(() => {
        document.documentElement.dir = direction
        document.documentElement.lang = locale === 'ar' ? 'ar' : 'en'
    })
</script>

<div class="layout-wrapper">
    <!-- Shared Global Navigation -->
    <Navbar />

    <!-- Page Content Slot -->
    <main class="main-content">
        {@render children()}
    </main>

    <!-- Shared Global Footer -->
    <Footer />
</div>

<style>
.layout-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-canvas);
    overflow-x: clip;
    max-width: 100%;
}
.main-content {
    flex: 1;
    /* Avoid content overlapping with the fixed navbar */
    display: flex;
    flex-direction: column;
    overflow-x: clip;
    max-width: 100%;
    min-width: 0;
}
</style>
