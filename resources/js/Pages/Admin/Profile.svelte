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

    // Sync from props on mount or update
    $effect(() => {
        if (admin) {
            name = name || admin.name || ''
            username = username || admin.username || ''
            email = email || admin.email || ''
            photoPreview = photoPreview || admin.photo_url || ''
        }
    })

    let isSavingProfile = $state(false)
    let clientProfileErrors = $state({ name: '', username: '', email: '' })
    let serverProfileErrors = $derived(page.props.errors || {})

    // Consolidated profile errors
    let profileErrors = $derived({
        name: clientProfileErrors.name || (serverProfileErrors.name ? (Array.isArray(serverProfileErrors.name) ? serverProfileErrors.name[0] : serverProfileErrors.name) : ''),
        username: clientProfileErrors.username || (serverProfileErrors.username ? (Array.isArray(serverProfileErrors.username) ? serverProfileErrors.username[0] : serverProfileErrors.username) : ''),
        email: clientProfileErrors.email || (serverProfileErrors.email ? (Array.isArray(serverProfileErrors.email) ? serverProfileErrors.email[0] : serverProfileErrors.email) : ''),
        photo: serverProfileErrors.photo ? (Array.isArray(serverProfileErrors.photo) ? serverProfileErrors.photo[0] : serverProfileErrors.photo) : ''
    })

    // ── Password Form State ────────────────────────────────────────
    let current_password = $state('')
    let password         = $state('')
    let password_confirmation = $state('')

    let isSavingPassword = $state(false)
    let clientPasswordErrors = $state({ current_password: '', password: '', password_confirmation: '' })
    let serverPasswordErrors = $derived(page.props.errors || {})

    // Consolidated password errors
    let passwordErrors = $derived({
        current_password: clientPasswordErrors.current_password || (serverPasswordErrors.current_password ? (Array.isArray(serverPasswordErrors.current_password) ? serverPasswordErrors.current_password[0] : serverPasswordErrors.current_password) : ''),
        password: clientPasswordErrors.password || (serverPasswordErrors.password ? (Array.isArray(serverPasswordErrors.password) ? serverPasswordErrors.password[0] : serverPasswordErrors.password) : ''),
        password_confirmation: clientPasswordErrors.password_confirmation || (serverPasswordErrors.password_confirmation ? (Array.isArray(serverPasswordErrors.password_confirmation) ? serverPasswordErrors.password_confirmation[0] : serverPasswordErrors.password_confirmation) : '')
    })

    let activeTab = $state('profile')

    $effect(() => {
        if (serverPasswordErrors.current_password || serverPasswordErrors.password || serverPasswordErrors.password_confirmation) {
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
        
        // Reset client errors
        clientProfileErrors.name = ''
        clientProfileErrors.username = ''
        clientProfileErrors.email = ''

        let hasError = false

        if (!name.trim()) {
            clientProfileErrors.name = 'Name is required.'
            hasError = true
        }
        if (!username.trim()) {
            clientProfileErrors.username = 'Username is required.'
            hasError = true
        }
        if (!email.trim()) {
            clientProfileErrors.email = 'Email is required.'
            hasError = true
        }

        if (hasError) return

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

        // Reset client errors
        clientPasswordErrors.current_password = ''
        clientPasswordErrors.password = ''
        clientPasswordErrors.password_confirmation = ''

        let hasError = false

        if (!current_password) {
            clientPasswordErrors.current_password = 'Current password is required.'
            hasError = true
        }
        if (!password) {
            clientPasswordErrors.password = 'New password is required.'
            hasError = true
        } else if (password.length < 8) {
            clientPasswordErrors.password = 'Password must be at least 8 characters.'
            hasError = true
        }
        if (password !== password_confirmation) {
            clientPasswordErrors.password_confirmation = 'Passwords do not match.'
            hasError = true
        }

        if (hasError) return

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
                                <label for="photo-input" class="btn-primary btn-upload">Select Photo</label>
                                <input
                                    type="file"
                                    id="photo-input"
                                    accept="image/*"
                                    onchange={handlePhotoChange}
                                    class="hidden-file-input"
                                />
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
                            <input
                                type="password"
                                id="current_password"
                                bind:value={current_password}
                                class="f-input"
                                class:has-error={passwordErrors.current_password}
                                placeholder="••••••••"
                            />
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
                            />
                            {#if passwordErrors.password}
                                <span class="error-text">{passwordErrors.password}</span>
                            {/if}
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
    max-width: 860px;
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
    .profile-card { padding: 2.5rem; }
}
.card-title {
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 0.5rem;
}
.card-subtitle {
    font-size: 0.875rem;
    color: var(--color-muted);
    line-height: 1.6;
    margin: 0 0 2rem;
}
.p-form {
    display: flex;
    max-width: 640px;
    flex-direction: column;
    gap: 1.25rem;
}
.security-card .p-form { max-width: 560px; }
.form-submit { width: max-content; margin-top: 0.25rem; border-radius: 10px; }
.form-submit:disabled { cursor: wait; opacity: 0.65; }

/* Avatar Upload Block */
.avatar-upload-block {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 0.25rem;
}
.avatar-preview-circle {
    width: 72px;
    height: 72px;
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
.btn-upload { padding: 0.5rem 1rem; border-radius: 10px; font-size: 0.6875rem; cursor: pointer; }
.hidden-file-input { display: none; }
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
@media (max-width: 479px) {
    .avatar-upload-block { align-items: flex-start; }
    .profile-tabs { padding: 0.5rem; }
    .tab-button { flex: 1; padding-inline: 0.75rem; }
}
</style>
