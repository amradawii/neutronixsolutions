<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
      dir="{{ app()->getLocale() === 'ar' ? 'rtl' : 'ltr' }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts: Syne (display EN), Inter (body EN), Alexandria (Arabic) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;1,14..32,400&family=Alexandria:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="icon" type="image/png" href="{{ asset('assets/favicon/favicon-96x96.png') }}" sizes="96x96" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/png" href="{{ asset('assets/favicon/on-dark/favicon-96x96.png') }}" sizes="96x96" media="(prefers-color-scheme: dark)" />
    <link rel="shortcut icon" href="{{ asset('assets/favicon/favicon.ico') }}" media="(prefers-color-scheme: light)" />
    <link rel="shortcut icon" href="{{ asset('assets/favicon/on-dark/favicon.ico') }}" media="(prefers-color-scheme: dark)" />
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/favicon/apple-touch-icon.png') }}" />
    <link rel="manifest" href="{{ asset('site.webmanifest') }}" />

    <title inertia>{{ config('app.name', 'NeutronixSolutions') }}</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @inertiaHead
</head>
<body class="antialiased">
    @inertia
</body>
</html>
