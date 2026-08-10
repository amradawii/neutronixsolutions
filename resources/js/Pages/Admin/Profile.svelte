<script>
    import { page, router } from '@inertiajs/svelte'
    import AdminLayout from '../../Layouts/AdminLayout.svelte'

    let { admin = {} } = $props()

    // ── Profile Form State ─────────────────────────────────────────
    let name     = $state('')
    let username = $state('')
    let email    = $state('')
    let photo    = $state(null)
    let photoPreview = $state('')
    let syncedAdminId = $state(null)

    // Sync from props on mount or update
    $effect(() => {
        const adminId = admin?.id ?? null
        if (adminId === syncedAdminId) return

        syncedAdminId = adminId
        name = admin?.name ?? ''
        username = admin?.username ?? ''
        email = admin?.email ?? ''
        photoPreview = admin?.photo_url ?? ''
    })

    let isSavingProfile = $state(false)
    let serverErrors = $derived(page.props.errors || {})

    function firstError(error) {
        return Array.isArray(error) ? error[0] : error || ''
    }

    let profileErrors = $derived({
        name: firstError(serverErrors.name),
        username: firstError(serverErrors.username),
        email: firstError(serverErrors.email),
        photo: firstError(serverErrors.photo),
    })

    // ── Password Form State ────────────────────────────────────────
    let current_password = $state('')
    let password         = $state('')
    let password_confirmation = $state('')
    let showCurrentPassword = $state(false)
    let passwordRequirements = $derived([
        { label: '8+ characters', met: password.length >= 8 },
        { label: 'Lowercase', met: /\p{Ll}/u.test(password) },
        { label: 'Uppercase', met: /\p{Lu}/u.test(password) },
        { label: 'Number', met: /\p{N}/u.test(password) },
        { label: 'Symbol', met: /[\p{Z}\p{S}\p{P}]/u.test(password) },
    ])
    let metPasswordRequirements = $derived(passwordRequirements.filter((requirement) => requirement.met).length)

    let isSavingPassword = $state(false)
    let passwordErrors = $derived({
        current_password: firstError(serverErrors.current_password),
        password: firstError(serverErrors.password),
        password_confirmation: firstError(serverErrors.password_confirmation),
    })

    let activeTab = $state('profile')

    $effect(() => {
        if (serverErrors.current_password || serverErrors.password || serverErrors.password_confirmation) {
            activeTab = 'security'
        }
    })

    function selectTab(tab) {
        activeTab = tab
    }

    function handleTabKeydown(event, tab) {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return

        event.preventDefault()
        const nextTab = tab === 'profile' ? 'security' : 'profile'
        activeTab = nextTab
        document.getElementById(`tab-${nextTab}`)?.focus()
    }

    // Handle photo file selection and preview
    function handlePhotoChange(e) {
        const file = e.target.files[0]
        if (file) {
            photo = file
            const reader = new FileReader()
            reader.onload = (ev) => {
                photoPreview = ev.target.result
            }
            reader.readAsDataURL(file)
        }
    }

    // Submit profile updates
    function handleUpdateProfile(e) {
        e.preventDefault()

        isSavingProfile = true

        // Use FormData for file uploads
        const formData = new FormData()
        formData.append('name', name)
        formData.append('username', username)
        formData.append('email', email)
        if (photo) {
            formData.append('photo', photo)
        }

        router.post('/admin/profile', formData, {
            onFinish: () => {
                isSavingProfile = false
            }
        })
    }

    // Submit password change
    function handleUpdatePassword(e) {
        e.preventDefault()

        isSavingPassword = true

        router.post('/admin/profile/password', {
            current_password,
            password,
            password_confirmation
        }, {
            onSuccess: () => {
                // Clear password fields on success
                current_password = ''
                password = ''
                password_confirmation = ''
                showCurrentPassword = false
            },
            onFinish: () => {
                isSavingPassword = false
            }
        })
    }
</script>

<svelte:head>
    <title>My Profile</title>
</svelte:head>

<AdminLayout {admin} title="My Profile" section="profile">
    <div class="profile-shell">
        <div class="profile-tabs" role="tablist" aria-label="Profile settings">
            <button
                type="button"
                id="tab-profile"
                class="tab-button"
                class:active={activeTab === 'profile'}
                role="tab"
                aria-selected={activeTab === 'profile'}
                aria-controls="panel-profile"
                tabindex={activeTab === 'profile' ? 0 : -1}
                onclick={() => selectTab('profile')}
                onkeydown={(event) => handleTabKeydown(event, 'profile')}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path stroke-linecap="round" d="M4.75 20c.85-3.7 3.27-5.55 7.25-5.55S18.4 16.3 19.25 20" /></svg>
                Profile Information
            </button>
            <button
                type="button"
                id="tab-security"
                class="tab-button"
                class:active={activeTab === 'security'}
                role="tab"
                aria-selected={activeTab === 'security'}
                aria-controls="panel-security"
                tabindex={activeTab === 'security' ? 0 : -1}
                onclick={() => selectTab('security')}
                onkeydown={(event) => handleTabKeydown(event, 'security')}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path stroke-linecap="round" d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
                Security
            </button>
        </div>

        <div class="profile-panel" role="tabpanel" id={activeTab === 'profile' ? 'panel-profile' : 'panel-security'} aria-labelledby={`tab-${activeTab}`} tabindex="0">
            {#if activeTab === 'profile'}
                <!-- ── PROFILE INFO CARD ── -->
                <div class="profile-card">
                    <h2 class="card-title">Profile Information</h2>
                    <p class="card-subtitle">Update your administrator details and profile photo.</p>

                    <form onsubmit={handleUpdateProfile} novalidate class="p-form">
                        <!-- Avatar Upload Section -->
                        <div class="avatar-upload-block">
                            <div class="avatar-preview-circle">
                                {#if photoPreview}
                                    <img src={photoPreview} alt="Avatar Preview" class="preview-img" />
                                {:else}
                                    <span class="preview-initials">
                                        {name ? name.split(' ').map(n => n[0]).join('') : 'AD'}
                                    </span>
                                {/if}
                            </div>
                            <div class="avatar-upload-inputs">
                                <label class="btn-upload">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><circle cx="8.5" cy="10" r="1.5" /><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 16 4-3.5 3.5 3 2.5-2 5 4" /></svg>
                                    Choose photo
                                    <input
                                        type="file"
                                        id="photo-input"
                                        accept="image/*"
                                        onchange={handlePhotoChange}
                                        class="hidden-file-input"
                                    />
                                </label>
                                <span class="upload-tip text-muted">JPEG, PNG, JPG or WEBP. Max 2MB.</span>
                            </div>
                        </div>
                        {#if profileErrors.photo}
                            <span class="error-text">{profileErrors.photo}</span>
                        {/if}

                        <!-- Fields -->
                        <div class="field-grp">
                            <label for="name" class="f-label">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                bind:value={name}
                                class="f-input"
                                class:has-error={profileErrors.name}
                                placeholder="Enter full name"
                            />
                            {#if profileErrors.name}
                                <span class="error-text">{profileErrors.name}</span>
                            {/if}
                        </div>

                        <div class="field-grp">
                            <label for="username" class="f-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                bind:value={username}
                                class="f-input"
                                class:has-error={profileErrors.username}
                                placeholder="Enter username"
                            />
                            {#if profileErrors.username}
                                <span class="error-text">{profileErrors.username}</span>
                            {/if}
                        </div>

                        <div class="field-grp">
                            <label for="email" class="f-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                bind:value={email}
                                class="f-input"
                                class:has-error={profileErrors.email}
                                placeholder="Enter email address"
                            />
                            {#if profileErrors.email}
                                <span class="error-text">{profileErrors.email}</span>
                            {/if}
                        </div>

                        <button type="submit" class="btn-primary form-submit" disabled={isSavingProfile}>
                            {isSavingProfile ? 'Saving Details...' : 'Save Profile'}
                        </button>
                    </form>
                </div>
            {:else}
                <!-- ── CHANGE PASSWORD CARD ── -->
                <div class="profile-card security-card">
                    <h2 class="card-title">Security & Password</h2>
                    <p class="card-subtitle">Use a strong, unique password to protect your administrator account.</p>

                    <form onsubmit={handleUpdatePassword} novalidate class="p-form">
                        <div class="field-grp">
                            <label for="current_password" class="f-label">Current Password</label>
                            <div class="password-input-wrap">
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    id="current_password"
                                    bind:value={current_password}
                                    class="f-input"
                                    class:has-error={passwordErrors.current_password}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    class="visibility-toggle"
                                    onclick={() => showCurrentPassword = !showCurrentPassword}
                                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                                    aria-pressed={showCurrentPassword}
                                >
                                    {#if showCurrentPassword}
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A10.7 10.7 0 0 1 12 5c6 0 9.5 7 9.5 7a15.7 15.7 0 0 1-2.1 3.2M6.3 6.3C3.8 8 2.5 12 2.5 12s3.5 7 9.5 7a9.7 9.7 0 0 0 3.2-.5" /></svg>
                                    {:else}
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" /><circle cx="12" cy="12" r="2.5" /></svg>
                                    {/if}
                                </button>
                            </div>
                            {#if passwordErrors.current_password}
                                <span class="error-text">{passwordErrors.current_password}</span>
                            {/if}
                        </div>

                        <div class="field-grp">
                            <label for="password" class="f-label">New Password</label>
                            <input
                                type="password"
                                id="password"
                                bind:value={password}
                                class="f-input"
                                class:has-error={passwordErrors.password}
                                placeholder="••••••••"
                                aria-describedby="password-requirements"
                            />
                            {#if passwordErrors.password}
                                <span class="error-text">{passwordErrors.password}</span>
                            {/if}
                            <div
                                class="password-meter"
                                class:complete={metPasswordRequirements === passwordRequirements.length}
                                id="password-requirements"
                                role="status"
                                aria-live="polite"
                            >
                                <div class="password-meter-head">
                                    <span>Password requirements</span>
                                    <span>{metPasswordRequirements}/{passwordRequirements.length}</span>
                                </div>
                                <div class="password-meter-bars" aria-hidden="true">
                                    {#each passwordRequirements as _, index}
                                        <span class:met={index < metPasswordRequirements}></span>
                                    {/each}
                                </div>
                                <ul class="password-requirements">
                                    {#each passwordRequirements as requirement (requirement.label)}
                                        <li class:met={requirement.met}>
                                            <span aria-hidden="true"></span>
                                            {requirement.label}
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        </div>

                        <div class="field-grp">
                            <label for="password_confirmation" class="f-label">Confirm Password</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                bind:value={password_confirmation}
                                class="f-input"
                                class:has-error={passwordErrors.password_confirmation}
                                placeholder="••••••••"
                            />
                            {#if passwordErrors.password_confirmation}
                                <span class="error-text">{passwordErrors.password_confirmation}</span>
                            {/if}
                        </div>

                        <button type="submit" class="btn-primary form-submit" disabled={isSavingPassword}>
                            {isSavingPassword ? 'Updating Password...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            {/if}
        </div>
    </div>
</AdminLayout>

<style>
/* Form Layout Grid */
.profile-shell {
    width: 100%;
    max-width: 720px;
    margin-inline: auto;
    background: var(--color-surface);
    border: 1px solid var(--color-ash);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 14px rgba(8, 12, 21, 0.04);
}
.profile-tabs {
    display: flex;
    gap: 0.25rem;
    padding: 0.75rem;
    border-bottom: 1px solid var(--color-ash);
    background: color-mix(in srgb, var(--color-canvas) 72%, white);
    overflow-x: auto;
}
.tab-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 2.75rem;
    padding: 0.625rem 1rem;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: var(--color-muted);
    font-family: var(--font-sans);
    font-size: 0.8125rem;
    font-weight: 650;
    white-space: nowrap;
    cursor: pointer;
    transition: color 160ms ease, background 160ms ease, box-shadow 160ms ease;
}
.tab-button svg { width: 1rem; height: 1rem; }
.tab-button:hover { color: var(--color-ink); background: color-mix(in srgb, var(--color-surface) 70%, transparent); }
.tab-button.active {
    color: var(--color-ember);
    background: var(--color-surface);
    box-shadow: 0 2px 10px rgba(8, 12, 21, 0.07);
}
.profile-panel:focus { outline: none; }
.profile-card { padding: 1.5rem; }
@media (min-width: 640px) {
    .profile-card { padding: 2rem; }
}
.card-title {
    max-width: 540px;
    margin: 0 auto 0.375rem;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
}
.card-subtitle {
    max-width: 540px;
    margin: 0 auto 1.5rem;
    font-size: 0.875rem;
    color: var(--color-muted);
    line-height: 1.6;
}
.p-form {
    display: flex;
    max-width: 540px;
    margin-inline: auto;
    flex-direction: column;
    gap: 1rem;
}
.security-card .p-form { max-width: 500px; }
.form-submit { width: max-content; margin-top: 0.25rem; border-radius: 10px; align-self: center; }
.form-submit:disabled { cursor: wait; opacity: 0.65; }

/* Avatar Upload Block */
.avatar-upload-block {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.25rem;
}
.avatar-preview-circle {
    width: 64px;
    height: 64px;
    background-color: var(--color-canvas);
    border: 1px solid var(--color-ash);
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
}
.preview-img { width: 100%; height: 100%; object-fit: cover; }
.preview-initials {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-ink);
}
.avatar-upload-inputs { display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; }
.btn-upload {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.7rem;
    border: 1px solid var(--color-ash);
    border-radius: 9px;
    background: var(--color-surface);
    color: var(--color-ink);
    font-size: 0.6875rem;
    font-weight: 700;
    cursor: pointer;
    transition: border-color 160ms ease, color 160ms ease, background 160ms ease;
}
.btn-upload svg { width: 0.9rem; height: 0.9rem; }
.btn-upload:hover { border-color: var(--color-ember); color: var(--color-ember); background: var(--color-canvas); }
.hidden-file-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
}
.btn-upload:has(.hidden-file-input:focus-visible) {
    outline: 2px solid var(--color-ember);
    outline-offset: 2px;
}
.upload-tip { font-size: 0.6875rem; }

/* Input Fields styling */
.field-grp { display: flex; flex-direction: column; gap: 0.5rem; }
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
.f-input:hover { border-color: color-mix(in srgb, var(--color-muted) 55%, transparent); }
.f-input:focus {
    background: var(--color-surface);
    border-color: var(--color-ember);
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ember) 16%, transparent);
}
.f-input.has-error { border-color: #EF4444; }
.f-input.has-error:focus { box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.12); }
.error-text { font-size: 0.75rem; color: #DC2626; font-weight: 500; margin-top: 0.125rem; }
.password-input-wrap { position: relative; }
.password-input-wrap .f-input { padding-inline-end: 3rem; }
.visibility-toggle {
    position: absolute;
    top: 50%;
    inset-inline-end: 0.45rem;
    width: 2rem;
    height: 2rem;
    display: grid;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 7px;
    background: transparent;
    color: var(--color-muted);
    cursor: pointer;
    transform: translateY(-50%);
}
.visibility-toggle:hover { color: var(--color-ember); background: var(--color-surface); }
.visibility-toggle:focus-visible { outline: 2px solid var(--color-ember); outline-offset: 1px; }
.visibility-toggle svg { width: 1.05rem; height: 1.05rem; }
.password-meter { padding-top: 0.15rem; }
.password-meter-head {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    color: var(--color-muted);
    font-size: 0.6875rem;
    font-weight: 700;
}
.password-meter-bars { display: flex; gap: 0.3rem; margin-top: 0.55rem; }
.password-meter-bars span { flex: 1; height: 3px; border-radius: 999px; background: var(--color-ash); transition: background 160ms ease; }
.password-meter-bars span.met { background: var(--color-ember); }
.password-meter.complete .password-meter-bars span.met { background: #047857; }
.password-requirements {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem 0.8rem;
    margin: 0.65rem 0 0;
    padding: 0;
    list-style: none;
}
.password-requirements li {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--color-muted);
    font-size: 0.625rem;
    font-weight: 650;
}
.password-requirements li > span { width: 0.35rem; height: 0.35rem; border-radius: 50%; background: var(--color-ash); }
.password-requirements li.met { color: #047857; }
.password-requirements li.met > span { background: #047857; }
@media (max-width: 479px) {
    .avatar-upload-block { align-items: flex-start; }
    .profile-tabs { padding: 0.5rem; }
    .tab-button { flex: 1; padding-inline: 0.75rem; }
}
</style>
