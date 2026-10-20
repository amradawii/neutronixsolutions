<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Pages
    |--------------------------------------------------------------------------
    |
    | Inertia defaults to resources/js/pages (lowercase). This project keeps its
    | pages in resources/js/Pages, which matters on case-sensitive file systems
    | such as the CI runner and the production server.
    |
    */

    'pages' => [

        'ensure_pages_exist' => false,

        'paths' => [
            resource_path('js/Pages'),
        ],

        'extensions' => [
            'svelte',
        ],

    ],

];
