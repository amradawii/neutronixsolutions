<script>
    import { page, router, Link } from '@inertiajs/svelte'

    let { children, admin = {}, title = 'Overview', section = 'overview' } = $props()

    // ── State ──────────────────────────────────────────────────────
    let sidebarCollapsed = $state(false)
    let sidebarOpen      = $state(false)
    let profileOpen      = $state(false)
    let unreadInquiryCount = $derived(page.props.adminUnreadInquiries || 0)

    // Load initial collapse state on mount
    $effect(() => {
        if (!window.matchMedia('(max-width: 1023px)').matches) {
            sidebarCollapsed = JSON.parse(localStorage.getItem('admin_sidebar_collapsed') || 'false')
        }
    })

    // Save collapse state on change
    function toggleSidebar() {
        if (window.matchMedia('(max-width: 1023px)').matches) {
            sidebarOpen = !sidebarOpen
            return
        }

        sidebarCollapsed = !sidebarCollapsed
        localStorage.setItem('admin_sidebar_collapsed', JSON.stringify(sidebarCollapsed))
    }

    function closeMobileSidebar() {
        sidebarOpen = false
    }

    function handleLogout() {
        router.post('/admin/logout')
    }
</script>

<div class="admin-wrapper" class:collapsed={sidebarCollapsed} class:mobile-open={sidebarOpen}>
    <!-- Sidebar Navigation -->
    <aside class="sidebar" id="admin-sidebar">
        <div class="sidebar-brand">
            <Link href="/admin" class="brand-logo" title={sidebarCollapsed ? "Neutronix Admin" : ""}>
                {#if sidebarCollapsed}
                    N<span class="dot">•</span>
                {:else}
                    Neutronix<span class="dot">•</span>
                    <span class="panel-tag">Admin</span>
                {/if}
            </Link>
        </div>

        <nav class="sidebar-links">
            <Link href="/admin" onclick={closeMobileSidebar} class={section === 'overview' ? 'sb-a active' : 'sb-a'} aria-current={section === 'overview' ? 'page' : undefined} title={sidebarCollapsed ? "Overview" : ""}>
                <svg class="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 13h6V4H4v9Zm0 7h6v-4H4v4Zm10 0h6v-9h-6v9Zm0-13h6V4h-6v3Z" />
                </svg>
                <span class="sb-text">Overview</span>
            </Link>

            <span class="sb-category">Management</span>

            <Link href="/admin/inquiries" onclick={closeMobileSidebar} class={section === 'inquiries' ? 'sb-a active' : 'sb-a'} aria-current={section === 'inquiries' ? 'page' : undefined} title={sidebarCollapsed ? "Inquiries" : ""}>
                <svg class="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h12a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25V6.75Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 7.5 6.2 4.65a2.17 2.17 0 0 0 2.6 0L19.5 7.5" />
                </svg>
                <span class="sb-text">Inquiries</span>
                {#if !sidebarCollapsed && unreadInquiryCount > 0}
                    <span class="nav-count">{unreadInquiryCount}</span>
                {/if}
            </Link>

            <button class="sb-a disabled" disabled title={sidebarCollapsed ? "Settings (Soon)" : ""}>
                <svg class="sb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.6 3.5h4.8l.55 2.18c.45.18.88.43 1.27.73l2.1-.63 2.4 4.15-1.55 1.55c.06.49.06.99 0 1.48l1.55 1.55-2.4 4.15-2.1-.63c-.39.3-.82.55-1.27.73L14.4 21H9.6l-.55-2.18a7.4 7.4 0 0 1-1.27-.73l-2.1.63-2.4-4.15 1.55-1.55a6.1 6.1 0 0 1 0-1.48L3.28 9.99l2.4-4.15 2.1.63c.39-.3.82-.55 1.27-.73L9.6 3.5Z" />
                    <circle cx="12" cy="12.25" r="2.75" />
                </svg>
                <span class="sb-text">Settings</span>
                {#if !sidebarCollapsed}
                    <span class="badge">Soon</span>
                {/if}
            </button>
        </nav>
    </aside>
    {#if sidebarOpen}
        <button type="button" class="sidebar-backdrop" aria-label="Close navigation" onclick={closeMobileSidebar}></button>
    {/if}

    <!-- Main Section Content -->
    <div class="admin-main">
        <header class="admin-header">
            <!-- Sidebar toggle on header left -->
            <div class="header-left">
                <button onclick={toggleSidebar} class="header-toggle" aria-label="Toggle sidebar" aria-controls="admin-sidebar">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <h2 class="header-title">{title}</h2>
            </div>

            <!-- Profile Info dropdown on header right -->
            <div class="header-right">
                <div class="profile-dropdown-wrapper">
                    <button onclick={() => profileOpen = !profileOpen} class="profile-trigger" aria-expanded={profileOpen}>
                        <div class="avatar-circle">
                            {#if admin.photo_url}
                                <img src={admin.photo_url} alt="Profile" class="avatar-img" />
                            {:else}
                                {admin.name ? admin.name.split(' ').map(n => n[0]).join('') : 'AD'}
                            {/if}
                        </div>
                        <div class="admin-profile-meta">
                            <span class="trigger-name">{admin.name || 'Administrator'}</span>
                            <span class="trigger-role">Admin</span>
                        </div>
                        <span class="arrow-down" class:open={profileOpen}>▼</span>
                    </button>

                    {#if profileOpen}
                        <div class="profile-menu border-editorial">
                            <div class="menu-header">
                                <span class="menu-name">{admin.name || 'Administrator'}</span>
                                <span class="menu-email">{admin.email || 'admin@neutronixsolutions.com'}</span>
                            </div>
                            <div class="menu-links">
                                <Link href="/admin/profile" class="menu-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path stroke-linecap="round" d="M4.75 20c.85-3.7 3.27-5.55 7.25-5.55S18.4 16.3 19.25 20" /></svg>
                                    My Profile
                                </Link>
                                <Link href="/" class="menu-link">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5M19 5l-8 8" /><path stroke-linecap="round" stroke-linejoin="round" d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></svg>
                                    View Front Site
                                </Link>
                                <button onclick={handleLogout} class="menu-logout-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4M15 8l4 4-4 4M9 12h10" /></svg>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </header>

        <main class="admin-content">
            {@render children()}
        </main>
    </div>
</div>

<style>
.admin-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 100vh;
    background-color: var(--color-canvas);
    transition: grid-template-columns 250ms ease;
}
@media (min-width: 1024px) {
    .admin-wrapper {
        grid-template-columns: 260px 1fr;
    }
    .admin-wrapper.collapsed {
        grid-template-columns: 72px 1fr;
    }
}

/* Sidebar navigation */
.sidebar {
    background-color: var(--color-ink);
    border-inline-end: 1px solid rgba(255,255,255,0.08);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1rem;
    height: auto;
    overflow-x: hidden;
    transition: padding 250ms ease, transform 250ms ease;
}
.sidebar-backdrop { display: none; }
@media (max-width: 1023px) {
    .sidebar {
        position: fixed;
        inset: 0 auto 0 0;
        z-index: 30;
        width: min(280px, calc(100vw - 3rem));
        height: 100vh;
        transform: translateX(-100%);
        box-shadow: 18px 0 45px rgba(8,12,21,0.2);
    }
    .mobile-open .sidebar { transform: translateX(0); }
    .sidebar-backdrop {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 20;
        border: 0;
        background: rgba(8,12,21,0.42);
        backdrop-filter: blur(2px);
    }
}
@media (min-width: 1024px) {
    .sidebar {
        height: 100vh;
        position: sticky;
        top: 0;
    }
}
.collapsed .sidebar {
    padding: 1.5rem 0.625rem;
    align-items: center;
}

.sidebar-brand {
    margin-bottom: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
}
/* Class is passed as a prop to <Link>, so Svelte can't scope it — anchor it to
   the wrapper instead of leaking a bare global rule. */
.sidebar-brand :global(.brand-logo) {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-surface);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: max-content;
}
.dot { color: var(--color-ember); }
.panel-tag {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    background-color: var(--color-ember);
    color: #ffffff;
    padding: 0.2rem 0.4rem;
    border-radius: 999px;
    letter-spacing: 0.05em;
}

.sidebar-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-grow: 1;
    width: 100%;
}
.sb-category {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.08em;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    padding-inline: 0.75rem;
    transition: opacity 200ms;
}
.collapsed .sb-category {
    opacity: 0;
    height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
}

:global(.sb-a) {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.875rem;
    color: rgba(250,250,250,0.52);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 10px;
    transition: background 150ms, color 150ms, justify-content 250ms;
    white-space: nowrap;
}
:global(.sb-a:hover) {
    background-color: rgba(255,255,255,0.04);
    color: var(--color-surface);
}
:global(.sb-a.active) {
    background-color: var(--color-ember);
    color: #ffffff;
    font-weight: 600;
}
.collapsed :global(.sb-a) {
    justify-content: center;
    padding-inline: 0;
}
.collapsed .sb-text {
    display: none;
}
.sb-icon {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
}

.sb-a.disabled {
    background: none;
    border: none;
    cursor: not-allowed;
    opacity: 0.4;
    text-align: left;
    width: 100%;
}
.badge,
.nav-count {
    font-size: 0.5625rem;
    font-weight: 700;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    margin-inline-start: auto;
}
.badge {
    background-color: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.5);
}
.nav-count {
    min-width: 1.35rem;
    background-color: rgba(255,255,255,0.16);
    color: #ffffff;
    text-align: center;
}

/* Main Section Layout */
.admin-main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.admin-header {
    background-color: color-mix(in srgb, var(--color-surface) 92%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--color-ash) 78%, transparent);
    height: 72px;
    padding-inline: 1.5rem;
    backdrop-filter: blur(14px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
}
@media (min-width: 768px) {
    .admin-header {
        padding-inline: 2rem;
    }
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.header-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 10px;
    color: var(--color-muted);
    transition: background 150ms, color 150ms;
}
.header-toggle:hover {
    background-color: var(--color-canvas);
    color: var(--color-ink);
}
.header-title {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0;
}

/* Profile dropdown header */
.header-right {
    display: flex;
    align-items: center;
}
.profile-dropdown-wrapper {
    position: relative;
}
.profile-trigger {
    background: none;
    border: 1px solid var(--color-ash);
    padding: 0.35rem 0.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: background 150ms, border-color 150ms;
}
.profile-trigger:hover {
    background-color: var(--color-canvas);
    border-color: var(--color-ink);
}
.avatar-circle {
    width: 32px;
    height: 32px;
    background-color: var(--color-ink);
    color: var(--color-surface);
    font-family: var(--font-display);
    font-size: 0.8125rem;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--color-ash);
    overflow: hidden;
}
.avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.admin-profile-meta {
    display: none;
    flex-direction: column;
    text-align: left;
}
@media (min-width: 768px) {
    .admin-profile-meta {
        display: flex;
    }
}
.trigger-name {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--color-ink);
}
.trigger-role {
    font-size: 0.6875rem;
    color: var(--color-muted);
}
.arrow-down {
    font-size: 0.625rem;
    color: var(--color-muted);
    transition: transform 150ms ease;
}
.arrow-down.open {
    transform: rotate(180deg);
}

.profile-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background-color: var(--color-surface);
    border-color: var(--color-ash);
    width: 228px;
    border-radius: 16px;
    box-shadow: 0 18px 45px rgba(8,12,21,0.12);
    overflow: hidden;
    z-index: 100;
}
.menu-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--color-ash);
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}
.menu-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-ink);
}
.menu-email {
    font-size: 0.75rem;
    color: var(--color-muted);
}
.menu-links {
    display: flex;
    flex-direction: column;
    padding: 0.35rem 0;
}
:global(.menu-link),
.menu-logout-btn {
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    padding: 0.75rem 1.25rem;
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--color-ink);
    cursor: pointer;
    transition: background 150ms, color 150ms;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
:global(.menu-link svg),
.menu-logout-btn svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
}
:global(.menu-link:hover),
.menu-logout-btn:hover {
    background-color: var(--color-canvas);
    color: var(--color-ember);
}
.menu-logout-btn {
    border-top: 1px solid var(--color-ash);
    color: #ef4444;
}
.menu-logout-btn:hover {
    background-color: #fef2f2;
    color: #ef4444;
}

.admin-content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
}
@media (min-width: 768px) {
    .admin-content {
        padding: 2rem;
    }
}
</style>
