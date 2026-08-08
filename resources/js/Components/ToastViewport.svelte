<script>
    import { page } from '@inertiajs/svelte'
    import { toast, toastStore } from '../lib/toast.js'

    const labels = {
        success: 'Success',
        error: 'Action needed',
        warning: 'Please note',
        info: 'Update',
    }

    let lastFlashKey = $state('')
    let flash = $derived(page.props.flash || {})

    $effect(() => {
        const entries = ['success', 'error', 'warning', 'info']
            .map((type) => [type, flash[type]])
            .filter(([, message]) => Boolean(message))
        const key = JSON.stringify(entries)

        if (!entries.length) {
            lastFlashKey = ''
            return
        }

        if (key === lastFlashKey) return
        lastFlashKey = key

        for (const [type, message] of entries) {
            toast[type](message)
        }
    })
</script>

<div class="toast-viewport" aria-label="Notifications">
    {#each $toastStore as item (item.id)}
        <article
            class="toast-item {item.type}"
            class:paused={item.paused}
            role={item.type === 'error' ? 'alert' : 'status'}
            aria-live={item.type === 'error' ? 'assertive' : 'polite'}
            onmouseenter={() => toastStore.pause(item.id)}
            onmouseleave={() => toastStore.resume(item.id)}
            onfocusin={() => toastStore.pause(item.id)}
            onfocusout={() => toastStore.resume(item.id)}
        >
            <span class="status-marker" aria-hidden="true"></span>
            <div class="toast-copy">
                <strong>{item.title || labels[item.type]}</strong>
                <p>{item.message}</p>
            </div>
            <button type="button" onclick={() => toast.dismiss(item.id)} aria-label="Dismiss notification">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                    <path stroke-linecap="round" d="m5.5 5.5 9 9m0-9-9 9" />
                </svg>
            </button>
            <span class="toast-progress" style={`--toast-duration: ${item.duration}ms`} aria-hidden="true"></span>
        </article>
    {/each}
</div>

<style>
.toast-viewport {
    position: fixed;
    inset-block-end: 1.25rem;
    inset-inline-end: 1.25rem;
    z-index: 1000;
    display: flex;
    width: min(390px, calc(100vw - 2rem));
    flex-direction: column;
    gap: 0.625rem;
    pointer-events: none;
}
.toast-item {
    --toast-color: var(--color-ember);
    position: relative;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 0.8rem;
    align-items: start;
    overflow: hidden;
    padding: 0.95rem 0.95rem 1rem 1rem;
    color: var(--color-ink);
    background: color-mix(in srgb, var(--color-surface) 96%, transparent);
    border: 1px solid color-mix(in srgb, var(--toast-color) 18%, var(--color-ash));
    border-radius: 15px;
    box-shadow: 0 16px 45px rgba(8, 12, 21, 0.14);
    backdrop-filter: blur(16px);
    pointer-events: auto;
    animation: toast-in 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.toast-item::before {
    content: '';
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    width: 3px;
    background: var(--toast-color);
}
.toast-item.success { --toast-color: #059669; }
.toast-item.error { --toast-color: #DC2626; }
.toast-item.warning { --toast-color: #D97706; }
.toast-item.info { --toast-color: #2563EB; }
.status-marker {
    width: 0.55rem;
    height: 0.55rem;
    margin-top: 0.34rem;
    border-radius: 50%;
    background: var(--toast-color);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--toast-color) 12%, transparent);
}
.toast-copy { min-width: 0; }
.toast-copy strong {
    display: block;
    margin-bottom: 0.2rem;
    font-size: 0.75rem;
    font-weight: 750;
    letter-spacing: 0.01em;
}
.toast-copy p {
    margin: 0;
    color: var(--color-muted);
    font-size: 0.75rem;
    line-height: 1.55;
    overflow-wrap: anywhere;
}
.toast-item button {
    display: grid;
    width: 1.75rem;
    height: 1.75rem;
    place-items: center;
    margin: -0.2rem -0.25rem 0 0;
    padding: 0;
    color: color-mix(in srgb, var(--color-muted) 75%, transparent);
    background: transparent;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    transition: color 160ms, background 160ms;
}
.toast-item button:hover {
    color: var(--color-ink);
    background: var(--color-canvas);
}
.toast-item button svg { width: 0.9rem; height: 0.9rem; }
.toast-progress {
    position: absolute;
    inset-inline: 3px 0;
    inset-block-end: 0;
    height: 2px;
    background: color-mix(in srgb, var(--toast-color) 58%, transparent);
    transform-origin: left;
    animation: toast-progress var(--toast-duration) linear forwards;
}
:global([dir="rtl"]) .toast-progress { transform-origin: right; }
.toast-item.paused .toast-progress { animation-play-state: paused; }
@keyframes toast-in {
    from { opacity: 0; transform: translateY(0.75rem) scale(0.98); }
    to { opacity: 1; transform: none; }
}
@keyframes toast-progress {
    from { transform: scaleX(1); }
    to { transform: scaleX(0); }
}
@media (max-width: 480px) {
    .toast-viewport {
        inset-inline: 1rem;
        inset-block-end: 1rem;
        width: auto;
    }
}
@media (prefers-reduced-motion: reduce) {
    .toast-item { animation: none; }
    .toast-progress { animation: none; transform: scaleX(1); }
}
</style>
