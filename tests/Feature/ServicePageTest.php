<?php

namespace Tests\Feature;

use App\Http\Controllers\ServiceController;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class ServicePageTest extends TestCase
{
    public static function serviceSlugProvider(): array
    {
        return array_map(fn (string $slug) => [$slug], ServiceController::SERVICE_SLUGS);
    }

    #[DataProvider('serviceSlugProvider')]
    public function test_english_service_detail_pages_render(string $slug): void
    {
        $this->get("/services/{$slug}")
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('ServiceShow')
                ->where('slug', $slug)
                ->where('locale', 'en')
            );
    }

    #[DataProvider('serviceSlugProvider')]
    public function test_arabic_service_detail_pages_render(string $slug): void
    {
        $this->get("/ar/services/{$slug}")
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('ServiceShow')
                ->where('slug', $slug)
                ->where('locale', 'ar')
            );
    }

    public function test_unknown_service_slug_returns_404(): void
    {
        $this->get('/services/not-a-real-service')->assertNotFound();
        $this->get('/ar/services/not-a-real-service')->assertNotFound();
    }

    public function test_services_index_still_renders(): void
    {
        $this->get('/services')->assertOk()->assertInertia(fn ($page) => $page->component('Services'));
        $this->get('/ar/services')->assertOk()->assertInertia(fn ($page) => $page->component('Services'));
    }
}
