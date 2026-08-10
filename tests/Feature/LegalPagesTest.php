<?php

namespace Tests\Feature;

use Tests\TestCase;

class LegalPagesTest extends TestCase
{
    public function test_privacy_policy_page_renders_in_english_and_arabic(): void
    {
        $responseEn = $this->get('/privacy');
        $responseEn->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Privacy')
                ->where('locale', 'en')
                ->where('direction', 'ltr')
            );

        $responseAr = $this->get('/ar/privacy');
        $responseAr->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Privacy')
                ->where('locale', 'ar')
                ->where('direction', 'rtl')
            );
    }

    public function test_terms_and_conditions_page_renders_in_english_and_arabic(): void
    {
        $responseEn = $this->get('/terms');
        $responseEn->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Terms')
                ->where('locale', 'en')
                ->where('direction', 'ltr')
            );

        $responseAr = $this->get('/ar/terms');
        $responseAr->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Terms')
                ->where('locale', 'ar')
                ->where('direction', 'rtl')
            );
    }
}
