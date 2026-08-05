# Detailed Project Technical Tracker — NeutronixSolutions

This document provides a highly detailed technical record of the configurations, logic structures, workarounds, and database configurations implemented for the **NeutronixSolutions** bilingual web application. Use this as your reference tracker to guide future work.

---

## 📂 Project Structure & Directory Mapping
Here is the mapping of files created or modified during this development session:
* **Routing & Middleware**:
  * [routes/web.php](file:///f:/marketing_agency/project/routes/web.php) — Bilingual front end routes.
  * [routes/admin.php](file:///f:/marketing_agency/project/routes/admin.php) — Guest & authenticated administration routes.
  * [app/Http/Middleware/SetLocale.php](file:///f:/marketing_agency/project/app/Http/Middleware/SetLocale.php) — Language prefix interceptor.
  * [app/Http/Middleware/AdminMiddleware.php](file:///f:/marketing_agency/project/app/Http/Middleware/AdminMiddleware.php) — Admin authentication route guard.
  * [bootstrap/app.php](file:///f:/marketing_agency/project/bootstrap/app.php) — Middleware registration & routing engine config.
* **Models, Database, & Request Validators**:
  * [app/Models/Admin.php](file:///f:/marketing_agency/project/app/Models/Admin.php) — Authenticatable model for admins.
  * [config/auth.php](file:///f:/marketing_agency/project/config/auth.php) — Custom guards & provider arrays.
  * [database/migrations/2026_07_05_000000_create_admins_table.php](file:///f:/marketing_agency/project/database/migrations/2026_07_05_000000_create_admins_table.php) — Admin schema.
  * [database/seeders/AdminSeeder.php](file:///f:/marketing_agency/project/database/seeders/AdminSeeder.php) — Default admin credential seeder.
  * [app/Http/Requests/Admin/UpdateProfileRequest.php](file:///f:/marketing_agency/project/app/Http/Requests/Admin/UpdateProfileRequest.php) — Personal details validation rules.
  * [app/Http/Requests/Admin/UpdatePasswordRequest.php](file:///f:/marketing_agency/project/app/Http/Requests/Admin/UpdatePasswordRequest.php) — Password updates rules.
* **Controllers**:
  * [app/Http/Controllers/Admin/AuthController.php](file:///f:/marketing_agency/project/app/Http/Controllers/Admin/AuthController.php) — Sign in, validation checks, and logouts.
  * [app/Http/Controllers/Admin/DashboardController.php](file:///f:/marketing_agency/project/app/Http/Controllers/Admin/DashboardController.php) — Stats & inquiries dashboard feeds.
  * [app/Http/Controllers/Admin/ProfileController.php](file:///f:/marketing_agency/project/app/Http/Controllers/Admin/ProfileController.php) — Details update and password checks.
* **Frontend Pages & Components**:
  * [resources/js/Layouts/AdminLayout.svelte](file:///f:/marketing_agency/project/resources/js/Layouts/AdminLayout.svelte) — Dashboard layout, collapsible sidebar, header dropdowns.
  * [resources/js/Pages/Admin/Login.svelte](file:///f:/marketing_agency/project/resources/js/Pages/Admin/Login.svelte) — Minimalist portal sign in with local error validations.
  * [resources/js/Pages/Admin/Profile.svelte](file:///f:/marketing_agency/project/resources/js/Pages/Admin/Profile.svelte) — Two-column details & security panel.
  * [resources/js/Pages/Admin/Dashboard.svelte](file:///f:/marketing_agency/project/resources/js/Pages/Admin/Dashboard.svelte) — Overview metrics & client lead log list.

---

## 🛠️ Step-by-Step Implementation Details

### 1. Environment & Database Configuration
We shifted the default Laravel database from SQLite to **MySQL** to support client inquiries databases:
* In `.env`, we linked our database credentials to a local MySQL schema (e.g. `marketing_agency_db`).
* Mounted the Inertia.js middleware in [app.php](file:///f:/marketing_agency/project/bootstrap/app.php) to capture request-response lifecycles, enabling the single page application (SPA) model.

### 2. SetLocale Middleware & Bilingual Redirection
To ensure seamless multi-lingual transitions (`en` LTR / `ar` RTL) without duplicate route declarations, we created a custom `SetLocale` middleware:
* **Locale Interception**: The middleware checks the URL segment for `/ar` prefixes. If found, it updates Laravel's app locale `App::setLocale('ar')` and shares the language state through Inertia.
* **RTL Layout Grid**: Inside our pages, we bind the direction property to the parent HTML layout: `<div dir={isAR ? 'rtl' : 'ltr'}>`. This aligns grid elements, columns, and margins natively depending on the locale.

### 3. Svelte 5 CSS Compiler Class Stripping Fix
* **The Issue**: In Svelte 5, style blocks are scoped by appending unique hash signatures to classes (e.g. `.nl` becomes `.nl.svelte-xyz`). When using custom component libraries (like Inertia's `<Link>`), they render as standard HTML elements (`<a>`), but because the compiler cannot guarantee which nested elements need the class, it marks them as "Unused CSS selector" and strips the CSS rules. This caused our navigation header to display completely black (invisible text) against the obsidian hero banner.
* **The Solution**: Used the `:global` modifier in Svelte style blocks to force the compiler to preserve the styling:
  ```css
  /* Instead of .nl, write: */
  :global(.nl) {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-muted);
  }
  ```

### 4. Custom Admin Guard Setup (No Breeze)
To bypass Tailwind-heavy and default authentication packages like Laravel Breeze, we built a manual, isolated authentication guard using session-based Eloquent layers:
* **Auth Config**: In [auth.php](file:///f:/marketing_agency/project/config/auth.php), we registered:
  ```php
  'guards' => [
      'admin' => [
          'driver' => 'session',
          'provider' => 'admins',
      ],
  ],
  'providers' => [
      'admins' => [
          'driver' => 'eloquent',
          'model' => App\Models\Admin::class,
      ],
  ],
  ```
* **Admin Model**: [Admin.php](file:///f:/marketing_agency/project/app/Models/Admin.php) extends `Illuminate\Foundation\Auth\User` to inherit authenticatable functions.
* **Database Linkage**: Formulated an `AdminSeeder` to write our default admin profile using `Hash::make('admin123')`.

### 5. Interactive UI State Management (Svelte 5 Runes)
We utilized Svelte 5's new reactivity models (**Runes**) inside [AdminLayout.svelte](file:///f:/marketing_agency/project/resources/js/Layouts/AdminLayout.svelte):
* **`$state` for Collapse**: The sidebar collapse boolean `let sidebarCollapsed = $state(false)` is read from `localStorage` on mount. Toggling it updates grid layouts dynamically:
  ```css
  .admin-wrapper {
      grid-template-columns: 260px 1fr;
  }
  .admin-wrapper.collapsed {
      grid-template-columns: 72px 1fr;
  }
  ```
* **`$derived` for Errors**: Consolidated client-side and server-side errors into a single reactive `$derived` error object, guaranteeing instant display if fields fail checks.

### 6. Admin Profile updates & Avatar Storage Links
* **Form Upload Multi-Part Handling**: In Inertia, `PUT` requests do not natively support file attachments due to PHP's handling of `multipart/form-data`. Thus, updates containing file uploads (profile avatars) are sent using a `POST` request to `/admin/profile`.
* **Storage linkage**: Ran `php artisan storage:link` to create a symlink from `public/storage` to `storage/app/public`. This allows images uploaded to `storage/app/public/admins/{id}` to be visible via URLs like `asset('storage/admins/1/filename.png')`.

---

## 🔮 Future Development Roadmap

### Phase A: Database-Driven Contact Forms
- [ ] Create `inquiries` database migration (fields: `id`, `name`, `email`, `company`, `service`, `message`, `status` [unread/read/replied], `timestamps`).
- [ ] Create `Inquiry.php` Eloquent Model inside `app/Models/`.
- [ ] Implement `ContactController@store` validation and record insertion.
- [ ] Connect the frontend Contact page forms in English and Arabic to POST submissions to this controller.

### Phase B: Admin Inquiry Management Panel
- [ ] Replace mock inquiry datasets in `DashboardController` with real records queried from the database (`Inquiry::latest()->take(5)->get()`).
- [ ] Build an Inquiries details review sub-page in the admin panel to read complete client messages.
- [ ] Add inquiry status triggers (e.g. Mark as Read, Delete, Reply logged).

### Phase C: Security & Polish
- [ ] Implement throttle middleware on contact form submission (`middleware('throttle:5,1')`) to block spam.
- [ ] Build profile avatar deletion trigger inside the profile dashboard.
- [ ] Setup production build assets compression rules.
