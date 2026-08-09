<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class WorkController extends Controller
{
    /** @var list<string> */
    private const PROJECT_IDS = [
        'valo',
        'apex',
        'aether',
        'zeta',
        'novus',
        'solara',
    ];

    public function index(): Response
    {
        return Inertia::render('Work');
    }

    public function show(string $slug): Response
    {
        if (! in_array($slug, self::PROJECT_IDS, true)) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('WorkShow', [
            'slug' => $slug,
        ]);
    }
}
