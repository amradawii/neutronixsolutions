<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ServiceController extends Controller
{
    /**
     * Detail-page slugs. Must stay in sync with the catalog keys in
     * resources/js/lib/services.js.
     *
     * @var list<string>
     */
    public const SERVICE_SLUGS = [
        'azure-cloud-migration',
        'devops-and-reliability',
        'observability-and-sre',
        'custom-software-platforms',
        'mvp-product-engineering',
        'workflow-automation',
        'data-analytics-business-intelligence',
        'applied-ai-solutions',
        'performance-optimization',
        'product-design-brand-growth',
    ];

    public function index(): Response
    {
        return Inertia::render('Services');
    }

    public function show(string $slug): Response
    {
        if (! in_array($slug, self::SERVICE_SLUGS, true)) {
            throw new NotFoundHttpException;
        }

        return Inertia::render('ServiceShow', [
            'slug' => $slug,
        ]);
    }
}
