<?php

namespace Tests\Feature;

use App\Http\Controllers\ServiceController;
use App\Http\Requests\StoreInquiryRequest;
use App\Models\Inquiry;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class ServicePageTest extends TestCase
{
    public static function serviceSlugProvider(): array
    {
        $slugs = array_unique([
            ...ServiceController::SERVICE_SLUGS,
            'seo-and-geo',
            'ecommerce-development',
            'corporate-websites',
        ]);

        return array_map(fn (string $slug) => [$slug], $slugs);
    }

    public function test_catalog_contains_thirteen_distinct_services(): void
    {
        $this->assertCount(13, ServiceController::SERVICE_SLUGS);
        $this->assertSame(ServiceController::SERVICE_SLUGS, array_unique(ServiceController::SERVICE_SLUGS));

        foreach (['applied-ai-solutions', 'seo-and-geo', 'ecommerce-development', 'corporate-websites'] as $slug) {
            $this->assertContains($slug, ServiceController::SERVICE_SLUGS);
        }
    }

    public function test_new_services_are_available_as_consultation_options(): void
    {
        foreach (['devops', 'observability', 'seo', 'ecommerce', 'website'] as $service) {
            $this->assertContains($service, Inquiry::SERVICES);
            $this->assertArrayHasKey($service, Inquiry::SERVICE_LABELS);
        }

        $this->assertSame('AI-Powered Software & Solutions', Inquiry::SERVICE_LABELS['ai']);
    }

    public function test_every_consultation_service_is_accepted_without_duplicates(): void
    {
        $expected = [
            'cloud', 'devops', 'observability', 'software', 'startup', 'automation', 'ai',
            'data', 'optimize', 'creative', 'seo', 'ecommerce', 'website', 'other',
        ];

        $this->assertEqualsCanonicalizing($expected, Inquiry::SERVICES);
        $this->assertSame(Inquiry::SERVICES, array_unique(Inquiry::SERVICES));
        $this->assertEqualsCanonicalizing($expected, array_keys(Inquiry::SERVICE_LABELS));

        $rules = ['service' => (new StoreInquiryRequest)->rules()['service']];

        foreach ($expected as $service) {
            $this->assertTrue(Validator::make(['service' => $service], $rules)->passes());
        }

        $this->assertTrue(Validator::make(['service' => 'not-a-service'], $rules)->fails());
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
