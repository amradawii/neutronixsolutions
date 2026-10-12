# Neutronix Solutions

Bilingual (English / Arabic, RTL) company website for Neutronix Solutions, a Qatar-based cloud, software, automation, and data engineering partner, with a small admin panel for managing consultation requests.

## Features

- **Public site (EN and AR):** Home, Services, Service detail pages, About, Book a Consultation, Privacy Policy, and Terms. Arabic lives under `/ar`.
- **Service catalog:** 13 capabilities defined once in bilingual form (`resources/js/lib/services.js`) and rendered on the homepage, the services index, and each detail page.
- **Consultation requests:** the booking form validates input server-side (Inertia precognition), rate-limits submissions, and stores each request as an inquiry.
- **Admin panel (`/admin`):** login with a guard separate from public users, an overview dashboard, an inquiries list with status updates, and profile management (details, photo, password).
- **Motion and visuals:** a WebGL flow-field hero (raw WebGL, no Three.js), GSAP-based motion, and a Lottie animation in the Qatar section.

## Tech stack

- **Backend:** Laravel 12 on PHP 8.2+, with the Inertia.js server adapter.
- **Frontend:** Svelte 5 pages rendered through `@inertiajs/svelte`, built with Vite 7 and styled with Tailwind CSS 4.
- **Libraries:** GSAP, lottie-web.
- **Tests:** PHPUnit 11 feature tests.

## Architecture

```
app/
  Http/Controllers/         Public controllers (ServiceController, ConsultationController)
  Http/Controllers/Admin/   Admin auth, dashboard, inquiries, profile
  Http/Requests/Admin/      Form requests for admin profile updates
  Models/                   Admin, Inquiry, User
routes/
  web.php                   Public routes (English and /ar mirror)
  admin.php                 Admin routes under /admin, behind the auth.admin guard
resources/
  views/app.blade.php       Inertia root template (head tags, favicons, fonts)
  css/app.css               Tailwind entry and design tokens
  js/Pages/                 Inertia pages (Home, Services, ServiceShow, About, Contact, Admin/*)
  js/Layouts/               PublicLayout, AdminLayout
  js/Components/            Navbar, Footer, HeroField (WebGL)
  js/lib/                   services.js (service catalog), media.js, projects.js, locale and motion helpers
database/
  migrations/               admins, inquiries, and supporting tables
  seeders/AdminSeeder.php   Creates the first admin account
public/assets/              Logo, favicons (light and on-dark), Qatar Lottie animation
tests/Feature/              Feature tests for public pages, consultation flow, and admin
```

### Request flow

- Public pages are Inertia responses. The Svelte page for each route is picked by the controller or closure in `routes/web.php`.
- Service detail pages are validated against `ServiceController::SERVICE_SLUGS`, which must stay in sync with the catalog keys in `resources/js/lib/services.js`.
- Consultation submissions are stored in the `inquiries` table. The admin inquiries page lists them and lets an admin change their status.

## Local setup

Requirements: PHP 8.2+, Composer, Node.js with npm.

```bash
composer run setup   # install dependencies, create .env, generate key, migrate, npm install, build
composer run dev     # Laravel server and Vite dev server together
composer run test    # run the test suite
```

Create the first admin account:

```bash
php artisan db:seed --class=AdminSeeder
```

Change that account's password after the first login.

## Content and assets

- Service copy, stack lists, and deliverables are edited in `resources/js/lib/services.js`. Each entry needs EN and AR fields.
- Logo: `public/assets/logo.png`. On dark backgrounds it is shown in white with a CSS filter.
- Favicons: `public/assets/favicon/` for light browser themes and `public/assets/favicon/on-dark/` for dark ones. The page picks the set with `prefers-color-scheme` media queries in `app.blade.php`.
