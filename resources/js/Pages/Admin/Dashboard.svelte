<script>
    import { Link } from '@inertiajs/svelte'
    import AdminLayout from '../../Layouts/AdminLayout.svelte'

    // De-construct props passed from controller
    let { admin = {}, stats = {}, inquiries = [] } = $props()

    function initials(name = '') {
        return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'NA'
    }
</script>

<svelte:head>
    <title>Overview</title>
</svelte:head>

<AdminLayout {admin} title="Overview" section="overview">
    <!-- ── STATS ROW ── -->
    <div class="stats-row">
        <article class="stat-card">
            <div class="stat-copy">
                <span class="sc-label">Total Inquiries</span>
                <span class="sc-value">{stats.total_inquiries || 0}</span>
            </div>
            <span class="sc-sub">All time</span>
        </article>

        <article class="stat-card">
            <div class="stat-copy">
                <span class="sc-label">Unread</span>
                <span class="sc-value">{stats.unread_inquiries || 0}</span>
            </div>
            <span class="sc-sub sc-sub-attention">Needs review</span>
        </article>

        <article class="stat-card">
            <div class="stat-copy">
                <span class="sc-label">Active Campaigns</span>
                <span class="sc-value">{stats.active_campaigns || 0}</span>
            </div>
            <span class="sc-sub">In progress</span>
        </article>

        <article class="stat-card">
            <div class="stat-copy">
                <span class="sc-label">Pipeline Value</span>
                <span class="sc-value sc-value-currency">{stats.pipeline_value || '$0'}</span>
            </div>
            <span class="sc-sub">Estimated</span>
        </article>
    </div>

    <!-- ── TABLE SECTION ── -->
    <section class="inquiries-section">
        <div class="is-header">
            <div>
                <span class="section-kicker">Inbox</span>
                <h2 class="is-title">Recent Inquiries</h2>
            </div>
            <Link href="/admin/inquiries" class="view-all-link">
                View all
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m7.5 4.5 5.5 5.5-5.5 5.5" /></svg>
            </Link>
        </div>

        <div class="table-wrapper">
            <table class="inquiries-table">
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Requested Service</th>
                        <th>Message Preview</th>
                        <th>Submitted</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {#each inquiries as item (item.id)}
                        <tr class="it-row">
                            <td>
                                <div class="client-cell">
                                    <span class="client-avatar">{initials(item.name)}</span>
                                    <div class="client-meta">
                                        <span class="c-name">{item.name}</span>
                                        <span class="c-sub">{item.company} · {item.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span class="service-pill">{item.service}</span>
                            </td>
                            <td>
                                <p class="message-preview" title={item.message}>
                                    {item.message.length > 50 ? item.message.slice(0, 50) + '...' : item.message}
                                </p>
                            </td>
                            <td>
                                <span class="timestamp">{item.created_at}</span>
                            </td>
                            <td>
                                <span class="status-badge {item.status}">
                                    <span class="status-dot"></span>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td colspan="5" class="empty-cell">No inquiries to display yet.</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </section>
</AdminLayout>

<style>
/* Stats metrics */
.stats-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
}
@media (min-width: 640px) {
    .stats-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 1200px) {
    .stats-row { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
.stat-card {
    min-width: 0;
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 20px;
    padding: 1.125rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    box-shadow: 0 2px 12px rgba(8, 12, 21, 0.04);
    transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}
.stat-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--color-ember) 22%, var(--color-ash));
    box-shadow: 0 12px 28px rgba(8, 12, 21, 0.07);
}
.stat-copy {
    display: flex;
    min-width: 0;
    flex-direction: column;
}
.sc-label {
    font-size: 0.6875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.075em;
    color: var(--color-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.sc-value {
    font-family: var(--font-display);
    font-size: 1.625rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-ink);
    line-height: 1.15;
    margin-top: 0.15rem;
}
.sc-value-currency { font-size: 1.375rem; }
.sc-sub {
    width: max-content;
    font-size: 0.6875rem;
    line-height: 1;
    color: var(--color-muted);
    background: var(--color-canvas);
    border-radius: 999px;
    padding: 0.3rem 0.55rem;
}
.sc-sub-attention { color: #9A3412; background: #FFF7ED; }

/* Inquiries Table Section */
.inquiries-section {
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 14px rgba(8, 12, 21, 0.04);
}
.is-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-ash);
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
}
.section-kicker {
    display: block;
    font-size: 0.625rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ember);
    margin-bottom: 0.3rem;
}
.is-title {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
}
:global(.view-all-link) {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--color-ember);
    font-size: 0.75rem;
    font-weight: 700;
    white-space: nowrap;
}
:global(.view-all-link svg) { width: 1rem; height: 1rem; transition: transform 180ms ease; }
:global(.view-all-link:hover svg) { transform: translateX(2px); }
.table-wrapper { overflow-x: auto; width: 100%; }
.inquiries-table {
    width: 100%;
    min-width: 900px;
    border-collapse: collapse;
    text-align: start;
}
.inquiries-table th {
    font-size: 0.625rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--color-muted);
    background: color-mix(in srgb, var(--color-canvas) 72%, white);
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid var(--color-ash);
}
.inquiries-table td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid color-mix(in srgb, var(--color-ash) 72%, transparent);
    font-size: 0.8125rem;
    vertical-align: middle;
}
.it-row { transition: background 150ms ease; }
.it-row:hover { background: color-mix(in srgb, var(--color-canvas) 58%, white); }
.it-row:last-child td { border-bottom: none; }
.client-cell { display: flex; align-items: center; gap: 0.75rem; }
.client-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--color-ember) 10%, white);
    color: var(--color-ember);
    font-size: 0.625rem;
    font-weight: 800;
}
.client-meta { display: flex; min-width: 0; flex-direction: column; }
.c-name { font-weight: 650; color: var(--color-ink); }
.c-sub { font-size: 0.6875rem; color: var(--color-muted); margin-top: 0.1rem; }
.service-pill {
    display: inline-block;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.6875rem;
    font-weight: 650;
    color: #3730A3;
    background: #EEF2FF;
    padding: 0.3rem 0.625rem;
    border-radius: 999px;
    white-space: nowrap;
}
.message-preview {
    color: var(--color-muted);
    max-width: 290px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
}
.timestamp { color: var(--color-muted); font-size: 0.75rem; white-space: nowrap; }
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.625rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    white-space: nowrap;
}
.status-dot { width: 0.35rem; height: 0.35rem; border-radius: 50%; background: currentColor; }
.status-badge.unread { background: #FFF7ED; color: #C2410C; }
.status-badge.read { background: var(--color-canvas); color: var(--color-muted); }
.status-badge.replied { background: #ECFDF5; color: #047857; }
.empty-cell { padding-block: 3rem !important; text-align: center; color: var(--color-muted); }
</style>
