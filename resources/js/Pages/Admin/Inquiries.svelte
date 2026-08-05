<script>
    import AdminLayout from '../../Layouts/AdminLayout.svelte'

    let { admin = {}, inquiries = [] } = $props()

    let statusOverrides = $state({})
    let query = $state('')
    let statusFilter = $state('all')
    let serviceFilter = $state('all')
    let pageNumber = $state(1)
    let selectedInquiryId = $state(null)
    const perPage = 6

    let items = $derived(inquiries.map((item) => ({
        ...item,
        status: statusOverrides[item.id] ?? item.status,
    })))
    let services = $derived([...new Set(items.map((item) => item.service))])
    let filteredInquiries = $derived(items.filter((item) => {
        const needle = query.trim().toLowerCase()
        const matchesQuery = !needle || [item.name, item.email, item.company, item.service, item.message]
            .some((value) => value.toLowerCase().includes(needle))
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter
        const matchesService = serviceFilter === 'all' || item.service === serviceFilter

        return matchesQuery && matchesStatus && matchesService
    }))
    let totalPages = $derived(Math.max(1, Math.ceil(filteredInquiries.length / perPage)))
    let visibleInquiries = $derived(filteredInquiries.slice((pageNumber - 1) * perPage, pageNumber * perPage))
    let pages = $derived(Array.from({ length: totalPages }, (_, index) => index + 1))
    let selectedInquiry = $derived(items.find((item) => item.id === selectedInquiryId) || null)
    let unreadCount = $derived(items.filter((item) => item.status === 'unread').length)
    let repliedCount = $derived(items.filter((item) => item.status === 'replied').length)

    $effect(() => {
        if (pageNumber > totalPages) pageNumber = totalPages
    })

    function applyQuery(event) {
        query = event.currentTarget.value
        pageNumber = 1
    }

    function applyStatus(event) {
        statusFilter = event.currentTarget.value
        pageNumber = 1
    }

    function applyService(event) {
        serviceFilter = event.currentTarget.value
        pageNumber = 1
    }

    function clearFilters() {
        query = ''
        statusFilter = 'all'
        serviceFilter = 'all'
        pageNumber = 1
    }

    function openInquiry(id) {
        selectedInquiryId = id
    }

    function closeInquiry() {
        selectedInquiryId = null
    }

    function setStatus(id, status) {
        statusOverrides[id] = status
    }

    function handleWindowKeydown(event) {
        if (event.key === 'Escape' && selectedInquiry) closeInquiry()
    }

    function initials(name = '') {
        return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'NA'
    }
</script>

<svelte:head>
    <title>Inquiries</title>
</svelte:head>

<svelte:window onkeydown={handleWindowKeydown} />

<AdminLayout {admin} title="Inquiries" section="inquiries">
    <div class="page-heading">
        <div>
            <span class="page-kicker">Lead inbox</span>
            <h1>Project inquiries</h1>
            <p>Review new opportunities and keep every conversation moving.</p>
        </div>
        <div class="inquiry-summary" aria-label="Inquiry summary">
            <div><strong>{items.length}</strong><span>Total</span></div>
            <div><strong>{unreadCount}</strong><span>Unread</span></div>
            <div><strong>{repliedCount}</strong><span>Replied</span></div>
        </div>
    </div>

    <section class="inquiries-card">
        <div class="toolbar">
            <label class="search-field">
                <span class="visually-hidden">Search inquiries</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path stroke-linecap="round" d="m16 16 4 4" /></svg>
                <input type="search" value={query} oninput={applyQuery} placeholder="Search client, company, service..." />
            </label>

            <div class="filters">
                <label>
                    <span class="visually-hidden">Filter by status</span>
                    <select value={statusFilter} onchange={applyStatus}>
                        <option value="all">All statuses</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                    </select>
                </label>
                <label>
                    <span class="visually-hidden">Filter by service</span>
                    <select value={serviceFilter} onchange={applyService}>
                        <option value="all">All services</option>
                        {#each services as service (service)}
                            <option value={service}>{service}</option>
                        {/each}
                    </select>
                </label>
            </div>
        </div>

        <div class="results-bar">
            <span>{filteredInquiries.length} {filteredInquiries.length === 1 ? 'inquiry' : 'inquiries'}</span>
            {#if query || statusFilter !== 'all' || serviceFilter !== 'all'}
                <button type="button" onclick={clearFilters}>Clear filters</button>
            {/if}
        </div>

        <div class="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Service</th>
                        <th>Message</th>
                        <th>Received</th>
                        <th>Status</th>
                        <th><span class="visually-hidden">Actions</span></th>
                    </tr>
                </thead>
                <tbody>
                    {#each visibleInquiries as inquiry (inquiry.id)}
                        <tr class:unread-row={inquiry.status === 'unread'}>
                            <td>
                                <div class="client-cell">
                                    <span class="client-avatar">{initials(inquiry.name)}</span>
                                    <div>
                                        <strong>{inquiry.name}</strong>
                                        <span>{inquiry.company}</span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="service-pill">{inquiry.service}</span></td>
                            <td><p class="message-preview">{inquiry.message}</p></td>
                            <td><span class="received-at">{inquiry.created_at}</span></td>
                            <td>
                                <span class="status-badge {inquiry.status}"><span></span>{inquiry.status}</span>
                            </td>
                            <td>
                                <button type="button" class="view-button" onclick={() => openInquiry(inquiry.id)} aria-label={`View inquiry from ${inquiry.name}`}>
                                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m7.5 4.5 5.5 5.5-5.5 5.5" /></svg>
                                </button>
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td colspan="6">
                                <div class="empty-state">
                                    <div class="empty-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6.75A2.25 2.25 0 0 1 6.25 4.5h11.5A2.25 2.25 0 0 1 20 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H6.25A2.25 2.25 0 0 1 4 17.25V6.75Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m4.75 7.25 5.98 4.48a2.12 2.12 0 0 0 2.54 0l5.98-4.48" /></svg>
                                    </div>
                                    <strong>No inquiries found</strong>
                                    <p>Try changing or clearing your search filters.</p>
                                    <button type="button" onclick={clearFilters}>Clear filters</button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        {#if filteredInquiries.length > perPage}
            <div class="pagination">
                <span>Page {pageNumber} of {totalPages}</span>
                <div>
                    <button type="button" onclick={() => pageNumber -= 1} disabled={pageNumber === 1} aria-label="Previous page">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m12.5 4.5-5.5 5.5 5.5 5.5" /></svg>
                    </button>
                    {#each pages as pageItem (pageItem)}
                        <button type="button" class:active={pageNumber === pageItem} aria-current={pageNumber === pageItem ? 'page' : undefined} onclick={() => pageNumber = pageItem}>{pageItem}</button>
                    {/each}
                    <button type="button" onclick={() => pageNumber += 1} disabled={pageNumber === totalPages} aria-label="Next page">
                        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m7.5 4.5 5.5 5.5-5.5 5.5" /></svg>
                    </button>
                </div>
            </div>
        {/if}
    </section>

    {#if selectedInquiry}
        <button type="button" class="drawer-backdrop" aria-label="Close inquiry details" onclick={closeInquiry}></button>
        <div class="detail-drawer" role="dialog" aria-modal="true" aria-labelledby="inquiry-title">
            <div class="drawer-header">
                <div>
                    <span class="drawer-kicker">Inquiry #{selectedInquiry.id.toString().padStart(4, '0')}</span>
                    <h2 id="inquiry-title">Inquiry details</h2>
                </div>
                <button type="button" class="close-button" onclick={closeInquiry} aria-label="Close inquiry details">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" d="m6 6 12 12M18 6 6 18" /></svg>
                </button>
            </div>

            <div class="drawer-body">
                <div class="drawer-client">
                    <span class="drawer-avatar">{initials(selectedInquiry.name)}</span>
                    <div>
                        <h3>{selectedInquiry.name}</h3>
                        <p>{selectedInquiry.company}</p>
                    </div>
                    <span class="status-badge {selectedInquiry.status}"><span></span>{selectedInquiry.status}</span>
                </div>

                <dl class="detail-list">
                    <div>
                        <dt>Email</dt>
                        <dd><a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a></dd>
                    </div>
                    <div>
                        <dt>Phone</dt>
                        <dd><a href={`tel:${selectedInquiry.phone.replace(/\s/g, '')}`}>{selectedInquiry.phone}</a></dd>
                    </div>
                    <div>
                        <dt>Requested service</dt>
                        <dd>{selectedInquiry.service}</dd>
                    </div>
                    <div>
                        <dt>Submitted</dt>
                        <dd>{selectedInquiry.submitted_at}</dd>
                    </div>
                </dl>

                <div class="message-card">
                    <span>Project context</span>
                    <p>{selectedInquiry.message}</p>
                </div>
            </div>

            <div class="drawer-actions">
                <a class="reply-button" href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(`Re: Your Neutronix project inquiry`)}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6.75A2.25 2.25 0 0 1 6.25 4.5h11.5A2.25 2.25 0 0 1 20 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H6.25A2.25 2.25 0 0 1 4 17.25V6.75Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m4.75 7.25 5.98 4.48a2.12 2.12 0 0 0 2.54 0l5.98-4.48" /></svg>
                    Reply by email
                </a>
                {#if selectedInquiry.status === 'unread'}
                    <button type="button" class="secondary-button" onclick={() => setStatus(selectedInquiry.id, 'read')}>Mark as read</button>
                {:else if selectedInquiry.status !== 'replied'}
                    <button type="button" class="secondary-button" onclick={() => setStatus(selectedInquiry.id, 'replied')}>Mark replied</button>
                {/if}
            </div>
        </div>
    {/if}
</AdminLayout>

<style>
.page-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
}
.page-kicker {
    display: block;
    margin-bottom: 0.4rem;
    color: var(--color-ember);
    font-size: 0.625rem;
    font-weight: 800;
    letter-spacing: 0.13em;
    text-transform: uppercase;
}
.page-heading h1 { margin: 0; font-size: clamp(1.5rem, 2.5vw, 2rem); letter-spacing: -0.035em; }
.page-heading p { margin: 0.5rem 0 0; color: var(--color-muted); font-size: 0.875rem; }
.inquiry-summary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem;
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 14px;
}
.inquiry-summary div { min-width: 4.5rem; padding: 0.35rem 0.75rem; text-align: center; border-inline-end: 1px solid var(--color-ash); }
.inquiry-summary div:last-child { border-inline-end: 0; }
.inquiry-summary strong { display: block; font-family: var(--font-display); font-size: 1rem; line-height: 1.1; }
.inquiry-summary span { display: block; margin-top: 0.2rem; color: var(--color-muted); font-size: 0.625rem; }
.inquiries-card {
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 14px rgba(8, 12, 21, 0.04);
}
.toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1rem;
}
.search-field { position: relative; flex: 1 1 300px; max-width: 430px; }
.search-field svg {
    position: absolute;
    top: 50%;
    left: 0.875rem;
    width: 1rem;
    height: 1rem;
    color: var(--color-muted);
    transform: translateY(-50%);
    pointer-events: none;
}
.search-field input,
.filters select {
    width: 100%;
    height: 2.625rem;
    background: var(--color-canvas);
    border: 1px solid var(--color-ash);
    border-radius: 10px;
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-size: 0.75rem;
    transition: border-color 180ms, box-shadow 180ms, background 180ms;
}
.search-field input { padding: 0 1rem 0 2.5rem; }
.search-field input:focus,
.filters select:focus {
    outline: none;
    background: var(--color-surface);
    border-color: var(--color-ember);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ember) 14%, transparent);
}
.filters { display: flex; flex: 0 1 auto; gap: 0.5rem; }
.filters label:first-child { width: 130px; }
.filters label:last-child { width: 205px; }
.filters select { padding: 0 2rem 0 0.75rem; cursor: pointer; }
.results-bar {
    min-height: 2.5rem;
    padding: 0.6rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: var(--color-muted);
    background: color-mix(in srgb, var(--color-canvas) 70%, white);
    border-top: 1px solid var(--color-ash);
    border-bottom: 1px solid var(--color-ash);
    font-size: 0.6875rem;
    font-weight: 650;
}
.results-bar button,
.empty-state button { border: 0; background: none; color: var(--color-ember); font: inherit; font-weight: 700; cursor: pointer; }
.table-wrapper { width: 100%; overflow-x: auto; }
table { width: 100%; min-width: 980px; border-collapse: collapse; text-align: start; }
th {
    padding: 0.75rem 1rem;
    color: var(--color-muted);
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-ash);
    font-size: 0.625rem;
    font-weight: 800;
    letter-spacing: 0.09em;
    text-transform: uppercase;
}
td {
    padding: 0.9rem 1rem;
    border-bottom: 1px solid color-mix(in srgb, var(--color-ash) 72%, transparent);
    font-size: 0.75rem;
    vertical-align: middle;
}
tbody tr { transition: background 150ms ease; }
tbody tr:hover { background: color-mix(in srgb, var(--color-canvas) 55%, white); }
tbody tr:last-child td { border-bottom: 0; }
.unread-row td:first-child { box-shadow: inset 3px 0 var(--color-ember); }
.client-cell { display: flex; align-items: center; gap: 0.7rem; }
.client-avatar {
    width: 2.1rem;
    height: 2.1rem;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    background: color-mix(in srgb, var(--color-ember) 10%, white);
    color: var(--color-ember);
    font-size: 0.625rem;
    font-weight: 800;
}
.client-cell div { display: flex; min-width: 0; flex-direction: column; }
.client-cell strong { color: var(--color-ink); font-size: 0.75rem; font-weight: 700; }
.client-cell span:last-child { color: var(--color-muted); font-size: 0.6875rem; }
.service-pill {
    display: inline-block;
    max-width: 205px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.3rem 0.6rem;
    color: #3730A3;
    background: #EEF2FF;
    border-radius: 999px;
    font-size: 0.65rem;
    font-weight: 650;
    white-space: nowrap;
}
.message-preview { max-width: 275px; margin: 0; overflow: hidden; color: var(--color-muted); text-overflow: ellipsis; white-space: nowrap; }
.received-at { color: var(--color-muted); font-size: 0.7rem; white-space: nowrap; }
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    font-size: 0.625rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
}
.status-badge > span { width: 0.35rem; height: 0.35rem; border-radius: 50%; background: currentColor; }
.status-badge.unread { color: #C2410C; background: #FFF7ED; }
.status-badge.read { color: var(--color-muted); background: var(--color-canvas); }
.status-badge.replied { color: #047857; background: #ECFDF5; }
.view-button,
.close-button {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--color-ash);
    border-radius: 9px;
    background: var(--color-surface);
    color: var(--color-muted);
    cursor: pointer;
    transition: color 150ms, background 150ms, border-color 150ms;
}
.view-button svg { width: 0.9rem; height: 0.9rem; }
.view-button:hover,
.close-button:hover { color: var(--color-ember); background: var(--color-canvas); border-color: color-mix(in srgb, var(--color-ember) 35%, var(--color-ash)); }
.empty-state { display: flex; min-height: 260px; align-items: center; justify-content: center; flex-direction: column; text-align: center; }
.empty-icon { width: 3rem; height: 3rem; display: grid; place-items: center; margin-bottom: 0.75rem; border-radius: 14px; color: var(--color-muted); background: var(--color-canvas); }
.empty-icon svg { width: 1.35rem; height: 1.35rem; }
.empty-state strong { font-size: 0.875rem; }
.empty-state p { margin: 0.25rem 0 0.65rem; color: var(--color-muted); }
.pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.875rem 1rem;
    border-top: 1px solid var(--color-ash);
    color: var(--color-muted);
    font-size: 0.6875rem;
}
.pagination > div { display: flex; gap: 0.25rem; }
.pagination button {
    display: grid;
    place-items: center;
    min-width: 2rem;
    height: 2rem;
    padding: 0 0.5rem;
    border: 1px solid var(--color-ash);
    border-radius: 8px;
    background: var(--color-surface);
    color: var(--color-muted);
    font-size: 0.6875rem;
    font-weight: 700;
    cursor: pointer;
}
.pagination button svg { width: 0.85rem; height: 0.85rem; }
.pagination button.active { color: white; background: var(--color-ember); border-color: var(--color-ember); }
.pagination button:disabled { cursor: not-allowed; opacity: 0.38; }
.drawer-backdrop { position: fixed; inset: 0; z-index: 40; border: 0; background: rgba(8, 12, 21, 0.38); backdrop-filter: blur(2px); cursor: default; }
.detail-drawer {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 50;
    display: flex;
    width: min(470px, 100%);
    height: 100vh;
    flex-direction: column;
    background: var(--color-surface);
    box-shadow: -18px 0 55px rgba(8, 12, 21, 0.16);
}
.drawer-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-ash); }
.drawer-kicker { display: block; margin-bottom: 0.3rem; color: var(--color-ember); font-size: 0.625rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
.drawer-header h2 { margin: 0; font-size: 1.25rem; }
.close-button { width: 2.25rem; height: 2.25rem; flex-shrink: 0; border-radius: 10px; }
.close-button svg { width: 1rem; height: 1rem; }
.drawer-body { flex: 1; padding: 1.5rem; overflow-y: auto; }
.drawer-client { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 0.8rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-ash); }
.drawer-avatar { width: 3rem; height: 3rem; display: grid; place-items: center; border-radius: 14px; color: var(--color-ember); background: color-mix(in srgb, var(--color-ember) 10%, white); font-family: var(--font-display); font-weight: 800; }
.drawer-client h3 { margin: 0; font-family: var(--font-sans); font-size: 0.9375rem; font-weight: 750; }
.drawer-client p { margin: 0.15rem 0 0; color: var(--color-muted); font-size: 0.75rem; }
.detail-list { margin: 0; padding-block: 0.5rem; }
.detail-list div { display: grid; grid-template-columns: 8rem minmax(0, 1fr); gap: 1rem; padding-block: 0.75rem; border-bottom: 1px solid color-mix(in srgb, var(--color-ash) 72%, transparent); }
.detail-list dt { color: var(--color-muted); font-size: 0.6875rem; font-weight: 650; }
.detail-list dd { min-width: 0; margin: 0; color: var(--color-ink); font-size: 0.75rem; font-weight: 600; overflow-wrap: anywhere; }
.detail-list a { color: var(--color-ember); }
.message-card { margin-top: 1rem; padding: 1.1rem; border: 1px solid var(--color-ash); border-radius: 14px; background: var(--color-canvas); }
.message-card > span { display: block; margin-bottom: 0.55rem; color: var(--color-muted); font-size: 0.625rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
.message-card p { margin: 0; color: var(--color-ink); font-size: 0.8125rem; line-height: 1.75; }
.drawer-actions { display: flex; flex-wrap: wrap; gap: 0.6rem; padding: 1rem 1.5rem; border-top: 1px solid var(--color-ash); }
.reply-button,
.secondary-button { display: inline-flex; min-height: 2.65rem; align-items: center; justify-content: center; gap: 0.45rem; padding: 0.65rem 1rem; border-radius: 10px; font-family: var(--font-sans); font-size: 0.72rem; font-weight: 700; cursor: pointer; }
.reply-button { flex: 1; color: white; background: var(--color-ember); border: 1px solid var(--color-ember); }
.reply-button:hover { background: var(--color-ember-dark); }
.reply-button svg { width: 1rem; height: 1rem; }
.secondary-button { color: var(--color-ink); background: var(--color-surface); border: 1px solid var(--color-ash); }
.secondary-button:hover { background: var(--color-canvas); }
.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (max-width: 700px) {
    .page-heading { align-items: stretch; }
    .inquiry-summary { align-self: flex-start; }
    .toolbar { align-items: stretch; }
    .search-field { max-width: none; }
    .filters { width: 100%; }
    .filters label { flex: 1; width: auto !important; }
}
@media (max-width: 480px) {
    .inquiry-summary { width: 100%; }
    .inquiry-summary div { min-width: 0; flex: 1; padding-inline: 0.4rem; }
    .filters { flex-direction: column; }
    .pagination > span { display: none; }
    .pagination { justify-content: center; }
    .drawer-client { grid-template-columns: auto minmax(0, 1fr); }
    .drawer-client .status-badge { grid-column: 2; width: max-content; }
    .detail-list div { grid-template-columns: 1fr; gap: 0.25rem; }
    .drawer-actions { flex-direction: column; }
}
</style>
