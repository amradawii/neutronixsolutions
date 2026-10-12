<script>
    import { page, router } from '@inertiajs/svelte'
    import { toast } from '../../lib/toast.js'

    // ── State ──────────────────────────────────────────────────────
    let username = $state('')
    let password = $state('')
    let isSubmitting = $state(false)
    let clientErrors = $state({ username: '', password: '' })

    // Reactive errors from Inertia backend
    let serverErrors = $derived(page.props.errors || {})

    // Consolidated errors helper
    let errors = $derived({
        username: clientErrors.username || (serverErrors.username ? (Array.isArray(serverErrors.username) ? serverErrors.username[0] : serverErrors.username) : ''),
        password: clientErrors.password || (serverErrors.password ? (Array.isArray(serverErrors.password) ? serverErrors.password[0] : serverErrors.password) : '')
    })

    function handleLogin(e) {
        e.preventDefault()
        
        // Reset client validation
        clientErrors.username = ''
        clientErrors.password = ''

        let hasError = false

        // Frontend validation checks
        if (!username.trim()) {
            clientErrors.username = 'Username is required.'
            hasError = true
        }
        if (!password) {
            clientErrors.password = 'Password is required.'
            hasError = true
        }

        if (hasError) {
            return
        }

        isSubmitting = true

        router.post('/admin/login', { username, password }, {
            onError: (errs) => {
                const message = errs?.username || errs?.password || 'The provided credentials do not match our records.'
                toast.error(Array.isArray(message) ? message[0] : message)
            },
            onFinish: () => {
                isSubmitting = false
            }
        })
    }
</script>

<svelte:head>
    <title>Admin Login</title>
</svelte:head>

<div class="login-wrapper">
    <div class="login-glow" aria-hidden="true"></div>

    <div class="login-card border-editorial">
        <div class="login-brand">
            <img class="login-logo" src="/assets/logo.png" alt="Neutronix" />
            <span class="panel-tag">Portal</span>
        </div>

        <h1 class="login-title">Sign In</h1>
        <p class="login-subtitle">Access your agency administration panel.</p>

        <!-- Novalidate overrides native browser popup dialogs -->
        <form onsubmit={handleLogin} novalidate class="login-form">
            <div class="field-grp">
                <label for="username" class="f-label">Username</label>
                <input
                    type="text"
                    id="username"
                    bind:value={username}
                    class="f-input"
                    class:has-error={errors.username}
                    placeholder="Enter admin username"
                />
                {#if clientErrors.username}
                    <span class="error-text">{clientErrors.username}</span>
                {/if}
            </div>

            <div class="field-grp">
                <label for="password" class="f-label">Password</label>
                <input
                    type="password"
                    id="password"
                    bind:value={password}
                    class="f-input"
                    class:has-error={errors.password}
                    placeholder="Enter security password"
                />
                {#if clientErrors.password}
                    <span class="error-text">{clientErrors.password}</span>
                {/if}
            </div>

            <button type="submit" class="btn-primary login-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
        </form>
    </div>
</div>

<style>
.login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0B0E14; /* Near-black background */
    background-image:
        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
}
.login-glow {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(circle at 50% 42%, rgba(26,63,168,0.24) 0%, transparent 34%),
        radial-gradient(circle at 20% 80%, rgba(14,165,233,0.08) 0%, transparent 28%);
    pointer-events: none;
}

.login-card {
    width: 100%;
    max-width: 430px;
    background-color: color-mix(in srgb, var(--color-surface) 97%, transparent);
    border-color: rgba(255,255,255,0.18);
    border-radius: 20px;
    padding: 2.5rem;
    position: relative;
    z-index: 1;
    box-shadow: 0 28px 80px rgba(0,0,0,0.32);
}

.login-brand {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--color-ink);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
}
.login-logo {
    display: block;
    height: 2.875rem;
    width: auto;
}
.panel-tag {
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    background-color: var(--color-ink);
    color: #ffffff;
    padding: 0.2rem 0.4rem;
    border-radius: 999px;
    letter-spacing: 0.05em;
}

.login-title {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
}
.login-subtitle {
    font-size: 0.875rem;
    color: var(--color-muted);
    line-height: 1.5;
    margin-bottom: 2rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
.field-grp {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.f-label {
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-ink);
}
.f-input {
    width: 100%;
    font-family: var(--font-sans);
    font-size: 0.9375rem;
    background-color: var(--color-canvas);
    border: 1px solid var(--color-ash);
    color: var(--color-ink);
    padding: 0.8125rem 1rem;
    border-radius: 10px;
    transition: border-color 180ms, box-shadow 180ms, background 180ms;
}
.f-input:hover {
    border-color: color-mix(in srgb, var(--color-muted) 55%, transparent);
}
.f-input:focus {
    background: var(--color-surface);
    border-color: var(--color-ember);
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ember) 16%, transparent);
}
.f-input.has-error {
    border-color: #EF4444;
}
.f-input.has-error:focus {
    box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
}

.error-text {
    font-size: 0.75rem;
    color: #EF4444;
    font-weight: 500;
    margin-top: 0.125rem;
}

.login-btn {
    width: 100%;
    margin-top: 0.5rem;
    border-radius: 10px;
    justify-content: center;
}
.login-btn:disabled { cursor: wait; opacity: 0.65; }
@media (max-width: 479px) {
    .login-card { padding: 2rem 1.5rem; }
}
</style>
